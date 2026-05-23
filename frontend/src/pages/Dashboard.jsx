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

      const formData = new FormData();

      formData.append("image", image);

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

    } catch (error) {

      console.log(error);

      toast.error("Submission Failed");

    } finally {

      setLoading(false);

    }

  };

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

            complaints?.length > 0 && (

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

            complaints?.length > 0 && (

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

            complaints?.length > 0 && (

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