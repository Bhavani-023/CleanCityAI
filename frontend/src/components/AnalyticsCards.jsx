import { motion } from "framer-motion";

export default function AnalyticsCards({ complaints }) {

  const total = complaints.length;

  const pending = complaints.filter(
    (c) => c.status === "Pending"
  ).length;

  const resolved = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  const aiDetected = complaints.length;

  const cards = [

    {
      title: "Total Complaints",
      value: total,
      color: "from-cyan-500/20 to-blue-500/10",
      glow: "shadow-cyan-500/20",
    },

    {
      title: "Pending Cases",
      value: pending,
      color: "from-yellow-500/20 to-orange-500/10",
      glow: "shadow-yellow-500/20",
    },

    {
      title: "Resolved Cases",
      value: resolved,
      color: "from-green-500/20 to-emerald-500/10",
      glow: "shadow-green-500/20",
    },

    {
      title: "AI Detected",
      value: aiDetected,
      color: "from-pink-500/20 to-purple-500/10",
      glow: "shadow-pink-500/20",
    },

  ];

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">

      {cards.map((card, index) => (

        <motion.div

          key={index}

          initial={{ opacity: 0, y: 40 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ delay: index * 0.2 }}

          whileHover={{
            scale: 1.05,
            y: -10,
          }}

          className={`bg-gradient-to-br ${card.color}
          border border-white/10 rounded-[30px]
          p-10 backdrop-blur-2xl
          shadow-2xl ${card.glow}
          transition duration-500 cursor-pointer`}

        >

          <h1 className="text-6xl font-extrabold text-white">

            {card.value}

          </h1>

          <p className="text-gray-300 mt-6 text-xl">

            {card.title}

          </p>

        </motion.div>

      ))}

    </div>

  );

}