import { motion } from 'framer-motion';
import { Terminal, Cpu, Zap } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050505]  overflow-hidden pt-20 pb-15">
      
      {/* --- CYBER BACKGROUND --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent shadow-[0_0_20px_rgba(168,85,247,0.5)]"></div>

      <div className="relative max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* LEFT: Identity */}
        <div className="flex items-center gap-3">
            <div className="bg-white/5 p-2 rounded-lg border border-white/10">
                <Terminal size={18} className="text-purple-500" />
            </div>
            <div className="flex flex-col">
                <span className="text-white font-bold tracking-tight text-sm">
                    OpenRepo <span className="text-purple-500">Mentor</span>
                </span>
                <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">
                    Personal_Build_v1.0
                </span>
            </div>
        </div>

        {/* CENTER: Decorative Terminal Line */}
        <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-gray-700 select-none">
            <span>//</span>
            <span>END_OF_LINE</span>
            <span className="animate-pulse">_</span>
        </div>

        {/* RIGHT: Status & Copy */}
        <div className="flex items-center gap-6">
            {/* System Status Pill */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/5 border border-green-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] font-mono text-green-500/80">SYSTEM_STABLE</span>
            </div>

            <p className="text-gray-600 text-xs font-mono">
              © {currentYear}
            </p>
        </div>

      </div>
    </footer>
  );
}