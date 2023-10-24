import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  const handleLogin = async () => {
    if (email === "" || password === "") {
      alert("please fill all fields");
    } else {
      try {
        const res = await axios.post("http://localhost:8000/api/auth/login", {
          email,
          password,
        });
        if (res.data.message === "Login successful") {
          localStorage.setItem("user", JSON.stringify(res.data.user._id));
          Navigate("/dashboard");
        }
      } catch (err) {
        console.log(err);
        if (err.response.data === "User not found!") {
          alert("User not found please register first...");
          Navigate("/");
        }
        if (err.response.data === "Invalid credentials") {
          alert("Invalid credentials");
          setEmail("");
          setPassword("");
        }
      }
    }
  };
  useEffect(() => {
    if (localStorage.getItem("user")) {
      Navigate("/dashboard");
    }
  }, []);
  return (
    <div className="container mx-auto mt-8 ">
      <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 box rounded-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 text-sm font-medium"
            >
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-600 text-sm font-medium"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-[#000] text-white p-2 rounded-md"
          >
            Login
          </button>
          <h1 className="text-center mt-2">
            New user ?{" "}
            <span
              className="cursor-pointer"
              onClick={() => {
                Navigate("/");
              }}
            >
              Signup
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
