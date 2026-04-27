/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Instagram, 
  ExternalLink, 
  Heart, 
  MessageCircle, 
  Share2, 
  ArrowUpRight,
  Sparkles,
  X,
  Languages
} from "lucide-react";

type Language = 'JP' | 'EN' | 'TH';

const TRANSLATIONS = {
  JP: {
    intro: "Capturing the chaotic essence of Eddsworld.\nDigital Art & Motion.",
    tiktok: "WATCH ON TIKTOK",
    instagram: "INSTAGRAM",
    about: "Eddsworldの世界観に魅了され、独学でデジタルアートと動画制作を続けています。混沌とした中にあるユーモアとキャラクターたちの個性を自分なりの視点で表現することを目指しています。このポートフォリオでは、日々の成長とエズワールドへの愛を形にした作品たちを展示しています。最新の情報はTikTokやInstagramにアップしているので、そちらをご覧ください。",
    motion: "Motion Projects",
    art: "Sketchbook & Art",
    scroll: "SCROLL TO EXPLORE"
  },
  EN: {
    intro: "Capturing the chaotic essence of Eddsworld.\nDigital Art & Motion.",
    tiktok: "WATCH ON TIKTOK",
    instagram: "INSTAGRAM",
    about: "I am a self-taught digital artist and motion creator, deeply fascinated by the world of Eddsworld. I strive to express the humor found in chaos and the unique personalities of the characters through my own perspective. This portfolio showcases my growth and artworks shaped by my love for Eddsworld. Check out my TikTok and Instagram for the latest updates!",
    motion: "Motion Projects",
    art: "Sketchbook & Art",
    scroll: "SCROLL TO EXPLORE"
  },
  TH: {
    intro: "บันทึกแก่นแท้ของความวุ่นวายใน Eddsworld\nศิลปะดิจิทัลและการเคลื่อนไหว",
    tiktok: "ดูบน TIKTOK",
    instagram: "INSTAGRAM",
    about: "ฉันเป็นศิลปินดิจิทัลและผู้สร้างวิดีโอที่เรียนรู้ด้วยตัวเอง โดยได้รับแรงบันดาลใจอย่างมากจากโลกของ Eddsworld ฉันมุ่งมั่นที่จะถ่ายทอดอารมณ์ขันที่พบในความวุ่นวายและบุคลิกที่เป็นเอกลักษณ์ของตัวละครผ่านมุมมองของฉันเอง พอร์ตโฟลิโอนี้แสดงให้เห็นถึงการเติบโตและผลงานที่สร้างขึ้นจากความรักที่ฉันมีต่อ Eddsworld ติดตาม TikTok และ Instagram ของฉันเพื่อรับการอัปเดตล่าสุด!",
    motion: "โปรเจกต์วิดีโอ",
    art: "สมุดสเก็ตซ์และศิลปะ",
    scroll: "เลื่อนเพื่อสำรวจ"
  }
};

const VIDEOS = [
  { id: 0, title: "Special Preview", src: "./v0.mp4" },
  { id: 1, title: "Eddsworld Animation #01", src: "./v1.mp4" },
  { id: 2, title: "Eddsworld Animation #02", src: "./v2.mp4" },
  { id: 3, title: "Eddsworld Animation #03", src: "./v3.mp4" },
  { id: 4, title: "Eddsworld Animation #04", src: "./v4.mp4" },
  { id: 5, title: "Eddsworld Animation #05", src: "./v5.mp4" },
  { id: 6, title: "Eddsworld Animation #06", src: "./v6.mp4" },
  { id: 7, title: "Eddsworld Animation #07", src: "./v7.mp4" },
  { id: 8, title: "Eddsworld Animation #08", src: "./v8.mp4" },
  { id: 9, title: "Eddsworld Animation #09", src: "./v9.mp4" },
  { id: 10, title: "Eddsworld Animation #10", src: "./v10.mp4" },
  { id: 11, title: "Eddsworld Animation #11", src: "./v11.mp4" },
  { id: 12, title: "Eddsworld Animation #12", src: "./v12.mp4" },
  { id: 13, title: "Eddsworld Animation #13", src: "./v13.mp4" },
  { id: 14, title: "Eddsworld Animation #14", src: "./v14.mp4" },
  { id: 15, title: "Eddsworld Animation #15", src: "./v15.mp4" },
  { id: 16, title: "Eddsworld Animation #16", src: "./v16.mp4" },
];

