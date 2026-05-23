import { useEffect } from "react";

import toast from "react-hot-toast";

export default function Dashboard() {

  // =========================
  // LOAD MESSAGE
  // =========================

  useEffect(() => {

    toast.success("Dashboard Loaded");

  }, []);

  // =========================
  // UI
  // =========================

  return (

    <div className="min-h-screen bg-[#050816] flex items-center justify-center">

      <div className="text-center">

        <h1 className="text-5xl md:text-7xl font-extrabold text-cyan-400">

          Dashboard Working ✅

        </h1>

        <p className="text-gray-400 mt-6 text-xl">

          CleanCityAI is running successfully

        </p>

      </div>

    </div>

  );

}