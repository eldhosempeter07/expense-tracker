import { useQuery } from "@apollo/client";
import React from "react";
import { PieChart, Pie, Tooltip, Legend, Cell, LabelList } from "recharts";
import { GET_EXPENSE_INCOME } from "../service/graphql/expense";

interface ExpenseIncomeData {
  name: "Income" | "Expense";
  amount: number;
}

interface QueryData {
  getExpenseIncome: ExpenseIncomeData[];
}

const COLORS: { [key in ExpenseIncomeData["name"]]: string } = {
  Income: "#15803D",
  Expense: "#ef4444",
};

const PieCustomChart: React.FC = () => {
  const { data, loading, error } = useQuery<QueryData>(GET_EXPENSE_INCOME);
  data;

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
    <div className="mt-10 h-full bg-white p-4">
      <h4 className="text-center font-semibold mb-10 text-[22px]">
        Yearly Expense / Income
      </h4>
      <PieChart width={400} height={400}>
        <Pie
          data={data?.getExpenseIncome}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
        >
          <LabelList
            dataKey="amount"
            position="right"
            style={{
              fontSize: "15px",
              fontWeight: "200",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          />

          {data?.getExpenseIncome.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry?.name]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieCustomChart;
