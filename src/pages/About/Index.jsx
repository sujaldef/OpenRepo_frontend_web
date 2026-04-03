// src/pages/About/index.jsx
import { useState, useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  AnimatePresence,
} from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Terminal,
  Cpu,
  Shield,
  Globe,
  ChevronRight,
  Plus,
  Minus,
  MessageSquare,
  Mail,
  BookOpen,
  AlertCircle,
  Wifi,
  Activity,
  Lock,
} from 'lucide-react';

// --- MICRO C  OMPONENTS ---

// 1. Scramble Text Effect
const ScrambleText = ({ text, className }) => {
  const [display, setDisplay] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join(''),
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
  };

  return (
    <span onMouseEnter={scramble} className={`cursor-default ${className}`}>
      {display}
    </span>
  );
};

// 2. Typewriter Effect for FAQ
const Typewriter = ({ text, speed = 20 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span>
      {displayedText}
      <span className="animate-pulse text-purple-500 font-bold">_</span>
    </span>
  );
};

// 3. Interactive Terminal FAQ Item
const TerminalFAQ = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left group hover:bg-white/5 px-4 transition-colors"
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-purple-500 text-sm opacity-50 group-hover:opacity-100 transition-opacity">
            0{index + 1}
          </span>
          <span className="font-bold text-lg text-gray-300 group-hover:text-white transition-colors">
            {question}
          </span>
        </div>
        <div
          className={`text-purple-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        >
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-[#0A0A0A]"
          >
            <div className="p-6 pl-12 border-l-2 border-purple-500/20 ml-4 mb-4 font-mono text-sm">
              <div className="text-gray-500 mb-2 flex items-center gap-2">
                <span className="text-green-500">➜</span>
                EXECUTING_QUERY...
              </div>
              <div className="text-gray-300 leading-relaxed">
                <Typewriter text={answer} speed={15} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 4. Signal/Help Card with Holographic Scan
const SignalCard = ({ icon: Icon, title, status, action, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="relative flex flex-col bg-[#0A0A0A] border border-white/10 p-6 rounded-xl overflow-hidden group hover:border-purple-500/40 transition-colors"
    >
      {/* Holographic Scan Beam */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />

      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="p-3 bg-white/5 rounded-lg group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-colors">
          <Icon size={24} />
        </div>

        {/* Animated Signal Bars */}
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-gray-500 font-mono uppercase mr-2">
            {status}
          </span>
          {[1, 2, 3].map((bar) => (
            <div
              key={bar}
              className={`w-1 bg-green-500/50 rounded-full transition-all duration-300 ${status === 'Busy' ? 'bg-yellow-500' : 'bg-green-500'}`}
              style={{ height: `${bar * 4}px`, opacity: 0.5 }}
            />
          ))}
        </div>
      </div>

      <h3 className="text-xl font-bold mb-2 relative z-10 text-white">
        {title}
      </h3>

      <button className="mt-auto flex items-center gap-2 text-sm text-gray-400 group-hover:text-white transition-colors pt-4 border-t border-white/5 relative z-10">
        <span className="group-hover:translate-x-1 transition-transform">
          {action}
        </span>
        <ChevronRight
          size={14}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </button>
    </motion.div>
  );
};

// 5. Bento Grid Card
const BentoCard = ({ children, className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={`bg-[#080808] border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-colors relative overflow-hidden group ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10 h-full">{children}</div>
  </motion.div>
);

// 6. Holographic Launchpad (Footer CTA)
const InteractiveLaunchpad = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-32 mb-20 p-1">
      {/* Animated Border Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30 blur-xl transition-all duration-500 ${isHovered ? 'scale-110 opacity-60' : 'scale-100'}`}
      />

      <motion.button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => navigate('/auth')}
        className="relative w-full bg-black/80 border border-white/10 rounded-2xl overflow-hidden group h-[200px] flex flex-col items-center justify-center cursor-pointer"
      >
        {/* Background Grid Moving */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]" />

        {/* The "Energy" Beam */}
        <motion.div
          animate={{
            height: isHovered ? '100%' : '0%',
            opacity: isHovered ? 0.1 : 0,
          }}
          className="absolute bottom-0 w-full bg-purple-500 blur-md transition-all duration-500"
        />

        {/* Content */}
        <div className="relative z-10 text-center space-y-4">
          {/* Status Badge */}
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono border transition-colors duration-300 ${isHovered ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-white/5 border-white/10 text-gray-500'}`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full ${isHovered ? 'bg-green-400 animate-ping' : 'bg-gray-500'}`}
            />
            {isHovered ? 'SYSTEM_ARMED' : 'SYSTEM_IDLE'}
          </div>

          {/* Main Title with Glitch Effect */}
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
            <span className="inline-block relative">
              {isHovered ? (
                <ScrambleText
                  text="INITIALIZE_SEQUENCE"
                  className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-white"
                />
              ) : (
                'READY TO START?'
              )}
            </span>
          </h2>

          <p className="text-gray-400 font-mono text-sm max-w-md mx-auto">
            Click to establish secure connection with the core.
          </p>
        </div>

        {/* Animated Chevron at bottom */}
        <motion.div
          animate={{ y: isHovered ? 5 : 0 }}
          className={`absolute bottom-6 transition-opacity duration-300 ${isHovered ? 'opacity-100 text-purple-400' : 'opacity-30 text-gray-600'}`}
        >
          <ChevronRight className="rotate-90" size={24} />
        </motion.div>

        {/* Corner Brackets */}
        <div className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-white/20 group-hover:border-purple-500/50 transition-colors" />
        <div className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-white/20 group-hover:border-purple-500/50 transition-colors" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 border-white/20 group-hover:border-purple-500/50 transition-colors" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 border-white/20 group-hover:border-purple-500/50 transition-colors" />
      </motion.button>
    </div>
  );
};

