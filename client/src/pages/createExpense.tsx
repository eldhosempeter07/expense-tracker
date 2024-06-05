import { useState } from "react";
import {
  CreateExpenseData,
  CreateExpenseVars,
  InputExpense,
} from "../interface/expense";
import { useMutation } from "@apollo/client";
import { CREATE_EXPENSE, GET_EXPENSE_LIST } from "../service/graphql/expense";
import { useNavigate } from "react-router-dom";

const CreateExpense = () => {
  const navigate = useNavigate();
  const [expense, setExpense] = useState<InputExpense>({
    name: "",
    type: "",
    tag: "",
    description: "",
    amount: 0,
    recurring: false,
    paymentMethod: "",
  });

  const [createExpense, { error }] = useMutation<
    CreateExpenseData,
    CreateExpenseVars
  >(CREATE_EXPENSE, {
    refetchQueries: [{ query: GET_EXPENSE_LIST }],
    onCompleted: () => navigate("/expense"),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExpense((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createExpense({
      variables: {
        expense: expense,
      },
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-center mt-5 font-bold text-[25px] uppercase text-blue-500">
        Add Expense
      </h1>
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        {error && (
          <p className="text-red-500 mb-4">Error occurred: {error.message}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
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
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              name="date"
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

export default CreateExpense;
