import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setQuery } from "../app/features/searchSlice";
import { useMediaModal } from "../context/MediaModalContext";
import {
  Search,
  Sparkles,
  ChevronDown,
  Camera,
  Film,
  Zap,
  Bookmark,
  TrendingUp,
  Download,
  ArrowRight,
  ShieldCheck,
  Compass,
  Layers,
} from "lucide-react";
import gsap from "gsap";

const PLACEHOLDERS = [
  "Search cyberpunk city neon...",
  "Search golden hour coastal sunset...",
  "Search cinematic slow motion rain...",
  "Search minimalist architecture...",
  "Search retro anime lo-fi scenery...",
  "Search abstract 3D fluid art...",
  "Search cute aesthetic kittens...",
];

const CATEGORIES = [
  { name: "Cyberpunk", query: "Cyberpunk" },
  { name: "Cinematic", query: "Cinematic" },
  { name: "Minimalist", query: "Minimalist Architecture" },
  { name: "Anime", query: "Anime Scenery" },
  { name: "Nature 4K", query: "Nature Landscape" },
  { name: "Abstract 3D", query: "Abstract 3D" },
  { name: "Tokyo Night", query: "Tokyo Night" },
  { name: "Lo-Fi Aesthetic", query: "LoFi Aesthetic" },
];

const CURATED_SHOWCASE = [
  {
    id: "showcase-1",
    type: "photo",
    title: "Cyberpunk Rain in Shinjuku",
    src: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
    url: "https://unsplash.com",
    download: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: "showcase-2",
    type: "photo",
    title: "Ethereal Alpine Mist",
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    url: "https://unsplash.com",
    download: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: "showcase-3",
    type: "photo",
    title: "Minimal Geometric Architecture",
    src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    url: "https://unsplash.com",
    download: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: "showcase-4",
    type: "gif",
    title: "Synthwave Sunset Grid",
    src: "https://media.giphy.com/media/Lp9ms9e2rw2pew3pE4/giphy.gif",
    url: "https://giphy.com",
    download: "https://media.giphy.com/media/Lp9ms9e2rw2pew3pE4/giphy.gif",
  },
  {
    id: "showcase-5",
    type: "photo",
    title: "Moody Nordic Solitude",
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    url: "https://unsplash.com",
    download: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: "showcase-6",
    type: "photo",
    title: "Futuristic Glass Pavilion",
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    url: "https://unsplash.com",
    download: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=90",
  },
];

