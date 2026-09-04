import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Home, Search, Bookmark, Sun, Moon, Settings, Sparkles } from "lucide-react";

const NavBar = ({ theme, onToggleTheme, onOpenFaviconModal }) => {
  const location = useLocation();
  const collection = useSelector((state) => state.collection?.items) || [];
  const savedCount = collection.length;

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Search", path: "/search", icon: Search },
    { name: "Collection", path: "/collection", icon: Bookmark, badge: savedCount },
  ];

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Desktop Floating Frosted-Glass Pill Navbar */}
      <header className="fixed top-4 inset-x-0 z-40 px-4 sm:px-8 pointer-events-none hidden md:block">
        <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl glass-panel hover:border-purple-500/40 transition group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-cyan-400 p-[1.5px] flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:scale-105 transition">
              <div className="w-full h-full bg-black/80 rounded-[10px] flex items-center justify-center">
                <Sparkles size={16} className="text-purple-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300 bg-clip-text text-transparent">
                ChitraKala
              </span>
            </div>
          </Link>

          {/* Center Nav Links Pill */}
          <nav className="flex items-center gap-1.5 p-1.5 rounded-full glass-panel border border-white/10 shadow-xl">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                    active
                      ? "text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-md shadow-purple-600/30 font-semibold"
                      : "text-secondary hover:text-primary hover:bg-white/5"
                  }`}
                >
                  <Icon size={16} />
                  <span>{link.name}</span>

                  {link.badge !== undefined && link.badge > 0 && (
                    <span
                      className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
                        active
                          ? "bg-white/25 text-white"
                          : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick Action Utilities */}
          <div className="flex items-center gap-2">
            {/* Dark/Light Mode Switcher */}
            <button
              onClick={onToggleTheme}
              className="p-2.5 rounded-2xl glass-panel hover:bg-white/10 text-secondary hover:text-primary transition cursor-pointer"
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            >
              {theme === "dark" ? (
                <Sun size={18} className="text-amber-300" />
              ) : (
                <Moon size={18} className="text-purple-600" />
              )}
            </button>

            {/* Favicon Settings Modal Trigger */}
            <button
              onClick={onOpenFaviconModal}
              className="p-2.5 rounded-2xl glass-panel hover:bg-white/10 text-secondary hover:text-primary transition cursor-pointer"
              title="Site Settings & Favicon Uploader"
            >
              <Settings size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Top Header */}
      <header className="md:hidden sticky top-0 inset-x-0 z-40 px-4 py-3 glass-panel border-b border-white/10 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-500 p-[1px] flex items-center justify-center">
            <div className="w-full h-full bg-black/80 rounded-[7px] flex items-center justify-center">
              <Sparkles size={14} className="text-purple-300" />
            </div>
          </div>
          <span className="font-display font-extrabold text-base bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300 bg-clip-text text-transparent">
            ChitraKala
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-secondary hover:text-primary transition"
          >
            {theme === "dark" ? <Sun size={16} className="text-amber-300" /> : <Moon size={16} className="text-purple-600" />}
          </button>
          <button
            onClick={onOpenFaviconModal}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-secondary hover:text-primary transition"
          >
            <Settings size={16} />
          </button>
        </div>
      </header>

      {/* Mobile Bottom Navigation Dock */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 pb-[env(safe-area-inset-bottom)] glass-panel border-t border-white/10 shadow-2xl">
        <div className="grid grid-cols-3 h-16 max-w-md mx-auto">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex flex-col items-center justify-center gap-1 relative min-h-[48px] transition active:scale-95 ${
                  active ? "text-purple-400 font-semibold" : "text-secondary"
                }`}
              >
                <div className="relative">
                  <Icon size={20} />
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2.5 text-[10px] w-4 h-4 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold">
                      {link.badge}
                    </span>
                  )}
                </div>
                <span className="text-[11px]">{link.name}</span>
                {active && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-purple-400" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default NavBar;