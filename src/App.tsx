import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ChevronRight, Sparkles, MonitorPlay } from 'lucide-react';
import { assessmentLinks } from './constants/links';

function App() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-start overflow-hidden relative selection:bg-blue-500/30">

      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none opacity-50" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none opacity-50" />

      <main className="w-full max-w-5xl px-6 py-24 md:py-32 flex flex-col items-center relative z-10">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-blue-400 mb-4 tracking-wide shadow-sm shadow-blue-500/10">
            <Sparkles className="w-4 h-4" />
            <span>Prompt Engineering 2026</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/60">
            {/* The future of testing. <br className="hidden md:block" /> */}
            Prompting <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Starts here.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-medium tracking-wide">
            Select your team's designated prompt assessment below. Each test is designed to push the boundaries of creative and technical instruction.
          </p>
        </motion.div>

        {/* Links Grid Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
        >
          {assessmentLinks.map((test, index) => (
            <motion.a
              key={index}
              href={test.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                borderColor: "rgba(255, 255, 255, 0.15)"
              }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl group transition-all duration-300"
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/10 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-colors">
                  <MonitorPlay className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-1">Assessment</span>
                  <span className="text-lg font-semibold text-white group-hover:text-blue-100 transition-colors">
                    {test.name}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-zinc-500 group-hover:text-white transform group-hover:translate-x-1 transition-all" />
            </motion.a>
          ))}
        </motion.div>

      </main>
    </div>
  );
}

export default App;
