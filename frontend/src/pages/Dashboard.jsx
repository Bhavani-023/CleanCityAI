import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import HeroSection from "../components/HeroSection";
import AnalyticsCards from "../components/AnalyticsCards";

import API from "../api";

import toast from "react-hot-toast";

export default function Dashboard() {

  const [complaints, setComplaints] = useState([]);

  // =========================
  // FETCH COMPLAINTS
  // =========================

  const fetchComplaints = async () => {

    try {

      const response = await API.get("/complaints");

      setComplaints(response.data || []);

    } catch (error) {

      console.log(error);

      setComplaints([]);

      toast.error("Failed to fetch complaints");

    }

  };

  // =========================
  // LOAD
  // =========================

  useEffect(() => {

    fetchComplaints();

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

        {/* HERO */}

        <HeroSection />

        {/* ANALYTICS */}

        <div className="mt-10">

          <AnalyticsCards complaints={complaints} />

        </div>

        {/* CENTER */}

        <div className="flex items-center justify-center mt-20">

          <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 text-center">

            Dashboard Working ✅

          </h1>

        </div>

      </div>

    </div>

  );

}