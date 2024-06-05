export type Expense = {
  id: number;
  name: string;
  date: Date;
  type: string;
  tag: string;
  description?: string;
  amount: number;
  recurring?: boolean;
  paymentMethod: string;
  created?: Date;
};

export type CreateExpenseData = {
  createExpense: Expense;
};

export type InputExpense = {
  name: string;
  type: string;
  tag: string;
  description: string;
  amount: number;
  recurring: boolean;
  paymentMethod: string;
};

export type CreateExpenseVars = {
  expense: InputExpense;
};

export type UpdateExpenseData = {
  updateExpense: Expense;
};

export type UpdateExpenseVars = {
  expense: InputExpense;
  id: number;
};
