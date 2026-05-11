import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Instagram, Rocket, Home as HomeIcon, CreditCard, MessageCircle } from 'lucide-react';
import { track } from '@vercel/analytics';

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const MatrixRain = () => {
  const chars = "stop wasting time kurt lets get to fucking work 01VORSprungテックOS369".split("");
  const columns = 12; // Lower density for cleaner mobile fit

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black flex justify-around">
      {[...Array(columns)].map((_, i) => {
        const speed = Math.random() * 4 + 3;
        return (
          <motion.div
            key={i}
            initial={{ y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{ duration: speed, repeat: Infinity, ease: "linear", delay: -Math.random() * 5 }}
            className="flex flex-col text-[10px] leading-none opacity-10"
            style={{ fontFamily: "monospace", color: "#5CE0E6", textShadow: "0 0 8px #5CE0E6" }}
          >
            {[...Array(30)].map((_, j) => (
              <span key={j} className="my-1">{chars[Math.floor(Math.random() * chars.length)]}</span>
            ))}
          </motion.div>
        );
      })}
    </div>
  );
};

function BentoBlock({ Icon, title, sub, href, colSpan = 1, badge, highlight = false, order }: any) {
  const ref = useRef<HTMLAnchorElement>(null);
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

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: order * 0.1 }} className={colSpan === 2 ? 'col-span-2' : 'col-span-1'}>
      <motion.a
        ref={ref} href={href} target="_blank" rel="noopener noreferrer" style={{ x: springX, y: springY }}
        animate={{ borderColor: highlight ? ['rgba(92,224,230,0.3)', 'rgba(92,224,230,1)', 'rgba(92,224,230,0.3)'] : ['rgba(255,255,255,0.05)', 'rgba(92,224,230,0.4)', 'rgba(255,255,255,0.05)'] }}
        transition={{ duration: 3, repeat: Infinity }}
        onMouseMove={handleMouseMove} onMouseLeave={() => { x.set(0); y.set(0); }}
        className="group relative flex flex-col justify-between p-4 rounded-[20px] bg-black border-[1px] overflow-hidden min-h-[110px] active:scale-95 transition-transform"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.03] to-transparent pointer-events-none" />
        <div className="flex justify-between items-start z-10">
          {Icon && <Icon className="text-cyan-400 w-6 h-6 group-hover:scale-110 transition-transform" />}
          {badge && <span className="px-2 py-0.5 text-[7px] font-black uppercase text-white bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_#ef4444]">{badge}</span>}
        </div>
        <div className="z-10">
          <p className="text-[11px] font-black tracking-widest text-white group-hover:text-cyan-400 uppercase mb-0.5">{title}</p>
          <p className="text-[9px] text-white/40 leading-tight line-clamp-2">{sub}</p>
        </div>
      </motion.a>
    </motion.div>
  );
}

export default function Home() {
  const whatsappUrl = "https://wa.me/447787206918"; 
  const stripeUrl = "https://buy.stripe.com/5kQ6oI8IMeVA8Rs1NY2Fa0d?client_reference_id=kurt_cowley";

  return (
    <div className="relative h-[100dvh] w-full flex flex-col items-center justify-between overflow-hidden bg-black text-white p-4">
      <MatrixRain />
      
      {/* Intense Glowing Banner Layer */}
      <div className="absolute top-0 left-0 w-full z-0 flex justify-center pt-2 pointer-events-none">
        <motion.img 
          src="/vorsprungtech.png" alt="Authority" className="w-full h-auto max-h-[140px] object-contain px-8" 
          animate={{ filter: ['drop-shadow(0 0 10px #5CE0E6)', 'drop-shadow(0 0 25px #5CE0E6)', 'drop-shadow(0 0 10px #5CE0E6)'] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      {/* Main Content Stack */}
      <div className="relative z-10 w-full max-w-sm flex flex-col gap-4 mt-8">
        
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center">
          <div className="relative w-24 h-24 rounded-full border-2 border-cyan-400/20 overflow-hidden shadow-[0_0_30px_rgba(92,224,230,0.1)] mb-3">
            <img src="/Founder_rat.jpg" alt="Kurt" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-white uppercase">Kurt Cowley</h1>
          <div className="mt-2 flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/5 border border-cyan-500/20 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[8px] uppercase tracking-[0.2em] text-cyan-300 font-black">Director of Acquisitions</span>
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-2 gap-2 w-full">
          <BentoBlock Icon={Rocket} title="Trade" sub="Ain't That Clean Demo. Automated Office." href="https://aintthatcleanltd.co.uk" colSpan={2} highlight={true} order={0} />
          <BentoBlock Icon={HomeIcon} title="Holiday" sub="Le Loft Demo. Avoid 20% fees." href="https://leloftbelesta.eu/tourdefrance" colSpan={2} order={1} />
          <BentoBlock Icon={CreditCard} title="Deploy" sub="Secure £486 Deposit" href={stripeUrl} colSpan={1} badge="WAITLIST" order={2} />
          <BentoBlock Icon={MessageCircle} title="Comms" sub="WhatsApp Operator" href={whatsappUrl} colSpan={1} order={3} />
        </div>
      </div>

      {/* Bottom Stack: Socials + Footer */}
      <div className="relative z-10 w-full flex flex-col items-center gap-6 pb-4">
        <div className="flex justify-center gap-12">
          <a href="https://x.com/TheLogikOS" target="_blank" className="text-white/30 hover:text-cyan-400 active:scale-90 transition-all"><XIcon /></a>
          <a href="https://www.instagram.com/vorsprung.tech/" target="_blank" className="text-white/30 hover:text-cyan-400 active:scale-90 transition-all"><Instagram size={22} /></a>
        </div>
        
        <div className="flex flex-col items-center gap-0.5 opacity-20 pointer-events-none uppercase text-[7px] tracking-[0.3em] font-mono">
          <span>Powered by LogikOS</span>
          <span>3-6-9</span>
        </div>
      </div>

      <div className="fixed inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-0 opacity-60" />
    </div>
  );
}