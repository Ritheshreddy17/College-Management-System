import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaUniversity } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "admin");
      navigate("/");
    } else if (username === "faculty" && password === "faculty123") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "faculty");
      navigate("/");
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #1e1b4b 100%)" }}
    >
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Top accent bar */}
          <div className="h-1.5 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500" />

          <div className="px-10 py-10">

            {/* Brand */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-4">
                <FaUniversity size={32} className="text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-slate-800">College Management</h1>
              <p className="text-slate-400 text-sm mt-1">Sign in to your account</p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 px-4 py-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Username</label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
                  <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border border-slate-200 bg-slate-50 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Password</label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-slate-200 bg-slate-50 rounded-xl py-3 pl-11 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                  >
                    {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200 mt-2"
              >
                Sign In
              </button>

            </form>

            {/* Credentials hint */}
            <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Demo Credentials</p>
              <div className="flex gap-4 text-sm text-slate-600">
                <span>Admin: <strong className="text-slate-800">admin</strong></span>
                <span>Faculty: <strong className="text-slate-800">faculty</strong></span>
              </div>
            </div>

          </div>
        </div>

        <p className="text-center text-blue-200/60 text-xs mt-6">© 2026 EduAdmin Pro</p>
      </div>
    </div>
  );
}

export default Login;