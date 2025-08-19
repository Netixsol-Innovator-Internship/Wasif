import { useForm } from "react-hook-form";
import { signupUser } from "../apis/auth";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const res = await signupUser(data.name, data.email, data.password);

      alert("Signup successful!");
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-[400px] bg-gray-800 rounded-lg shadow-lg p-6 drop-shadow-[0_0_8px_#01ff9d]">
        <h1 className="text-white text-2xl font-bold mb-6 text-center">
          Sign Up
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full mb-2 p-2 bg-gray-600 text-white rounded-md focus:outline-none"
            {...register("name", { required: "Full name is required" })}
          />
          {errors.name && (
            <p className="text-red-400 text-sm mb-2">{errors.name.message}</p>
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-2 p-2 bg-gray-600 text-white rounded-md focus:outline-none"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-400 text-sm mb-2">{errors.email.message}</p>
          )}

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-2 p-2 bg-gray-600 text-white rounded-md focus:outline-none"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-400 text-sm mb-2">
              {errors.password.message}
            </p>
          )}

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full mb-2 p-2 bg-gray-600 text-white rounded-md focus:outline-none"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-400 text-sm mb-2">
              {errors.confirmPassword.message}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full h-10 bg-gradient-to-bl from-[#6a00f4] to-cyan-700 text-white font-semibold rounded-sm ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
