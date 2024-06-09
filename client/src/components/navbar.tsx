import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  const navigate = useNavigate();
  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    navigate("/login");
  }, []);

  return (
    <nav className="bg-blue-500 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className=" logo text-white text-lg font-bold uppercase">
          Fin Track
        </Link>
        <div className="flex space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/expense" className="text-white hover:text-gray-200">
                Transactions
              </Link>
              <Link
                to="/expense/create"
                className="text-white hover:text-gray-200"
              >
                Create Transaction
              </Link>
              <Link to="/profile" className="text-white hover:text-gray-200">
                Profile
              </Link>
              <button
                className="text-white hover:text-gray-200"
                onClick={handleLogout}
              >
                Log out
              </button>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