// --- MAIN PAGE ---

export default function About() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const faqs = [
    {
      q: 'How do I import a repository for analysis?',
      a: 'You can paste a public GitHub URL into the import dialog or choose a local folder using the native file picker. The desktop app clones and analyzes projects locally — no manual cloning required.',
    },
    {
      q: 'Where does the analysis run — locally or in the cloud?',
      a: 'By default analysis runs locally inside the Electron desktop app so your source never leaves your machine. The backend can be used optionally for assisted features, but local analysis is the default and recommended mode.',
    },
    {
      q: 'Will my source code be uploaded or stored remotely?',
      a: 'No. OpenRepo performs scans on your machine. Only optional, anonymized metadata or explicit exports are sent if you choose to share reports or use hosted services.',
    },
    {
      q: 'Which languages and frameworks are supported?',
      a: 'OpenRepo supports major languages out of the box: JavaScript/TypeScript, Python, Java, C/C++, Go, and common web stacks. The analysis pipeline auto-detects languages and applies appropriate linters and model rules.',
    },
    {
      q: 'Can I integrate OpenRepo with CI/CD or my workflow?',
      a: 'Yes. Results can be exported as reports, and the tool can produce suggested fixes or PRs. You can also run analyses in CI by invoking the CLI or integrating the report artifacts into your pipelines.',
    },
  ];

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative bg-black min-h-screen text-white overflow-x-hidden"
    >
      {/* 1. Dynamic Spotlight Background */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 opacity-40"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(147, 51, 234, 0.1),
              transparent 80%
            )
          `,
        }}
      />

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-[0.03]" />
      <div className="fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* --- SECTION 1: HERO --- */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-purple-400 font-mono text-sm mb-6"
          >
            <Terminal size={16} />
            <span>sys_admin@openrepo:~/manifesto</span>
            <span className="w-2 h-4 bg-purple-400 animate-pulse" />
          </motion.div>

          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
            <ScrambleText text="ORDER FROM" /> <br />
            <ScrambleText text="CHAOS." />
          </h1>

          <div className="flex flex-col md:flex-row gap-8 md:items-end border-l-2 border-purple-500/50 pl-6">
            <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
              We are not just a tool. We are the{' '}
              <span className="text-white font-semibold">
                intelligence layer
              </span>{' '}
              for your entire codebase. By analyzing millions of lines of code,
              we predict failures before they manifest in production.
            </p>
            <div className="font-mono text-xs text-gray-500 uppercase tracking-widest">
              Est. 2024 &bull; v2.0.1 Stable
            </div>
          </div>
        </div>

        {/* --- SECTION 2: BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-4 mb-32 h-auto md:h-[500px]">
          <BentoCard className="md:col-span-4 md:row-span-2 flex flex-col justify-between bg-neutral-900/50">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Cpu className="text-purple-400" size={24} />
              </div>
              <span className="text-xs font-mono text-gray-500">
                AI-CORE-01
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-2">
                Predictive Logic Engine
              </h3>
              <p className="text-gray-400 max-w-sm">
                Our models don't just lint; they understand intent. We catch
                architectural drift that standard tests miss.
              </p>
            </div>
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-gradient-to-tl from-purple-600/20 to-transparent blur-3xl" />
            <div className="w-full h-24 mt-6 border-t border-white/5 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center gap-1">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [10, 30, 10] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.05,
                    }}
                    className="w-1 bg-purple-500/30 rounded-full"
                  />
                ))}
              </div>
            </div>
          </BentoCard>
          <BentoCard className="md:col-span-2 md:row-span-1" delay={0.1}>
            <Globe className="text-white mb-4" size={24} />
            <h3 className="font-bold text-lg">Decentralized</h3>
            <p className="text-xs text-gray-400 mt-2">
              Running on edge nodes globally for zero-latency analysis.
            </p>
          </BentoCard>
          <BentoCard className="md:col-span-2 md:row-span-1" delay={0.2}>
            <Shield className="text-white mb-4" size={24} />
            <h3 className="font-bold text-lg">Zero Trust</h3>
            <p className="text-xs text-gray-400 mt-2">
              Bank-grade encryption for your intellectual property.
            </p>
          </BentoCard>
        </div>

        {/* --- SECTION 3: SYSTEM QUERY (FAQ) --- */}
        <div className="mb-32">
          <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">System Query</h2>
              <p className="text-gray-400 font-mono text-sm">
                /var/logs/common_issues
              </p>
            </div>
            <div className="hidden md:block text-xs font-mono text-purple-500 bg-purple-500/10 px-3 py-1 rounded">
              READ_ONLY_ACCESS
            </div>
          </div>

          <div className="bg-[#050505] border border-white/10 rounded-2xl overflow-hidden">
            {faqs.map((f, i) => (
              <TerminalFAQ key={i} index={i} question={f.q} answer={f.a} />
            ))}
          </div>
        </div>

        {/* --- SECTION 4: UPLINK STATION (HELP) --- */}
        <div className="mb-24">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Activity className="text-purple-500 animate-pulse" />
            <h2 className="text-3xl font-bold text-center">Uplink Station</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SignalCard
              title="Documentation"
              icon={BookOpen}
              status="Online"
              action="Access Manual"
              delay={0}
            />
            <SignalCard
              title="Live Support"
              icon={MessageSquare}
              status="Busy"
              action="Open Channel"
              delay={0.1}
            />
            <SignalCard
              title="Encrypted Mail"
              icon={Lock}
              status="Online"
              action="Send Packet"
              delay={0.2}
            />
          </div>
        </div>

        {/* --- SECTION 5: FOOTER CTA --- */}
        <InteractiveLaunchpad />
      </div>
    </div>
  );
}
