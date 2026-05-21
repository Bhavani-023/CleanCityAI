
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
delete L.Icon.Default.prototype._getIconUrl;
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function ComplaintMap({ complaints }) {

  return (

    <div className="mt-20 px-10">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-4xl font-bold text-cyan-400">
            Complaint Locations
          </h1>

          <p className="text-gray-400 mt-2">
            Live tracking of reported waste complaints
          </p>

        </div>

      </div>

      <div className="rounded-[30px] overflow-hidden border border-white/10 shadow-2xl shadow-cyan-500/10">

        <MapContainer

          center={[17.385, 78.4867]}

          zoom={11}

          style={{
            height: window.innerWidth < 768 ? "350px" : "550px",
            width: "100%",
          }}
        >

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {complaints.map((complaint) => (

            <Marker

              key={complaint.id}

              position={[complaint.latitude, complaint.longitude]}

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

          ))}

        </MapContainer>

      </div>

    </div>

  );

}