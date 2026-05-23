export default function ComplaintCards({

  complaints = [],
  updateComplaintStatus,
  loading,

}) {

  // =========================
  // SAFETY CHECK
  // =========================

  if (!Array.isArray(complaints)) {

    return null;

  }

  // =========================
  // LOADING STATE
  // =========================

  if (loading) {

    return (

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 mt-14">

        {[1, 2, 3].map((item) => (

          <div
            key={item}
            className="bg-white/5 animate-pulse rounded-[30px] h-[420px]"
          />

        ))}

      </div>

    );

  }

  // =========================
  // NO COMPLAINTS
  // =========================

  if (complaints.length === 0) {

    return (

      <div className="text-white text-center mt-20 text-2xl">

        No complaints found

      </div>

    );

  }

  // =========================
  // MAIN UI
  // =========================

  return (

    <div className="mt-20 px-4 md:px-10 pb-24">

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-3xl md:text-4xl font-bold text-cyan-400">

          Recent Complaints

        </h1>

        <p className="text-gray-400 mt-2 text-sm md:text-base">

          Monitor and track reported waste issues

        </p>

      </div>

      {/* CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {

          complaints.map((complaint) => (

            <div
              key={complaint.id}
              className="group bg-white/5 border border-white/10 rounded-[30px] overflow-hidden backdrop-blur-2xl hover:scale-[1.02] transition duration-300 shadow-2xl shadow-cyan-500/10"
            >

              {/* IMAGE */}

              <div className="overflow-hidden">

                <img
                  src={`https://cleancityai-1.onrender.com/${complaint.image_url}`}
                  alt="complaint"
                  className="w-full h-52 md:h-64 object-cover group-hover:scale-110 transition duration-500"
                  onError={(e) => {

                    e.target.src =
                      "https://placehold.co/600x400?text=No+Image";

                  }}
                />

              </div>

              {/* CONTENT */}

              <div className="p-7">

                {/* TOP */}

                <div className="flex items-center justify-between gap-3 flex-wrap">

                  <h1 className="text-xl md:text-2xl font-bold text-white">

                    Complaint #{complaint.id}

                  </h1>

                  <div className="bg-cyan-500/20 border border-cyan-400/30 px-4 py-1 rounded-full text-cyan-300 text-sm">

                    AI Detected

                  </div>

                </div>

                {/* DESCRIPTION */}

                <p className="text-gray-300 mt-5 leading-7 break-words">

                  {complaint.description}

                </p>

                {/* LOCATION */}

                <div className="mt-6 space-y-3">

                  <div className="flex items-center gap-3 text-gray-400">

                    <span>📍</span>

                    <p className="break-all">

                      {complaint.latitude},
                      {" "}
                      {complaint.longitude}

                    </p>

                  </div>

                </div>

                {/* STATUS SECTION */}

                <div className="flex flex-col gap-4 mt-6">

                  {/* STATUS BADGE */}

                  <div
                    className={`px-4 py-2 rounded-full text-sm font-semibold w-fit

                    ${
                      complaint.status === "Resolved"

                        ? "bg-green-500/20 text-green-400 border border-green-500/30"

                        : complaint.status === "In Progress"

                        ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"

                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                    }
                    `}
                  >

                    {complaint.status}

                  </div>

                  {/* BUTTONS */}

                  <div className="flex gap-3 flex-wrap">

                    {/* PENDING */}

                    <button
                      onClick={() =>
                        updateComplaintStatus(
                          complaint.id,
                          "Pending"
                        )
                      }
                      className="bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 px-4 py-2 rounded-xl text-red-300 transition"
                    >

                      Pending

                    </button>

                    {/* IN PROGRESS */}

                    <button
                      onClick={() =>
                        updateComplaintStatus(
                          complaint.id,
                          "In Progress"
                        )
                      }
                      className="bg-yellow-500/20 hover:bg-yellow-500/40 border border-yellow-500/30 px-4 py-2 rounded-xl text-yellow-300 transition"
                    >

                      In Progress

                    </button>

                    {/* RESOLVED */}

                    <button
                      onClick={() =>
                        updateComplaintStatus(
                          complaint.id,
                          "Resolved"
                        )
                      }
                      className="bg-green-500/20 hover:bg-green-500/40 border border-green-500/30 px-4 py-2 rounded-xl text-green-300 transition"
                    >

                      Resolved

                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))

        }

      </div>

    </div>

  );

}