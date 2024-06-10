import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CreateExpenseData, CreateExpenseVars } from "../interface/expense";
import { CREATE_EXPENSE, GET_EXPENSE_LIST } from "../service/graphql/expense";

const CreateExpense = () => {
  const navigate = useNavigate();

  const [createExpense, { error }] = useMutation<
    CreateExpenseData,
    CreateExpenseVars
  >(CREATE_EXPENSE, {
    refetchQueries: [{ query: GET_EXPENSE_LIST }],
    onCompleted: () => navigate("/expense"),
  });

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
      type: "expense",
      date: "",
      tag: "",
      description: "",
      amount: 0,
      paymentMethod: "",
    },
    validationSchema,
    onSubmit: (values) => {
      createExpense({
        variables: {
          expense: { ...values, recurring: false },
        },
      });
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-center mt-5 font-bold text-[25px] uppercase text-blue-500">
        Create Transaction
      </h1>
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        {error && (
          <p className="text-red-500 mb-4">Error occurred: {error.message}</p>
        )}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.type}
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.date}
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tag}
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.amount}
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.paymentMethod}
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

export default CreateExpense;
