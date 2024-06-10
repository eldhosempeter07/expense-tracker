import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CreateExpense from "./pages/createExpense";
import ExpenseList from "./pages/expenseList";
import ExpenseDetails from "./pages/expense";

import UpdateExpense from "./pages/updateExpense";
import Navbar from "./components/navbar";
import Register from "./pages/register";
import Login from "./pages/login";
import PrivateRoute from "./utils/privateRoute";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<PrivateRoute component={Dashboard} />} />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/login"
          // element={<Login />}
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="dashboard"
          element={<PrivateRoute component={Dashboard} />}
        />

        <Route path="profile" element={<PrivateRoute component={Profile} />} />
        <Route path="/expense">
          <Route index element={<PrivateRoute component={ExpenseList} />} />

          <Route
            path="create"
            element={<PrivateRoute component={CreateExpense} />}
          />
          <Route
            path="edit/:id"
            element={<PrivateRoute component={UpdateExpense} />}
          />
          <Route
            path="view/:id"
            element={<PrivateRoute component={ExpenseDetails} />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
