import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Instagram, Rocket, Home as HomeIcon, CreditCard, MessageCircle, Scissors, Layers, X } from 'lucide-react';
import { track } from '@vercel/analytics';

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// PURE HARDCODED MATRIX RAIN ENGINE - HIGH INTENSITY
const MatrixRain = () => {
  const chars = "stop wasting time kurt lets get to fucking work 01VORSprungテックOS369".split("");
  const columns = 12;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black flex justify-around">
      {[...Array(columns)].map((_, i) => {
        const speed = Math.random() * 3 + 2; // Fast, aggressive drops
        return (
          <motion.div
            key={i}
            initial={{ y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{ duration: speed, repeat: Infinity, ease: "linear", delay: -Math.random() * 5 }}
            className="flex flex-col text-[11px] leading-none select-none"
            style={{ 
              fontFamily: "monospace", 
              color: "#5CE0E6", 
              // Triple-stacked nuclear glow
              textShadow: "0 0 5px #5CE0E6, 0 0 15px rgba(92, 224, 230, 0.8), 0 0 25px rgba(92, 224, 230, 0.5)" 
            }}
          >
            {[...Array(40)].map((_, j) => (
              <span 
                key={j} 
                className="my-1 font-bold" 
                style={{ opacity: Math.random() > 0.8 ? 1 : 0.4 }} 
              >
                {chars[Math.floor(Math.random() * chars.length)]}
              </span>
            ))}
          </motion.div>
        );
      })}
    </div>
  );
};

