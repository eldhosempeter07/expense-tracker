import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold uppercase">
          Expense Tracker
        </Link>
        <div className="flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-200">
            Home
          </Link>
          <Link to="/expense" className="text-white hover:text-gray-200">
            Expenses
          </Link>
          <Link to="/expense/create" className="text-white hover:text-gray-200">
            Create Expense
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
