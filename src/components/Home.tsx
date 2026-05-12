import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Instagram, Rocket, Home as HomeIcon, CreditCard, MessageCircle, Scissors, Layers, X, Globe, Cpu, Code, Maximize } from 'lucide-react';
import { track } from '@vercel/analytics';

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// VANGUARD NETWORK - TITANIUM FLOATING NODE ENGINE
const FloatingIconsBackground = () => {
  const [mounted, setMounted] = useState(false);
  const icons = [Globe, Cpu, Code, Maximize];
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
      {/* Ghosted Vanguard Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
        <span className="text-[12vw] font-black tracking-widest uppercase text-white whitespace-nowrap">Vanguard Network</span>
      </div>

      {/* Floating Animated Nodes - Subtle Machined Silver */}
      {[...Array(20)].map((_, i) => {
        const Icon = icons[i % icons.length];
        const size = Math.random() * 24 + 16; 
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const duration = Math.random() * 40 + 30; // Slowed down for silent authority
        const rotateDirection = Math.random() > 0.5 ? 360 : -360;

        return (
          <motion.div
            key={i}
            className="absolute text-[#E2E8F0]/40 drop-shadow-[0_0_8px_rgba(226,232,240,0.3)]"
            initial={{ x: `${startX}vw`, y: `${startY}vh`, rotate: 0 }}
            animate={{
              x: [`${startX}vw`, `${startX + (Math.random() * 10 - 5)}vw`, `${startX}vw`],
              y: [`${startY}vh`, `${startY + (Math.random() * 15 - 7.5)}vh`, `${startY}vh`],
              rotate: [0, rotateDirection]
            }}
            transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
          >
            <Icon size={size} strokeWidth={1} />
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
            ? ['rgba(226,232,240,0.2)', 'rgba(226,232,240,0.6)', 'rgba(226,232,240,0.2)'] 
            : ['rgba(255,255,255,0.05)', 'rgba(226,232,240,0.2)', 'rgba(255,255,255,0.05)'] 
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        onMouseMove={handleMouseMove} onMouseLeave={() => { x.set(0); y.set(0); }}
        className={`group relative flex flex-col justify-between p-4 rounded-[20px] bg-[#02050A] border-[1px] overflow-hidden min-h-[95px] w-full h-full transition-all text-left shadow-[0_4px_20px_rgba(0,0,0,0.8)]
          ${locked ? 'opacity-40 blur-[0.5px]' : 'active:scale-95'}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#E2E8F0]/[0.02] to-transparent pointer-events-none" />
        <div className="flex justify-between items-start z-10">
          {/* PLATINUM ICONS */}
          {Icon && <Icon className="text-[#E2E8F0] w-5 h-5 group-hover:scale-110 transition-transform drop-shadow-[0_0_4px_rgba(226,232,240,0.5)]" strokeWidth={1.5} />}
          {badge && <span className="px-2 py-0.5 text-[7px] font-black uppercase tracking-widest text-[#02050A] bg-[#E2E8F0] rounded-sm">{badge}</span>}
        </div>
        <div className="z-10 mt-2">
          <p className="text-[10px] font-light tracking-[0.2em] text-[#E2E8F0] group-hover:text-white transition-colors uppercase mb-0.5">{title}</p>
          <p className="text-[8px] text-white/40 font-light tracking-wider leading-tight line-clamp-2">{sub}</p>
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
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/90 backdrop-blur-md"
        >
          <motion.div 
            initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
            className="w-full max-w-sm bg-[#02050A] border border-[#E2E8F0]/20 rounded-[20px] overflow-hidden shadow-[0_0_40px_rgba(0,0,0,1)] relative"
          >
            <div className="flex justify-between items-center p-5 border-b border-white/5 bg-black/50">
              <div>
                <h3 className="text-[#E2E8F0]/70 text-[9px] uppercase tracking-[0.3em] font-light">Verified Units</h3>
                <h2 className="text-[#E2E8F0] font-light tracking-widest uppercase text-sm mt-1">Global Network</h2>
              </div>
              <button onClick={onClose} className="text-white/40 hover:text-white transition-colors bg-white/5 rounded-full p-1.5">
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>

            <div className="p-3 max-h-[60vh] overflow-y-auto">
              {demos.map((demo, idx) => (
                <a 
                  key={idx} href={demo.url} target="_blank" rel="noopener noreferrer"
                  className="flex flex-col p-4 mb-2 rounded-xl bg-black/50 border border-white/5 hover:border-[#E2E8F0]/40 hover:bg-[#E2E8F0]/5 transition-all group"
                >
                  <span className="text-[7px] uppercase tracking-[0.3em] text-[#E2E8F0]/50 font-light mb-1">{demo.category}</span>
                  <span className="text-[11px] text-[#E2E8F0] font-light tracking-widest uppercase group-hover:text-white transition-colors">{demo.name}</span>
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
  const stripeUrl = "https://buy.stripe.com/5kQ6oI8IMeVA8Rs1NY2Fa0d"; 

  return (
    <div className="relative h-[100dvh] w-full flex flex-col items-center justify-between overflow-hidden bg-black text-white p-4">
      
      {/* INJECTING EMPIRE/BILLIONAIRE FONT */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&display=swap');`}
      </style>

      <FloatingIconsBackground />
      
      {/* Deep Shadow Fade */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-0 opacity-90" />

      {/* Glowing Banner Layer - Pushed slightly down */}
      <div className="absolute top-0 left-0 w-full z-0 flex justify-center pt-5 pointer-events-none">
        <motion.img 
          src="/vorsprungtech.png" alt="Authority" className="w-full h-auto max-h-[90px] object-contain px-10 opacity-90" 
          animate={{ filter: ['drop-shadow(0 0 10px #5CE0E6)', 'drop-shadow(0 0 25px rgba(92,224,230,0.5))', 'drop-shadow(0 0 10px #5CE0E6)'] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Main Content Stack - mt-[110px] ensures it NEVER overlaps the logo */}
      <div className="relative z-10 w-full max-w-sm flex flex-col gap-4 mt-[110px]">
        
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center">
          
          {/* ARCHITECTURAL PORTRAIT (Squircle + Editorial Filter) */}
          <div className="relative w-24 h-24 rounded-2xl border-[1px] border-[#E2E8F0]/20 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.9)] mb-4 bg-black">
            <img 
              src="/Founder_1.jpg" 
              alt="Oscar Mahtani" 
              className="w-full h-full object-cover grayscale contrast-125 brightness-90" 
            />
            {/* Inner Shadow to blend the bottom of the photo into the black background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-90 mix-blend-multiply" />
            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]" />
          </div>
          
          {/* HIGH-END ARCHITECT METALLIC NAME TEXT */}
          <div className="flex items-center justify-center gap-3">
            <h1 
              className="text-[22px] tracking-[0.25em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#E2E8F0] to-[#64748B] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              style={{ fontFamily: "'Cinzel', serif", fontWeight: 400 }}
            >
              Oscar Mahtani
            </h1>
            <img 
              src="/vorsprungicon.png" 
              alt="Verified" 
              className="w-4 h-4 object-contain flex-shrink-0 drop-shadow-[0_0_4px_rgba(226,232,240,0.5)] -mt-1" 
            />
          </div>
          
          {/* METALLIC WAVE / GLOW BADGE */}
          <div className="mt-4 relative flex items-center justify-center px-6 py-2 overflow-hidden bg-[#E2E8F0]/[0.02] border-y-[1px] border-[#E2E8F0]/10 rounded-sm">
            {/* The sweeping light beam */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E2E8F0]/10 to-transparent w-[200%]"
              animate={{ x: ['-100%', '50%'] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
            />
            <span className="text-[8px] uppercase tracking-[0.4em] text-[#E2E8F0] font-light relative z-10">
              Director <span className="opacity-40 mx-2">|</span> Architect
            </span>
          </div>
        </div>

        {/* 6-Block Matrix Grid */}
        <div className="grid grid-cols-2 gap-2 w-full mt-2 px-1">
          {/* Row 1 */}
          <BentoBlock Icon={Rocket} title="Trade" sub="Ain't That Clean." href="https://aintthatcleanltd.co.uk" colSpan={1} highlight={true} order={0} />
          <BentoBlock Icon={HomeIcon} title="Holiday" sub="Le Loft Demo." href="https://leloftbelesta.eu/tourdefrance" colSpan={1} order={1} />
          
          {/* Row 2 - ADORED BEAUTY NOW LIVE */}
          <BentoBlock Icon={Scissors} title="Adored Beauty" sub="adoredbeauty.co.uk" href="https://adoredbeauty.co.uk" colSpan={1} order={2} />
          <BentoBlock Icon={Layers} title="All Demos" sub="View Network." onClick={() => setIsModalOpen(true)} colSpan={1} highlight={true} order={3} />
          
          {/* Row 3 */}
          <BentoBlock Icon={CreditCard} title="Deploy" sub="Secure £486 Dep." href={stripeUrl} colSpan={1} badge="WAITLIST" order={4} />
          <BentoBlock Icon={MessageCircle} title="Comms" sub="Encrypted Line." href={whatsappUrl} colSpan={1} order={5} />
        </div>
      </div>

      {/* Bottom Stack: PLATINUM Socials + Footer */}
      <div className="relative z-10 w-full flex flex-col items-center gap-5 pb-4">
        <div className="flex justify-center gap-14">
          <a href="https://x.com/TheLogikOS" target="_blank" rel="noopener noreferrer" className="text-[#E2E8F0]/60 hover:text-white hover:scale-110 active:scale-95 transition-all"><XIcon /></a>
          <a href="https://www.instagram.com/vorsprung.tech/" target="_blank" rel="noopener noreferrer" className="text-[#E2E8F0]/60 hover:text-white hover:scale-110 active:scale-95 transition-all"><Instagram size={20} strokeWidth={1.5} /></a>
        </div>
        
        <div className="flex flex-col items-center gap-1 opacity-40 uppercase text-[6px] tracking-[0.5em] font-light font-mono">
          <span className="text-white">Powered by LogikOS</span>
          <span className="text-[#E2E8F0]">3-6-9</span>
        </div>
      </div>

      {/* Modal Injection */}
      <DemosModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}