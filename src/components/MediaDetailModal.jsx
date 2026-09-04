import { useEffect, useRef } from "react";
import { X, Download, Bookmark, BookmarkCheck, ExternalLink, Share2, Sparkles, Film, Image as ImageIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addCollection, removeCollection, addedToast, removeToast } from "../app/features/collectionSlice";
import gsap from "gsap";

const MediaDetailModal = ({ item, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const collection = useSelector((state) => state.collection?.items) || [];
  const modalRef = useRef(null);
  const backdropRef = useRef(null);

  const isSaved = item ? collection.some((c) => c.id === item.id) : false;

  useEffect(() => {
    if (isOpen && modalRef.current) {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" }
      );
      gsap.fromTo(
        modalRef.current,
        { scale: 0.92, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const handleToggleSave = () => {
    if (isSaved) {
      dispatch(removeCollection(item.id));
      dispatch(removeToast());
    } else {
      dispatch(addCollection(item));
      dispatch(addedToast());
    }
  };

  const handleDownload = () => {
    if (item.download) {
      window.open(item.download, "_blank");
    }
  };

  const handleCopyLink = () => {
    const shareUrl = item.url || window.location.href;
    navigator.clipboard.writeText(shareUrl);
    alert("Media link copied to clipboard!");
  };

  const getTypeIcon = () => {
    if (item.type === "video") return <Film size={14} className="text-cyan-400" />;
    if (item.type === "gif") return <Sparkles size={14} className="text-pink-400" />;
    return <ImageIcon size={14} className="text-purple-400" />;
  };

  const getSourceProvider = () => {
    if (item.type === "video") return "Pexels";
    if (item.type === "gif") return "GIPHY";
    return "Unsplash";
  };

  return (
    <div
      ref={backdropRef}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xl"
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl max-h-[90vh] glass-panel rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/15 text-primary"
      >
        {/* Media Preview Column */}
        <div className="flex-1 bg-black/80 flex items-center justify-center p-4 min-h-[300px] md:min-h-[500px] max-h-[50vh] md:max-h-[85vh] relative overflow-hidden group">
          {item.type === "photo" && (
            <img
              src={item.src}
              alt={item.title || "Photo"}
              className="w-full h-full object-contain max-h-[80vh] rounded-xl shadow-lg select-none"
            />
          )}
          {item.type === "video" && (
            <video
              src={item.src}
              controls
              autoPlay
              loop
              playsInline
              className="w-full h-full object-contain max-h-[80vh] rounded-xl shadow-lg"
            />
          )}
          {item.type === "gif" && (
            <img
              src={item.src}
              alt={item.title || "GIF"}
              className="w-full h-full object-contain max-h-[80vh] rounded-xl shadow-lg select-none"
            />
          )}

          {/* Close button inside media on small screens */}
          <button
            onClick={onClose}
            className="md:hidden absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white backdrop-blur-md"
          >
            <X size={18} />
          </button>
        </div>

        {/* Sidebar Info & Actions */}
        <div className="w-full md:w-80 lg:w-96 p-6 flex flex-col justify-between bg-card-bg/60 backdrop-blur-md border-t md:border-t-0 md:border-l border-white/10 overflow-y-auto">
          <div>
            {/* Top Bar */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 border border-white/10 uppercase tracking-wider">
                  {getTypeIcon()}
                  {item.type}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-medium">
                  {getSourceProvider()}
                </span>
              </div>

              <button
                onClick={onClose}
                className="hidden md:flex p-2 rounded-full hover:bg-white/10 text-secondary hover:text-primary transition"
                title="Close (Esc)"
              >
                <X size={20} />
              </button>
            </div>

            {/* Title */}
            <h2 className="text-lg md:text-xl font-bold font-display text-primary leading-tight mb-3 capitalize">
              {item.title || "Untitled Creation"}
            </h2>

            <p className="text-xs text-secondary leading-relaxed mb-6">
              Curated visual discovery from {getSourceProvider()}. Free for creative exploration and personal inspiration.
            </p>

            {/* Quick Specs */}
            <div className="space-y-2 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs mb-6">
              <div className="flex justify-between text-secondary">
                <span>Media Engine</span>
                <span className="text-primary font-medium">{getSourceProvider()} API</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Format</span>
                <span className="text-primary font-medium uppercase">{item.type}</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Status</span>
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  ● Verified Stream
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-4 border-t border-white/10">
            <button
              onClick={handleToggleSave}
              className={`w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm transition cursor-pointer active:scale-98 shadow-md ${
                isSaved
                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 shadow-purple-600/30"
              }`}
            >
              {isSaved ? (
                <>
                  <BookmarkCheck size={18} /> In Your Collection
                </>
              ) : (
                <>
                  <Bookmark size={18} /> Save to Collection
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm bg-white/10 hover:bg-white/15 text-primary border border-white/10 transition cursor-pointer active:scale-98"
            >
              <Download size={18} /> Download High-Res
            </button>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleCopyLink}
                className="py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs text-secondary hover:text-primary hover:bg-white/5 border border-white/5 transition cursor-pointer"
              >
                <Share2 size={15} /> Copy Link
              </button>

              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs text-secondary hover:text-primary hover:bg-white/5 border border-white/5 transition"
              >
                <ExternalLink size={15} /> Source Page
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaDetailModal;
