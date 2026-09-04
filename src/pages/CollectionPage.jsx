import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FolderHeart, Trash2, Search, Sparkles, Film, Image as ImageIcon, Layers } from "lucide-react";
import CollectionCard from "../components/CollectionCard";
import { clearCollection } from "../app/features/collectionSlice";

const CollectionPage = () => {
  const [filterType, setFilterType] = useState("all");
  const [confirmClear, setConfirmClear] = useState(false);
  const dispatch = useDispatch();
  const collection = useSelector((state) => state.collection?.items) || [];

  const photoCount = collection.filter((i) => i.type === "photo").length;
  const videoCount = collection.filter((i) => i.type === "video").length;
  const gifCount = collection.filter((i) => i.type === "gif").length;

  const filteredItems = collection.filter((item) => {
    if (filterType === "all") return true;
    return item.type === filterType;
  });

  const handleClearAll = () => {
    dispatch(clearCollection());
    setConfirmClear(false);
  };

  if (collection.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[75vh] text-center px-4 max-w-xl mx-auto">
        <div className="w-20 h-20 rounded-3xl glass-panel border border-purple-500/30 flex items-center justify-center mb-6 shadow-2xl shadow-purple-500/10 text-purple-400">
          <FolderHeart size={40} className="animate-pulse" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-black font-display text-primary mb-3">
          Your Creative Vault is Empty
        </h2>

        <p className="text-sm sm:text-base text-secondary max-w-md mb-8 leading-relaxed">
          You haven't bookmarked any visual assets yet. Explore millions of 4K photos, cinematics, and GIFs and save your favorites here.
        </p>

        <Link
          to="/search"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-purple-600/30 transition-all active:scale-95 cursor-pointer"
        >
          <Search size={18} />
          <span>Explore & Discover</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Header Panel with Stats */}
      <div className="glass-panel rounded-3xl p-6 md:p-8 mb-8 border border-white/10 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-400 mb-1">
              <Layers size={14} /> Personal Vault
            </div>
            <h1 className="text-3xl md:text-4xl font-black font-display text-primary tracking-tight">
              My Collection
            </h1>
            <p className="text-xs sm:text-sm text-secondary mt-1">
              {collection.length} saved asset{collection.length === 1 ? "" : "s"} across 3 engines
            </p>
          </div>

          {/* Quick Clear Action */}
          <div className="flex items-center gap-3">
            {confirmClear ? (
              <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 p-1.5 rounded-2xl">
                <span className="text-xs text-rose-300 font-medium pl-2">Confirm clear all?</span>
                <button
                  onClick={handleClearAll}
                  className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition cursor-pointer"
                >
                  Yes, Clear
                </button>
                <button
                  onClick={() => setConfirmClear(false)}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-primary text-xs font-semibold transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmClear(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-secondary hover:text-rose-400 glass-panel hover:border-rose-500/40 rounded-2xl transition active:scale-95 cursor-pointer"
              >
                <Trash2 size={15} />
                <span>Clear All</span>
              </button>
            )}

            <Link
              to="/search"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl shadow-md shadow-purple-600/30 hover:from-purple-500 hover:to-pink-500 transition active:scale-95 cursor-pointer"
            >
              <Search size={15} />
              <span>Discover More</span>
            </Link>
          </div>
        </div>

        {/* Filter Tabs by Media Type */}
        <div className="flex flex-wrap items-center gap-2 pt-6 mt-6 border-t border-white/10">
          <button
            onClick={() => setFilterType("all")}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer ${
              filterType === "all"
                ? "bg-white/20 text-white border border-white/30"
                : "text-secondary hover:text-primary hover:bg-white/5"
            }`}
          >
            All ({collection.length})
          </button>

          <button
            onClick={() => setFilterType("photo")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer ${
              filterType === "photo"
                ? "bg-purple-600/30 text-purple-300 border border-purple-500/40"
                : "text-secondary hover:text-primary hover:bg-white/5"
            }`}
          >
            <ImageIcon size={14} />
            Photos ({photoCount})
          </button>

          <button
            onClick={() => setFilterType("video")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer ${
              filterType === "video"
                ? "bg-cyan-600/30 text-cyan-300 border border-cyan-500/40"
                : "text-secondary hover:text-primary hover:bg-white/5"
            }`}
          >
            <Film size={14} />
            Videos ({videoCount})
          </button>

          <button
            onClick={() => setFilterType("gif")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer ${
              filterType === "gif"
                ? "bg-pink-600/30 text-pink-300 border border-pink-500/40"
                : "text-secondary hover:text-primary hover:bg-white/5"
            }`}
          >
            <Sparkles size={14} />
            GIFs ({gifCount})
          </button>
        </div>
      </div>

      {/* Filtered Masonry Feed */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 text-secondary text-sm">
          No {filterType} found in your saved collection.
        </div>
      ) : (
        <div className="masonry-columns">
          {filteredItems.map((item, idx) => (
            <CollectionCard key={item.id || idx} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionPage;