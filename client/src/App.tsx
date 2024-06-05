import CreateExpense from "./pages/createExpense";
import ExpenseList from "./pages/expenseList";
import ExpenseDetails from "./pages/expense";

import UpdateExpense from "./pages/updateExpense";

function App() {
  return (
    <>
      <ExpenseList />
      <CreateExpense />
      <ExpenseDetails />
      <UpdateExpense />
    </>
  );
}

export default App;
