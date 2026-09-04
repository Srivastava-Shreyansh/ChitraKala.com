import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../app/features/searchSlice";
import { Image as ImageIcon, Film, Sparkles } from "lucide-react";

const Tabs = () => {
  const tabs = [
    { id: "photos", label: "Photos", icon: ImageIcon, provider: "Unsplash" },
    { id: "videos", label: "Videos", icon: Film, provider: "Pexels" },
    { id: "gifs", label: "GIFs", icon: Sparkles, provider: "GIPHY" },
  ];

  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.search?.activeTab) || "photos";

  return (
    <div className="flex items-center justify-center px-4 py-6">
      <div className="flex items-center p-1.5 rounded-full glass-panel border border-white/10 shadow-xl max-w-md w-full justify-between sm:justify-center sm:gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => dispatch(setActiveTab(tab.id))}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/30 scale-100"
                  : "text-secondary hover:text-primary hover:bg-white/5"
              }`}
            >
              <Icon size={16} className={isActive ? "text-white" : "text-secondary"} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;