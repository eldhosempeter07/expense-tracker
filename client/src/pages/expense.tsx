import { gql, useQuery } from "@apollo/client";
import { Expense } from "../interface/expense";
import { useParams } from "react-router-dom";

const ExpenseDetails = () => {
  const { id } = useParams();

  const GET_EXPENSE = gql`
    query GetExpenseByID($id: Int!) {
      getExpenseByID(id: $id) {
        id
        name
        date
        type
        tag
        description
        amount
        recurring
        paymentMethod
        created
      }
    }
  `;

  const { data, loading, error } = useQuery(GET_EXPENSE, {
    variables: { id: id && parseInt(id) },
  });

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

  const expense: Expense = data?.getExpenseByID;
  return (
    <div>
      <h1 className="text-center mt-5 font-bold text-2xl uppercase text-blue-500">
        Transaction Details
      </h1>
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        {expense && (
          <ul className="space-y-4">
            <li className="text-xl font-semibold text-blue-500 text-center">
              {expense.name}
            </li>
            <li className="text-lg text-gray-600">
              <span className="font-semibold">Description: </span>
              {expense.description}
            </li>
            <li className="text-lg text-gray-600">
              <span className="font-semibold">Amount: </span>${expense.amount}
            </li>
            <li className="text-lg text-gray-600">
              <span className="font-semibold">Tag: </span>
              {expense.tag}
            </li>
            <li className="text-lg text-gray-600">
              <span className="font-semibold">Type: </span>
              {expense.type}
            </li>
            <li className="text-lg text-gray-600">
              <span className="font-semibold">Date: </span>
              {new Date(expense.date).toLocaleDateString()}
            </li>
            <li className="text-lg text-gray-600">
              <span className="font-semibold">Payment Method: </span>
              {expense.paymentMethod}
            </li>
            <li className="text-lg text-gray-600">
              <span className="font-semibold">Recurring: </span>
              {expense.recurring ? "Yes" : "No"}
            </li>
            {/* <li className="text-lg text-gray-600">
              <span className="font-semibold">Created: </span>
              {new Date(expense.created).toLocaleDateString()}
            </li> */}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExpenseDetails;
