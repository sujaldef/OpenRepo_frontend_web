// src/pages/Demo/components/VideoDemo.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Cpu,
  Zap,
  Shield,
  Terminal,
  Code,
  GitBranch,
  Bug,
} from 'lucide-react';
import step2Img from '../../../assets/step2.png';

export default function VideoDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  // Local demo video bundled with the site
  // Using Vite-imported asset ensures the file is served correctly in dev and production.
  // eslint-disable-next-line no-undef
  const demoVideo = new URL('../../../assets/demo_video.mp4', import.meta.url)
    .href;

  return (
    <section
      id="video-demo"
      className="py-24 relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Animated Background E  lements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
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
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Animated Grid Background */}
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
          ease: 'linear',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-600/10 border border-purple-500/30 text-xs text-purple-400 mb-4 backdrop-blur-sm"
            >
              <Terminal size={12} />
              <span className="font-mono uppercase tracking-wider">
                Live Demo
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2"
            >
              Watch the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600">
                AI in Action
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-sm max-w-xl"
            >
              See real-time code analysis, bug detection, and risk prediction in
              a live repository scan
            </motion.p>
          </div>
        </div>

        {/* Glass Video Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="group relative w-full aspect-video rounded-2xl bg-white/5 backdrop-blur-md border border-white/20 shadow-[0_0_80px_-12px_rgba(168,85,247,0.4)] overflow-hidden"
        >
          {/* Terminal-style Header */}
          <div className="absolute top-0 left-0 right-0 h-12 bg-black/40 backdrop-blur-md border-b border-purple-500/20 flex items-center px-5 justify-between z-20">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <div className="text-[11px] font-mono text-purple-400 flex items-center gap-2">
              <Terminal size={12} />
              demo_video.mp4
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="hidden sm:inline">2:15</span>
            </div>
          </div>

          {/* Video Content Area */}
          <div className="relative w-full h-full pt-12 bg-gradient-to-br from-purple-900/10 to-pink-900/10">
            {isPlaying ? (
              <video
                className="w-full h-full"
                controls
                autoPlay
                src={demoVideo}
              />
            ) : (
              <div
                className="relative w-full h-full flex items-center justify-center cursor-pointer"
                onClick={() => setIsPlaying(true)}
              >
                {/* Thumbnail with Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/50 to-black">
                  <motion.img
                    src={step2Img}
                    alt="Demo Preview"
                    className="w-full h-full object-cover opacity-40"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-purple-900/30 to-transparent"></div>
                </div>

                {/* Animated Play Button */}
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative z-10 group/btn"
                >
                  {/* Pulse Rings */}
                  <motion.div
                    className="absolute inset-0 bg-purple-500 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-pink-500 rounded-full"
                    animate={{
                      scale: [1, 1.8, 1],
                      opacity: [0.3, 0, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 0.5,
                    }}
                  />

                  {/* Button */}
                  <div className="relative w-24 h-24 bg-white/10 backdrop-blur-xl border-2 border-purple-500/50 rounded-full flex items-center justify-center shadow-2xl group-hover/btn:bg-purple-600/20 group-hover/btn:border-purple-400 transition-all">
                    <Play className="w-10 h-10 text-white fill-white ml-1.5" />
                  </div>
                </motion.div>

                {/* Bottom Info Overlay */}
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div>
                    <h3 className="text-white font-bold text-xl mb-1">
                      Complete Walkthrough
                    </h3>
                    <p className="text-purple-300 text-sm flex items-center gap-2">
                      <span>2:15 min</span>
                      <span className="text-purple-500">•</span>
                      <span>Full HD</span>
                    </p>
                  </div>
                  <div className="bg-purple-600/20 backdrop-blur-sm border border-purple-500/30 px-3 py-1.5 rounded-full text-xs text-purple-300 font-mono">
                    Click to play
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Hover Glow */}
          <div className="absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"></div>
        </motion.div>

        {/* Feature Tags Below */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: GitBranch,
              title: 'Repo Scanning',
              desc: 'Deep code analysis',
            },
            { icon: Bug, title: 'Bug Detection', desc: 'Real-time linting' },
            {
              icon: Shield,
              title: 'Security Check',
              desc: 'Vulnerability scan',
            },
            { icon: Code, title: 'Risk Prediction', desc: 'ML-powered scores' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-purple-500/30 transition-all group/card"
            >
              <item.icon className="w-5 h-5 text-purple-400 mb-3 group-hover/card:text-purple-300 transition-colors" />
              <h4 className="text-white text-sm font-semibold mb-1">
                {item.title}
              </h4>
              <p className="text-gray-500 text-xs">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
