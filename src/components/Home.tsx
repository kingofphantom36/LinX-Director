import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { BadgeCheck, Twitter, Instagram, Lock, ChevronRight, X } from 'lucide-react';
import { track } from '@vercel/analytics';

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
  </svg>
);

const SnapchatIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12.1 2.21c-2.4-.07-4.59 1.19-5.63 3.37-.42.86-.54 1.84-.46 2.81.08 1.01.27 2 .54 2.98.08.3-.18.61-.49.52a6.38 6.38 0 0 1-1.46-.66c-.46-.3-.98-.22-1.35.15-.35.35-.41.9-.13 1.31.53.76 1.3 1.34 2.18 1.63.48.16.59.8.18 1.13-.5.4-1.07.72-1.68.95-.5.18-.7.8-.35 1.19.86.96 2 1.65 3.25 1.95 1.25.3 2.53.25 3.75-.1a6.11 6.11 0 0 0 .5-.15c.34-.14.73.08.74.45.02.5.15.98.37 1.41.28.55.84.86 1.46.86s1.18-.31 1.46-.86c.22-.43.35-.91.37-1.41.01-.37.4-.59.74-.45.17.06.33.11.5.15 1.22.35 2.5.4 3.75.1 1.25-.3 2.39-.99 3.25-1.95.35-.39.15-1.01-.35-1.19a8.03 8.03 0 0 1-1.68-.95c-.41-.33-.3-.97.18-1.13.88-.29 1.65-.87 2.18-1.63.28-.41.22-.96-.13-1.31-.37-.37-.89-.45-1.35-.15a6.38 6.38 0 0 1-1.46.66c-.31.09-.57-.22-.49-.52.27-.98.46-1.97.54-2.98.08-.97-.04-1.95-.46-2.81-1.04-2.18-3.23-3.44-5.63-3.37z" />
  </svg>
);

const teaserImages = [
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop',
];

const modalGalleryImages = [
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?q=80&w=600&auto=format&fit=crop',
];

