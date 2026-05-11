import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Instagram, Rocket, Home as HomeIcon, CreditCard, MessageCircle } from 'lucide-react';
import { track } from '@vercel/analytics';

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// PURE HARDCODED MATRIX RAIN ENGINE (Custom Message Inside)
const MatrixRain = () => {
  const chars = "stop wasting time kurt lets get to fucking work 01VORSprungテックOS369".split("");
  const columns = 15; // Optimized for mobile density

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black flex justify-around">
      {[...Array(columns)].map((_, i) => {
        const speed = Math.random() * 4 + 2;
        const delay = Math.random() * 5;
        return (
          <motion.div
            key={i}
            initial={{ y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{ duration: speed, repeat: Infinity, ease: "linear", delay: -delay }}
            className="flex flex-col text-[12px] leading-none select-none"
            style={{ fontFamily: "monospace", color: "#5CE0E6", opacity: 0.15, textShadow: "0 0 8px #5CE0E6" }}
          >
            {[...Array(40)].map((_, j) => (
              <span key={j} className="my-1">
                {chars[Math.floor(Math.random() * chars.length)]}
              </span>
            ))}
          </motion.div>
        );
      })}
    </div>
  );
};

function BentoBlock({
  Icon,
  title,
  sub,
  href,
  colSpan = 1,
  badge,
  highlight = false,
  order 
}: {
  Icon?: React.ElementType;
  title: string;
  sub: string;
  href: string;
  colSpan?: number;
  badge?: string;
  highlight?: boolean;
  order: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 25 });
  const springY = useSpring(y, { stiffness: 300, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.05);
    y.set((e.clientY - cy) * 0.05);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: order * 0.1, duration: 0.5 }}
      className={`${colSpan === 2 ? 'col-span-2' : 'col-span-1'}`}
    >
      <motion.a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ x: springX, y: springY }}
        animate={{ 
          borderColor: highlight 
            ? ['rgba(92, 224, 230, 0.3)', 'rgba(92, 224, 230, 0.8)', 'rgba(92, 224, 230, 0.3)']
            : ['rgba(255, 255, 255, 0.05)', 'rgba(92, 224, 230, 0.4)', 'rgba(255, 255, 255, 0.05)'],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative flex flex-col justify-between p-5 rounded-[24px] cursor-pointer bg-black border-[1px] transition-all duration-300 overflow-hidden min-h-[125px] active:scale-95"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.03] to-transparent pointer-events-none" />
        <div className="flex justify-between items-start mb-4 relative z-10">
          {Icon && <Icon className="text-cyan-400 w-7 h-7 group-hover:scale-110 transition-transform" />}
          {badge && (
            <span className="px-2 py-0.5 text-[8px] font-black uppercase text-white bg-red-600 rounded-full animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.5)]">
              {badge}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1 z-10">
          <span className="text-[13px] font-black tracking-widest text-white group-hover:text-cyan-400 transition-colors uppercase">
            {title}
          </span>
          <span className="text-[10px] text-white/50 leading-tight">
            {sub}
          </span>
        </div>
      </motion.a>
    </motion.div>
  );
}

export default function Home() {
  const xUrl = "https://x.com/TheLogikOS";
  const instaUrl = "https://www.instagram.com/vorsprung.tech/";
  const whatsappUrl = "https://wa.me/447787206918"; 
  const stripeUrl = "https://buy.stripe.com/5kQ6oI8IMeVA8Rs1NY2Fa0d?client_reference_id=kurt_cowley";
  const tradeDemoUrl = "https://aintthatcleanltd.co.uk";
  const holidayDemoUrl = "https://leloftbelesta.eu/tourdefrance";

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-x-hidden font-sans bg-black text-white selection:bg-cyan-500/30">
      
      <MatrixRain />
      
      {/* --- THE INTENSE GLOWING TOP BANNER --- */}
      {/* Rebuilt as a showcased reactor core piece behind the HUD */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-0 left-0 w-full z-0 flex justify-center pt-5 overflow-hidden touch-none"
      >
        <motion.img 
          src="/vorsprungtech.png" // using the wide logo as requested
          alt="Vorsprung Tech Authority" 
          className="w-full h-auto max-h-[170px] object-contain opacity-100 px-4" 
          // Stacked drop-shadow filters create the deep neon glow core
          // Animated to throb/pulse like a powering-on system
          animate={{
            filter: [
              'drop-shadow(0 0 12px #5CE0E6) drop-shadow(0 0 25px rgba(92,224,230,0.8)) drop-shadow(0 0 45px rgba(92,224,230,0.5))', // Base
              'drop-shadow(0 0 18px #5CE0E6) drop-shadow(0 0 40px rgba(92,224,230,1)) drop-shadow(0 0 70px rgba(92,224,230,0.7))', // High Pulse
              'drop-shadow(0 0 12px #5CE0E6) drop-shadow(0 0 25px rgba(92,224,230,0.8)) drop-shadow(0 0 45px rgba(92,224,230,0.5))'  // Base
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      {/* ===================================== */}
      
      {/* Background Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-sm mx-auto px-5 pb-24 pt-10 flex flex-col gap-6">
        
        {/* Identity HUD */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col items-center text-center mt-12">
          
          {/* Profile Circle */}
          <div className="relative w-28 h-28 rounded-full border-2 border-cyan-400/20 overflow-hidden shadow-[0_0_50px_rgba(92,224,230,0.2)] mb-5">
            <img src="/Founder_rat.jpg" alt="Kurt Cowley" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-cyan-400/5 mix-blend-overlay" />
          </div>
          
          {/* Name & Role */}
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-3xl font-black tracking-tighter text-white drop-shadow-lg">KURT COWLEY</h1>
            
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/5 border border-cyan-500/20 backdrop-blur-md shadow-[0_0_15px_rgba(92,224,230,0.15)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#5CE0E6]" />
              <span className="text-[9px] uppercase tracking-[0.2em] text-cyan-300 font-black">Director of Acquisitions</span>
            </div>
          </div>
        </motion.div>

        {/* Waitlist Alert (Mobile Centered) */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="w-full flex justify-center mb-[-5px]">
          <span className="px-5 py-2 text-[9px] font-black uppercase tracking-[0.3em] text-red-500 bg-black border border-red-500/30 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.2)] animate-pulse">
            DEPLOYMENT WAITLIST: 7 DAYS
          </span>
        </motion.div>

        {/* Action Grid */}
        <div className="grid grid-cols-2 gap-3 w-full">
          <BentoBlock Icon={Rocket} title="Trade System" sub="Ain't That Clean Demo. Automated Office." href={tradeDemoUrl} colSpan={2} highlight={true} order={0} />
          <BentoBlock Icon={HomeIcon} title="Holiday System" sub="Le Loft Demo. Avoid 20% Airbnb fees." href={holidayDemoUrl} colSpan={2} order={1} />
          <BentoBlock Icon={CreditCard} title="Deploy Now" sub="Secure £486 Deposit" href={stripeUrl} colSpan={1} badge="WAITLIST" order={2} />
          <BentoBlock Icon={MessageCircle} title="Direct Comms" sub="WhatsApp The Operator" href={whatsappUrl} colSpan={1} order={3} />
        </div>
      </div>

      {/* Floating Social Dock */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="fixed bottom-12 z-20 flex justify-center gap-14 w-full pointer-events-auto">
          <a href={xUrl} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-cyan-400 hover:scale-125 transition-all active:scale-90"><XIcon /></a>
          <a href={instaUrl} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-cyan-400 hover:scale-125 transition-all active:scale-90"><Instagram size={26} /></a>
      </motion.div>

      {/* Signature Footer */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="fixed bottom-4 left-0 right-0 z-20 flex flex-col items-center gap-0.5 opacity-30 pointer-events-none">
        <span style={{ fontFamily: 'monospace', fontSize: '8px', letterSpacing: '0.25em' }}>POWERED BY LogikOS</span>
        <span style={{ fontFamily: 'monospace', fontSize: '8px', letterSpacing: '0.25em' }}>3-6-9</span>
      </motion.div>

    </div>
  );
}