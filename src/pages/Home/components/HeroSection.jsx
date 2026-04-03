// src/pages/Home/components/HeroSection.jsx
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play, Terminal, ShieldCheck, Zap } from 'lucide-react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';

export default function HeroSection() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  // Mouse Follow for Spo tlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);

    // 3D Image Tilt Logic
    if (imageRef.current) {
      const {
        left: imgLeft,
        top: imgTop,
        width,
        height,
      } = imageRef.current.getBoundingClientRect();
      const x = (clientX - imgLeft - width / 2) / width;
      const y = (clientY - imgTop - height / 2) / height;

      imageRef.current.style.transform = `
        perspective(1200px)
        rotateY(${x * 10}deg)
        rotateX(${-y * 10}deg)
        translateZ(20px)
      `;
    }
  }

  function handleMouseLeave() {
    if (imageRef.current) {
      imageRef.current.style.transform = `
        perspective(1200px)
        rotateY(0deg)
        rotateX(0deg)
        translateZ(0px)
      `;
    }
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black selection:bg-purple-500/30"
    >
      {/* --- BACKGROUND EFFECTS --- */}

      {/* 1. Ambient Background Blobs (Static/Pulse) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      {/* 2. THE REVEALING GRID (Masked by Mouse) */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px', // Adjust grid size here
          maskImage: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              black,
              transparent 100%
            )
          `,
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              black,
              transparent 100%
            )
          `,
        }}
      />

      {/* 3. The Color Spotlight (Soft Purple Glow over the grid) */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              rgba(147, 51, 234, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20 lg:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* --- LEFT CONTENT --- */}
          <div className="space-y-5 relative text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-600/10 border border-purple-500/30 backdrop-blur-sm"
            >
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-500"></span>
              </span>
              <span className="text-[10px] font-medium text-purple-300 tracking-wide font-mono">
                AI-POWERED v2.0
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white"
            >
              Predict code quality
              <br />
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600"
                style={{ backgroundSize: '200% 200%' }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              >
                before it breaks
              </motion.span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm text-gray-400 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              AI platform that scans GitHub repositories and local projects to
              detect security flaws, predict defect risks, and surface
              actionable fixes.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="text-xs text-gray-400 max-w-md mx-auto lg:mx-0 mt-3 space-y-1"
            >
              <li>• Login or Register to your OpenRepo account</li>
              <li>
                • Open the Dashboard and import a GitHub repo or choose a local
                folder
              </li>
              <li>
                • Run analysis to detect issues, security risks, and suggested
                fixes
              </li>
              <li>• Review insights, export reports, or apply fixes</li>
            </motion.ul>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <motion.button
                onClick={() => navigate('/auth')}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group relative px-6 py-2.5 rounded-xl bg-gradient-to-b from-purple-500/80 to-purple-600/80 text-white font-semibold text-sm shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all overflow-hidden backdrop-blur-xl border border-white/20"
                style={{
                  boxShadow:
                    '0 8px 32px 0 rgba(168, 85, 247, 0.37), inset 0 1px 0 0 rgba(255,255,255,0.3)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="flex items-center gap-2 relative">
                  Get Started Free{' '}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>

              <motion.button
                onClick={() => navigate('/demo')}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group relative px-6 py-2.5 rounded-xl bg-white/5 text-white font-semibold text-sm transition-all flex items-center gap-2 justify-center backdrop-blur-xl border border-purple-500/30 hover:border-purple-500/50 shadow-lg hover:shadow-purple-500/20"
                style={{ boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.1)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50" />
                <Play className="w-4 h-4 fill-current relative z-10" />
                <span className="relative z-10">Watch Demo</span>
              </motion.button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="pt-3 flex items-center justify-center lg:justify-start gap-5 text-gray-500"
            >
              <div className="flex items-center gap-1.5 text-xs">
                <ShieldCheck size={12} className="text-purple-400" /> Secure
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <Zap size={12} className="text-purple-400" /> Real-time
              </div>
            </motion.div>
          </div>

          {/* --- RIGHT CONTENT (3D Image) --- */}
          <div className="relative lg:h-[450px] flex items-center justify-center perspective-1000">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-sm"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-purple-700 rounded-full blur-3xl opacity-20" />

              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <img
                  ref={imageRef}
                  src="/hero.png"
                  alt="Dashboard Preview"
                  className="relative z-10 w-full drop-shadow-2xl transition-transform duration-300 ease-out"
                  style={{ transformStyle: 'preserve-3d' }}
                />
              </motion.div>

              {/* Floating Cards (Retained from previous code) */}
              <motion.div
                className="absolute -left-3 top-10 z-20 bg-black/70 backdrop-blur-xl border border-purple-500/30 p-2.5 rounded-lg shadow-2xl hidden md:block"
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
                style={{
                  boxShadow:
                    '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255,255,255,0.1)',
                }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="p-1 bg-purple-500/20 rounded">
                    <Terminal size={10} className="text-purple-400" />
                  </div>
                  <span className="text-[10px] font-mono text-gray-300">
                    Scan Complete
                  </span>
                </div>
                <div className="h-0.5 w-20 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-gradient-to-r from-purple-500 to-purple-600 rounded-full" />
                </div>
                <div className="text-[9px] text-gray-500 font-mono mt-1">
                  127 files • 0.5s
                </div>
              </motion.div>

              <motion.div
                className="absolute -right-1 bottom-14 z-20 bg-black/70 backdrop-blur-xl border border-purple-500/30 p-2.5 rounded-lg shadow-2xl hidden md:block"
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
                style={{
                  boxShadow:
                    '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255,255,255,0.1)',
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-purple-500/20 rounded-full">
                    <ShieldCheck size={12} className="text-purple-400" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-white">
                      Risk: Low
                    </div>
                    <div className="text-[9px] text-gray-400">
                      Score: 87/100
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