const IMAGES = [
  "IMG_1632.jpg", "IMG_1633.jpg", "IMG_1634.jpg", "IMG_1635.jpg",
  "IMG_1636.jpg", "IMG_1637.jpg", "IMG_1638.jpg", "IMG_1639.jpg", "IMG_1640.jpg",
  "IMG_1641.jpg", "IMG_1642.jpg", "IMG_1643.jpg", "IMG_1644.jpg", "IMG_1645.jpg",
  "IMG_1647.jpg", "IMG_1648.jpg", "IMG_1651.jpg", "IMG_1653.jpg", "IMG_1654.jpg",
  "IMG_1655.jpg", "IMG_1656.jpg", "IMG_1657.jpg", "IMG_1658.jpg", "IMG_1659.jpg",
  "IMG_1660.jpg"
].map(name => ({ name, src: `./${name}` }));

const EddsworldColorBadge = ({ color, name }: { color: string, name: string }) => (
  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 shadow-sm">
    <span className={`w-3 h-3 rounded-full ${color}`} />
    <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">{name}</span>
  </div>
);

interface VideoProps {
  video: { id: number; title: string; src: string };
  idx: number;
  onSelect: (video: { id: number; title: string; src: string }) => void;
}

const VideoCard: React.FC<VideoProps> = ({ video, idx, onSelect }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loadError, setLoadError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.05 }}
      whileHover={{ y: -8 }}
      onClick={() => onSelect(video)}
      onMouseEnter={() => {
        videoRef.current?.play().catch(() => {});
      }}
      onMouseLeave={() => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
      className="group relative aspect-[9/16] bg-white/5 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-white/10 cursor-pointer"
    >
      <div className="absolute inset-0 bg-white/5" />
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src={video.src}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          muted
          loop
          playsInline
          preload="auto"
          onError={() => setLoadError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cool-black/40 via-transparent to-transparent opacity-40 transition-opacity" />
      </div>

      {loadError && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-500/10">
          <span className="text-[8px] text-red-400 font-bold">LOAD ERROR</span>
        </div>
      )}

      <div className="absolute top-4 left-4 flex items-center justify-center w-6 h-6 bg-white/20 backdrop-blur-md rounded-lg border border-white/30 text-white text-[10px] font-bold">
        {video.id}
      </div>

      <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 text-white opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowUpRight size={18} />
      </div>

      <div className="absolute bottom-4 left-4 right-4">
        <h3 className="text-white font-medium text-[9px] uppercase tracking-widest line-clamp-1 opacity-70 group-hover:opacity-100 transition-opacity">
          {video.title}
        </h3>
      </div>
    </motion.div>
  );
};

interface ImageProps {
  image: { name: string; src: string };
  idx: number;
  onSelect: (image: { name: string; src: string }) => void;
}

