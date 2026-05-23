import { useEffect } from "react";

import Sidebar from "../components/Sidebar";

import toast from "react-hot-toast";

export default function Dashboard() {

  useEffect(() => {

    toast.success("Dashboard Loaded");

  }, []);

  return (

    <div className="min-h-screen bg-[#050816] text-white overflow-x-hidden">

      <Sidebar />

      <div className="ml-0 md:ml-[220px] flex items-center justify-center min-h-screen">

        <h1 className="text-5xl font-bold text-cyan-400">

          Dashboard Working ✅

        </h1>

      </div>

    </div>

  );

}