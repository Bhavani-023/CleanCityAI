import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post("/login", {
        email,
        password,
      });

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      toast.success("Login Success");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      toast.error("Login Failed");

    }
  };

  return (

    <div className="min-h-screen bg-[#050816] flex items-center justify-center">

      <form
        onSubmit={handleLogin}
        className="bg-[#111827] p-10 rounded-3xl w-[400px]"
      >

        <h1 className="text-5xl text-cyan-400 font-bold mb-8">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 mb-5 rounded-xl bg-black text-white"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 mb-5 rounded-xl bg-black text-white"
          required
        />

        <button
          type="submit"
          className="w-full bg-cyan-500 p-4 rounded-xl text-xl font-bold"
        >
          Login
        </button>

      </form>

    </div>
  );
}