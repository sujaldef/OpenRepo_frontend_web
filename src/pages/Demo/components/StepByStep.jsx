'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import {
  Link2,
  Clock,
  FileSearch,
  Brain,
  BarChart3,
  CheckCircle,
  Terminal,
} from 'lucide-react';
import step1Img from '../../../assets/step1.png';
import step2Img from '../../../assets/step2.png';
import step3Img from '../../../assets/step3.png';
import step4Img from '../../../assets/step4.png';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    icon: Link2,
    title: 'Login / Register',
    desc: 'Sign in to your OpenRepo account to access secure dashboards and history.',
    image: step1Img,
    position: 'above',
  },
  {
    number: '02',
    icon: Terminal,
    title: 'Open Dashboard',
    desc: 'View all managed repositories and previous analyses in one place.',
    image: step2Img,
    position: 'below',
  },
  {
    number: '03',
    icon: Link2,
    title: 'Import Repository',
    desc: 'Paste a GitHub URL or choose a local folder to import for analysis.',
    image: step3Img,
    position: 'above',
  },
  {
    number: '04',
    icon: FileSearch,
    title: 'Run Analysis',
    desc: 'Start a deep scan — static checks, security rules, and ML predictions run automatically.',
    image: step4Img,
    position: 'below',
  },
  {
    number: '05',
    icon: BarChart3,
    title: 'View Insights',
    desc: 'Inspect risk scores, file-level issues, and recommended fixes in an interactive report.',
    image: step4Img,
    position: 'above',
  },
];

export default function StepByStep() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const mm = gsap.matchMedia();
    let ctx;

    mm.add('(min-width: 768px)', () => {
      ctx = gsap.context(() => {
        const container = timelineRef.current;
        if (!container) return;

        const scrollDistance = container.scrollWidth - window.innerWidth + 400;

        const horizontalScroll = gsap.to(container, {
          x: -scrollDistance,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${scrollDistance}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        itemsRef.current.forEach((item, i) => {
          if (!item) return;
          const startY = steps[i].position === 'above' ? -50 : 50;

          gsap.fromTo(
            item,
            { opacity: 0, y: startY, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'left 90%',
                end: 'left 70%',
                containerAnimation: horizontalScroll,
                toggleActions: 'play none none reverse',
              },
            },
          );
        });
      }, sectionRef);
    });

    return () => {
      mm.revert();
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      id="step-by-step"
      ref={sectionRef}
      className="relative text-white overflow-hidden" // REMOVED bg-gradient
    >
      {/* Animated background elements */}
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

      {/* --- DESKTOP VIEW (Horizontal Scroll) --- */}
      <div className="hidden md:block">
        {/* Fixed Title Sidebar */}
        <div className="fixed top-0 left-0 h-screen w-[30%] lg:w-[35%] flex flex-col justify-center px-12 lg:px-20 z-10 bg-gradient-to-r from-black via-black to-transparent pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <div className="flex items-center gap-3 mb-4 text-purple-400">
              <Terminal size={24} />
              <span className="font-mono text-sm tracking-widest uppercase">
                Workflow
              </span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tighter text-white">
              System
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600">
                Logic
              </span>
            </h2>
            <p className="text-gray-400 mt-6 max-w-xs text-sm leading-relaxed border-l border-purple-500/30 pl-4">
              A continuous integration pipeline scanning for complexity,
              security, and logic flaws in real-time.
            </p>
          </motion.div>
        </div>

        {/* Scrollable Timeline Area */}
        <div className="relative ml-[30%] lg:ml-[35%] h-screen flex items-center">
          {/* Central Timeline Graphic */}
          <div className="fixed top-1/2 left-[30%] lg:left-[35%] right-0 transform -translate-y-1/2 flex items-center z-0">
            <div className="h-[2px] bg-gradient-to-r from-purple-600/0 via-purple-500/50 to-purple-600/0 w-full"></div>
          </div>

          {/* Cards Container */}
          <div ref={timelineRef} className="flex items-center space-x-12 px-12">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => (itemsRef.current[index] = el)}
                className={`flex-shrink-0 w-[320px] relative group ${
                  step.position === 'above' ? 'mb-[280px]' : 'mt-[280px]'
                }`}
              >
                {/* Connection Line to Center */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-purple-500/50 to-transparent h-[140px] -z-10 
                   ${step.position === 'above' ? 'top-full' : 'bottom-full rotate-180'}`}
                />

                {/* The Card - GLASS EFFECT */}
                <div className="bg-white/5 backdrop-blur-md border border-white/20 hover:border-purple-500/50 transition-all duration-300 rounded-xl overflow-hidden shadow-2xl group-hover:shadow-purple-500/20">
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-900/30 to-pink-900/30">
                    <motion.img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                  
                    {/* Number Badge on Image */}
                    <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-purple-500/50 flex items-center justify-center">
                      <span className="text-purple-400 font-bold text-sm">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Header */}
                  <div className="p-5 border-b border-white/10 bg-gradient-to-b from-purple-900/10 to-transparent">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-purple-400">
                        <step.icon size={20} />
                      </div>
                      <h3 className="text-lg font-bold text-white">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-400">{step.desc}</p>
                  </div>

                  {/* Terminal Footer - GLASS EFFECT */}
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-purple-600/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
              </div>
            ))}
            <div className="flex-shrink-0 w-[20vw]"></div>
          </div>
        </div>
      </div>

      {/* --- MOBILE VIEW (Vertical Stack) --- */}
      <div className="block md:hidden py-20 px-6">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-2">
            System <span className="text-purple-400">Logic</span>
          </h2>
          <p className="text-gray-400 text-sm">
            Review the 6-step analysis process.
          </p>
        </div>

        <div className="space-y-6 relative">
          {/* Vertical Line */}
          <div className="absolute left-4 top-4 bottom-4 w-[2px] bg-gradient-to-b from-purple-500/50 via-purple-500/30 to-transparent" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-12"
            >
              {/* Dot */}
              <div className="absolute left-[13px] top-6 w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)] z-10" />

              {/* Glass Card Mobile */}
              <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden">
                {/* Mobile Image */}
                <div className="relative h-32 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <step.icon size={16} className="text-purple-400" />
                      <h3 className="font-bold text-sm">{step.title}</h3>
                    </div>
                    <span className="text-xs text-purple-400 font-mono">
                      {step.number}
                    </span>
                  </div>

                  {/* Mini Terminal Mobile */}
                  <div className="bg-black/40 backdrop-blur-sm rounded p-2 font-mono text-[10px] text-gray-400 border border-purple-500/20">
                    <div className="flex gap-2 mb-1">
                      <span className="text-purple-400">$</span>
                      <span className="text-gray-300">{step.cmd}</span>
                    </div>
                    <div className="text-gray-500 pl-3">→ {step.log}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
