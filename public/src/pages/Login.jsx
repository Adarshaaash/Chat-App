import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "" || password === "") {
      toast.error("Username and Password are required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, { username, password });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      } else if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white p-6">
        <form
          className="w-full max-w-md p-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-4xl font-extrabold uppercase tracking-wider">
              CHAT-APP
            </h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            className="w-full p-4 mb-4 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="w-full p-4 mb-6 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full p-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-bold text-lg transition duration-300"
          >
            Log In
          </button>
          <span className="mt-4 text-gray-300">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-400 hover:text-blue-600 transition duration-300"
            >
              Create One
            </Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
