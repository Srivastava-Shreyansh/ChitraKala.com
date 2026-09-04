# 🎨 ChitraKala.com

**A Pinterest-inspired media discovery platform — search and explore photos, videos, and GIFs, all in one place.**

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=flat&logo=redux&logoColor=white)
![Unsplash](https://img.shields.io/badge/Unsplash-000000?style=flat&logo=unsplash&logoColor=white)
![Pexels](https://img.shields.io/badge/Pexels-05A081?style=flat&logo=pexels&logoColor=white)
![GIPHY](https://img.shields.io/badge/GIPHY-FF6666?style=flat&logo=giphy&logoColor=white)

---

## 📖 Overview

**ChitraKala.com** (चित्रकला — "the art of pictures") is a Pinterest-style web application that lets users search and discover visual media from a single unified interface. Instead of jumping between separate stock-photo, stock-video, and GIF sites, ChitraKala brings them together — aggregating results from three best-in-class media APIs into one seamless, masonry-style browsing experience.

| Media Type | Source          |
|------------|-----------------|
| 📷 Photos  | Unsplash API    |
| 🎬 Videos  | Pexels API      |
| 🎞️ GIFs    | GIPHY API       |

---

## ✨ Features

- 🔍 **Unified search** — one search bar, results across photos, videos, and GIFs
- 🧱 **Masonry-style grid** — Pinterest-style browsing layout
- ⚡ **Redux-powered state management** — predictable, scalable app state
- 📱 **Responsive design** — built to work across mobile, tablet, and desktop
- 🖼️ **High-quality, ready-to-use media** sourced directly from Unsplash, Pexels, and GIPHY

---

## 🛠️ Tech Stack

- **Frontend:** React, Redux
- **Data Sources:** Unsplash API (photos), Pexels API (videos), GIPHY API (GIFs)

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm or yarn
- API keys for [Unsplash](https://unsplash.com/developers), [Pexels](https://www.pexels.com/api/), and [GIPHY](https://developers.giphy.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/chitrakala.git
   cd chitrakala
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the project root and add your API keys:
   ```env
   VITE_UNSPLASH_API_KEY=your_unsplash_api_key
   VITE_PEXELS_API_KEY=your_pexels_api_key
   VITE_GIPHY_API_KEY=your_giphy_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   The app will be running at `http://localhost:5173`.

---

## 📂 Project Structure

```
chitrakala/
├── public/
│   ├── favicon.svg             # Dynamic SVG favicon
│   └── icons.svg               # SVG icon sprites
├── src/
│   ├── api/
│   │   └── mediaApi.js         # Unified API client (Unsplash, Pexels, GIPHY)
│   ├── app/
│   │   ├── features/
│   │   │   ├── collectionSlice.js # Redux slice for bookmarks & custom collections
│   │   │   └── searchSlice.js     # Redux slice for query state, active tab & cached results
│   │   └── store.js            # Redux Toolkit centralized store config
│   ├── components/
│   │   ├── CollectionCard.jsx  # Card layout previewing user saved collections
│   │   ├── FaviconModal.jsx    # Interactive customizer for dynamic tab favicon
│   │   ├── MediaDetailModal.jsx# High-res modal preview with metadata & download/save actions
│   │   ├── NavBar.jsx          # Glassmorphic top navigation header
│   │   ├── ResultCard.jsx      # Individual media card with hover actions & tags
│   │   ├── ResultGrid.jsx      # Responsive Pinterest-style masonry media grid
│   │   ├── SearchBar.jsx       # Real-time search bar with quick filters
│   │   └── Tabs.jsx            # Media type switcher (Photos, Videos, GIFs)
│   ├── context/
│   │   └── MediaModalContext.jsx # React context provider for global detail modal
│   ├── pages/
│   │   ├── CollectionPage.jsx  # Saved media boards & collections view
│   │   ├── HomePage.jsx        # Landing page with trending showcase & quick discovery
│   │   └── SearchPage.jsx      # Main media search & exploration page
│   ├── App.jsx                 # Main application component & tab/view routing
│   ├── index.css               # Global styling, theme tokens & glassmorphism utilities
│   └── main.jsx                # React root entry point with Redux Store Provider
├── .env                        # Environment variables (API keys)
├── .gitignore
├── eslint.config.js            # ESLint configuration
├── index.html                  # HTML entry point with Google Fonts & metadata
├── package.json                # Project dependencies and npm scripts
└── vite.config.js              # Vite bundler configuration
```

---
