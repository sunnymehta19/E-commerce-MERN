import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "../../utils/toast";
import { loginUser } from "../../store/auth-slice/authSlice";

const initialState = {
  email: "",
  password: ""
}


const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { isLoading } = useSelector((state) => state.auth)

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (formData) => {
    try {
      const response = await dispatch(loginUser(formData)).unwrap()
      showToast.success(response.message);
      navigate("/shop");

    } catch (errorMessage) {
      showToast.error(errorMessage)
    }

  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Welcome back
        </h2>
        <p className="text-gray-500 mt-1 text-sm">
          Login to continue shopping
        </p>
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

        {/* Password + Show/Hide */}
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
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
              className="mt-1 w-full rounded-lg bg-gray-100 px-3 py-2 pr-10 text-sm
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
          disabled={isLoading}
          className="
            w-full rounded-lg bg-black text-white py-2.5
            text-sm font-medium cursor-pointer
            hover:bg-gray-900 transition
            disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500">
          Don’t have an account?{" "}

          <Link
            to="/auth/register"
            className="text-black font-medium hover:underline"
          >
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
