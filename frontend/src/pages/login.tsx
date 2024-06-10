import { useState } from "react";
import { LOGIN_USER } from "../service/graphql/user";
import { useApolloClient, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";

const Login = (): JSX.Element => {
  const client = useApolloClient();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loginUser] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.loginUser.token);
      if (localStorage.getItem("token") != null) {
        setError("");
        navigate("/");
      }
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    client.resetStore();
    try {
      await loginUser({ variables: { user: { username, password } } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h4 className="animate font-bold text-blue-500 text-[22px] uppercase text-center mt-5">
        Login
      </h4>
      <div className="max-w-lg mx-auto mt-10 px-10 py-16 border rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              className="w-full my-3 p-2 border border-gray-300 rounded-md"
              type="text"
              name="username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              className="w-full my-3 p-2 border border-gray-300 rounded-md"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="password"
            />
          </div>
          {error !== "" ? (
            <p className="text-red-500 font-semibold text-center">{error}</p>
          ) : null}
          <div className="text-center">
            <Link to="/register">Create an account</Link>
          </div>
          <button className="w-full bg-blue-500 mt-2 rounded text-white p-2 hover:bg-b ">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
