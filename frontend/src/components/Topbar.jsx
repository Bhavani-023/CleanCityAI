export default function Topbar() {

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.href = "/login";

  };

  return (

    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

      {/* LEFT SECTION */}

      <div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">

          Smart Waste Monitoring

        </h1>

        <p className="text-gray-400 mt-2 md:mt-3 text-sm sm:text-base md:text-lg">

          AI powered city cleanliness management

        </p>

      </div>

      {/* RIGHT SECTION */}

      <div className="flex flex-col sm:flex-row gap-4 sm:items-center">

        {/* DASHBOARD BADGE */}

        <div className="bg-cyan-500/20 border border-cyan-400/30 px-5 py-3 rounded-2xl text-cyan-300 font-semibold text-center">

          Municipality Dashboard

        </div>

        {/* LOGOUT BUTTON */}

        <button

          onClick={handleLogout}

          className="bg-red-500 hover:bg-red-600 transition px-5 py-3 rounded-2xl font-semibold shadow-lg shadow-red-500/20"

        >

          Logout

        </button>

      </div>

    </div>

  );

}