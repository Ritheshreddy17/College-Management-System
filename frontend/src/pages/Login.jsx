import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      username === "admin" &&
      password === "admin123"
    ) {
      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      navigate("/");
    } else {
      alert(
        "Invalid Username or Password"
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full border p-3 rounded mb-4"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;