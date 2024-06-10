import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { REGISTER_USER } from "../service/graphql/user";

const Register = (): JSX.Element => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const [registerUser] = useMutation(REGISTER_USER, {
    onCompleted: () => navigate("/login"),
    onError: (error) => setValidationError(error.message),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === "" || password === "" || email === "") {
      return setValidationError("All fields are required");
    }
    if (password !== "" && repassword !== password) {
      return setValidationError("Password must match");
    }
    setValidationError("");
    registerUser({
      variables: { user: { username, password, email } },
    });
  };

  return (
    <div className="container">
      <h4 className="font-bold text-blue-500 text-[22px] uppercase text-center mt-5">
        Register
      </h4>
      <div className="max-w-lg mx-auto mt-10 p-8 border rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              className="w-full my-3 p-2 border border-gray-300 rounded-md"
              type="text"
              name="username"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              className="w-full my-3 p-2 border border-gray-300 rounded-md"
              type="text"
              name="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              className="w-full my-3 p-2 border border-gray-300 rounded-md"
              type="password"
              name="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Re-Enter password</label>
            <input
              className="w-full my-3 p-2 border border-gray-300 rounded-md"
              type="password"
              name="re-password"
              placeholder="Re-Enter Password"
              onChange={(e) => setRepassword(e.target.value)}
            />
          </div>
          {validationError ? (
            <p className="text-red-500 font-semibold text-center">
              {validationError}
            </p>
          ) : null}
          <div className="text-center">
            <Link to="/login">Already have account? Login</Link>
          </div>
          <button className="w-full bg-blue-500 mt-2 rounded text-white p-2 hover:bg-b ">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
