import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../redux/apiSlice";
import { useForm } from "react-hook-form";

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [signup, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await signup({
        name: data.name,
        email: data.email,
        password: data.password,
      }).unwrap();

      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      alert(err?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-[400px] bg-white border border-gray-300 rounded-lg shadow-lg p-6">
        <h1 className="text-black text-2xl font-bold mb-6 text-center">
          Sign Up
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
            {...register("name", { required: "Full name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mb-2">{errors.name.message}</p>
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
          )}

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-2">
              {errors.password.message}
            </p>
          )}

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mb-2">
              {errors.confirmPassword.message}
            </p>
          )}

          {/* Button */}
          <button
            disabled={isLoading}
            type="submit"
            className={`w-full h-10 bg-black text-white font-semibold rounded-md ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
            }`}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-gray-600 text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
