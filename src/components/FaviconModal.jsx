import { useState, useEffect } from "react";
import { X, Check, Globe, RefreshCw, Sparkles, Image as ImageIcon } from "lucide-react";

const DEFAULT_FAVICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%238B5CF6'/%3E%3Cstop offset='50%25' stop-color='%23EC4899'/%3E%3Cstop offset='100%25' stop-color='%2306B6D4'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='100' rx='28' fill='%2309090b'/%3E%3Ccircle cx='50' cy='50' r='30' fill='url(%23g)'/%3E%3Ccircle cx='50' cy='50' r='14' fill='%2309090b'/%3E%3Ccircle cx='62' cy='38' r='5' fill='%23ffffff'/%3E%3C/svg%3E";

const PRESETS = [
  {
    name: "Aurora Iris",
    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%238B5CF6'/%3E%3Ccircle cx='50' cy='50' r='32' fill='%23EC4899'/%3E%3Ccircle cx='50' cy='50' r='16' fill='%2306B6D4'/%3E%3C/svg%3E",
  },
  {
    name: "Cyber Neon",
    url: "https://api.iconify.design/lucide:camera.svg?color=%238B5CF6",
  },
  {
    name: "Sunset Prism",
    url: "https://api.iconify.design/lucide:palette.svg?color=%23EC4899",
  },
  {
    name: "Golden Spark",
    url: "https://api.iconify.design/lucide:sparkles.svg?color=%23EAB308",
  },
];

export const updateFaviconInDocument = (url) => {
  let link = document.querySelector("link#dynamic-favicon") || document.querySelector("link[rel*='icon']");
  if (!link) {
    link = document.createElement("link");
    link.id = "dynamic-favicon";
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = url;
};

const FaviconModal = ({ isOpen, onClose }) => {
  const [urlInput, setUrlInput] = useState("");
  const [currentFavicon, setCurrentFavicon] = useState(DEFAULT_FAVICON);
  const [previewError, setPreviewError] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("chitrakala_custom_favicon");
    if (saved) {
      setCurrentFavicon(saved);
      setUrlInput(saved.startsWith("data:") ? "" : saved);
      updateFaviconInDocument(saved);
    }
  }, []);

  if (!isOpen) return null;

  const testAndApply = (urlToApply) => {
    const target = urlToApply.trim();
    if (!target) return;

    setIsValidating(true);
    setPreviewError(false);
    setSuccessMessage("");

    // Validate image reachability
    const img = new Image();
    img.onload = () => {
      setIsValidating(false);
      setCurrentFavicon(target);
      localStorage.setItem("chitrakala_custom_favicon", target);
      updateFaviconInDocument(target);
      setSuccessMessage("Favicon updated successfully!");
      setTimeout(() => setSuccessMessage(""), 2500);
    };
    img.onerror = () => {
      setIsValidating(false);
      setPreviewError(true);
    };
    img.src = target;
  };

  const resetDefault = () => {
    setCurrentFavicon(DEFAULT_FAVICON);
    setUrlInput("");
    localStorage.removeItem("chitrakala_custom_favicon");
    updateFaviconInDocument(DEFAULT_FAVICON);
    setPreviewError(false);
    setSuccessMessage("Reset to default ChitraKala icon.");
    setTimeout(() => setSuccessMessage(""), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-lg glass-panel rounded-3xl p-6 md:p-8 shadow-2xl relative border border-white/15 text-primary"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-secondary hover:text-primary transition"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/30">
            <Sparkles size={22} />
          </div>
          <div>
            <h3 className="text-xl font-bold font-display">Favicon Customizer</h3>
            <p className="text-xs text-secondary">Set a custom dynamic favicon for your browser tab</p>
          </div>
        </div>

        {/* Live Browser Tab Simulation Preview */}
        <div className="my-6 p-4 rounded-2xl bg-black/40 border border-white/10">
          <div className="text-xs text-secondary mb-2 flex items-center gap-1.5 font-medium">
            <Globe size={13} /> Live Browser Tab Preview
          </div>
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 w-fit max-w-full">
            <div className="w-5 h-5 rounded-md overflow-hidden flex items-center justify-center bg-white/10 shrink-0">
              <img
                src={urlInput && !previewError ? urlInput : currentFavicon}
                alt="Favicon preview"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.src = DEFAULT_FAVICON;
                }}
              />
            </div>
            <span className="text-xs font-medium truncate max-w-[200px]">
              ChitraKala — Discover Photos, Videos & GIFs
            </span>
          </div>
        </div>

        {/* Input Field */}
        <div className="space-y-3 mb-5">
          <label className="text-xs font-semibold text-secondary uppercase tracking-wider block">
            Favicon Image URL
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-secondary">
                <ImageIcon size={16} />
              </div>
              <input
                type="url"
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  setPreviewError(false);
                }}
                placeholder="https://example.com/icon.png or .svg"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none text-sm transition"
              />
            </div>
            <button
              onClick={() => testAndApply(urlInput)}
              disabled={!urlInput.trim() || isValidating}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 text-white text-sm font-semibold transition active:scale-95 shadow-md shadow-purple-600/30 cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              {isValidating ? <RefreshCw size={15} className="animate-spin" /> : <Check size={15} />}
              Apply
            </button>
          </div>

          {previewError && (
            <p className="text-xs text-rose-400 mt-1">
              Could not load image from this URL. Please verify it's a valid public image.
            </p>
          )}
          {successMessage && (
            <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
              <Check size={13} /> {successMessage}
            </p>
          )}
        </div>

        {/* Preset Picks */}
        <div className="mb-6">
          <label className="text-xs font-semibold text-secondary uppercase tracking-wider block mb-2">
            Preset Icons
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PRESETS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setUrlInput(preset.url);
                  testAndApply(preset.url);
                }}
                className="flex items-center gap-2 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/40 transition text-left cursor-pointer group"
              >
                <div className="w-6 h-6 rounded-md bg-black/40 flex items-center justify-center p-1 shrink-0">
                  <img src={preset.url} alt={preset.name} className="w-full h-full object-contain group-hover:scale-110 transition" />
                </div>
                <span className="text-xs font-medium text-secondary group-hover:text-primary truncate">
                  {preset.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs">
          <button
            type="button"
            onClick={resetDefault}
            className="text-secondary hover:text-primary transition flex items-center gap-1.5 cursor-pointer py-1"
          >
            <RefreshCw size={13} /> Reset to Default
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-primary transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default FaviconModal;
