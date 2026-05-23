import {
  LayoutDashboard,
  MapPinned,
  FileBarChart2,
  Shield,
  LogOut,
} from "lucide-react";

export default function Sidebar() {

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("isLoggedIn");

    window.location.href = "/login";

  };

  return (

    <>

      {/* DESKTOP SIDEBAR */}

      <div className="hidden md:flex fixed left-0 top-0 h-screen w-[220px] bg-[#070B1A] border-r border-white/10 p-6 z-50 flex-col justify-between">

        {/* TOP */}

        <div>

          <h1 className="text-3xl font-bold text-cyan-400 mb-14">

            CleanCityAI

          </h1>

          {/* NAVIGATION */}

          <div className="flex flex-col gap-5">

            <a
              href="#"
              className="flex items-center gap-3 bg-white/5 hover:bg-cyan-500/20 transition p-4 rounded-2xl"
            >

              <LayoutDashboard size={22} />

              <span className="text-lg font-semibold">

                Dashboard

              </span>

            </a>

            <a
              href="#map"
              className="flex items-center gap-3 bg-white/5 hover:bg-cyan-500/20 transition p-4 rounded-2xl"
            >

              <MapPinned size={22} />

              <span className="text-lg font-semibold">

                Map

              </span>

            </a>

            <a
              href="#charts"
              className="flex items-center gap-3 bg-white/5 hover:bg-cyan-500/20 transition p-4 rounded-2xl"
            >

              <FileBarChart2 size={22} />

              <span className="text-lg font-semibold">

                Reports

              </span>

            </a>

            <a
              href="#complaints"
              className="flex items-center gap-3 bg-white/5 hover:bg-cyan-500/20 transition p-4 rounded-2xl"
            >

              <Shield size={22} />

              <span className="text-lg font-semibold">

                Complaints

              </span>

            </a>

          </div>

        </div>

        {/* LOGOUT */}

        <button

          onClick={handleLogout}

          className="flex items-center justify-center gap-3 bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 p-4 rounded-2xl text-red-300 transition duration-300"

        >

          <LogOut size={20} />

          Logout

        </button>

      </div>

      {/* MOBILE BOTTOM NAVBAR */}

      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#070B1A]/95 backdrop-blur-xl border-t border-white/10 z-50">

        <div className="flex justify-around items-center py-3">

          <a
            href="#"
            className="flex flex-col items-center text-cyan-400"
          >

            <LayoutDashboard size={22} />

            <span className="text-xs mt-1">

              Home

            </span>

          </a>

          <a
            href="#map"
            className="flex flex-col items-center text-gray-300"
          >

            <MapPinned size={22} />

            <span className="text-xs mt-1">

              Map

            </span>

          </a>

          <a
            href="#charts"
            className="flex flex-col items-center text-gray-300"
          >

            <FileBarChart2 size={22} />

            <span className="text-xs mt-1">

              Reports

            </span>

          </a>

          <button
            onClick={handleLogout}
            className="flex flex-col items-center text-red-400"
          >

            <LogOut size={22} />

            <span className="text-xs mt-1">

              Logout

            </span>

          </button>

        </div>

      </div>

    </>

  );

}