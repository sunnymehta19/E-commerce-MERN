import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/slices/authSlice";
import { showToast } from "../../utils/toast";

/* ---------- Spinner Component ---------- */
const FormSpinner = () => (
  <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
);

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux loading state
  const { isLoading } = useSelector((state) => state.auth);

  

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(registerUser(data)).unwrap();

      showToast.success(response.message);
      if (response.success) navigate("/auth/login");
    } catch (err) {
      showToast.error(err || "Registration failed");
    }
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
        className={`
          relative
          bg-white/90 backdrop-blur
          border border-gray-200
          rounded-xl
          shadow-md
          px-5 py-6 sm:px-6
          space-y-4
          transition-opacity duration-300
          ${isLoading ? "opacity-90" : "opacity-100"}
        `}
      >
        <div
          className={`
            absolute inset-0 z-10 flex items-center justify-center rounded-xl
            bg-white/70 backdrop-blur-sm
            transition-opacity duration-300 ease-in-out
            ${isLoading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
          `}
        >
          <FormSpinner />
        </div>

        {/* Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter Name"
            {...register("username", { required: "Name is required" })}
            className="mt-1 w-full capitalize rounded-lg bg-gray-100 px-3 py-2 text-sm focus:ring-black"
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">
              {errors.username.message}
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
            {...register("mobilenumber", {
              required: "Mobile number is required",
              minLength: {
                value: 10,
                message: "Enter valid mobile number",
              },
            })}
            className="mt-1 w-full rounded-lg px-3 py-2 text-sm bg-gray-100 focus:ring-black"
          />
          {errors.mobilenumber && (
            <p className="text-red-500 text-xs mt-1">
              {errors.mobilenumber.message}
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
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            className="mt-1 w-full rounded-lg bg-gray-100 px-3 py-2 text-sm focus:ring-black"
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
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
              className="mt-1 w-full rounded-lg px-3 bg-gray-100 py-2 pr-10 text-sm focus:ring-black"
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

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="
            w-full rounded-lg bg-black text-white py-2.5 text-sm cursor-pointer font-medium
            hover:bg-gray-900 transition
            disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          Create Account
        </button>

        {/* Footer */}
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
