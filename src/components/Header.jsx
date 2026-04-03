import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Terminal, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'DEMO', path: '/demo' }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-black/60 backdrop-blur-xl py-4 shadow-2xl shadow-purple-900/5' 
          : 'bg-transparent py-6'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          
          {/* --- LEFT: CLEAN BRANDING --- */}
          <div 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 cursor-pointer group select-none"
          >
            {/* Just the icon, no box */}
            <Terminal 
              size={24} 
              className="text-purple-500 transition-transform group-hover:rotate-12" 
            />
            <span className="font-bold text-lg text-white tracking-tight">
              OpenRepo
            </span>
          </div>

          {/* --- CENTER: NAVIGATION --- */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => navigate(link.path)}
                className="relative group"
              >
                <span className={`text-xs font-mono font-medium tracking-widest transition-colors duration-300 ${
                  isActive(link.path) ? 'text-white' : 'text-gray-400 group-hover:text-purple-400'
                }`}>
                  {link.name}
                </span>
                
                {/* Minimal glow dot instead of full underline */}
                {isActive(link.path) && (
                    <motion.div 
                        layoutId="nav-glow"
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-purple-500 rounded-full shadow-[0_0_8px_#a855f7]"
                    />
                )}
              </button>
            ))}
          </div>

          {/* --- RIGHT: ACTIONS --- */}
          <div className="hidden md:flex items-center gap-6">
            
            
            <button
              onClick={() => navigate('/auth')}
              className="group flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300"
            >
              <span className="text-xs font-bold text-white tracking-wide group-hover:text-purple-200">
                GET STARTED
              </span>
              <Sparkles size={12} className="text-purple-500" />
            </button>
          </div>

          {/* --- MOBILE TOGGLE --- */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* --- MOBILE MENU --- */}
        <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden bg-black/95 backdrop-blur-xl absolute left-0 right-0 top-full border-b border-white/10"
              >
                <div className="p-6 flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <button
                      key={link.name}
                      onClick={() => {
                        navigate(link.path);
                        setMobileMenuOpen(false);
                      }}
                      className={`text-left text-lg font-mono ${
                        isActive(link.path) ? 'text-purple-400' : 'text-gray-400'
                      }`}
                    >
                      {link.name}
                    </button>
                  ))}
                  <div className="h-px bg-white/10 my-2" />
                  <button onClick={() => navigate('/auth?mode=login')} className="text-left text-gray-400 font-mono">
                    LOG_IN
                  </button>
                  <button onClick={() => navigate('/auth?mode=register')} className="text-left text-purple-400 font-mono font-bold">
                    GET STARTED
                  </button>
                </div>
              </motion.div>
            )}
        </AnimatePresence>
      </nav>
    </header>
  );
}