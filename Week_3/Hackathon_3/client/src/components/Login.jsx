import { useNavigate, Link } from "react-router-dom";
import { useLoginMutation } from "../redux/apiSlice";
import { useForm } from "react-hook-form";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await login(data).unwrap();

      // Check if user is blocked
      if (response?.user?.isBlocked) {
        alert("Your account has been blocked. Please contact support.");
        return;
      }

      // Save token & user
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      alert("Login successful!");

      if (
        response.user.role === "superAdmin" ||
        response.user.role === "admin"
      ) {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-[400px] bg-white border border-gray-300 rounded-lg shadow-lg p-6">
        <h1 className="text-black text-2xl font-bold mb-6 text-center">
          Login
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
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

          {/* Button */}
          <button
            disabled={isLoading}
            type="submit"
            className={`w-full h-10 bg-black text-white font-semibold rounded-md ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-gray-600 text-sm mt-4 text-center">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-black font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
