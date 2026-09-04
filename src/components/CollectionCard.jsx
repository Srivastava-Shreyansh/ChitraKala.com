import { useState } from "react";
import { Trash2, Download, Maximize2, Play, Sparkles } from "lucide-react";
import { useDispatch } from "react-redux";
import { removeCollection, removeToast } from "../app/features/collectionSlice";
import { useMediaModal } from "../context/MediaModalContext";

const CollectionCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const dispatch = useDispatch();
  const { openMediaModal } = useMediaModal();

  if (!item) return null;

  const handleRemove = (e) => {
    e.stopPropagation();
    dispatch(removeCollection(item.id));
    dispatch(removeToast());
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    if (item.download) {
      window.open(item.download, "_blank");
    }
  };

  const handleCardClick = () => {
    openMediaModal(item);
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="masonry-item group relative rounded-2xl overflow-hidden glass-card cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      {/* Media Rendering with Native Variable Height */}
      <div className="relative w-full overflow-hidden bg-white/5">
        {!imageLoaded && item.type !== "video" && (
          <div className="absolute inset-0 shimmer-card min-h-[200px]" />
        )}

        {item.type === "photo" && (
          <img
            src={item.src}
            alt={item.title || "Collection photo"}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {item.type === "video" && (
          <div className="relative w-full aspect-video bg-black/40">
            <video
              src={item.src}
              muted
              loop
              playsInline
              autoPlay
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1.5 border border-white/10 pointer-events-none">
              <Play size={11} className="fill-white" />
              <span>Video</span>
            </div>
          </div>
        )}

        {item.type === "gif" && (
          <div className="relative w-full">
            <img
              src={item.src}
              alt={item.title || "Collection GIF"}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
            <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-pink-600/80 backdrop-blur-md text-white text-[10px] font-black tracking-wider uppercase border border-pink-400/30 pointer-events-none">
              GIF
            </div>
          </div>
        )}

        {/* Hover Controls */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-300 flex flex-col justify-between p-3 sm:p-4 ${
            isHovered ? "opacity-100" : "opacity-0 md:opacity-0"
          }`}
        >
          {/* Top Actions */}
          <div className="flex justify-end gap-2">
            <button
              onClick={handleRemove}
              title="Remove from collection"
              className="p-2.5 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white backdrop-blur-md transition active:scale-90 cursor-pointer shadow-md min-w-[40px] min-h-[40px] flex items-center justify-center"
            >
              <Trash2 size={18} />
            </button>

            <button
              onClick={handleDownload}
              title="Download asset"
              className="p-2.5 rounded-xl bg-black/60 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition active:scale-90 cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
            >
              <Download size={18} />
            </button>
          </div>

          {/* Bottom Info */}
          <div className="flex items-end justify-between gap-2 pt-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-white text-xs sm:text-sm font-semibold truncate capitalize drop-shadow-md">
                {item.title || "Saved Asset"}
              </h3>
              <p className="text-[11px] text-white/70 capitalize mt-0.5">
                {item.type}
              </p>
            </div>

            <button
              onClick={handleCardClick}
              title="Expand preview"
              className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white backdrop-blur-md transition cursor-pointer"
            >
              <Maximize2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;