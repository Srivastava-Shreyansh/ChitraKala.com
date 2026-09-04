import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos, fetchVideos, fetchGifs } from "../api/mediaApi";
import { setResults, setLoading, setError, setQuery } from "../app/features/searchSlice";
import ResultCard from "./ResultCard";
import { Sparkles, AlertCircle, RefreshCw, Compass } from "lucide-react";
import gsap from "gsap";

const SKELETON_HEIGHTS = [
  "h-64", "h-80", "h-56", "h-96", "h-72", "h-88",
  "h-60", "h-76", "h-92", "h-68", "h-84", "h-64"
];

const SUGGESTED_TAGS = [
  "Cyberpunk", "Minimalist", "Cinematic", "Tokyo Street",
  "Golden Hour", "Neon Abstract", "Anime Scenery", "Underwater"
];

const ResultGrid = () => {
  const dispatch = useDispatch();
  const { query, activeTab, results, loading, error } = useSelector((store) => store.search);
  const gridRef = useRef(null);

  useEffect(() => {
    if (!query) return;

    let isMounted = true;

    const getData = async () => {
      try {
        dispatch(setLoading());
        let data = [];

        if (activeTab === "photos") {
          const response = await fetchPhotos(query);
          if (response?.results) {
            data = response.results.map((item) => ({
              id: item.id,
              type: "photo",
              title: item.alt_description || item.description || "Photo",
              thumbnail: item.urls?.small,
              src: item.urls?.regular || item.urls?.small,
              url: item.links?.html,
              download: item.urls?.raw || item.urls?.full,
            }));
          }
        }

        if (activeTab === "videos") {
          const response = await fetchVideos(query);
          if (response?.videos) {
            data = response.videos.map((item) => ({
              id: item.id,
              type: "video",
              title: item.user?.name ? `Video by ${item.user.name}` : "Cinematic Video",
              thumbnail: item.image,
              src: item.video_files?.[0]?.link,
              url: item.url,
              download: item.video_files?.[0]?.link,
            }));
          }
        }

        if (activeTab === "gifs") {
          const response = await fetchGifs(query);
          if (response?.data) {
            data = response.data.map((item) => ({
              id: item.id,
              type: "gif",
              title: item.title || "Animated GIF",
              thumbnail: item.images?.fixed_height?.url,
              src: item.images?.fixed_height?.url,
              url: item.url,
              download: item.images?.original?.url || item.bitly_gif_url,
            }));
          }
        }

        if (isMounted) {
          dispatch(setResults(data));
        }
      } catch (err) {
        if (isMounted) {
          dispatch(setError(err.message || "Failed to load visual assets"));
        }
      }
    };

    getData();

    return () => {
      isMounted = false;
    };
  }, [query, activeTab, dispatch]);

  // Staggered GSAP reveal when results update
  useEffect(() => {
    if (!loading && results.length > 0 && gridRef.current) {
      const items = gridRef.current.querySelectorAll(".masonry-item");
      if (items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 30, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.04,
            ease: "power3.out",
          }
        );
      }
    }
  }, [results, loading]);

  // Loading state: Masonry Shimmer Skeletons
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="masonry-columns">
          {SKELETON_HEIGHTS.map((h, idx) => (
            <div key={idx} className="masonry-item">
              <div className={`w-full ${h} rounded-2xl shimmer-card border border-white/10`} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="glass-panel p-8 rounded-3xl border border-rose-500/20 shadow-2xl">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-4">
            <AlertCircle size={32} />
          </div>
          <h3 className="text-xl font-bold font-display text-primary mb-2">
            Failed to Fetch Assets
          </h3>
          <p className="text-sm text-secondary mb-6 leading-relaxed">
            {error}. The media provider may be temporarily rate-limited.
          </p>
          <button
            onClick={() => dispatch(setQuery(query))}
            className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-primary font-medium text-sm transition flex items-center gap-2 mx-auto cursor-pointer active:scale-95"
          >
            <RefreshCw size={15} /> Retry Search
          </button>
        </div>
      </div>
    );
  }

  // Empty Results state
  if (results.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-purple-600/20 to-pink-500/20 text-purple-400 flex items-center justify-center mb-5 border border-purple-500/30">
            <Compass size={32} />
          </div>
          <h3 className="text-2xl font-bold font-display text-primary mb-2">
            No visuals found for "{query}"
          </h3>
          <p className="text-sm text-secondary mb-6 max-w-sm mx-auto">
            Try a different search term, switch tabs between Photos, Videos, or GIFs, or try these trending keywords:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {SUGGESTED_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => dispatch(setQuery(tag))}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium glass-panel hover:border-purple-500/50 hover:text-primary transition cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Results Header Info */}
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-white/10 text-xs text-secondary">
        <span>
          Showing <span className="text-primary font-semibold">{results.length}</span> curated {activeTab} for{" "}
          <span className="text-purple-400 font-semibold">"{query}"</span>
        </span>
        <span className="hidden sm:inline flex items-center gap-1 text-purple-400">
          <Sparkles size={13} /> Pinterest Masonry Feed
        </span>
      </div>

      {/* Fluid Pinterest Masonry Grid */}
      <div ref={gridRef} className="masonry-columns">
        {results.map((item, idx) => (
          <ResultCard key={item.id || idx} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ResultGrid;