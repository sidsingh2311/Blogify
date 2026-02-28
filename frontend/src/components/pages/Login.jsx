import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../common/axiosConfig";
import { AuthContext } from "../context/Auth";
import toast from "react-hot-toast";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post("/users/login", formData);

      if (response?.success) {
        const userInfo = {
          token: response.data.accessToken,
        };

        localStorage.setItem("mern-blog", JSON.stringify(userInfo));

        login(userInfo);

        toast.success(response.data.message || "Login successful");

        navigate("/account/profile");
      } else {
        toast.error(response?.data?.message || "Login failed");
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Email
            </label>

            <input
              {...register("email", {
                required: "The email field is required",
                pattern: {
                  value:
                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="Enter Email"
              type="text"
              className="focus:outline-none w-full border border-gray-200 py-2 px-4 rounded-lg"
            />

            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Password
            </label>

            <input
              {...register("password", {
                required: "The password field is required",
              })}
              placeholder="Enter Password"
              type="password"
              className="focus:outline-none w-full border border-gray-200 py-2 px-4 rounded-lg"
            />

            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="focus:outline-none w-full text-white bg-primary-color py-2 px-4 rounded-lg hover:bg-secondary-color transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-md text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-md text-primary-color hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;