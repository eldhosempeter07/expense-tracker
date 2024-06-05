import { useState } from "react";
import {
  InputExpense,
  UpdateExpenseData,
  UpdateExpenseVars,
} from "../interface/expense";
import { gql, useMutation, useQuery } from "@apollo/client";
import { GET_EXPENSE_LIST, UPDATE_EXPENSE } from "../service/graphql/expense";
import { useNavigate, useParams } from "react-router-dom";

const UpdateExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const GET_EXPENSE = gql`
    query GetExpenseByID($id: Int!) {
      getExpenseByID(id: $id) {
        name
        date
        type
        tag
        description
        amount
        recurring
        paymentMethod
      }
    }
  `;

  const [expense, setExpense] = useState<InputExpense>({
    name: "",
    type: "",
    tag: "",
    description: "",
    amount: 0,
    recurring: false,
    paymentMethod: "",
  });

  const {
    data: expenses,
    loading,
    error,
  } = useQuery(GET_EXPENSE, {
    variables: { id: id && parseInt(id) },
    onCompleted: () => {
      setExpense(expenses?.getExpenseByID);
    },
  });

  const [updateExpense] = useMutation<UpdateExpenseData, UpdateExpenseVars>(
    UPDATE_EXPENSE,
    {
      refetchQueries: [{ query: GET_EXPENSE_LIST }],
      onCompleted: () => navigate("/expense"),
    }
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error.message}</p>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExpense((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id) {
      updateExpense({
        variables: {
          expense: expense,
          id: parseInt(id),
        },
      });
    }
  };

  return (
    <div>
      <h1 className="text-center mt-5 font-bold text-[25px] uppercase text-blue-500">
        Update Expense
      </h1>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={expense.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700">Type</label>
            <input
              type="text"
              name="type"
              placeholder="Type"
              value={expense.type}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700">Tag</label>
            <input
              type="text"
              name="tag"
              placeholder="Tag"
              value={expense.tag}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={expense.description}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700">Amount</label>
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={expense.amount}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700">Payment Method</label>
            <input
              type="text"
              name="paymentMethod"
              placeholder="Payment Method"
              value={expense.paymentMethod}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateExpense;
