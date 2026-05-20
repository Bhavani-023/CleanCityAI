import { motion } from "framer-motion";

export default function HeroSection() {

  return (

    <motion.div

      initial={{ opacity: 0, y: 60 }}

      animate={{ opacity: 1, y: 0 }}

      transition={{ duration: 1 }}

      className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-white/10 p-16 mb-14 backdrop-blur-2xl"

    >

      <div className="max-w-3xl">

        <motion.h1

          initial={{ opacity: 0, x: -50 }}

          animate={{ opacity: 1, x: 0 }}

          transition={{ delay: 0.3 }}

          className="text-7xl font-extrabold leading-tight text-white"

        >

          AI Powered
          <span className="text-cyan-400">
            {" "}Waste Monitoring
          </span>

        </motion.h1>

        <motion.p

          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

          transition={{ delay: 0.6 }}

          className="text-gray-300 mt-8 text-xl leading-9"

        >

          Detect, monitor and resolve urban waste complaints
          using Artificial Intelligence and smart city analytics.

        </motion.p>

      </div>

      {/* GLOW */}

      <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-cyan-500/30 rounded-full blur-[120px]" />

    </motion.div>

  );

}