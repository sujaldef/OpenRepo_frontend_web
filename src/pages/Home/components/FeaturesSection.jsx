// src/pages/Home/components/FeaturesSection.jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion'
import { Brain, Shield, Zap, Activity, AlertTriangle, MousePointer2, CheckCircle2, Lock, Terminal } from 'lucide-react'
 
// --- VISUALS (Ke ep all your existing visual components exactly as they are) ---
const PredictiveVisual = () => {
  const [hoveredNode, setHoveredNode] = useState(null)
  
  const nodes = [
    { id: 1, x: 20, y: 40, risk: 12, label: 'Auth.ts' },
    { id: 2, x: 50, y: 20, risk: 89, label: 'Payment.js' },
    { id: 3, x: 80, y: 40, risk: 5, label: 'Utils.ts' },
    { id: 4, x: 50, y: 70, risk: 45, label: 'Database.go' },
  ]

  return (
    <div className="w-full h-full bg-[#080808] relative rounded-xl border border-purple-500/20 overflow-hidden flex flex-col">
      <div className="p-3 border-b border-purple-500/10 flex justify-between items-center bg-purple-500/5">
        <div className="text-[10px] font-mono text-purple-300">PREDICTION_ENGINE_V2</div>
        <div className="flex gap-2 text-[9px] text-gray-500">
           <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-red-500" /> High</span>
           <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Safe</span>
        </div>
      </div>

      <div className="flex-1 relative cursor-crosshair">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <line x1="20%" y1="40%" x2="50%" y2="20%" stroke="rgba(147,51,234,0.2)" strokeWidth="1" />
          <line x1="50%" y1="20%" x2="80%" y2="40%" stroke="rgba(147,51,234,0.2)" strokeWidth="1" />
          <line x1="50%" y1="20%" x2="50%" y2="70%" stroke="rgba(147,51,234,0.2)" strokeWidth="1" />
        </svg>

        {nodes.map((node) => (
          <motion.div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            whileHover={{ scale: 1.2 }}
            onMouseEnter={() => setHoveredNode(node)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div className={`w-6 h-6 rounded-full border flex items-center justify-center backdrop-blur-md transition-colors duration-300 ${
              node.risk > 50 
                ? 'border-red-500 bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.3)]' 
                : 'border-purple-500 bg-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full ${node.risk > 50 ? 'bg-red-500' : 'bg-purple-400'}`} />
            </div>

            <AnimatePresence>
              {hoveredNode?.id === node.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-8 left-1/2 -translate-x-1/2 w-32 bg-black/90 border border-purple-500/30 p-2 rounded-lg z-20 pointer-events-none backdrop-blur-xl"
                >
                  <div className="text-[10px] font-bold text-white mb-1">{node.label}</div>
                  <div className="flex justify-between text-[9px] text-gray-400">
                    <span>Risk</span>
                    <span className={node.risk > 50 ? 'text-red-400' : 'text-purple-400'}>{node.risk}%</span>
                  </div>
                  {node.risk > 50 && (
                    <div className="mt-1.5 text-[9px] text-red-300 bg-red-500/10 p-1 rounded flex items-center gap-1">
                      <AlertTriangle size={8} /> Logic Issue
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
        
        {!hoveredNode && (
             <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 flex items-center gap-1.5 pointer-events-none"
             >
                <MousePointer2 size={10} /> Hover to inspect
             </motion.div>
        )}
      </div>
    </div>
  )
}

const MetricsVisual = () => {
  const [activeTab, setActiveTab] = useState('complexity')
  
  const dataMap = {
    complexity: [30, 45, 25, 60, 40, 75, 50],
    debt: [80, 70, 60, 50, 45, 30, 20],
    coverage: [20, 30, 45, 55, 60, 75, 88]
  }
  const currentData = dataMap[activeTab]

  return (
    <div className="w-full h-full bg-[#080808] rounded-xl border border-purple-500/20 overflow-hidden flex flex-col p-4">
       <div className="flex p-0.5 bg-purple-500/5 rounded-lg mb-4 w-fit border border-purple-500/20">
          {['complexity', 'debt', 'coverage'].map((tab) => (
             <button
                key={tab}
                onClick={(e) => { e.stopPropagation(); setActiveTab(tab); }}
                className={`px-3 py-1 rounded-md text-[10px] font-medium transition-all ${
                   activeTab === tab 
                      ? 'bg-purple-600 text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white'
                }`}
             >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
             </button>
          ))}
       </div>

       <div className="flex-1 flex items-end justify-between gap-1.5 relative">
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
             {[...Array(4)].map((_, i) => <div key={i} className="w-full h-[1px] bg-purple-500/30" />)}
          </div>

          {currentData.map((h, i) => (
             <motion.div
                key={`${activeTab}-${i}`}
                className="w-full bg-purple-500/20 rounded-t-sm relative group cursor-pointer hover:bg-purple-500/40 transition-colors"
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 15, delay: i * 0.05 }}
             >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                   {h}
                </div>
             </motion.div>
          ))}
       </div>
    </div>
  )
}

const SecurityVisual = () => {
  const [secure, setSecure] = useState(false)
  
  return (
    <div className="relative w-full h-full bg-[#080808] flex flex-col p-4 rounded-xl border border-purple-500/20 overflow-hidden font-mono text-[10px]">
       <div className="flex justify-between items-center mb-4 pb-2 border-b border-purple-500/10">
           <span className="text-gray-400">/src/config.ts</span>
           <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${secure ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
               {secure ? 'SECURE' : 'CRITICAL'}
           </span>
       </div>

       <div className="flex-1 space-y-2 opacity-90">
          <div className="text-gray-500">// config.ts</div>
          <div className="text-purple-300">export const <span className="text-blue-300">awsConfig</span> = {'{'}</div>
          <div className="pl-3 text-gray-400">region: <span className="text-green-300">'us-east-1'</span>,</div>
          
          <AnimatePresence mode='wait'>
            {!secure ? (
               <motion.div 
                 key="unsafe"
                 initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                 className="pl-3 bg-red-500/10 border-l border-red-500 text-red-200 py-1.5 flex items-center justify-between pr-3"
               >
                 <span>secretKey: "AKIA...789"</span> 
                 <AlertTriangle size={12} className="text-red-500 animate-pulse" />
               </motion.div>
            ) : (
               <motion.div 
                 key="safe"
                 initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                 className="pl-3 bg-green-500/10 border-l border-green-500 text-green-300 py-1.5 flex items-center justify-between pr-3"
               >
                 <span>secretKey: process.env.KEY</span> 
                 <Lock size={12} className="text-green-500" />
               </motion.div>
            )}
          </AnimatePresence>
          
          <div className="text-purple-300">{'}'}</div>
       </div>

       <div className="mt-3 flex justify-between items-center gap-2">
          <div className="text-gray-500 italic text-[9px]">
              {secure ? "Fixed via env vars" : "Hardcoded secret line 4"}
          </div>
          {!secure ? (
            <button 
               onClick={(e) => { e.stopPropagation(); setSecure(true); }}
               className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-[10px] font-bold transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)]"
            >
               AUTO-FIX
            </button>
          ) : (
             <button 
               onClick={(e) => { e.stopPropagation(); setSecure(false); }}
               className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-400 rounded-lg text-[10px] transition-colors"
            >
               Reset
            </button>
          )}
       </div>
    </div>
  )
}

const FeedbackVisual = () => {
    const [status, setStatus] = useState('idle')
  
    const runChecks = (e) => {
       e.stopPropagation();
       setStatus('running');
       setTimeout(() => setStatus('done'), 2000);
    }
  
    return (
       <div className="w-full h-full bg-[#080808] p-4 rounded-xl border border-purple-500/20 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-center mb-4">
             <div className="flex items-center gap-1.5 text-gray-300">
                <Terminal size={14} />
                <span className="text-[11px] font-bold">CI/CD</span>
             </div>
             <div className="flex gap-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-red-500/20" />
                 <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/20" />
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500/20" />
             </div>
          </div>
  
          <div className="space-y-2 flex-1">
             {['Static Analysis', 'Unit Tests', 'Build Optimization'].map((step, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-purple-500/5 border border-purple-500/10">
                   <div className={`w-4 h-4 shrink-0 rounded-full flex items-center justify-center border ${
                      status === 'idle' ? 'border-gray-600' :
                      status === 'running' ? 'border-purple-500 border-t-transparent animate-spin' :
                      'bg-green-500 border-green-500'
                   }`}>
                      {status === 'done' && <CheckCircle2 size={10} className="text-white" />}
                   </div>
                   <div className={`text-[10px] font-mono ${status === 'done' ? 'text-white' : 'text-gray-500'}`}>{step}</div>
                   {status === 'done' && (
                       <motion.div 
                            initial={{opacity:0, x:10}} 
                            animate={{opacity:1, x:0}} 
                            transition={{delay: i * 0.2}} 
                            className="ml-auto text-[9px] text-green-400 font-mono"
                       >
                            {(Math.random() * 0.2 + 0.05).toFixed(3)}s
                       </motion.div>
                   )}
                </div>
             ))}
          </div>
  
          <div className="mt-auto pt-3">
             <button 
                onClick={runChecks}
                disabled={status === 'running'}
                className={`w-full py-2.5 font-bold text-[11px] rounded-lg transition-all flex justify-center items-center gap-2 ${
                    status === 'done' 
                        ? 'bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]' 
                        : 'bg-purple-600 text-white hover:bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                } disabled:opacity-50`}
             >
                {status === 'running' ? 'Running...' : status === 'done' ? 'Ready' : 'Run Checks'}
                {status === 'done' ? <CheckCircle2 size={14} /> : <Zap size={14} className={status === 'running' ? 'animate-pulse' : ''} />}
             </button>
          </div>
       </div>
    )
  }

const features = [
    { id: 0, title: 'Predictive Intelligence', desc: 'Interactive logic graph. Click nodes to trace failures.', icon: Brain, visual: PredictiveVisual },
    { id: 1, title: 'Deep Metrics', desc: 'Track technical debt over time with interactive charts.', icon: Activity, visual: MetricsVisual },
    { id: 2, title: 'Real-time Security', desc: 'Instant detection of hardcoded secrets. Auto-fix simulation.', icon: Shield, visual: SecurityVisual },
    { id: 3, title: 'Instant Feedback', desc: 'Zero-latency pipeline. Run the speed test.', icon: Zap, visual: FeedbackVisual }
]

export default function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [isHoveringList, setIsHoveringList] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }
  
  const VisualComponent = features[activeFeature].visual

  useEffect(() => {
    if (isHoveringList) return
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [isHoveringList])

  return (
    <section onMouseMove={handleMouseMove} className="relative py-20 bg-black text-white overflow-hidden">
      {/* BACKGROUND EFFECTS */}
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

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        <div className="mb-12 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-2.5 py-1 mb-3 text-[10px] font-mono text-purple-300 border border-purple-500/30 rounded-full bg-purple-500/10"
          >
            FEATURES
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            A debugger that <br />
            <span className="text-purple-500">thinks like an architect.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          
          {/* LEFT: Feature List */}
          <div 
             className="space-y-2 flex flex-col justify-center"
             onMouseEnter={() => setIsHoveringList(true)}
             onMouseLeave={() => setIsHoveringList(false)}
          >
            {features.map((feature, index) => (
              <div
                key={feature.id}
                onClick={() => setActiveFeature(index)}
                className={`group cursor-pointer p-4 rounded-xl transition-all duration-300 relative overflow-hidden ${
                  activeFeature === index 
                    ? 'bg-purple-500/5 border border-purple-500/30' 
                    : 'hover:bg-purple-500/5 opacity-50 hover:opacity-100 border border-transparent'
                }`}
              >
                {activeFeature === index && (
                    <motion.div 
                        layoutId="active-indicator"
                        className="absolute left-0 top-0 bottom-0 w-0.5 bg-purple-500"
                    />
                )}

                <div className="flex items-center gap-3 mb-1">
                  <div className={`${activeFeature === index ? 'text-purple-400' : 'text-gray-400'}`}>
                    <feature.icon size={18} />
                  </div>
                  <h3 className="text-base font-semibold text-white">
                    {feature.title}
                  </h3>
                </div>
                
                <div className={`overflow-hidden transition-all duration-500 ${
                  activeFeature === index ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <p className="text-gray-400 text-xs leading-relaxed pl-8">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Visual Window */}
          <div className="h-[380px] w-full relative group">
            <div className="relative h-full w-full rounded-xl border border-purple-500/20 bg-black shadow-2xl overflow-hidden">
              <div className="relative z-10 w-full h-full p-3">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFeature}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="h-full w-full"
                    >
                      <VisualComponent />
                    </motion.div>
                  </AnimatePresence>
              </div>
            </div>
            
            <div className="absolute -inset-3 bg-gradient-to-r from-purple-500/10 to-purple-700/10 blur-2xl -z-10 opacity-50" />
          </div>

        </div>
      </div>
    </section>
  )
}
