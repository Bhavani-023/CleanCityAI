export default function Navbar() {

  return (

    <div className="flex justify-between items-center px-10 py-6 border-b border-white/10 backdrop-blur-xl bg-white/5 sticky top-0 z-50">

      <div>

        <h1 className="text-3xl font-bold text-cyan-400">
          CleanCityAI
        </h1>

        <p className="text-gray-400 text-sm">
          Smart Waste Monitoring Platform
        </p>

      </div>

      <div className="flex gap-10 text-gray-300 font-medium">

        <button className="hover:text-cyan-400 transition">
          Dashboard
        </button>

        <button className="hover:text-cyan-400 transition">
          Complaints
        </button>

        <button className="hover:text-cyan-400 transition">
          Analytics
        </button>

      </div>

    </div>

  );

}