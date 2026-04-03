// src/pages/Demo/index.jsx
import DemoHero from './components/DemoHero'
import StepByStep from './components/StepByStep'
import VideoDemo from './components/VideoDemo'
import { motion } from 'framer-motion'

export default function Demo() {
  return (
    <div className="relative bg-black font-goldman text-white min-h-screen">
      {/* CONSISTENT BACKGROUND FOR EN  TIRE PAGE */}
      <div className="fixed inset-0 -z-10">
        {/* Main gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950 to-black"></div>
        
        {/* Animated blobs */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Animated grid */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>

      {/* PAGE CONTENT */}
      <div className="relative z-0">
        <DemoHero />
        <StepByStep />
        <VideoDemo />
      </div>
    </div>
  )
}
