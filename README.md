# 🚀 Mudassir — Developer Portfolio

A **production-grade, 3D-animated** developer portfolio built with React + Vite + Tailwind + Three.js + Framer Motion.

## 📁 Folder Structure

```
portfolio/
├── public/
│   ├── cv.pdf                    ← 🔴 Replace with your actual CV
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   └── HeroCanvas.jsx    ← Three.js animated orb + stars
│   │   ├── sections/
│   │   │   ├── Hero.jsx          ← Typewriter hero + 3D canvas
│   │   │   ├── About.jsx         ← Bio + highlight cards
│   │   │   ├── Skills.jsx        ← Animated skill bars + filter
│   │   │   ├── Experience.jsx    ← Timeline layout
│   │   │   ├── Projects.jsx      ← Hover cards + filter
│   │   │   └── Contact.jsx       ← Contact form + socials
│   │   └── ui/
│   │       ├── Navbar.jsx        ← Animated nav with active indicator
│   │       ├── Footer.jsx
│   │       ├── LoadingScreen.jsx ← Animated loading with progress bar
│   │       └── ParticleField.jsx ← Canvas particle network
│   ├── data/
│   │   └── portfolio.js          ← 🔴 Edit your data here
│   ├── hooks/
│   │   ├── useCustomCursor.js    ← Smooth custom cursor
│   │   └── useScrollReveal.js    ← Intersection observer reveal
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## 🛠 Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS v3 |
| 3D | Three.js + @react-three/fiber + @react-three/drei |
| Animation | Framer Motion |
| Fonts | Clash Display + Satoshi + JetBrains Mono |

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Dev server
npm run dev

# Production build
npm run build
```

## ✅ Customization Checklist

1. **`src/data/portfolio.js`** — Update name, bio, skills, experience, projects
2. **`public/cv.pdf`** — Drop your CV here
3. **Contact form** — Wire up to Formspree/EmailJS in `Contact.jsx`
4. **Social links** — Update GitHub/LinkedIn URLs in `Contact.jsx`

## 🎨 Features

- 🌑 Deep dark theme with neon green accent
- 🌐 3D animated WebGL sphere (Three.js)
- ✨ Particle field with mouse interaction
- 🎯 Custom magnetic cursor (desktop)
- ⚡ Loading screen with animated progress
- 📱 Fully responsive
- 🔄 Smooth scroll animations (Framer Motion)
- 🏷️ Filterable skills + projects
- 📅 Vertical timeline for experience
- 📬 Contact form ready to wire up

## 🌐 Deploy

```bash
# Vercel
npm i -g vercel && vercel

# Netlify
npm run build && netlify deploy --dir=dist
```
