# 👑 KingFolio – Portfolio Website

![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 📖 Inhaltsverzeichnis

- [✨ Features](#-features)
- [🖼️ Screenshots](#️-screenshots)
- [📁 Struktur](#-struktur)
- [🚀 Installation](#-installation)
- [📦 Pakete](#-pakete)
- [🧪 Testen](#-testen)
- [🌐 Hosten](#-hosten)
- [⚠️ Wichtige Hinweise](#-wichtige-hinweise)
- [📝 Lizenz](#-lizenz)
- [👤 Autor](#-autor)
- [📊 Repository Statistik](#-repository-statistik)

---

## ✨ Features

### 🎨 Visuell & Theming

| Feature              | Beschreibung                          | Status |
| -------------------- | ------------------------------------- | ------ |
| Responsive Design    | Desktop, Tablet & Mobile optimiert    | ✅      |
| Smooth Animations    | Fließende Scroll- und Hover-Effekte   | ✅      |
| Section Transitions  | Elegante Übergänge zwischen Sektionen | ✅      |
| Custom Fonts & Icons | Individuelles Styling & Symbole       | ✅      |

### ⚡ Performance

| Tool / Technik    | Vorteil                          |
| ----------------- | -------------------------------- |
| Next.js           | Schnelle SSR & statische Seiten  |
| TypeScript        | Typensicherheit, weniger Fehler  |
| React 18          | Optimierte Rendering-Performance |
| Vercel Deployment | Schnell & global verfügbar       |
| Lazy Loading      | Ressourcen effizient geladen     |

### 🛠️ Produktivität

| Feature            | Zweck                                  |
| ------------------ | -------------------------------------- |
| Home Section       | Übersicht & Begrüßung                  |
| About Section      | Über mich & Skills                     |
| Career Section     | Berufliche Erfahrungen                 |
| Projects Section   | Portfolio-Projekte präsentieren        |
| Contact Section    | Kontaktformular & Social Links         |
| Navbar / Footer    | Einheitliche Navigation & Footer-Infos |
| Loader & Scrollbar | Benutzerfreundliches UI Feedback       |

---

## 🖼️ Screenshots

### Lighthouse
![KingFolio Screenshot](/webp/KingFolio.webp)

---

## 📁 Struktur
```text
KingFolio/
├── app/
│   ├── css/
│   │   ├── FOOTER.css
│   │   ├── LOADER.css
│   │   ├── NAVBAR.css
│   │   ├── SCROLLBAR.css
│   │   ├── sections/
│   │   │   ├── ABOUT.css
│   │   │   ├── CAREER.css
│   │   │   ├── CONTACT.css
│   │   │   ├── HOME.css
│   │   │   ├── PROJECTS.css
│   │   │   └── SKILLS.css
│   │   ├── fonts.css
│   │   └── style.css
│   ├── tsx/
│   │   ├── layout/
│   │   │   ├── FOOTER.tsx
│   │   │   ├── LOADER.tsx
│   │   │   ├── NAVBAR.tsx
│   │   │   └── SCROLLBAR.tsx
│   │   ├── sections/
│   │   │   ├── ABOUT.tsx
│   │   │   ├── CAREER.tsx
│   │   │   ├── CONTACT.tsx
│   │   │   ├── HOME.tsx
│   │   │   ├── PROJECTS.tsx
│   │   │   └── SKILLS.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── public/
│   ├── gif/ html/ js/ pdf/ svg/ webm/ webp/ woff/ woff2/
│   ├── apple-touch-icon.png
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon-256x256.png
│   ├── favicon.ico
│   └── manifest.json
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
└── tsconfig.json
```

---

## 🚀 INSTALLATION

### 📥 1. Repository klonen
```bash
git clone https://github.com/mucahid-emin-tomakin/KingFolio.git
cd KingFolio
```

### 💻 2. Pakete installieren & lokal starten
```bash
# Pakete installieren
npm install

# Development Server starten
npm run dev
```

---

## 📦 PAKETE

### 📝 Paket- & Repo-Statistiken
```bash
# Paketliste
npm list --depth=0
```

---

## 🧪 Testen

### 📊 Google Chrome Lighthouse

* Öffne deine lokal laufende Seite (http://localhost:3000) in Chrome
* Drücke F12 → Tab „Lighthouse“
* Analysiere Performance, Accessibility, SEO und Best Practices
* Optional: Exportiere den Bericht als PDF für Dokumentation

### ⚡ NPM Tests
```bash
# Unit- und Integrationstests ausführen
npm test

# Coverage Report generieren
npm run test:coverage
```

* Prüft, ob alle Komponenten korrekt funktionieren
* Hilft bei Regressionen nach Änderungen

---

## 🌐 HOSTEN

### 💻 Lokales Hosting
```bash
# Development Server starten
npm run dev  # → Entwicklungsmodus

# Production Build erstellen
npm run build  # → Optimierter Produktionsbuild

# Production Server starten
npm start  # → Server starten, um den Produktionsbuild zu testen
```

### 🚀 Deployment mit Vercel

* Stelle sicher, dass dein Repository auf GitHub verfügbar ist
* Melde dich bei [Vercel](https://vercel.com/) an
* Neues Projekt → GitHub Repository auswählen → Deploy

---

## ⚠️ WICHTIGE HINWEISE

### 🔒 Sicherheit
- Code vor der Ausführung prüfen
- Backup erstellen vor großen Änderungen
- Nicht auf Produktivsystemen ohne Testing verwenden
### 💡 Empfehlungen
- Testing in VM oder lokalem Testsystem
- Eigene Anpassungen speichern & sichern
- Funktionen verstehen, bevor geändert wird
  
---

## 📝 LIZENZ

  Dieses Projekt ist unter der **MIT License** lizenziert - frei für persönliche und kommerzielle Nutzung.

---

## 👤 AUTOR

**Mücahid Emin Tomakin (TomaKing)**

| Platform      | Link                                                        | Icon |
|---------------|-------------------------------------------------------------|------|
| **GitHub**    | [@mucahid-emin-tomakin](https://github.com/mucahid-emin-tomakin) | 🐙   |
| **Portfolio** | Web Development & Next.js Enthusiast                        | 🌐   |
| **Interessen**| Web Development, UI/UX, React, Next.js, TypeScript         | 💻   |

**Über dieses Repository:**
- 🎯 **Ziel:** Persönliches Portfolio und Demo von Projekten
- 📚 **Lernressource:** Zeigt Next.js, React & TypeScript Best Practices
- 🎨 **Inspiration:** Individuelles Design, Animationen & Theme-Integration
- 🔧 **Werkzeuge:** Next.js, React, TypeScript, Vercel Deployment

---

## 📊 REPOSITORY STATISTIK

| Metrik | Wert | Trend |
|--------|------|-------|
| **Stars** | ![GitHub Stars](https://img.shields.io/github/stars/mucahid-emin-tomakin/KingFolio) | 📈 |
| **Forks** | ![GitHub Forks](https://img.shields.io/github/forks/mucahid-emin-tomakin/KingFolio) | 🔄 |
| **Issues** | ![GitHub Issues](https://img.shields.io/github/issues/mucahid-emin-tomakin/KingFolio) | ✅ |
| **Letztes Update** | ![GitHub Last Commit](https://img.shields.io/github/last-commit/mucahid-emin-tomakin/KingFolio) | 🕐 |

---

### 🔧 Made with ❤️ using Next.js, React & TypeScript
