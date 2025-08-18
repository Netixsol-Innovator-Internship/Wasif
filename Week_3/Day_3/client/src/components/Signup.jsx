import { useState } from "react";
import { signupUser } from "../apis/auth"; 
import { Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const data = await signupUser(name, email, password);

      // localStorage.setItem("token", data.token);

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

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-2 bg-gray-600 text-white rounded-md focus:outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 bg-gray-600 text-white rounded-md focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 bg-gray-600 text-white rounded-md focus:outline-none"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full mb-4 p-2 bg-gray-600 text-white rounded-md focus:outline-none"
        />

        <button
          disabled={loading}
          className={`w-full h-10 bg-gradient-to-bl from-[#6a00f4] to-cyan-700 text-white font-semibold rounded-sm ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleSignup}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

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
