import {

  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,

} from "recharts";

export default function AnalyticsCharts({

  complaints,

}) {

  // =========================
  // DATA
  // =========================

  const data = [

    {
      name: "Pending",

      value: complaints.filter(
        (c) => c.status === "Pending"
      ).length,
    },

    {
      name: "In Progress",

      value: complaints.filter(
        (c) => c.status === "In Progress"
      ).length,
    },

    {
      name: "Resolved",

      value: complaints.filter(
        (c) => c.status === "Resolved"
      ).length,
    },

  ];

  const COLORS = [

    "#ef4444",

    "#facc15",

    "#22c55e",

  ];

  return (

    <div className="px-10 mt-20">

      <div className="bg-white/5 border border-white/10 rounded-[30px] p-10 backdrop-blur-2xl shadow-2xl shadow-cyan-500/10">

        {/* HEADER */}

        <div className="mb-10">

          <h1 className="text-4xl font-bold text-cyan-400">
            Complaint Analytics
          </h1>

          <p className="text-gray-400 mt-2">
            Live complaint status distribution
          </p>

        </div>

        {/* CHART */}

        <div className="w-full h-[450px]">

          <ResponsiveContainer>

            <PieChart>

              <Pie

                data={data}

                cx="50%"

                cy="50%"

                outerRadius={160}

                dataKey="value"

                label

              >

                {data.map((entry, index) => (

                  <Cell

                    key={`cell-${index}`}

                    fill={COLORS[index % COLORS.length]}

                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>

  );

}