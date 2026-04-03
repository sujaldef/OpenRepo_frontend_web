// src/pages/Home/components/Repo rtPreviewSection.jsx
import { useState, useEffect } from 'react'
import { TrendingUp, AlertTriangle, Shield, Code, Terminal, Activity, Check, X } from 'lucide-react'
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion'

// --- Live Terminal Component ---
const LiveTerminal = () => {
  const [logs, setLogs] = useState([
    { id: 1, text: "Initializing AST parser...", color: "text-gray-400" },
    { id: 2, text: "Scanning /src/auth/login.ts", color: "text-purple-300" },
    { id: 3, text: "Analyzing dependency graph...", color: "text-gray-400" },
  ])

  useEffect(() => {
    const messages = [
      { text: "Detected SQL injection risk in query.js", color: "text-red-400" },
      { text: "Cyclomatic complexity: 12 (Low)", color: "text-green-400" },
      { text: "Checking AWS SDK version...", color: "text-blue-300" },
      { text: "Heap memory allocation stable.", color: "text-gray-400" },
      { text: "Secrets scan complete. 0 leaks.", color: "text-green-400" },
      { text: "Parsing middleware chains...", color: "text-purple-300" }
    ]

    const interval = setInterval(() => {
      const randomMsg = messages[Math.floor(Math.random() * messages.length)]
      setLogs(prev => [...prev.slice(-3), { id: Date.now(), ...randomMsg }])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="font-mono text-[10px] space-y-1.5 h-20 overflow-hidden relative">
      <AnimatePresence mode='popLayout'>
        {logs.map((log) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`flex items-center gap-2 ${log.color}`}
          >
             <span className="opacity-50">{`>`}</span> {log.text}
          </motion.div>
        ))}
      </AnimatePresence>
      <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  )
}

// --- Activity Wave Component ---
const ActivityWave = () => {
  return (
    <div className="flex items-end justify-between gap-1 h-10 w-full mt-3">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-purple-500/40 rounded-t-sm"
          animate={{
            height: ["20%", `${Math.random() * 80 + 20}%`, "20%"],
            backgroundColor: ["rgba(168,85,247,0.4)", "rgba(168,85,247,0.8)", "rgba(168,85,247,0.4)"]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "mirror",
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

// --- Main Section ---
export default function ReportPreviewSection() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const features = [
    { icon: TrendingUp, text: 'Predictive health scoring' },
    { icon: AlertTriangle, text: 'AI Risk Probability' },
    { icon: Shield, text: 'CVE Vulnerability Scan' },
    { icon: Code, text: 'Cyclomatic Complexity' },
  ]

  return (
    <section onMouseMove={handleMouseMove} className="relative pt-30 bg-black min-h-screen overflow-hidden">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-2.5 py-1 mb-2 text-[10px] font-mono text-purple-300 border border-purple-500/30 rounded-full bg-purple-500/10"
            >
              LIVE REPORTS
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              See what others <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
                miss completely.
              </span>
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Standard linters catch syntax errors. We catch architectural failures. 
              Get a comprehensive breakdown of your codebase's future stability.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((item, index) => (
                <div key={index} className="flex items-center gap-2.5 p-2.5 rounded-lg border border-purple-500/20 bg-purple-500/5 backdrop-blur-sm">
                  <item.icon className="w-4 h-4 text-purple-400" />
                  <span className="text-xs text-gray-300 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual */}
          <div className="relative">
            
            {/* Main Card */}
            <motion.div 
              initial={{ opacity: 0, rotateX: 10, y: 20 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 bg-black/90 backdrop-blur-xl rounded-xl border border-purple-500/20 p-5 shadow-2xl overflow-hidden"
            >
              
              {/* Header */}
              <div className="flex justify-between items-center mb-4 border-b border-purple-500/10 pb-3">
                <div className="flex items-center gap-2.5">
                   <div className="p-1.5 bg-purple-500/10 rounded-lg">
                      <Terminal size={14} className="text-purple-400" />
                   </div>
                   <div>
                      <div className="text-xs font-bold text-white">Live Audit</div>
                      <div className="text-[9px] text-gray-500 font-mono">ID: 8829-XJ • <span className="text-green-500">Active</span></div>
                   </div>
                </div>
                <div className="flex items-center gap-1.5">
                   <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                   </span>
                   <span className="text-[10px] font-mono text-green-500">ONLINE</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                 <div className="p-3 rounded-lg bg-purple-500/5 border border-purple-500/10 flex flex-col justify-between">
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Health Score</div>
                    <div className="flex items-end gap-1.5">
                       <span className="text-3xl font-bold text-white tracking-tighter">98</span>
                       <span className="text-[10px] text-green-400 mb-1 flex items-center gap-0.5">
                          <TrendingUp size={10} /> +2.4%
                       </span>
                    </div>
                 </div>

                 <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute right-0 top-0 p-1.5 opacity-10">
                       <AlertTriangle size={32} className="text-red-500" />
                    </div>
                    <div className="text-[10px] text-red-300 uppercase tracking-wider mb-1">Critical Risks</div>
                    <div className="flex items-end gap-1.5">
                       <span className="text-3xl font-bold text-white tracking-tighter">02</span>
                       <span className="text-[10px] text-red-400 mb-1">Action Needed</span>
                    </div>
                 </div>
              </div>

              {/* Terminal Logs */}
              <div className="rounded-lg bg-black border border-purple-500/20 p-3 mb-2">
                 <LiveTerminal />
              </div>
              
              {/* Activity */}
              <div className="flex items-center gap-2">
                 <Activity size={12} className="text-purple-500" />
                 <div className="text-[10px] text-gray-500 font-mono uppercase">CPU Analysis Load</div>
              </div>
              <ActivityWave />

            </motion.div>

            {/* Floating Alert */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: -20 }}
              whileInView={{ opacity: 1, x: -10, y: 40 }}
              transition={{ delay: 1, duration: 0.6, type: "spring" }}
              viewport={{ once: true }}
              className="absolute -right-3 top-16 z-20 bg-black/90 border border-green-500/30 p-3 rounded-lg shadow-2xl w-56 backdrop-blur-xl"
            >
               <div className="flex items-start gap-2">
                  <div className="bg-green-500/20 p-1.5 rounded-full">
                     <Check size={12} className="text-green-500" />
                  </div>
                  <div className="flex-1">
                     <h4 className="text-xs font-bold text-white">Auto-Fix Deployed</h4>
                     <p className="text-[10px] text-gray-400 mt-0.5">Memory leak in <code className="text-purple-400">auth.js</code> patched.</p>
                  </div>
                  <button className="opacity-50 hover:opacity-100">
                     <X size={10} className="text-gray-400" />
                  </button>
               </div>
            </motion.div>

            {/* Glows */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-purple-600/20 blur-[50px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-600/10 blur-[50px] rounded-full pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  )
}
