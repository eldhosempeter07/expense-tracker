import { Expense } from "../../models/expense.js";
import { generateUniqueId } from "../../utils/utils.js";
import { GraphQLScalarType, Kind } from "graphql";

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
    getExpenses: async () => {
      const expenses = await Expense.find();
      return expenses;
    },
    getExpenseByID: async (_, { id }) => {
      const expense = await Expense.findOne({ id });
      return expense;
    },
  },
  Mutation: {
    createExpense: async (_, { expense }) => {
      expense.id = generateUniqueId();
      const newExpense = await Expense.create(expense);
      return newExpense;
    },
    updateExpense: async (_, { id, expense }) => {
      const updatedExpense = await Expense.findOneAndUpdate({ id }, expense, {
        new: true,
      });
      return updatedExpense;
    },
    removeExpense: async (_, { id }) => {
      const removedExpense = await Expense.findOneAndDelete({ id });
      return removedExpense;
    },
  },
};
