import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    setTimeout(() => {
      console.log("Register Data:", data);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight pb-2">
          Create account
        </h2>

      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          bg-white/90 backdrop-blur
          border border-gray-200
          rounded-xl
          shadow-md
          px-5 py-6 sm:px-6
          space-y-4
        "
      >
        {/* Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter Name"
            name="username"
            {...register("name", { required: "Name is required" })}
            className="mt-1 w-full rounded-lg bg-gray-100 px-3 py-2 text-sm 
              focus:ring-black"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">
              {errors.name.message}
            </p>
          )}
        </div>


        {/* Mobile */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Mobile Number
          </label>
          <input
            type="tel"
            placeholder="Enter Mobile Number"
            name="mobilenumber"
            {...register("mobile", {
              required: "Mobile number is required",
              minLength: {
                value: 10,
                message: "Enter valid mobile number",
              },
            })}
            className="mt-1 w-full rounded-lg px-3 py-2 text-sm bg-gray-100 
               focus:ring-black"
          />
          {errors.mobile && (
            <p className="text-red-500 text-xs mt-1">
              {errors.mobile.message}
            </p>
          )}
        </div>


        {/* Email */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            className="mt-1 w-full rounded-lg bg-gray-100 px-3 py-2 text-sm
               focus:ring-black"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">
              {errors.email.message}
            </p>
          )}
        </div>


        {/* Password */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              name="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Minimum 8 characters",
                },
              })}
              className="mt-1 w-full rounded-lg  px-3 bg-gray-100 py-2 pr-10 text-sm
                 focus:ring-black"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 text-xs text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit with Loading */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full rounded-lg bg-black text-white py-2.5 text-sm font-medium
            hover:bg-gray-900 transition
            disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p className="text-center text-xs text-gray-500">
          Already have an account?{" "}

          <Link
            to="/auth/login"
            className="text-black font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
