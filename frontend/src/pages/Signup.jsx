import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black via-purple-950 to-black">

      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl w-[400px] shadow-2xl">

        <h1 className="text-4xl font-bold text-white mb-8">
          Signup
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-4 mb-4 rounded-xl bg-white/10 text-white outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 mb-4 rounded-xl bg-white/10 text-white outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 mb-6 rounded-xl bg-white/10 text-white outline-none"
        />

        <button
          onClick={() => navigate("/")}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-xl font-semibold"
        >
          Create Account
        </button>

      </div>
    </div>
  );
}