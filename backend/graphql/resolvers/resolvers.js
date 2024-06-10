import { Expense } from "../../models/expense.js";
import { User } from "../../models/user.js";
import {
  convertMonthsToArrayWithNames,
  generateUniqueId,
  hashPassword,
  verifyPassword,
} from "../../utils/utils.js";
import { GraphQLScalarType, Kind } from "graphql";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-express";

const GQLDate = new GraphQLScalarType({
  name: "GQLDate",
  description: "Custom Date scalar type",

  // Date -> String
  serialize(value) {
    return value.toISOString(); // Convert JavaScript Date to ISO String
  },

  // String -> Date
  parseValue(value) {
    return new Date(value); // Parse incoming string value to Date object
  },

  // When using literal (params)
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value); // Parse string literal value to Date object
    }
    return null; // Invalid scalar value
  },
});

export const resolvers = {
  GQLDate,
  Query: {
    getExpenses: async (_, __, { user }) => {
      try {
        const expenses = await Expense.find({ userId: user.username });
        return expenses;
      } catch (error) {
        console.log(error);
      }
    },

    getExpenseIncome: async (_, __, { user }) => {
      try {
        const currentYear = new Date().getFullYear();

        const expenses = await Expense.aggregate([
          {
            $match: {
              userId: user.username,
              date: {
                $gte: new Date(`${currentYear}-01-01`),
                $lte: new Date(`${currentYear}-12-31`),
              },
            },
          },
          {
            $group: {
              _id: "$type",
              totalAmount: { $sum: "$amount" },
            },
          },
        ]);

        const totalExpense =
          expenses.find((expense) => expense._id === "expense")?.totalAmount ||
          0;
        const totalIncome =
          expenses.find((expense) => expense._id === "income")?.totalAmount ||
          0;

        const res = [
          { name: "Income", amount: totalIncome?.toFixed(2) },
          { name: "Expense", amount: totalExpense?.toFixed(2) },
        ];

        return res;
      } catch (error) {
        console.log(error);
      }
    },

    getExpenseChart: async (_, __, { user }) => {
      try {
        const transactions = await Expense.find({ userId: user.username });
        const result = Array.from({ length: 12 }, (_, i) => ({
          month: i + 1,
          income: 0,
          expense: 0,
        }));

        transactions.forEach((transaction) => {
          const { date, amount, type } = transaction;
          const month = date.getMonth() + 1; // Months are 0 indexed, so add 1

          if (type === "income") {
            result[month - 1].income += amount;
          } else {
            result[month - 1].expense += amount;
          }
        });
        const updatedTransaction = convertMonthsToArrayWithNames(result);
        return updatedTransaction;
      } catch (error) {
        console.log(error);
      }
    },

    getExpenseByID: async (_, { id }) => {
      try {
        const expense = await Expense.findOne({ id });
        return expense;
      } catch (error) {
        console.log(error);
      }
    },

    getUserInfo: async (_, __, { user }) => {
      try {
        const userInfo = await User.findOne({ username: user?.username });
        return userInfo;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    createExpense: async (_, { expense }, { user }) => {
      try {
        expense.id = generateUniqueId();
        expense.userId = user.username;
        const newExpense = await Expense.create(expense);
        return newExpense;
      } catch (error) {
        console.log(error);
      }
    },
    updateExpense: async (_, { id, expense }) => {
      try {
        const updatedExpense = await Expense.findOneAndUpdate({ id }, expense, {
          new: true,
        });
        return updatedExpense;
      } catch (error) {
        console.log(error);
      }
    },
    removeExpense: async (_, { id }) => {
      try {
        const removedExpense = await Expense.findOneAndDelete({ id });
        return removedExpense;
      } catch (error) {
        console.log(error);
      }
    },

    // User
    registerUser: async (_, { user }) => {
      try {
        const password = await hashPassword(user.password);
        user.password = password;
        const newUser = await User.create(user);
        return newUser;
      } catch (error) {
        console.log(error);
      }
    },

    loginUser: async (_, { user }) => {
      try {
        const loginUser = await User.findOne({ username: user?.username });
        loginUser;
        if (loginUser != null) {
          const password = await verifyPassword(
            user.password,
            loginUser.password
          );
          if (password) {
            const token = jwt.sign(
              { username: user?.username },
              process.env.JWT_SECRET,
              { expiresIn: "10h" }
            );
            return { user: loginUser, token, message: "Sucessfully logged in" };
          } else {
            throw new AuthenticationError("Incorrect Password");
          }
        } else {
          throw new AuthenticationError("Incorrect Username");
        }
      } catch (error) {
        console.log(error);
      }
    },

    updateUser: async (_, { user }) => {
      try {
        const updatedExpense = await User.findOneAndUpdate(
          { username: user?.username },
          user,
          {
            new: true,
          }
        );
        return updatedExpense;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
