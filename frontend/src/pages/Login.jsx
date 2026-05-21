import { useState } from "react";
import toast from "react-hot-toast";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import API from "../api";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // =========================
  // LOGIN FUNCTION
  // =========================

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/login",
        {
          email,
          password,
        }
      );

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        response.data.access_token
      );

      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      toast.success("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.detail ||
        "Login Failed"
      );

    }

  };

  return (

    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-6">

      {/* LOGIN CARD */}

      <form
        onSubmit={handleLogin}
        className="w-full max-w-[450px] bg-white/5 border border-white/10 rounded-[35px] p-10 backdrop-blur-2xl shadow-2xl shadow-cyan-500/10"
      >

        {/* TITLE */}

        <div className="text-center mb-10">

          <h1 className="text-5xl font-extrabold text-cyan-400">

            Welcome Back

          </h1>

          <p className="text-gray-400 mt-4 text-lg">

            Login to access CleanCityAI Dashboard

          </p>

        </div>

        {/* EMAIL */}

        <div className="mb-6">

          <label className="text-gray-300 text-sm">

            Email Address

          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 p-4 rounded-2xl bg-black/30 border border-white/10 text-white outline-none focus:border-cyan-400 transition"
            required
          />

        </div>

        {/* PASSWORD */}

        <div className="mb-8">

          <label className="text-gray-300 text-sm">

            Password

          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-2 p-4 rounded-2xl bg-black/30 border border-white/10 text-white outline-none focus:border-cyan-400 transition"
            required
          />

        </div>

        {/* LOGIN BUTTON */}

        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 transition duration-300 p-4 rounded-2xl text-xl font-bold shadow-lg shadow-cyan-500/30"
        >

          Login

        </button>

        {/* REGISTER LINK */}

        <div className="text-center mt-6">

          <p className="text-gray-400">

            Don't have an account?

            <Link
              to="/register"
              className="text-cyan-400 ml-2 hover:underline"
            >

              Create Account

            </Link>

          </p>

        </div>

      </form>

    </div>

  );

}