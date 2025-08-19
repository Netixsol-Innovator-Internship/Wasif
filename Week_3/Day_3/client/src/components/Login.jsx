import { useForm } from "react-hook-form";
import { loginUser } from "../apis/auth";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const res = await loginUser(data.email, data.password);

      localStorage.setItem("token", res.token);

      alert("Login successful!");
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-[400px] bg-gray-800 rounded-lg shadow-lg p-6 drop-shadow-[0_0_8px_#01ff9d]">
        <h1 className="text-white text-2xl font-bold mb-6 text-center">
          Login
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
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

          {/* Password Input */}
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
            <p className="text-red-400 text-sm mb-2">{errors.password.message}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full h-10 bg-gradient-to-bl from-[#6a00f4] to-cyan-700 text-white font-semibold rounded-sm ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-cyan-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