const HomePage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openMediaModal } = useMediaModal();

  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const searchBoxRef = useRef(null);
  const chipsRef = useRef(null);
  const statsRef = useRef(null);
  const bentoRef = useRef(null);

  // Typewriter effect for placeholder
  useEffect(() => {
    const currentFullText = PLACEHOLDERS[placeholderIndex];
    let typingSpeed = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === currentFullText.length) {
      typingSpeed = 2000; // Pause at full text
      const timeout = setTimeout(() => setIsDeleting(true), typingSpeed);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
      typingSpeed = 500;
      const timeout = setTimeout(() => {}, typingSpeed);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setDisplayedPlaceholder(currentFullText.substring(0, isDeleting ? charIndex - 1 : charIndex + 1));
      setCharIndex((prev) => (isDeleting ? prev - 1 : prev + 1));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, placeholderIndex]);

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.1 }
      )
        .fromTo(
          subtextRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          searchBoxRef.current,
          { opacity: 0, scale: 0.95, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          chipsRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          statsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.2"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const queryToSearch = searchInput.trim() || PLACEHOLDERS[placeholderIndex].replace("Search ", "").replace("...", "");
    dispatch(setQuery(queryToSearch));
    navigate("/search");
  };

  const handleCategoryClick = (catQuery) => {
    dispatch(setQuery(catQuery));
    navigate("/search");
  };

  const scrollToExplore = () => {
    bentoRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full relative">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-12 pb-20 max-w-6xl mx-auto"
      >
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-purple-500/30 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-6 shadow-lg shadow-purple-500/10">
          <Sparkles size={13} className="animate-spin" style={{ animationDuration: "6s" }} />
          <span>Next-Gen Visual Discovery Engine</span>
        </div>

        {/* Hero Title */}
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-primary max-w-5xl leading-[1.08] mb-6"
        >
          Curate the <span className="gradient-text">Infinite</span> Canvas
        </h1>

        {/* Hero Subtext */}
        <p
          ref={subtextRef}
          className="text-base sm:text-lg md:text-xl text-secondary max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
        >
          Discover millions of 4K photos from <span className="text-primary font-medium">Unsplash</span>, cinematic motion videos from <span className="text-primary font-medium">Pexels</span>, and GIFs from <span className="text-primary font-medium">GIPHY</span> in one unified Pinterest-style experience.
        </p>

        {/* Hero Search Bar */}
        <div ref={searchBoxRef} className="w-full max-w-2xl mx-auto mb-8">
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex items-center p-2 rounded-full glass-panel border border-white/20 shadow-2xl focus-within:border-purple-500/80 focus-within:shadow-[0_0_40px_rgba(139,92,246,0.35)] transition-all duration-300"
          >
            <div className="pl-4 pr-2 text-purple-400">
              <Search size={22} />
            </div>

            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={displayedPlaceholder || "Search visuals..."}
              className="w-full bg-transparent border-none outline-none text-primary placeholder:text-secondary/70 font-medium text-base sm:text-lg py-2.5"
            />

            <button
              type="submit"
              className="shrink-0 px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-purple-600/30 transition-all active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span>Explore</span>
              <ArrowRight size={16} />
            </button>
          </form>
        </div>

        {/* Trending Category Chips */}
        <div ref={chipsRef} className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mb-12">
          <span className="text-xs font-semibold text-secondary mr-1 flex items-center gap-1">
            <TrendingUp size={13} className="text-pink-400" /> Trending:
          </span>
          {CATEGORIES.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => handleCategoryClick(cat.query)}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium glass-panel hover:border-purple-500/50 hover:bg-white/10 text-secondary hover:text-primary transition cursor-pointer active:scale-95"
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Live Counters Stats Bar */}
        <div
          ref={statsRef}
          className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-5 rounded-3xl glass-panel border border-white/10 shadow-xl"
        >
          <div className="flex flex-col items-center p-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-display gradient-text">50M+</span>
            <span className="text-xs text-secondary mt-0.5">Curated Assets</span>
          </div>
          <div className="flex flex-col items-center p-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-display gradient-text">3</span>
            <span className="text-xs text-secondary mt-0.5">API Engines</span>
          </div>
          <div className="flex flex-col items-center p-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-display gradient-text">4K UHD</span>
            <span className="text-xs text-secondary mt-0.5">Ultra Clarity</span>
          </div>
          <div className="flex flex-col items-center p-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-display gradient-text">100%</span>
            <span className="text-xs text-secondary mt-0.5">Free to Explore</span>
          </div>
        </div>

        {/* Scroll Cue Indicator */}
        <div className="mt-12 flex flex-col items-center">
          <button
            onClick={scrollToExplore}
            className="flex flex-col items-center text-xs text-secondary hover:text-primary transition cursor-pointer group"
          >
            <span className="mb-1 text-[11px] font-medium tracking-wider uppercase">Scroll to Discover</span>
            <div className="p-2 rounded-full glass-panel border border-white/10 group-hover:border-purple-500/40 group-hover:translate-y-1 transition-transform">
              <ChevronDown size={16} className="text-purple-400 animate-bounce" />
            </div>
          </button>
        </div>
      </section>

      {/* 2025/2026 Bento Grid Section */}
      <section ref={bentoRef} className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-purple-400 mb-2">
            <Layers size={14} /> Multi-Engine Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-primary tracking-tight">
            One Platform. Three Giant Media Universes.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Unsplash (Large 2-column) */}
          <div
            onClick={() => handleCategoryClick("Fine Art Photography")}
            className="md:col-span-2 glass-card p-8 rounded-3xl relative overflow-hidden group cursor-pointer border border-white/10 hover:border-purple-500/40 bg-gradient-to-br from-purple-950/20 to-black"
          >
            <div className="relative z-10 flex flex-col justify-between h-full min-h-[220px]">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 border border-purple-500/20">
                  <Camera size={24} />
                </div>
                <h3 className="text-2xl font-bold font-display text-primary mb-2">
                  Unsplash 4K Photography
                </h3>
                <p className="text-sm text-secondary max-w-md leading-relaxed">
                  High-resolution editorial photography, architectural forms, macro textures, and global landscapes captured by world-class photographers.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 group-hover:translate-x-1 transition-transform pt-6">
                <span>Browse Photo Engine</span>
                <ArrowRight size={14} />
              </div>
            </div>

            {/* Background Glow Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-600/20 transition" />
          </div>

          {/* Card 2: Pexels Videos */}
          <div
            onClick={() => handleCategoryClick("Cinematic Drone")}
            className="glass-card p-8 rounded-3xl relative overflow-hidden group cursor-pointer border border-white/10 hover:border-cyan-500/40 bg-gradient-to-br from-cyan-950/20 to-black"
          >
            <div className="relative z-10 flex flex-col justify-between h-full min-h-[220px]">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4 border border-cyan-500/20">
                  <Film size={24} />
                </div>
                <h3 className="text-2xl font-bold font-display text-primary mb-2">
                  Pexels Motion
                </h3>
                <p className="text-sm text-secondary leading-relaxed">
                  Ultra HD cinematic stock clips, ambient video loops, drone vistas, and slow-motion footage.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform pt-6">
                <span>Browse Video Engine</span>
                <ArrowRight size={14} />
              </div>
            </div>

            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-600/20 transition" />
          </div>

          {/* Card 3: GIPHY Loops */}
          <div
            onClick={() => handleCategoryClick("Retro Vaporwave")}
            className="glass-card p-8 rounded-3xl relative overflow-hidden group cursor-pointer border border-white/10 hover:border-pink-500/40 bg-gradient-to-br from-pink-950/20 to-black"
          >
            <div className="relative z-10 flex flex-col justify-between h-full min-h-[220px]">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-400 flex items-center justify-center mb-4 border border-pink-500/20">
                  <Zap size={24} />
                </div>
                <h3 className="text-2xl font-bold font-display text-primary mb-2">
                  GIPHY Expressions
                </h3>
                <p className="text-sm text-secondary leading-relaxed">
                  Viral animated loops, nostalgic pixel art, modern kinetic typography, and expressive stickers.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-pink-400 group-hover:translate-x-1 transition-transform pt-6">
                <span>Browse GIF Engine</span>
                <ArrowRight size={14} />
              </div>
            </div>

            <div className="absolute top-0 right-0 w-48 h-48 bg-pink-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-pink-600/20 transition" />
          </div>

          {/* Card 4: Personal Vault (Large 2-column) */}
          <div
            onClick={() => navigate("/collection")}
            className="md:col-span-2 glass-card p-8 rounded-3xl relative overflow-hidden group cursor-pointer border border-white/10 hover:border-purple-500/40 bg-gradient-to-br from-purple-900/15 via-pink-900/10 to-black"
          >
            <div className="relative z-10 flex flex-col justify-between h-full min-h-[220px]">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-300 flex items-center justify-center mb-4 border border-purple-500/20">
                  <Bookmark size={24} />
                </div>
                <h3 className="text-2xl font-bold font-display text-primary mb-2">
                  Personal Creative Vault
                </h3>
                <p className="text-sm text-secondary max-w-md leading-relaxed">
                  Bookmark and curate mood boards across photos, videos, and GIFs with zero signup friction. Persisted locally in your browser.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 group-hover:translate-x-1 transition-transform pt-6">
                <span>Open Your Collection</span>
                <ArrowRight size={14} />
              </div>
            </div>

            <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-gradient-to-tr from-pink-600/15 to-purple-600/15 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Curated Trending Masonry Showcase */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-white/10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5 mb-1">
              <Compass size={14} /> Handpicked Preview
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-primary">
              Trending Visual Masterpieces
            </h2>
          </div>

          <button
            onClick={() => {
              dispatch(setQuery("Cyberpunk"));
              navigate("/search");
            }}
            className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition cursor-pointer"
          >
            <span>Search more in discovery feed</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* Masonry Columns */}
        <div className="masonry-columns">
          {CURATED_SHOWCASE.map((item) => (
            <div
              key={item.id}
              onClick={() => openMediaModal(item)}
              className="masonry-item glass-card rounded-2xl overflow-hidden group relative cursor-pointer hover:-translate-y-1 transition-all duration-300"
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between">
                <div className="flex justify-end">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-black/60 text-white backdrop-blur-md border border-white/20">
                    {item.type}
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <h4 className="text-white text-sm font-semibold truncate capitalize">
                    {item.title}
                  </h4>
                  <span className="p-2 rounded-xl bg-white/20 text-white backdrop-blur-md">
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-white/15 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-primary mb-4 relative z-10">
            Ready to Ignite Your Next Creation?
          </h2>
          <p className="text-sm sm:text-base text-secondary max-w-xl mx-auto mb-8 leading-relaxed relative z-10">
            Search across three global media engines in real-time or build your personal collection today.
          </p>

          <button
            onClick={() => {
              dispatch(setQuery("Cinematic Wallpaper"));
              navigate("/search");
            }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-base shadow-xl shadow-purple-600/30 transition-all active:scale-95 cursor-pointer inline-flex items-center gap-2 relative z-10"
          >
            <span>Start Exploring Now</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-white/10 py-10 px-4 text-center text-xs text-secondary">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-base gradient-text">
              ChitraKala
            </span>
            <span>— Visual Discovery Engine</span>
          </div>
          <div className="flex items-center gap-4 text-secondary">
            <span>Powered by Unsplash, Pexels & GIPHY</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;