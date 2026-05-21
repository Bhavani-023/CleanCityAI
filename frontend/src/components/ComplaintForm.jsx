import { ClipLoader } from "react-spinners";
export default function ComplaintForm({

  description,
  setDescription,

  image,
  setImage,

  latitude,
  setLatitude,

  longitude,
  setLongitude,

  getCurrentLocation,

  handleSubmit,
  loading,

}) {

  return (

    <div className="mt-16 flex justify-center">

      <div className="bg-white/5 border border-white/10 p-5 md:p-10 rounded-[30px] w-[750px] backdrop-blur-2xl shadow-2xl shadow-cyan-500/10">

        <div className="mb-8">

          <h2 className="text-4xl font-bold text-cyan-400">
            Submit Complaint
          </h2>

          <p className="text-gray-400 mt-2">
            Report waste issues with AI-powered monitoring
          </p>

        </div>

        <div className="space-y-6">

          {/* DESCRIPTION */}

          <input
            type="text"
            placeholder="Enter Complaint Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-5 rounded-2xl bg-black/20 border border-white/10 outline-none focus:border-cyan-400 transition"
          />

          {/* IMAGE */}

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-5 rounded-2xl bg-black/20 border border-white/10 outline-none focus:border-cyan-400 transition"
          />

          {/* LOCATION */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <input
              type="text"
              placeholder="Latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="w-full p-5 rounded-2xl bg-black/20 border border-white/10 outline-none focus:border-cyan-400 transition"
            />

            <input
              type="text"
              placeholder="Longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="w-full p-5 rounded-2xl bg-black/20 border border-white/10 outline-none focus:border-cyan-400 transition"
            />

          </div>

          {/* LOCATION BUTTON */}

          <button
            onClick={getCurrentLocation}
            className="w-full bg-purple-500 hover:bg-purple-600 p-5 rounded-2xl text-lg font-semibold transition duration-300"
          >
            Use My Current Location
          </button>

          {/* SUBMIT BUTTON */}

            <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition duration-300 p-4 rounded-2xl text-xl font-bold shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-3"
            >
                {loading ? (
                    <>
                    <ClipLoader
                    color="#ffffff"
                    size={22}
                    />
                    Uploading...
                    </>
                    ) : (
                        "Submit Complaint"
                        )}
                        </button>

        </div>

      </div>

    </div>

  );

}