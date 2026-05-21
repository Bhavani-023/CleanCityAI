import {
  LayoutDashboard,
  MapPinned,
  FileBarChart2,
  Shield,
} from "lucide-react";

export default function Sidebar() {

  return (

    <div className="fixed left-0 top-0 h-screen w-[90px] md:w-[220px] bg-[#070B1A] border-r border-white/10 p-4 md:p-6 z-50">

      {/* LOGO */}

      <h1 className="text-xl md:text-3xl font-bold text-cyan-400 mb-10 md:mb-14">

        <span className="hidden md:block">
          CleanCityAI
        </span>

        <span className="block md:hidden">
          AI
        </span>

      </h1>

      {/* MENU */}

      <div className="flex flex-col gap-4 md:gap-5">

        {/* DASHBOARD */}

        <a
          href="#"
          className="flex items-center justify-center md:justify-start gap-3 bg-white/5 hover:bg-cyan-500/20 transition p-4 rounded-2xl"
        >

          <LayoutDashboard size={22} />

          <span className="hidden md:block text-lg font-semibold">
            Dashboard
          </span>

        </a>

        {/* MAP */}

        <a
          href="#map"
          className="flex items-center justify-center md:justify-start gap-3 bg-white/5 hover:bg-cyan-500/20 transition p-4 rounded-2xl"
        >

          <MapPinned size={22} />

          <span className="hidden md:block text-lg font-semibold">
            Map Analytics
          </span>

        </a>

        {/* REPORTS */}

        <a
          href="#charts"
          className="flex items-center justify-center md:justify-start gap-3 bg-white/5 hover:bg-cyan-500/20 transition p-4 rounded-2xl"
        >

          <FileBarChart2 size={22} />

          <span className="hidden md:block text-lg font-semibold">
            Reports
          </span>

        </a>

        {/* ADMIN */}

        <a
          href="#complaints"
          className="flex items-center justify-center md:justify-start gap-3 bg-white/5 hover:bg-cyan-500/20 transition p-4 rounded-2xl"
        >

          <Shield size={22} />

          <span className="hidden md:block text-lg font-semibold">
            Admin
          </span>

        </a>

      </div>

    </div>

  );

}