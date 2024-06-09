import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UpdateExpenseData, UpdateExpenseVars } from "../interface/expense";
import { GET_EXPENSE_LIST, UPDATE_EXPENSE } from "../service/graphql/expense";
import { formatDate } from "../utils/utils";

const GET_EXPENSE = gql`
  query GetExpenseByID($id: Int!) {
    getExpenseByID(id: $id) {
      name
      date
      type
      tag
      description
      amount
      recurring
      paymentMethod
    }
  }
`;

const UpdateExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, error } = useQuery(GET_EXPENSE, {
    variables: { id: id ? parseInt(id) : 0 },
    onCompleted: (data) => {
      if (data && data.getExpenseByID) {
        formik.setValues(data.getExpenseByID);
      }
    },
  });

  const [updateExpense] = useMutation<UpdateExpenseData, UpdateExpenseVars>(
    UPDATE_EXPENSE,
    {
      refetchQueries: [{ query: GET_EXPENSE_LIST }],
      onCompleted: () => navigate("/expense"),
    }
  );

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    type: Yup.string()
      .oneOf(["expense", "income"])
      .required("Type is required"),
    date: Yup.date().required("Date is required"),
    tag: Yup.string().required("Tag is required"),
    description: Yup.string().required("Description is required"),
    amount: Yup.number()
      .required("Amount is required")
      .min(0, "Amount must be positive"),
    paymentMethod: Yup.string().required("Payment Method is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      date: "",
      type: "expense",
      tag: "",
      description: "",
      amount: 0,
      recurring: false,
      paymentMethod: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (id) {
        updateExpense({
          variables: {
            expense: values,
            id: parseInt(id),
          },
        });
      }
    },
    enableReinitialize: true,
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center mt-5 font-bold text-[25px] uppercase text-blue-500">
        Update Expense
      </h1>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500">{formik.errors.name}</div>
            ) : null}
          </div>

          <div>
            <label className="block text-gray-700">Type</label>
            <select
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            {formik.touched.type && formik.errors.type ? (
              <div className="text-red-500">{formik.errors.type}</div>
            ) : null}
          </div>

          <div>
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={formatDate(formik.values.date)}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
            {formik.touched.date && formik.errors.date ? (
              <div className="text-red-500">{formik.errors.date}</div>
            ) : null}
          </div>

          <div>
            <label className="block text-gray-700">Tag</label>
            <input
              type="text"
              name="tag"
              placeholder="Tag"
              value={formik.values.tag}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
            {formik.touched.tag && formik.errors.tag ? (
              <div className="text-red-500">{formik.errors.tag}</div>
            ) : null}
          </div>

          <div>
            <label className="block text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500">{formik.errors.description}</div>
            ) : null}
          </div>

          <div>
            <label className="block text-gray-700">Amount</label>
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formik.values.amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
            {formik.touched.amount && formik.errors.amount ? (
              <div className="text-red-500">{formik.errors.amount}</div>
            ) : null}
          </div>

          <div>
            <label className="block text-gray-700">Payment Method</label>
            <input
              type="text"
              name="paymentMethod"
              placeholder="Payment Method"
              value={formik.values.paymentMethod}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
            {formik.touched.paymentMethod && formik.errors.paymentMethod ? (
              <div className="text-red-500">{formik.errors.paymentMethod}</div>
            ) : null}
          </div>
          <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateExpense;