function BentoBlock({
  iconImg,
  bannerImg,
  title,
  sub,
  href,
  colSpan = 1,
  badge,
  highlight = false,
  customIconSize = "h-5",
  order // 0, 1, 2, 3
}: {
  iconImg?: string;
  bannerImg?: string;
  title: string;
  sub: string;
  href: string;
  colSpan?: number;
  badge?: string;
  highlight?: boolean;
  customIconSize?: string;
  order: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.1);
    y.set((e.clientY - cy) * 0.1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const totalDuration = 6;
  const startTime = (order * 0.8) / totalDuration;
  const endTime = ((order * 0.8) + 1.2) / totalDuration;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: order * 0.1, duration: 0.5 }}
      className={`relative ${colSpan === 2 ? 'col-span-2' : 'col-span-1'}`}
    >
      <motion.a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('Bento_Clicked', { block_title: title })}
        style={{ x: springX, y: springY }}
        animate={{ 
          scale: [1, 1, 1.1, 1.1, 1, 1],
          zIndex: [1, 1, 30, 30, 1, 1],
          borderColor: highlight 
            ? ['rgba(34, 211, 238, 0.4)', 'rgba(34, 211, 238, 0.4)', 'rgba(34, 211, 238, 1)', 'rgba(34, 211, 238, 1)', 'rgba(34, 211, 238, 0.4)', 'rgba(34, 211, 238, 0.4)']
            : ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.1)', 'rgba(34, 211, 238, 1)', 'rgba(34, 211, 238, 1)', 'rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.1)'],
          boxShadow: highlight
            ? ['0px 0px 15px rgba(34,211,238,0.2)', '0px 0px 15px rgba(34,211,238,0.2)', '0px 0px 60px rgba(34,211,238,0.9)', '0px 0px 60px rgba(34,211,238,0.9)', '0px 0px 15px rgba(34,211,238,0.2)', '0px 0px 15px rgba(34,211,238,0.2)']
            : ['0px 0px 0px rgba(34,211,238,0)', '0px 0px 0px rgba(34,211,238,0)', '0px 0px 60px rgba(34,211,238,0.9)', '0px 0px 60px rgba(34,211,238,0.9)', '0px 0px 0px rgba(34,211,238,0)', '0px 0px 0px rgba(34,211,238,0)']
        }}
        transition={{ 
          duration: totalDuration,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, startTime, startTime + 0.05, endTime - 0.05, endTime, 1]
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`group flex flex-col justify-between p-5 rounded-3xl cursor-pointer select-none h-full w-full
          ${highlight ? 'bg-[#000718]/80' : 'bg-[#000718]/40'} 
          backdrop-blur-md border transition-colors duration-300 overflow-hidden aspect-auto min-h-[120px]`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        
        <div className="flex justify-between items-start mb-4 relative z-10">
          {bannerImg ? (
            <img src={bannerImg} alt="Banner" className="h-5 object-contain drop-shadow-[0_2px_8px_rgba(0,175,240,0.4)]" />
          ) : (
            iconImg && (
              <img src={iconImg} alt="Icon" className={`${customIconSize} object-contain`} />
            )
          )}
          
          {badge && (
            <span className="absolute right-0 top-0 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-white bg-red-500/80 rounded-full border border-red-400/50 shadow-[0_0_10px_rgba(239,68,68,0.5)]">
              {badge}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1 z-10">
          <span className="text-sm font-bold tracking-wide text-white/90 group-hover:text-white transition-colors">
            {title}
          </span>
          <span className="text-[11px] text-white/50 group-hover:text-cyan-100/70 tracking-wide transition-colors">
            {sub}
          </span>
        </div>
      </motion.a>
    </motion.div>
  );
}

export default function Home() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const userBackgroundImage = "/demo.jpg";
  const logikXUrl = "https://x.com/LogikLinX";

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden font-sans bg-[#020008]">
      {/* Visual Background Engine */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
        <motion.div
          animate={{ scale: [1, 1.05, 1], rotate: [0, 1, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center opacity-100"
          style={{ backgroundImage: `url(${userBackgroundImage})` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90" />
      </div>

      <div className="relative z-10 w-full max-w-sm mx-auto px-4 pb-32 pt-12 flex flex-col gap-6">
        {/* Header HUD */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-center text-center gap-4"
        >
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-md mb-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            <span className="text-[10px] uppercase tracking-wider text-green-400 font-bold">Online Now</span>
          </div>

          <a 
            href={logikXUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => track('Profile_Photo_Clicked')}
            className="relative w-28 h-28 rounded-full flex items-center justify-center border-2 border-cyan-400/40 shadow-[0_0_30px_rgba(34,211,238,0.15)] overflow-hidden cursor-pointer group"
          >
            <img src="/Founder_rat.jpg" alt="Profile" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          </a>
          
          <div className="flex flex-col gap-2 items-center">
            <a href={logikXUrl} target="_blank" rel="noopener noreferrer" onClick={() => track('Profile_Name_Clicked')} className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity">
              <h1 className="text-2xl font-bold tracking-tight text-[#E8E8E8]">@TheLogikOS</h1>
              <BadgeCheck className="text-cyan-400" size={20} fill="rgba(34,211,238,0.2)" />
            </a>
            <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/5 shadow-2xl">
              <p className="text-sm text-cyan-100/90 font-medium whitespace-nowrap">Your favorite digital obsession 🎀✨</p>
            </div>
          </div>
        </motion.div>

        {/* Gallery Section Header Pills */}
        <div className="flex justify-between items-end w-full px-2 mb-[-12px] z-10">
          <div className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/5 shadow-lg">
            <span className="text-[10px] text-white/80 uppercase tracking-widest font-black">Teasers</span>
          </div>
          <button 
            onClick={() => { track('Free_Gallery_Header_Clicked'); setIsGalleryOpen(true); }} 
            className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/5 flex items-center gap-1 text-[11px] font-bold text-white/80 hover:text-cyan-400 transition-all group shadow-lg"
          >
            Free Gallery <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-full flex overflow-x-auto gap-3 pb-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {teaserImages.map((src, i) => (
            <div key={i} onClick={() => { track('Teaser_Thumbnail_Clicked', { image_index: i }); setIsGalleryOpen(true); }} className="min-w-[140px] h-28 rounded-2xl overflow-hidden shrink-0 snap-center border border-white/10 relative group cursor-pointer">
              <img src={src} alt={`Teaser ${i}`} className="w-full h-full object-cover opacity-70 blur-md group-hover:blur-sm transition-all duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000718]/90 via-[#000718]/20 to-transparent pointer-events-none flex items-center justify-center">
                <Lock size={20} className="text-white/40 drop-shadow-md" />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Action Grid */}
        <div className="grid grid-cols-2 gap-3 w-full">
          <BentoBlock bannerImg="/onlyfans_banner.png" title="Unlock VIP Access 😈" sub="Daily posts & free PPV messages 💦" href={logikXUrl} colSpan={2} badge="18+" highlight={true} order={0} />
          <BentoBlock bannerImg="/onlyfans_banner.png" title="FREE Page 🍑" sub="Teasers & updates ✨" href={logikXUrl} colSpan={2} order={1} />
          <BentoBlock iconImg="/throne.png" title="Spoil Me 🎁" sub="My Throne Wishlist 🛍️" href={logikXUrl} colSpan={1} customIconSize="h-10" order={2} />
          <BentoBlock iconImg="/revolut.png" title="Revolut.me 💳" sub="Direct tributes 💸" href={logikXUrl} colSpan={1} customIconSize="h-12 brightness-0 invert drop-shadow-[0_0_20px_rgba(255,255,255,1)]" order={3} />
        </div>
      </div>

      {/* Social Dock Waterfall */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="fixed bottom-16 z-20 flex justify-center w-full pointer-events-none"
      >
        <motion.div
          animate={{ 
            scale: [1, 1, 1.12, 1.12, 1, 1],
            boxShadow: [
              '0px 10px 30px rgba(0,0,0,0.8)', 
              '0px 10px 30px rgba(0,0,0,0.8)',
              '0px 0px 40px rgba(34,211,238,0.9), inset 0px 0px 15px rgba(34,211,238,0.5)', 
              '0px 0px 40px rgba(34,211,238,0.9), inset 0px 0px 15px rgba(34,211,238,0.5)',
              '0px 10px 30px rgba(0,0,0,0.8)',
              '0px 10px 30px rgba(0,0,0,0.8)'
            ],
            borderColor: ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.1)', 'rgba(34,211,238,1)', 'rgba(34,211,238,1)', 'rgba(255,255,255,0.1)', 'rgba(255,255,255,0.1)']
          }}
          transition={{ 
            duration: 6, repeat: Infinity, ease: "easeInOut",
            times: [0, (4 * 0.8 / 6), (4 * 0.8 / 6) + 0.05, ((4 * 0.8) + 1.2) / 6 - 0.05, ((4 * 0.8) + 1.2) / 6, 1]
          }}
          className="flex gap-6 px-8 py-4 rounded-full bg-[#000718]/70 backdrop-blur-2xl border border-white/10 pointer-events-auto shadow-2xl"
        >
          <a href={logikXUrl} target="_blank" rel="noopener noreferrer" onClick={() => track('Social_Icon_Clicked', { platform: 'Twitter' })} className="text-white/60 hover:text-cyan-400 hover:scale-110 transition-all"><Twitter size={22} /></a>
          <a href={logikXUrl} target="_blank" rel="noopener noreferrer" onClick={() => track('Social_Icon_Clicked', { platform: 'Instagram' })} className="text-white/60 hover:text-cyan-400 hover:scale-110 transition-all"><Instagram size={22} /></a>
          <a href={logikXUrl} target="_blank" rel="noopener noreferrer" onClick={() => track('Social_Icon_Clicked', { platform: 'TikTok' })} className="text-white/60 hover:text-cyan-400 hover:scale-110 transition-all"><TikTokIcon /></a>
          <a href={logikXUrl} target="_blank" rel="noopener noreferrer" onClick={() => track('Social_Icon_Clicked', { platform: 'Snapchat' })} className="text-white/60 hover:text-cyan-400 hover:scale-110 transition-all"><SnapchatIcon /></a>
        </motion.div>
      </motion.div>

      {/* Billionaire Signature */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="fixed bottom-4 left-0 right-0 z-20 flex flex-col items-center gap-1 select-none pointer-events-none">
        <span style={{ fontFamily: '"Courier New", Courier, monospace', fontSize: '9px', letterSpacing: '0.12em', color: '#E8E8E8' }}>Powered by Logik Core v1.0 - VR-36 Engine</span>
        <span style={{ fontFamily: '"Courier New", Courier, monospace', fontSize: '9px', letterSpacing: '0.12em', color: '#E8E8E8' }}>3-6-9 Teslain Code</span>
      </motion.div>

      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-sm bg-[#000718] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl">
              <button onClick={() => { track('Close_Gallery_Clicked'); setIsGalleryOpen(false); }} className="absolute top-4 right-4 text-white/50 hover:text-cyan-400 bg-white/5 rounded-full p-1.5 transition-colors"><X size={18} /></button>
              <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">Free Gallery <img src="/onlyfans_icon.png" alt="OF" className="w-5 h-5 object-contain" /></h2>
              <div className="grid grid-cols-2 gap-3 overflow-y-auto max-h-[60vh] pr-1 [&::-webkit-scrollbar]:hidden">
                {modalGalleryImages.map((src, i) => (
                  <a key={i} href={logikXUrl} target="_blank" rel="noopener noreferrer" onClick={() => track('Gallery_Image_Clicked', { image_index: i })}>
                    <img src={src} alt={`Gallery ${i}`} className="w-full aspect-square object-cover rounded-xl border border-white/10 hover:border-cyan-400/50 hover:scale-[1.02] transition-all duration-300" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}