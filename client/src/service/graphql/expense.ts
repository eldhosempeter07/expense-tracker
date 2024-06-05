import { gql } from "@apollo/client";

export const GET_EXPENSE_LIST = gql`
  query GetExpenseList {
    getExpenses {
      type
      id
      name
      date
      tag
      description
      amount
      recurring
      paymentMethod
      created
    }
  }
`;

export const CREATE_EXPENSE = gql`
  mutation CreateExpense($expense: InputExpense!) {
    createExpense(expense: $expense) {
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

export const UPDATE_EXPENSE = gql`
  mutation UpdateExpense($id: Int!, $expense: InputExpense!) {
    updateExpense(id: $id, expense: $expense) {
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

export const DELETE_EXPENSE = gql`
  mutation DeleteExpense($id: Int!) {
    removeExpense(id: $id) {
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
