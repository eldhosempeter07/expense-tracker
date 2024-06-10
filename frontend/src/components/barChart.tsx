import { useQuery } from "@apollo/client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { GET_EXPENSE_CHART } from "../service/graphql/expense";

const CustomChart: React.FC = () => {
  const { data, loading, error } = useQuery(GET_EXPENSE_CHART);

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

  return (
    <div className="mt-10 bg-white p-4">
      <h4 className="text-center font-semibold mb-10 text-[22px]">
        Monthly Expenditure
      </h4>

      <div>
        <BarChart width={650} height={400} data={data?.getExpenseChart}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#15803D" name="Income" />
          <Bar dataKey="expense" fill="#ef4444" name="Expense" />
        </BarChart>
      </div>
    </div>
  );
};

export default CustomChart;
