import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import API from "../api";

import Sidebar from "../components/Sidebar";

import Topbar from "../components/Topbar";

import HeroSection from "../components/HeroSection";

import AnalyticsCards from "../components/AnalyticsCards";

import AnalyticsCharts from "../components/AnalyticsCharts";

import ComplaintForm from "../components/ComplaintForm";

import ComplaintMap from "../components/ComplaintMap";

import ComplaintCards from "../components/ComplaintCards";
import toast from "react-hot-toast";
export default function Dashboard() {

  // =========================
  // NAVIGATION
  // =========================

  const navigate = useNavigate();

  // =========================
  // STATES
  // =========================

  const [description, setDescription] = useState("");

  const [image, setImage] = useState(null);

  const [latitude, setLatitude] = useState("");

  const [longitude, setLongitude] = useState("");

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  // =========================
  // FETCH COMPLAINTS
  // =========================

  const fetchComplaints = async () => {

    try {
      setLoading(true);

      const response = await API.get("/complaints");

      setComplaints(response.data);
      setLoading(false);

    } catch (error) {

      console.log(error);
      setLoading(false);
      toast.error("Failed to fetch complaints");

    }

  };

  // =========================
  // LOAD DATA
  // =========================

  useEffect(() => {

    fetchComplaints();

  }, []);

  // =========================
  // GET GPS LOCATION
  // =========================

  const getCurrentLocation = () => {

    navigator.geolocation.getCurrentPosition(

      (position) => {

        setLatitude(position.coords.latitude);

        setLongitude(position.coords.longitude);

      },

      (error) => {

        console.log(error);

        toast.error("Unable to fetch location");

      }

    );

  };

  // =========================
  // UPDATE STATUS
  // =========================

  const updateComplaintStatus = async (

    complaintId,

    status

  ) => {

    try {

      await API.put(

        `/complaint/${complaintId}?status=${status}`

      );

      fetchComplaints();

    } catch (error) {

      console.log(error);

    }

  };

  // =========================
  // SUBMIT COMPLAINT
  // =========================

  const handleSubmit = async () => {

    try {
      setLoading(true);

      // VALIDATIONS

      if (!description) {

        toast.error("Please enter description");

        return;

      }

      if (!image) {

        toast.error("Please upload image");

        return;

      }

      if (!latitude || !longitude) {

        toast.error("Please select location");

        return;

      }

      // FORM DATA

      const formData = new FormData();

      formData.append("image", image);

      // API REQUEST

      await API.post(

        `/complaint?description=${description}&latitude=${latitude}&longitude=${longitude}`,

        formData,

        {

          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },

        }

      );

      toast.success("Complaint Submitted Successfully");
      setLoading(false);

      // REFRESH COMPLAINTS

      fetchComplaints();

      // CLEAR FORM

      setDescription("");

      setImage(null);

      setLatitude("");

      setLongitude("");

    } catch (error) {
      

      console.log(error);
      setLoading(false);

      toast.error("Submission Failed");

    }

  };

  // =========================
  // UI
  // =========================

  return (

    <div className="min-h-screen bg-[#050816] text-white flex overflow-x-hidden">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN CONTENT */}

      <div className="ml-[260px] w-full p-10">

        {/* TOPBAR */}

        <Topbar />

        {/* HERO */}

        <HeroSection />

        {/* ANALYTICS */}

        <AnalyticsCards complaints={complaints} />

        {/* FORM */}

        <ComplaintForm

          description={description}

          setDescription={setDescription}

          image={image}

          setImage={setImage}

          latitude={latitude}

          setLatitude={setLatitude}

          longitude={longitude}

          setLongitude={setLongitude}

          getCurrentLocation={getCurrentLocation}

          handleSubmit={handleSubmit}
          loading={loading}

        />

        {/* MAP */}

        <div id="map">

          <ComplaintMap complaints={complaints} />

        </div>

        {/* CHARTS */}

        <div id="charts">

          <AnalyticsCharts complaints={complaints} />

        </div>

        {/* COMPLAINT CARDS */}

        <div id="complaints">

          <ComplaintCards

            complaints={complaints}

            updateComplaintStatus={updateComplaintStatus}
            loading={loading}

          />

        </div>

      </div>

    </div>

  );

}