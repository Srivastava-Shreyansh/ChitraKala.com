import { Search, X, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "../app/features/searchSlice";
import gsap from "gsap";

const SearchBar = ({ autoFocus = false, size = "default" }) => {
  const currentQuery = useSelector((state) => state.search?.query) || "";
  const [text, setText] = useState(currentQuery);
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    setText(currentQuery);
  }, [currentQuery]);

  const handleFocus = () => {
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 1,
        scale: 1.02,
        duration: 0.35,
        ease: "power2.out",
      });
    }
  };

  const handleBlur = () => {
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.25,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(setQuery(text.trim()));
  };

  const clearInput = () => {
    setText("");
    dispatch(setQuery(""));
  };

  const isLarge = size === "large";

  return (
    <div className="w-full max-w-3xl mx-auto relative px-4">
      {/* Outer animated gradient glow */}
      <div
        ref={glowRef}
        className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 opacity-25 blur-lg transition-all duration-500 -z-10"
      />

      <form
        ref={containerRef}
        onSubmit={submitHandler}
        className={`relative flex items-center glass-panel rounded-full border border-white/15 shadow-2xl transition-all duration-300 focus-within:border-purple-500/60 focus-within:shadow-[0_0_35px_rgba(139,92,246,0.35)] ${
          isLarge ? "p-2 sm:p-2.5" : "p-1.5 sm:p-2"
        }`}
      >
        {/* Search Icon */}
        <div className="pl-3 sm:pl-4 pr-2 text-secondary flex items-center justify-center">
          <Search size={isLarge ? 22 : 18} className="text-purple-400" />
        </div>

        {/* Input Field */}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoFocus={autoFocus}
          type="text"
          placeholder="Search millions of 4K photos, cinematics & GIFs..."
          className={`w-full bg-transparent border-none outline-none text-primary placeholder:text-secondary/70 font-medium ${
            isLarge ? "text-base sm:text-lg py-2" : "text-sm sm:text-base py-1.5"
          }`}
        />

        {/* Clear Button if text exists */}
        {text && (
          <button
            type="button"
            onClick={clearInput}
            className="p-1.5 rounded-full hover:bg-white/10 text-secondary hover:text-primary transition mr-1 cursor-pointer"
            title="Clear search"
          >
            <X size={16} />
          </button>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className={`shrink-0 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold shadow-md shadow-purple-600/30 transition active:scale-95 cursor-pointer ${
            isLarge
              ? "px-5 sm:px-7 py-2.5 sm:py-3 text-sm sm:text-base"
              : "px-4 sm:px-5 py-2 text-xs sm:text-sm"
          }`}
        >
          <span>Search</span>
          <Sparkles size={14} className="hidden sm:inline" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;