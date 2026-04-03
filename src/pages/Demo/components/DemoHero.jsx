// src/pages/Demo/components  /DemoHero.jsx
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

export default function DemoHero() {
  const scrollToSteps = () => {
    document.getElementById('step-by-step')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Animated 3D Backgroun d Image */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ 
          scale: 1,
          opacity: 1,
        }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <motion.div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/demohero.png)',
            filter: 'brightness(0.35) contrast(1.1)',
          }}
          animate={{
            scale: [1, 1.05, 1],
            x: [0, -10, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-purple-950/70 to-black/85" />
        
        {/* Noise overlay */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
          animate={{
            opacity: [0.05, 0.12, 0.05],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Main Heading */}
          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight"
            >
              Experience the
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.span 
                className="text-6xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600"
                style={{
                  backgroundSize: '200% 200%',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Future of Code Quality
              </motion.span>
            </motion.div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Watch AI analyze repositories in real-time, predict bugs before they happen, 
            and transform how you build software.
          </motion.p>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="pt-8"
          >
            <motion.button
              onClick={scrollToSteps}
              className="group flex flex-col items-center gap-2 mx-auto cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xs text-gray-400 group-hover:text-purple-400 transition-colors font-semibold uppercase tracking-wider">
                Scroll to explore
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-9 h-9 rounded-full border-2 border-purple-500/40 group-hover:border-purple-400 flex items-center justify-center transition-colors"
              >
                <ArrowDown className="w-4 h-4 text-purple-400" />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
