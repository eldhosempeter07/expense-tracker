import { useMutation, useQuery } from "@apollo/client";
import { DELETE_EXPENSE, GET_EXPENSE_LIST } from "../service/graphql/expense";
import { Expense } from "../interface/expense";
import { Link } from "react-router-dom";

const ExpenseList = () => {
  const { data, loading, error } = useQuery(GET_EXPENSE_LIST);
  const [removeExpense] = useMutation(DELETE_EXPENSE, {
    onCompleted: () => alert("Expense deleted successfully!"),
    refetchQueries: [{ query: GET_EXPENSE_LIST }],
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

  const handleDelete = (id: number) => {
    removeExpense({
      variables: {
        id,
      },
    });
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-center mt-10 font-bold text-2xl uppercase text-blue-500">
        Transaction List
      </h1>
      <div className="mt-8 ">
        {data?.getExpenses?.map((expense: Expense) => (
          <div
            key={expense.id}
            className="max-w-5xl mx-auto border border-cyan-500 rounded-lg my-7 p-8 bg-white shadow-md"
          >
            <p
              className={`text-xl font-semibold  ${
                expense.type === "expense" ? "text-red-500" : "text-green-500"
              }`}
            >
              {expense.name}
            </p>
            <p className="text-lg text-gray-600">Amount: ${expense.amount}</p>
            <p className="text-lg text-gray-600">
              Description: {expense.description}
            </p>
            <p className="text-lg text-gray-600">Tag: {expense.tag}</p>
            <p className="text-lg text-gray-600">Type: {expense.type}</p>
            <Link
              className="bg-green-600 hover:bg-green-700 py-[9px] px-5 mr-3 rounded text-white"
              to={`/expense/view/${expense.id}`}
            >
              View
            </Link>
            <Link
              className="bg-blue-600 hover:bg-blue-700 py-[9px] px-5 mr-3 rounded text-white"
              to={`/expense/edit/${expense.id}`}
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(expense.id)}
              className="mt-3 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Delete
            </button>
            <p className="text-end text-blue-500 font-bold">
              {expense?.created?.toString().slice(0, 10)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
