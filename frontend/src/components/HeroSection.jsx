import { motion } from "framer-motion";

export default function HeroSection() {

  return (

    <motion.div

      initial={{ opacity: 0, y: 60 }}

      animate={{ opacity: 1, y: 0 }}

      transition={{ duration: 1 }}

      className="relative overflow-hidden rounded-[30px] md:rounded-[40px] bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-white/10 p-6 md:p-16 mb-14 backdrop-blur-2xl"

    >

      <div className="max-w-3xl">

        {/* TITLE */}

        <motion.h1

          initial={{ opacity: 0, x: -50 }}

          animate={{ opacity: 1, x: 0 }}

          transition={{ delay: 0.3 }}

          className="text-5xl md:text-8xl font-extrabold leading-tight text-white"

        >

          AI Powered

          <span className="text-cyan-400">

            {" "}Waste Monitoring

          </span>

        </motion.h1>

        {/* DESCRIPTION */}

        <motion.p

          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

          transition={{ delay: 0.6 }}

          className="text-gray-300 mt-6 md:mt-8 text-base md:text-xl leading-8 md:leading-9"

        >

          Detect, monitor and resolve urban waste complaints
          using Artificial Intelligence and smart city analytics.

        </motion.p>

        {/* BUTTONS */}

        <div className="flex flex-col md:flex-row gap-4 mt-8">

          <button className="bg-cyan-500 hover:bg-cyan-600 transition px-8 py-4 rounded-2xl text-lg font-bold shadow-lg shadow-cyan-500/30">

            Get Started

          </button>

          <button className="border border-white/10 hover:border-cyan-400 transition px-8 py-4 rounded-2xl text-lg font-semibold">

            Learn More

          </button>

        </div>

      </div>

      {/* GLOW EFFECT */}

      <div className="absolute top-[-100px] right-[-100px] w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-cyan-500/30 rounded-full blur-[120px]" />

    </motion.div>

  );

}