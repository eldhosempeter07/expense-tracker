import CreateExpense from "./pages/createExpense";
import ExpenseList from "./pages/expenseList";
import ExpenseDetails from "./pages/expense";

import UpdateExpense from "./pages/updateExpense";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ExpenseList />} />
        <Route path="/expense">
          <Route index element={<ExpenseList />} />
          <Route path="create" element={<CreateExpense />} />
          <Route path="edit/:id" element={<UpdateExpense />} />
          <Route path="view/:id" element={<ExpenseDetails />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
