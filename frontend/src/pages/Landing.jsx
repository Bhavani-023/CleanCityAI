import { useNavigate } from "react-router-dom";

export default function Landing() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-gray-800">

        <h1 className="text-3xl font-bold text-cyan-400">
          CleanCityAI
        </h1>

        <div className="flex gap-8 items-center">

          <button
            onClick={() => navigate("/login")}
            className="hover:text-cyan-400"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-cyan-500 px-5 py-2 rounded-xl hover:bg-cyan-600"
          >
            Dashboard
          </button>

        </div>

      </nav>

      {/* Hero */}
      <div className="flex flex-col items-center justify-center text-center pt-32 px-6">

        <h1 className="text-7xl font-bold leading-tight max-w-5xl">

          AI Powered <br />

          Smart City <span className="text-cyan-400">Complaint System</span>

        </h1>

        <p className="text-gray-400 text-xl mt-8 max-w-2xl leading-relaxed">

          Report garbage issues, monitor complaints,
          and build cleaner cities with intelligent automation.

        </p>

        <div className="flex gap-6 mt-12">

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg shadow-cyan-500/30"
          >
            Get Started
          </button>

          <button className="border border-gray-700 hover:border-cyan-400 px-8 py-4 rounded-2xl text-lg">
            Learn More
          </button>

        </div>

      </div>

      {/* Features */}
      <div className="grid grid-cols-3 gap-8 px-16 mt-28 pb-20">

        <div className="bg-white/5 p-8 rounded-3xl border border-gray-800 backdrop-blur-lg hover:scale-105 transition">

          <h2 className="text-2xl font-bold text-cyan-400 mb-4">
            AI Detection
          </h2>

          <p className="text-gray-400">
            Automatically analyze garbage images and detect severity.
          </p>

        </div>

        <div className="bg-white/5 p-8 rounded-3xl border border-gray-800 backdrop-blur-lg hover:scale-105 transition">

          <h2 className="text-2xl font-bold text-purple-400 mb-4">
            Real-Time Tracking
          </h2>

          <p className="text-gray-400">
            Track complaints live with smart municipality updates.
          </p>

        </div>

        <div className="bg-white/5 p-8 rounded-3xl border border-gray-800 backdrop-blur-lg hover:scale-105 transition">

          <h2 className="text-2xl font-bold text-green-400 mb-4">
            Smart Analytics
          </h2>

          <p className="text-gray-400">
            Generate insights for city cleanliness and waste management.
          </p>

        </div>

      </div>

    </div>
  );
}