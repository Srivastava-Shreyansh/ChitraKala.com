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
- **In progress:** Glassmorphism UI redesign, GSAP animations, Barba.js page transitions

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
   REACT_APP_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
   REACT_APP_PEXELS_API_KEY=your_pexels_api_key
   REACT_APP_GIPHY_API_KEY=your_giphy_api_key
   ```

4. **Run the development server**
   ```bash
   npm start
   ```

   The app will be available at `http://localhost:3000`.

---

## 📂 Project Structure

```
chitrakala/
├── public/
├── src/
│   ├── components/       # Reusable UI components (cards, search bar, etc.)
│   ├── redux/
│   │   ├── actions/
│   │   ├── reducers/
│   │   └── store.js
│   ├── pages/            # Home, Search, Collections, etc.
│   ├── services/         # API calls to Unsplash / Pexels / GIPHY
│   ├── App.js
│   └── index.js
├── .env
└── package.json
```
*(Adjust to match your actual folder layout.)*

---

## 🗺️ Roadmap

- [ ] Glassmorphism UI redesign
- [ ] GSAP scroll & entrance animations
- [ ] Barba.js smooth page transitions
- [ ] Dark mode
- [ ] User collections / boards
- [ ] Dynamic favicon configuration
- [ ] Infinite scroll & advanced filters

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/<your-username>/chitrakala/issues) or open a pull request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — feel free to use, modify, and distribute.

---

## 🙌 Acknowledgements

- [Unsplash API](https://unsplash.com/developers)
- [Pexels API](https://www.pexels.com/api/)
- [GIPHY API](https://developers.giphy.com/)