import { useNavigate } from "react-router-dom";

export default function Landing() {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-[#050816] text-white overflow-x-hidden">

      {/* NAVBAR */}

      <nav className="flex justify-between items-center px-4 md:px-10 py-5 md:py-6 border-b border-gray-800">

        {/* LOGO */}

        <h1 className="text-2xl md:text-3xl font-bold text-cyan-400">

          CleanCityAI

        </h1>

        {/* BUTTONS */}

        <div className="flex gap-3 md:gap-8 items-center">

          <button
            onClick={() => navigate("/login")}
            className="hover:text-cyan-400 text-sm md:text-base transition"
          >

            Login

          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-cyan-500 px-4 md:px-5 py-2 rounded-xl hover:bg-cyan-600 text-sm md:text-base transition"
          >

            Dashboard

          </button>

        </div>

      </nav>

      {/* HERO SECTION */}

      <div className="flex flex-col items-center justify-center text-center pt-20 md:pt-32 px-4 md:px-6">

        <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-5xl">

          AI Powered <br />

          Smart City{" "}

          <span className="text-cyan-400">

            Complaint System

          </span>

        </h1>

        <p className="text-gray-400 text-base md:text-xl mt-6 md:mt-8 max-w-2xl leading-relaxed">

          Report garbage issues, monitor complaints,
          and build cleaner cities with intelligent automation.

        </p>

        {/* HERO BUTTONS */}

        <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-10 md:mt-12 w-full md:w-auto">

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-2xl text-base md:text-lg font-semibold shadow-lg shadow-cyan-500/30 transition"
          >

            Get Started

          </button>

          <button className="border border-gray-700 hover:border-cyan-400 px-8 py-4 rounded-2xl text-base md:text-lg transition">

            Learn More

          </button>

        </div>

      </div>

      {/* FEATURES */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-16 mt-20 md:mt-28 pb-20">

        {/* FEATURE 1 */}

        <div className="bg-white/5 p-6 md:p-5 md:p-8 rounded-3xl border border-gray-800 backdrop-blur-lg hover:scale-105 transition duration-300">

          <h2 className="text-xl md:text-2xl font-bold text-cyan-400 mb-4">

            AI Detection

          </h2>

          <p className="text-gray-400 text-sm md:text-base leading-7">

            Automatically analyze garbage images and detect severity.

          </p>

        </div>

        {/* FEATURE 2 */}

        <div className="bg-white/5 p-6 md:p-5 md:p-8 rounded-3xl border border-gray-800 backdrop-blur-lg hover:scale-105 transition duration-300">

          <h2 className="text-xl md:text-2xl font-bold text-purple-400 mb-4">

            Real-Time Tracking

          </h2>

          <p className="text-gray-400 text-sm md:text-base leading-7">

            Track complaints live with smart municipality updates.

          </p>

        </div>

        {/* FEATURE 3 */}

        <div className="bg-white/5 p-6 md:p-5 md:p-8 rounded-3xl border border-gray-800 backdrop-blur-lg hover:scale-105 transition duration-300">

          <h2 className="text-xl md:text-2xl font-bold text-green-400 mb-4">

            Smart Analytics

          </h2>

          <p className="text-gray-400 text-sm md:text-base leading-7">

            Generate insights for city cleanliness and waste management.

          </p>

        </div>

      </div>

    </div>

  );

}