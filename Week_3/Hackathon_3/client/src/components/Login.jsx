import { useState } from "react";
import { loginUser } from "../api/auth";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser(email, password);

      localStorage.setItem("token", data.token);

      alert("Login successful!");
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-[400px] bg-white border border-gray-300 rounded-lg shadow-lg p-6">
        <h1 className="text-black text-2xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
        />

        <button
          disabled={loading}
          className={`w-full h-10 bg-black text-white font-semibold rounded-md ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
          }`}
          onClick={handleLogin}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-gray-600 text-sm mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-black font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
