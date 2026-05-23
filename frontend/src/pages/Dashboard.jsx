import { useEffect } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import toast from "react-hot-toast";

export default function Dashboard() {

  useEffect(() => {

    toast.success("Dashboard Loaded");

  }, []);

  return (

    <div className="min-h-screen bg-[#050816] text-white overflow-x-hidden">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <div className="ml-0 md:ml-[220px] px-4 md:px-10 py-6">

        {/* TOPBAR */}

        <Topbar />

        {/* CENTER */}

        <div className="flex items-center justify-center mt-40">

          <h1 className="text-5xl font-bold text-cyan-400">

            Dashboard Working ✅

          </h1>

        </div>

      </div>

    </div>

  );

}