import { useState, useEffect } from "react";
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

        toast.success("Location detected");

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

      toast.success("Status Updated");

      fetchComplaints();

    } catch (error) {

      console.log(error);

      toast.error("Status update failed");

    }

  };

  // =========================
  // SUBMIT COMPLAINT
  // =========================

  const handleSubmit = async () => {

    try {

      setLoading(true);

      // VALIDATION

      if (!description) {

        toast.error("Please enter description");

        setLoading(false);

        return;

      }

      if (!image) {

        toast.error("Please upload image");

        setLoading(false);

        return;

      }

      if (!latitude || !longitude) {

        toast.error("Please select location");

        setLoading(false);

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

      // REFRESH DATA

      fetchComplaints();

      // CLEAR FORM

      setDescription("");

      setImage(null);

      setLatitude("");

      setLongitude("");

      setLoading(false);

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

    <div className="min-h-screen bg-[#050816] text-white overflow-x-hidden">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN CONTENT */}

      <div className="ml-[90px] md:ml-[220px] w-full px-4 md:px-10 py-4 md:py-6">

        {/* TOPBAR */}

        <Topbar />

        {/* HERO */}

        <HeroSection />

        {/* ANALYTICS */}

        <div className="mt-10">

          <AnalyticsCards complaints={complaints} />

        </div>

        {/* COMPLAINT FORM */}

        <div className="mt-10">

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

        </div>

        {/* MAP */}

        <div
          id="map"
          className="mt-14"
        >

          <ComplaintMap complaints={complaints} />

        </div>

        {/* CHARTS */}

        <div
          id="charts"
          className="mt-14"
        >

          <AnalyticsCharts complaints={complaints} />

        </div>

        {/* COMPLAINT CARDS */}

        <div
          id="complaints"
          className="mt-14"
        >

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