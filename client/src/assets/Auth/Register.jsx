import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  const handleRegister = async () => {
    console.log(username, email, mobile, password);
    if (username === "" || email === "" || mobile === "" || password === "") {
      alert("please fill all fields");
    } else {
      const res = await axios.post("http://localhost:8000/api/auth/register", {
        username,
        email,
        mobile,
        password,
      });
      alert("Account created successfully");
      // console.log(res.data);

      if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data._id));
        Navigate("/dashboard");
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
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
        <div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-600 text-sm font-medium"
            >
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
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
              htmlFor="mobile"
              className="block text-gray-600 text-sm font-medium"
            >
              Mobile Number
            </label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              name="mobile"
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
            onClick={handleRegister}
            className="w-full bg-[#000] text-white p-2 rounded-md"
          >
            Register
          </button>
          <h1 className="text-center mt-2">
            Already a user ?{" "}
            <span
              className="cursor-pointer"
              onClick={() => {
                Navigate("/login");
              }}
            >
              Login
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Register;
