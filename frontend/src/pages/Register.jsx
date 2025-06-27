import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/users/register", { username,email, password });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-gray-100 p-4">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md transition-all duration-300 hover:shadow-2xl animate-fade-in"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create Your Account
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm animate-shake">
            {error}
          </div>
        )}

        <div className="mb-4 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              value={username}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>

          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
        >
          Register
        </button>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-green-600 font-medium hover:underline transition-colors"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;