function BentoBlock({ Icon, title, sub, href, colSpan = 1, badge, highlight = false, locked = false, onClick, order }: any) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 25 });
  const springY = useSpring(y, { stiffness: 300, damping: 25 });

  const handleMouseMove = (e: any) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.05);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.05);
  };

  const Component = onClick ? motion.button : motion.a;
  const linkProps = onClick ? { onClick } : { href, target: "_blank", rel: "noopener noreferrer" };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: order * 0.1 }} 
      className={`${colSpan === 2 ? 'col-span-2' : 'col-span-1'} ${locked ? 'pointer-events-none' : ''} h-full`}
    >
      <Component
        ref={ref as any} 
        {...linkProps} 
        style={{ x: springX, y: springY }}
        animate={{ 
          borderColor: highlight 
            ? ['rgba(92,224,230,0.3)', 'rgba(92,224,230,1)', 'rgba(92,224,230,0.3)'] 
            : ['rgba(255,255,255,0.05)', 'rgba(92,224,230,0.4)', 'rgba(255,255,255,0.05)'] 
        }}
        transition={{ duration: 3, repeat: Infinity }}
        onMouseMove={handleMouseMove} onMouseLeave={() => { x.set(0); y.set(0); }}
        className={`group relative flex flex-col justify-between p-4 rounded-[20px] bg-black border-[1px] overflow-hidden min-h-[95px] w-full h-full transition-all text-left shadow-[0_0_15px_rgba(0,0,0,0.6)]
          ${locked ? 'opacity-40 blur-[0.5px]' : 'active:scale-95'}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.04] to-transparent pointer-events-none" />
        <div className="flex justify-between items-start z-10">
          {Icon && <Icon className="text-cyan-400 w-5 h-5 group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_#5CE0E6]" />}
          {badge && <span className="px-2 py-0.5 text-[7px] font-black uppercase text-white bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_#ef4444]">{badge}</span>}
        </div>
        <div className="z-10 mt-2">
          <p className="text-[10px] font-black tracking-widest text-white group-hover:text-cyan-400 uppercase mb-0.5">{title}</p>
          <p className="text-[8px] text-white/50 leading-tight line-clamp-2">{sub}</p>
        </div>
      </Component>
    </motion.div>
  );
}

// THE MODAL COMPONENT
const DemosModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const demos = [
    { name: "Ain't That Clean OS", category: "Trade", url: "https://aintthatcleanltd.co.uk" },
    { name: "Le Loft Belesta", category: "Holiday", url: "https://leloftbelesta.eu/tourdefrance" },
    { name: "Salon OS", category: "Salon", url: "https://www.lfg369.co.uk/demos/salon" },
    { name: "Auto Detail OS", category: "Automotive", url: "https://www.lfg369.co.uk/demos/auto-detail" },
    { name: "EV Electrical OS", category: "Trade", url: "https://www.lfg369.co.uk/demos/ev-electrical" },
    { name: "Plumbing OS", category: "Trade", url: "https://www.lfg369.co.uk/demos/plumbing" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-lg"
        >
          <motion.div 
            initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
            className="w-full max-w-sm bg-[#050A15] border border-cyan-500/30 rounded-[24px] overflow-hidden shadow-[0_0_50px_rgba(92,224,230,0.15)] relative"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 border-b border-white/5 bg-black/50">
              <div>
                <h3 className="text-cyan-400 text-[10px] uppercase tracking-[0.2em] font-black">Verified Units</h3>
                <h2 className="text-white font-bold tracking-wide mt-0.5">Global Demo Network</h2>
              </div>
              <button onClick={onClose} className="text-white/50 hover:text-white transition-colors bg-white/5 rounded-full p-1">
                <X size={18} />
              </button>
            </div>

            {/* Modal List */}
            <div className="p-2 max-h-[60vh] overflow-y-auto">
              {demos.map((demo, idx) => (
                <a 
                  key={idx} href={demo.url} target="_blank" rel="noopener noreferrer"
                  className="flex flex-col p-4 mb-2 rounded-xl bg-black border border-white/5 hover:border-cyan-400/50 hover:bg-cyan-900/10 transition-all group"
                >
                  <span className="text-[8px] uppercase tracking-widest text-cyan-400/70 font-black mb-1">{demo.category}</span>
                  <span className="text-sm text-white/90 font-bold group-hover:text-cyan-400 transition-colors">{demo.name}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const whatsappUrl = "https://wa.me/447787206918"; 
  const stripeUrl = "https://buy.stripe.com/5kQ6oI8IMeVA8Rs1NY2Fa0d?client_reference_id=kurt_cowley";

  return (
    <div className="relative h-[100dvh] w-full flex flex-col items-center justify-between overflow-hidden bg-black text-white p-3">
      <MatrixRain />
      
      {/* Absolute Dark Fade to ensure content readability over the glowing rain */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-0 opacity-80" />

      {/* Intense Glowing Banner Layer */}
      <div className="absolute top-0 left-0 w-full z-0 flex justify-center pt-2 pointer-events-none">
        <motion.img 
          src="/vorsprungtech.png" alt="Authority" className="w-full h-auto max-h-[120px] object-contain px-8" 
          animate={{ filter: ['drop-shadow(0 0 10px #5CE0E6)', 'drop-shadow(0 0 30px rgba(92,224,230,0.7))', 'drop-shadow(0 0 10px #5CE0E6)'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Main Content Stack */}
      <div className="relative z-10 w-full max-w-sm flex flex-col gap-3 mt-6">
        
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center">
          <div className="relative w-20 h-20 rounded-full border-2 border-cyan-400/30 overflow-hidden shadow-[0_0_40px_rgba(92,224,230,0.2)] mb-2">
            <img src="/Founder_rat.jpg" alt="Kurt" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-cyan-400/5 mix-blend-overlay" />
          </div>
          
          {/* BRAND MATCHING NAME TEXT (WHITE & CYAN) */}
          <h1 
            className="text-[28px] font-light tracking-[0.15em] uppercase drop-shadow-[0_0_12px_rgba(92,224,230,0.8)]"
            style={{ fontFamily: "'Helvetica Neue', Helvetica, sans-serif" }}
          >
            <span className="text-white">Kurt</span> <span className="text-[#5CE0E6]">Cowley</span>
          </h1>
          
          <div className="mt-1 flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(92,224,230,0.1)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_5px_#5CE0E6]" />
            <span className="text-[7px] uppercase tracking-[0.2em] text-cyan-300 font-black">Director of Acquisitions</span>
          </div>
        </div>

        {/* 6-Block Matrix Grid */}
        <div className="grid grid-cols-2 gap-2 w-full mt-2 px-2">
          {/* Row 1 */}
          <BentoBlock Icon={Rocket} title="Trade" sub="Ain't That Clean." href="https://aintthatcleanltd.co.uk" colSpan={1} highlight={true} order={0} />
          <BentoBlock Icon={HomeIcon} title="Holiday" sub="Le Loft Demo." href="https://leloftbelesta.eu/tourdefrance" colSpan={1} order={1} />
          
          {/* Row 2 */}
          <BentoBlock Icon={Scissors} title="Adored Beauty" sub="adoredbeauty.co.uk" locked={true} badge="LAUNCHING SOON" colSpan={1} order={2} />
          <BentoBlock Icon={Layers} title="All Demos" sub="View Full Network." onClick={() => setIsModalOpen(true)} colSpan={1} highlight={true} order={3} />
          
          {/* Row 3 */}
          <BentoBlock Icon={CreditCard} title="Deploy" sub="Secure £486 Dep." href={stripeUrl} colSpan={1} badge="WAITLIST" order={4} />
          <BentoBlock Icon={MessageCircle} title="Comms" sub="WhatsApp Link." href={whatsappUrl} colSpan={1} order={5} />
        </div>
      </div>

      {/* Bottom Stack: Socials + Footer */}
      <div className="relative z-10 w-full flex flex-col items-center gap-4 pb-3">
        <div className="flex justify-center gap-14">
          <a href="https://x.com/TheLogikOS" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-cyan-400 hover:scale-125 active:scale-90 transition-all drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"><XIcon /></a>
          <a href="https://www.instagram.com/vorsprung.tech/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-cyan-400 hover:scale-125 active:scale-90 transition-all drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"><Instagram size={24} /></a>
        </div>
        
        <div className="flex flex-col items-center gap-0.5 opacity-30 pointer-events-none uppercase text-[6px] tracking-[0.3em] font-mono">
          <span>Powered by LogikOS</span>
          <span className="text-cyan-400/60">3-6-9</span>
        </div>
      </div>

      {/* Modal Injection */}
      <DemosModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}