import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// =========================
// FIX LEAFLET ICONS
// =========================

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function ComplaintMap({

  complaints = [],

}) {

  // =========================
  // SAFETY CHECK
  // =========================

  if (!Array.isArray(complaints)) {

    return null;

  }

  // FILTER VALID COMPLAINTS

  const validComplaints = complaints.filter(

    (complaint) =>

      complaint.latitude &&
      complaint.longitude

  );
  if (validComplaints.length === 0) {

  return (

    <div className="text-center text-gray-400 mt-20">

      No complaint locations available

    </div>

  );

}

  // =========================
  // UI
  // =========================

  return (

    <div className="mt-20 px-4 md:px-10">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-3xl md:text-4xl font-bold text-cyan-400">

            Complaint Locations

          </h1>

          <p className="text-gray-400 mt-2 text-sm md:text-base">

            Live tracking of reported waste complaints

          </p>

        </div>

      </div>

      {/* MAP */}

      <div className="rounded-[30px] overflow-hidden border border-white/10 shadow-2xl shadow-cyan-500/10">

        <MapContainer

          center={[17.385, 78.4867]}

          zoom={11}

          style={{

            height:

              window.innerWidth < 768

                ? "350px"

                : "550px",

            width: "100%",

          }}

        >

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {

            validComplaints.map((complaint) => (

              <Marker

                key={complaint.id}

                position={[

                  complaint.latitude,

                  complaint.longitude,

                ]}

              >

                <Popup>

                  <div className="text-black space-y-2">

                    <h1 className="font-bold text-lg">

                      {complaint.description}

                    </h1>

                    <p>

                      Status: {complaint.status}

                    </p>

                    <p>

                      AI: Garbage Detected

                    </p>

                  </div>

                </Popup>

              </Marker>

            ))

          }

        </MapContainer>

      </div>

    </div>

  );

}