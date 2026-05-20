export default function Topbar() {

  return (

    <div className="flex justify-between items-center mb-10">

      <div>

        <h1 className="text-5xl font-extrabold text-white">

          Smart Waste Monitoring

        </h1>

        <p className="text-gray-400 mt-3 text-lg">

          AI powered city cleanliness management

        </p>

      </div>

      <div className="bg-cyan-500/20 border border-cyan-400/30 px-6 py-3 rounded-2xl text-cyan-300 font-semibold">

        Municipality Dashboard

      </div>

    </div>

  );

}