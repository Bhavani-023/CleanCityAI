import {
  LayoutDashboard,
  MapPinned,
  FileBarChart2,
  Shield,
} from "lucide-react";

export default function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-screen w-[220px] bg-[#070B1A] border-r border-white/10 p-6 z-50">

      {/* LOGO */}

      <h1 className="text-3xl font-bold text-cyan-400 mb-14">
        CleanCityAI
      </h1>

      {/* MENU */}

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
            Map Analytics
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
            Admin
          </span>
        </a>

      </div>

    </div>
  );
}