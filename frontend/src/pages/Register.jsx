import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

export default function Register() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post("/register", {
        email,
        password,
      });

      console.log(response.data);

      toast.success("Account Created");

      navigate("/login");

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.detail || "Registration Failed"
      );

    }
  };

  return (

    <div className="min-h-screen bg-[#050816] flex items-center justify-center">

      <form
        onSubmit={handleRegister}
        className="bg-[#111827] p-10 rounded-3xl w-[400px]"
      >

        <h1 className="text-5xl text-cyan-400 font-bold mb-8">
          Create Account
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
          Create Account
        </button>

        <div className="mt-5 text-white">
          Already have account?
          <Link to="/login" className="text-cyan-400 ml-2">
            Login
          </Link>
        </div>

      </form>

    </div>
  );
}