const ImageCard: React.FC<ImageProps> = ({ image, idx, onSelect }) => {
  const [loadError, setLoadError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.05 }}
      whileHover={{ y: -4 }}
      onClick={() => onSelect(image)}
      className="relative aspect-square bg-white/5 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-white/10 cursor-pointer"
    >
      <img 
        src={image.src} 
        alt={image.name}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        loading="lazy"
        onError={() => setLoadError(true)}
      />
      {loadError && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-500/10">
          <span className="text-[8px] text-red-400 font-bold italic uppercase">Load Fail</span>
        </div>
      )}
    </motion.div>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('JP');
  const [selectedItem, setSelectedItem] = useState<{ type: 'video' | 'image', url: string, title?: string } | null>(null);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedItem]);

  return (
    <div className="min-h-screen pb-32 selection:bg-pop-pink selection:text-white bg-deep-blue text-white">
      {/* Language Switcher */}
      <div className="fixed top-6 right-6 z-40 flex items-center gap-1 bg-white/5 backdrop-blur-xl border border-white/10 p-1 rounded-full px-2">
        <Languages size={14} className="text-white/40 ml-1 mr-2" />
        {(['JP', 'EN', 'TH'] as Language[]).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
              lang === l ? 'bg-pop-pink text-white shadow-lg' : 'text-white/40 hover:text-white'
            }`}
          >
            {l}
          </button>
        ))}
      </div>
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-cool-black/90 backdrop-blur-xl cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-full max-h-full flex items-center justify-center"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute -top-12 right-0 md:-right-12 p-2 hover:bg-white/10 rounded-full transition-colors text-white"
              >
                <X size={32} />
              </button>

              {selectedItem.type === 'video' ? (
                <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl overflow-hidden aspect-[9/16] h-[80vh] max-h-[1200px]">
                  <video
                    src={selectedItem.url}
                    className="w-full h-full object-contain"
                    controls
                    autoPlay
                    loop
                    playsInline
                  />
                </div>
              ) : (
                <img
                  src={selectedItem.url}
                  alt="Full preview"
                  className="max-w-full max-h-[85vh] rounded-xl shadow-2xl object-contain"
                />
              )}
              
              {selectedItem.title && (
                <div className="absolute -bottom-10 left-0 right-0 text-center">
                  <p className="text-white/60 text-xs font-bold uppercase tracking-widest">{selectedItem.title}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="relative pt-24 pb-20 px-6 overflow-hidden">
        <div className="absolute top-10 -right-10 w-96 h-96 bg-edd/5 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 -left-10 w-96 h-96 bg-tom/5 rounded-full blur-[100px] -z-10" />

        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-2 mb-8">
              <EddsworldColorBadge color="bg-edd" name="Edd" />
              <EddsworldColorBadge color="bg-tom" name="Tom" />
              <EddsworldColorBadge color="bg-matt" name="Matt" />
              <EddsworldColorBadge color="bg-tord" name="Tord" />
            </div>
            
            <h1 className="text-7xl md:text-9xl font-display font-medium tracking-tighter leading-[0.8] mb-6 text-white uppercase">
              ONIKA<span className="text-white/20">.</span><br />
              <span className="text-pop-pink font-bold italic">STUDIO</span>
            </h1>
            
            <p className="text-xl text-white/50 font-light max-w-lg mx-auto mb-10 leading-relaxed font-sans whitespace-pre-line">
              {t.intro}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://www.tiktok.com/@onika1219" 
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-cool-black rounded-full font-bold text-sm tracking-widest transition-all hover:bg-pop-pink hover:text-white hover:scale-105 active:scale-95 shadow-xl"
              >
                {t.tiktok}
                <ArrowUpRight size={18} />
              </a>

              <a 
                href="https://www.instagram.com/onika_0627" 
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-bold text-sm tracking-widest border border-white/20 transition-all hover:bg-white/20 hover:scale-105 active:scale-95 shadow-xl"
              >
                <Instagram size={18} />
                {t.instagram}
              </a>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-20 max-w-2xl mx-auto"
            >
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <p className="text-white/60 text-sm leading-relaxed font-light text-center">
                  {t.about}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 space-y-32">
        {/* Videos Section */}
        <section>
          <div className="flex flex-col items-center mb-16">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="text-pop-pink" size={20} />
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white/40">{t.motion}</h2>
            </div>
            <div className="h-px w-24 bg-white/10" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {VIDEOS.map((video, idx) => (
              <VideoCard 
                key={video.id} 
                video={video} 
                idx={idx} 
                onSelect={(v) => setSelectedItem({ type: 'video', url: v.src, title: v.title })}
              />
            ))}
          </div>
        </section>

        {/* Images Section */}
        <section>
          <div className="flex flex-col items-center mb-16">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="text-pop-pink" size={20} />
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white/40">{t.art}</h2>
            </div>
            <div className="h-px w-24 bg-white/10" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {IMAGES.map((image, idx) => (
              <ImageCard 
                key={image.name} 
                image={image} 
                idx={idx} 
                onSelect={(img) => setSelectedItem({ type: 'image', url: img.src })}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-60 px-6 max-w-6xl mx-auto text-center">
        <div className="h-px bg-white/5 mb-20" />
        <p className="text-[9px] text-white/20 font-bold uppercase tracking-[0.4em]">
          © 2026 ONIKA STUDIO / ARTWORK BY ONIKA / INSPIRED BY EDDSWORLD / V1.0.5
        </p>
      </footer>
    </div>
  );
}


