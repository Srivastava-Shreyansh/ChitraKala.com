import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import CollectionPage from "./pages/CollectionPage";
import FaviconModal, { updateFaviconInDocument } from "./components/FaviconModal";
import { MediaModalProvider } from "./context/MediaModalContext";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("chitrakala_theme") || "dark";
  });
  const [isFaviconModalOpen, setIsFaviconModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("chitrakala_theme", theme);
  }, [theme]);

  useEffect(() => {
    const savedFavicon = localStorage.getItem("chitrakala_custom_favicon");
    if (savedFavicon) {
      updateFaviconInDocument(savedFavicon);
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <MediaModalProvider>
      <div className="min-h-screen w-full relative flex flex-col transition-colors duration-300">
        {/* Ambient Aurora Gradient Glow Background Elements */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[75vw] h-[55vh] rounded-full bg-gradient-to-tr from-purple-600/15 via-pink-500/15 to-cyan-500/10 blur-[130px] animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute top-[40%] -left-[10%] w-[50vw] h-[45vh] rounded-full bg-gradient-to-r from-purple-900/15 to-transparent blur-[120px]" />
          <div className="absolute top-[60%] -right-[10%] w-[45vw] h-[45vh] rounded-full bg-gradient-to-l from-cyan-900/15 to-transparent blur-[120px]" />
          {/* Subtle noise grain */}
          <div className="absolute inset-0 noise-overlay opacity-30" />
        </div>

        {/* Global Navigation */}
        <NavBar
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenFaviconModal={() => setIsFaviconModalOpen(true)}
        />

        {/* Dynamic Route Content (offset for desktop top navbar & mobile bottom dock) */}
        <main className="flex-1 w-full pt-4 md:pt-24 pb-20 md:pb-12">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/collection" element={<CollectionPage />} />
          </Routes>
        </main>

        {/* Favicon Uploader & Site Preferences Modal */}
        <FaviconModal
          isOpen={isFaviconModalOpen}
          onClose={() => setIsFaviconModalOpen(false)}
        />

        {/* Global Toasts */}
        <ToastContainer
          position="bottom-center"
          theme={theme === "dark" ? "dark" : "light"}
          toastClassName="glass-panel text-sm !rounded-2xl"
        />
      </div>
    </MediaModalProvider>
  );
};

export default App;