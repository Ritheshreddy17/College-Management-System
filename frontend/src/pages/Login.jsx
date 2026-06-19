import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUniversity,
} from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Admin Login
    if (
      username === "admin" &&
      password === "admin123"
    ) {
      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      localStorage.setItem(
        "role",
        "admin"
      );

      navigate("/");
    }

    // Faculty Login
    else if (
      username === "faculty" &&
      password === "faculty123"
    ) {
      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      localStorage.setItem(
        "role",
        "faculty"
      );

      navigate("/");
    }

    else {
      alert(
        "Invalid Username or Password"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 to-slate-900 flex justify-center items-center">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">

        <div className="text-center mb-8">

          <div className="flex justify-center mb-4">
            <FaUniversity
              size={55}
              className="text-blue-600"
            />
          </div>

          <h1 className="text-3xl font-bold text-slate-800">
            College Management
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to continue
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="relative mb-4">

            <FaUser
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

          </div>

          <div className="relative mb-4">

            <FaLock
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-4 top-4 text-gray-500"
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Login
          </button>

        </form>

        <div className="mt-6 text-center text-sm text-gray-500">

          <p>
            Admin :
            <span className="font-semibold">
              {" "}admin
            </span>
          </p>

          <p>
            Faculty :
            <span className="font-semibold">
              {" "}faculty
            </span>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;