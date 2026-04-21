import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import {
  Download,
  ShieldAlert,
  Cpu,
  Terminal,
  Activity,
  Zap,
  Monitor,
  Lock,
  AlertTriangle,
  ChevronRight,
  Database,
  Search,
  Box,
  BrainCircuit,
} from 'lucide-react';

export default function WindowsDownloadPage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-black text-white font-mono selection:bg-purple-500/30 overflow-x-hidden"
    >
      {/* BACKGROUND  CORE */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-600/5 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none"></div>
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* HEADER / NAVIGATION BREADCRUMB */}
        <nav className="flex items-center gap-4 text-[10px] text-purple-500/60 mb-16 border-b border-purple-500/10 pb-4">
          <span className="flex items-center gap-1">
            <Box size={10} /> OPENREPO
          </span>
          <ChevronRight size={10} />
          <span className="text-purple-400">DISTRIBUTION_STATION</span>
          <ChevronRight size={10} />
          <span className="bg-purple-500/20 px-2 py-0.5 rounded text-purple-300 animate-pulse">
            WINDOWS_X64_ONLY
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT COLUMN: THE HOOK */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-5xl font-black tracking-tighter leading-none mb-4">
                OpenRepo — Desktop Analyzer
              </h1>
              <p className="text-gray-400 text-sm max-w-md leading-relaxed">
                Run code analysis locally on your machine. Quick scans, clear
                findings, and suggested fixes — no cloud upload required unless
                you choose to share results.
              </p>
            </motion.div>

            {/* LIVE SCANNER COMPONENT */}
            <LiveTerminal />

            {/* THE PRIMARY DOWNLOAD */}
            <div className="flex flex-col gap-4">
              <motion.button
                whileHover={{ scale: 1.02, x: 10 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full md:w-[400px] py-6 bg-purple-600 rounded-sm flex items-center justify-center gap-4 border-t-2 border-purple-400 overflow-hidden shadow-[0_20px_40px_rgba(168,85,247,0.2)]"
              >
                <Monitor size={24} />
                <div className="text-left">
                  <div className="text-sm font-bold leading-none">
                    Download OpenRepo Desktop
                  </div>
                  <div className="text-[10px] opacity-60">
                    Installer • Windows x64 • Version 2.1.0
                  </div>
                </div>
                <Download className="ml-4 group-hover:translate-y-1 transition-transform" />
              </motion.button>
              <p className="text-[9px] text-gray-500 uppercase tracking-widest px-1">
                Supported: Windows 10/11 (64-bit). Runs offline — your code
                stays local.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: MODULAR STATS & INFO */}
          <div className="lg:col-span-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <SmallCard
                icon={ShieldAlert}
                title="SECURITY"
                val="99.9%"
                color="text-green-500"
              />
              <SmallCard
                icon={Zap}
                title="LATENCY"
                val="14ms"
                color="text-purple-400"
              />
              <SmallCard
                icon={Database}
                title="TRAINED_ON"
                val="2M+ REPOS"
                color="text-blue-400"
              />
              <SmallCard
                icon={Activity}
                title="RISK_ENGINE"
                val="ACTIVE"
                color="text-purple-500 animate-pulse"
              />
            </div>

            {/* THE "WHY" SECTION */}
            <div className="bg-purple-500/5 border border-purple-500/10 p-6 rounded-sm space-y-6">
              <h3 className="text-xs font-bold text-purple-400 border-b border-purple-500/20 pb-2">
                Why OpenRepo
              </h3>
              <FeatureItem
                icon={Lock}
                text="Private local scans — your source code never leaves your machine by default."
              />
              <FeatureItem
                icon={Search}
                text="Find security issues, logic errors, and maintainability hotspots fast."
              />
              <FeatureItem
                icon={BrainCircuit}
                text="Actionable recommendations and suggested fixes to speed up remediation."
              />
            </div>

            {/* SYSTEM INFO TABLE */}
            <table className="w-full text-[10px] text-gray-500">
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-2">Installer</td>
                  <td className="text-right text-gray-300">
                    OpenRepo_Setup.exe
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2">Size</td>
                  <td className="text-right text-gray-300 font-mono text-[8px]">
                    ~120 MB
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2">Platform</td>
                  <td className="text-right text-gray-300">Windows x64</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ MINI-SECTOR */}
        <section className="mt-24 pt-12 border-t border-purple-500/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <FAQMini
              q="How do I install?"
              a="Download the installer and run the EXE. The setup is one-click and will guide you through installation."
            />
            <FAQMini
              q="Does my code leave my PC?"
              a="No — analysis runs locally by default. You only upload or share results if you explicitly choose to export or submit a report."
            />
          </div>
        </section>
      </main>
    </div>
  );
}

// --- SUB COMPONENTS ---

function LiveTerminal() {
  const [lines, setLines] = useState([
    'Initializing OpenRepo Core...',
    'Establishing Neural Link...',
  ]);
  const [status, setStatus] = useState('SCANNING');

  useEffect(() => {
    const logs = [
      'Preparing installer package...',
      'Local analysis ready — no upload required',
      'Quick scan mode: security + linting',
      'Generating concise report and suggestions',
      'Installer packaged — ready to download',
    ];
    let i = 0;
    const interval = setInterval(() => {
      setLines((prev) => [...prev.slice(-4), logs[i]]);
      i = (i + 1) % logs.length;
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-black border border-purple-500/30 rounded-sm overflow-hidden shadow-2xl">
      <div className="bg-purple-500/10 px-4 py-2 flex items-center justify-between border-b border-purple-500/20">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
        <span className="text-[9px] text-purple-400 font-bold uppercase tracking-widest flex items-center gap-2">
          <Activity size={10} className="animate-pulse" /> LIVE_AUDIT_LOG
        </span>
      </div>
      <div className="p-4 h-40 font-mono text-[11px] text-purple-300/80 space-y-1">
        {lines.map((line, idx) => (
          <div
            key={idx}
            className={
              line.includes('[WARNING]')
                ? 'text-red-400'
                : line.includes('[SUCCESS]')
                  ? 'text-green-400'
                  : ''
            }
          >
            {line}
          </div>
        ))}
        <motion.div
          animate={{ opacity: [0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-2 h-4 bg-purple-500 align-middle ml-1"
        />
      </div>
    </div>
  );
}

function SmallCard({ icon: Icon, title, val, color }) {
  return (
    <div className="bg-white/5 border border-white/5 p-4 rounded-sm group hover:border-purple-500/30 transition-all">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={12} className="text-purple-500" />
        <span className="text-[9px] text-gray-500 uppercase">{title}</span>
      </div>
      <div className={`text-xl font-black tracking-tighter ${color}`}>
        {val}
      </div>
    </div>
  );
}

function FeatureItem({ icon: Icon, text }) {
  return (
    <div className="flex gap-3 items-start group">
      <div className="mt-1 p-1 bg-purple-500/20 rounded">
        <Icon size={12} className="text-purple-400" />
      </div>
      <p className="text-xs text-gray-400 leading-tight group-hover:text-gray-200 transition-colors">
        {text}
      </p>
    </div>
  );
}

function FAQMini({ q, a }) {
  return (
    <div className="space-y-2">
      <div className="text-purple-400 text-xs font-bold uppercase tracking-tighter flex items-center gap-2">
        <AlertTriangle size={12} /> {q}
      </div>
      <p className="text-gray-500 text-xs leading-relaxed italic">{a}</p>
    </div>
  );
}

function BrainCircuit(props) {
  return <Cpu {...props} />;
}
