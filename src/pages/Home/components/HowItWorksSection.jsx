// src/pages/Home/componen ts/HowItWorksSection.jsx
import { GitBranch, Brain, FileCode } from 'lucide-react'
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion'

export default function HowItWorksSection() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const steps = [
    {
      title: 'Ingest',
      description: 'Connect repository via URL. Auto-detect languages and structure.',
      icon: GitBranch,
    },
    {
      title: 'Analyze',
      description: 'AST parsing and ML models scan logic flows for breakage risks.',
      icon: Brain,
    },
    {
      title: 'Resolve',
      description: 'Receive a PR with fixed code, not just a list of issues.',
      icon: FileCode,
    }
  ]

  return (
    <section onMouseMove={handleMouseMove} className="relative pt-30 bg-black min-h-screen overflow-hidden">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Mouse Grid */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(147, 51, 234, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(147, 51, 234, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: useMotionTemplate`
            radial-gradient(
              250px circle at ${mouseX}px ${mouseY}px,
              black,
              transparent 100%
            )
          `,
        }}
      />

      {/* Purple Spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(147, 51, 234, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-2.5 py-1 mb-3 text-[10px] font-mono text-purple-300  rounded-full bg-purple-500/10"
          >
            SYSTEM ARCHITECTURE
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            From code to <span className="text-purple-500">clarity.</span>
          </h2>
        </div>

        {/* PIPELINE */}
        <div className="relative">
          
          {/* Connecting Beam (Desktop) */}
          <div className="hidden md:block absolute top-10 left-0 w-full h-20 pointer-events-none">
             <div className="absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-purple-500/20" />
             
             <motion.div 
                className="absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent z-10"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
             />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-20">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative group"
              >
                 <div className="p-6 rounded-2xl bg-purple-500/5 border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-colors duration-500 text-center">
                    
                    {/* Icon Reactor */}
                    <div className="relative w-20 h-20 mx-auto mb-6">
                       <motion.div 
                          className="absolute inset-0 rounded-full border border-dashed border-purple-500/30"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                       />
                       <motion.div 
                          className="absolute inset-2 rounded-full border border-dashed border-purple-500/10"
                          animate={{ rotate: -360 }}
                          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                       />
                       
                       <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                            <step.icon className="w-5 h-5 text-purple-300" />
                          </div>
                       </div>

                       <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black rounded-full text-[9px] font-mono text-gray-400">
                          STEP 0{index + 1}
                       </div>
                    </div>

                    <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed max-w-xs mx-auto">
                      {step.description}
                    </p>
                 </div>

                 {index !== steps.length - 1 && (
                    <div className="md:hidden absolute -bottom-8 left-1/2 -translate-x-1/2 h-8 w-[1px] bg-gradient-to-b from-purple-500/50 to-transparent" />
                 )}
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
