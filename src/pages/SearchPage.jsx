import { useSelector, useDispatch } from "react-redux";
import ResultGrid from "../components/ResultGrid";
import SearchBar from "../components/SearchBar";
import Tabs from "../components/Tabs";
import { setQuery } from "../app/features/searchSlice";
import { Sparkles, TrendingUp, Compass, Flame, Film, Image as ImageIcon } from "lucide-react";

const EXPLORE_TOPICS = [
  {
    title: "Cyberpunk Tokyo",
    query: "Cyberpunk Tokyo",
    tag: "Trending",
    icon: Sparkles,
    gradient: "from-purple-600/30 to-pink-600/30",
  },
  {
    title: "Minimal Architecture",
    query: "Minimalist Architecture",
    tag: "Design",
    icon: ImageIcon,
    gradient: "from-cyan-600/30 to-blue-600/30",
  },
  {
    title: "Cinematic Slow Mo",
    query: "Cinematic Slow Motion",
    tag: "Video",
    icon: Film,
    gradient: "from-amber-600/30 to-rose-600/30",
  },
  {
    title: "Abstract 3D Art",
    query: "Abstract 3D Render",
    tag: "Modern",
    icon: Sparkles,
    gradient: "from-emerald-600/30 to-teal-600/30",
  },
  {
    title: "Golden Hour Ocean",
    query: "Golden Hour Ocean",
    tag: "Nature",
    icon: Compass,
    gradient: "from-orange-600/30 to-amber-600/30",
  },
  {
    title: "Retro Anime Lo-Fi",
    query: "Retro Anime LoFi",
    tag: "Aesthetic",
    icon: Flame,
    gradient: "from-fuchsia-600/30 to-purple-600/30",
  },
];

const QUICK_CHIPS = [
  "Cyberpunk", "Tokyo", "Minimalist", "Cinematic", "Anime",
  "Aesthetic", "Nature", "Abstract 3D", "Dark Wallpaper", "Surrealism"
];

const SearchPage = () => {
  const { query } = useSelector((store) => store.search);
  const dispatch = useDispatch();

  return (
    <div className="min-h-[85vh] flex flex-col">
      {/* Top Search Bar Header */}
      <div className="pt-2 pb-4">
        <SearchBar autoFocus={!query} />
      </div>

      {query ? (
        <div>
          <Tabs />
          <ResultGrid />
        </div>
      ) : (
        /* Rich Exploratory Starter State */
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 flex-1 flex flex-col items-center justify-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-purple-500/30 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-6 shadow-lg shadow-purple-500/10">
            <TrendingUp size={14} />
            <span>Discover Visual Wonders</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-primary tracking-tight mb-4">
            Search Across <span className="gradient-text">Millions</span> of Assets
          </h2>
          <p className="text-sm sm:text-base text-secondary max-w-xl mb-8 leading-relaxed">
            Explore 4K photos from Unsplash, cinematic motion video from Pexels, and expressive GIFs from GIPHY in one fluid masonry feed.
          </p>

          {/* Quick Trending Chips */}
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mb-12">
            {QUICK_CHIPS.map((chip) => (
              <button
                key={chip}
                onClick={() => dispatch(setQuery(chip))}
                className="px-4 py-2 rounded-full text-xs font-medium glass-panel hover:border-purple-500/40 hover:bg-white/10 text-secondary hover:text-primary transition cursor-pointer active:scale-95"
              >
                #{chip}
              </button>
            ))}
          </div>

          {/* Curated Topic Cards */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
            {EXPLORE_TOPICS.map((topic, idx) => {
              const Icon = topic.icon;
              return (
                <div
                  key={idx}
                  onClick={() => dispatch(setQuery(topic.query))}
                  className={`p-5 rounded-2xl glass-card border border-white/10 hover:border-purple-500/40 cursor-pointer transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br ${topic.gradient} group`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/40 text-white/90 border border-white/10">
                      {topic.tag}
                    </span>
                    <Icon size={18} className="text-white/80 group-hover:scale-110 transition" />
                  </div>
                  <h3 className="text-base font-bold text-white font-display mb-1">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-white/70 flex items-center gap-1 group-hover:text-white transition">
                    Explore collection &rarr;
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;