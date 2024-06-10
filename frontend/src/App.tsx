import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";

const CreateExpense = lazy(() => import("./pages/createExpense"));
const ExpenseList = lazy(() => import("./pages/expenseList"));
const ExpenseDetails = lazy(() => import("./pages/expense"));
const UpdateExpense = lazy(() => import("./pages/updateExpense"));
const Register = lazy(() => import("./pages/register"));
const Login = lazy(() => import("./pages/login"));
const Profile = lazy(() => import("./pages/profile"));
const Dashboard = lazy(() => import("./pages/dashboard"));

import PrivateRoute from "./utils/privateRoute";

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<PrivateRoute component={Dashboard} />} />
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/" />
            ) : (
              <Suspense fallback={<div>Loading...</div>}>
                <Register />
              </Suspense>
            )
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" />
            ) : (
              <Suspense fallback={<div>Loading...</div>}>
                <Login />
              </Suspense>
            )
          }
        />
        <Route
          path="dashboard"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PrivateRoute component={Dashboard} />
            </Suspense>
          }
        />

        <Route
          path="profile"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PrivateRoute component={Profile} />
            </Suspense>
          }
        />
        <Route path="/expense">
          <Route
            index
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PrivateRoute component={ExpenseList} />
              </Suspense>
            }
          />

          <Route
            path="create"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PrivateRoute component={CreateExpense} />
              </Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PrivateRoute component={UpdateExpense} />
              </Suspense>
            }
          />
          <Route
            path="view/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PrivateRoute component={ExpenseDetails} />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
