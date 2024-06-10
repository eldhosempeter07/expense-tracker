import { useMutation, useQuery } from "@apollo/client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GET_USER_INFO, UPDATE_USER } from "../service/graphql/user";
import { useState } from "react";

const Profile = () => {
  const [success, setSuccess] = useState(false);

  const { loading, error } = useQuery(GET_USER_INFO, {
    onCompleted: (data) => {
      if (data && data.getUserInfo) {
        formik.setValues(data.getUserInfo);
      }
    },
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_USER_INFO }],
    onCompleted: () => setSuccess(true),
  });

  const validationSchema = Yup.object({
    username: Yup.string().required("username is required"),
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      name: "",
      email: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      updateUser({
        variables: {
          user: values,
        },
      });
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
      {success && (
        <p className="text-green-500 text-lg text-center mt-5">
          Updated Successfully
        </p>
      )}
      <h1 className="text-center mt-5 font-bold text-[25px] uppercase text-blue-500">
        Profile
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
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500">{formik.errors.name}</div>
            )}
          </div>
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="username"
              disabled
              placeholder="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
            {formik.touched.username && formik.errors.username && (
              <div className="text-red-500">{formik.errors.username}</div>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500">{formik.errors.email}</div>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-red-500">{formik.errors.phone}</div>
            )}
          </div>

          <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
