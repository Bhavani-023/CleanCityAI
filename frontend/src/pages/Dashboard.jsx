import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import HeroSection from "../components/HeroSection";
import AnalyticsCards from "../components/AnalyticsCards";
import ComplaintForm from "../components/ComplaintForm";
import ComplaintMap from "../components/ComplaintMap";
import AnalyticsCharts from "../components/AnalyticsCharts";
import ComplaintCards from "../components/ComplaintCards";

import API from "../api";

import toast from "react-hot-toast";

export default function Dashboard() {

  // =========================
  // STATES
  // =========================

  const [complaints, setComplaints] = useState([]);

  const [description, setDescription] = useState("");

  const [image, setImage] = useState(null);

  const [latitude, setLatitude] = useState("");

  const [longitude, setLongitude] = useState("");

  const [loading, setLoading] = useState(false);

  // =========================
  // FETCH COMPLAINTS
  // =========================

  const fetchComplaints = async () => {

  try {

    setLoading(true);

    try {

      const response = await API.get("/complaints");

      setComplaints(

        Array.isArray(response.data)

          ? response.data

          : []

      );

    } catch (err) {

      console.log(err);

      setComplaints([]);

    }

  } finally {

    setLoading(false);

  }

};


  // =========================
  // LOAD
  // =========================

  useEffect(() => {

    fetchComplaints();

  }, []);

  // =========================
  // LOCATION
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
  // SUBMIT
  // =========================

  const handleSubmit = async () => {

    try {

      setLoading(true);

      // VALIDATION

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

      // SAFE REFRESH

      try {

        const refreshed = await API.get("/complaints");

        setComplaints(

          Array.isArray(refreshed.data)

            ? refreshed.data

            : []

        );

      } catch (err) {

        console.log(err);

        setComplaints([]);

      }

      // CLEAR FORM

      setDescription("");

      setImage(null);

      setLatitude("");

      setLongitude("");

    } catch (error) {

      console.log(error);

      toast.error("Submission Failed");

    } finally {

      setLoading(false);

    }

  };

  // =========================
  // LOADING SCREEN
  // =========================

  if (loading) {

    return (

      <div className="min-h-screen bg-[#050816] flex items-center justify-center">

        <div className="text-center">

          <h1 className="text-3xl md:text-4xl font-bold text-cyan-400 animate-pulse">

            Loading Dashboard...

          </h1>

          <p className="text-gray-400 mt-4">

            Please wait

          </p>

        </div>

      </div>

    );

  }

  // =========================
  // UI
  // =========================

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

        {/* FORM */}

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

          {

            Array.isArray(complaints) && complaints.length > 0 && (

              <ComplaintMap complaints={complaints} />

            )

          }

        </div>

        {/* CHARTS */}

        <div
          id="charts"
          className="mt-14"
        >

          {

            Array.isArray(complaints) && complaints.length > 0 && (

              <AnalyticsCharts complaints={complaints} />

            )

          }

        </div>

        {/* COMPLAINT CARDS */}

        <div
          id="complaints"
          className="mt-14"
        >

          {

            Array.isArray(complaints) && complaints.length > 0 && (

              <ComplaintCards

                complaints={complaints}

                updateComplaintStatus={updateComplaintStatus}

                loading={loading}

              />

            )

          }

        </div>

      </div>

    </div>

  );

}