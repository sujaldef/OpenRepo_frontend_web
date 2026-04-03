import { useNavigate } from 'react-router-dom'
import { ArrowRight, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CTASection() {
  const navigate = useNavigate()

  return (
    <section className="w-full py-20 bg-black relative overflow-hidden flex items-center ">
      
      {/* 1. The High-Spee d Background Stream */}
      <div className="absolute inset-0 w-full h-full bg-[#050505]">
        {/* Horizontal Speed Lines */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: '-10%',
              width: `${Math.random() * 50 + 20}%`,
            }}
            animate={{
              x: ['-100%', '200%'],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 2 + 1, // Random speed between 1-3s
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2
            }}
          />
        ))}
        
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10" />
      </div>

      {/* 2. The Horizontal Content Layout */}
      <div className="max-w-7xl mx-auto px-6 w-full relative z-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
          
          {/* Left: The Hook */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-white">launch?</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Stop reviewing code manually. Let AI handle the architecture.
            </p>
          </div>

          {/* Right: The "Reactor" Button */}
          <div className="shrink-0 relative group">
            
            {/* Button Glow Behind */}
            <div className="absolute inset-0 bg-purple-600 blur-[20px] opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-full" />
            
            <motion.button
  onClick={() => navigate('/auth')}
  whileHover={{ scale: 1.04 }}
  whileTap={{ scale: 0.96 }}
  className="
    group
    relative
    flex items-center gap-3
    px-6 py-3
    bg-white text-black
    rounded-full
    font-semibold
    text-base
    shadow-[0_0_24px_rgba(255,255,255,0.25)]
    overflow-hidden
  "
>
  {/* Shimmer */}
  <div
    className="
      absolute inset-0
      bg-gradient-to-r from-transparent via-white/50 to-transparent
      -translate-x-full
      group-hover:translate-x-full
      transition-transform duration-700 ease-in-out
    "
  />

  <span className="relative z-10">Start Analysis</span>

  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center relative z-10">
    <Zap className="w-4 h-4 text-white fill-white" />
  </div>
</motion.button>

          </div>

        </div>
      </div>

    </section>
  )
}