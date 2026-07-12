# 🚀 Portfolio Frontend

> A modern, dynamic, and fully responsive personal portfolio website built with **React 19 + Vite**, powered by a **Spring Boot REST API** backend. Features smooth animations, lazy-loaded sections, and a real-time contact form.

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [⚙️ Getting Started](#️-getting-started)
- [🌐 Environment Variables](#-environment-variables)
- [🔗 API Integration](#-api-integration)
- [🧩 Components Overview](#-components-overview)
- [🪝 Custom Hooks](#-custom-hooks)
- [📦 Build & Deployment](#-build--deployment)
- [💡 What You Can Add Next](#-what-you-can-add-next)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

- ⚡ **Blazing Fast** – Vite 8 + React 19 with React Compiler for automatic memoization
- 🎨 **Dark Theme** – GitHub-inspired dark UI (`#0d1117` background) with `#3fb950` green accents
- 🖼️ **Animated Loading Screen** – Custom splash screen shown on first load
- 🔢 **Typewriter Effect** – Hero section uses `react-type-animation` for dynamic role display
- 📐 **Framer Motion Animations** – Smooth entrance animations and transitions on every section
- 📡 **Live Backend Data** – All sections (Profile, Skills, Projects, Experience, Education) fetch from REST API
- 📬 **Contact Form** – Sends messages directly via backend email service
- 📱 **Fully Responsive** – Mobile-first layout with Tailwind CSS v4
- ♾️ **Scroll-aware Animations** – Intersection Observer used for scroll-triggered animations
- 🔙 **Back to Top** – Floating button appears on scroll
- 🛡️ **Error Boundary** – Graceful error handling for each section
- ⏳ **Lazy Loading** – All major sections are code-split with `React.lazy` + `Suspense`

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | React 19 |
| **Build Tool** | Vite 8 |
| **Language** | JavaScript (JSX) |
| **Styling** | Tailwind CSS v4 |
| **Animations** | Framer Motion 12 |
| **HTTP Client** | Axios |
| **Typewriter** | react-type-animation |
| **Scroll Hooks** | react-intersection-observer |
| **Linter** | OxLint |
| **Compiler** | React Compiler (via Babel) |
| **Backend** | Spring Boot (separate repo) |
| **Hosting (API)** | Railway |

---

## 📁 Project Structure

```
portfolio-frontend/
├── public/                   # Static assets
├── src/
│   ├── assets/               # Images, icons, etc.
│   ├── components/
│   │   ├── Hero.jsx          # Landing / intro section
│   │   ├── About.jsx         # About me section
│   │   ├── Skills.jsx        # Technical skills grid
│   │   ├── Projects.jsx      # Projects showcase with filter
│   │   ├── Experience.jsx    # Work experience timeline
│   │   ├── Education.jsx     # Education timeline
│   │   ├── Contact.jsx       # Contact form + details
│   │   ├── Navbar.jsx        # Sticky top navigation bar
│   │   ├── Footer.jsx        # Footer component
│   │   ├── LoadingScreen.jsx # Full-screen intro loader
│   │   └── common/
│   │       ├── BackToTop.jsx     # Scroll-to-top button
│   │       ├── Button.jsx        # Reusable button component
│   │       ├── ErrorBoundary.jsx # React error boundary wrapper
│   │       ├── LoadingSpinner.jsx # Inline loading indicator
│   │       └── SectionHeader.jsx # Reusable section title
│   ├── hooks/
│   │   └── usePortfolioData.js  # Custom hooks for all API calls
│   ├── services/
│   │   └── api.js               # Axios instance + all API functions
│   ├── utils/
│   │   └── constants.js         # API base URL and other constants
│   ├── App.jsx                  # Root component with section layout
│   ├── App.css                  # Global component styles
│   ├── index.css                # Global CSS reset + theme variables
│   └── main.jsx                 # React DOM render entry point
├── .env.production              # Production environment variables
├── .gitignore
├── index.html                   # HTML shell
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm v9+
- The [Portfolio Backend](https://github.com/) running locally or deployed

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/portfolio-frontend.git
cd portfolio-frontend

# 2. Install dependencies
npm install

# 3. Create your local environment file
cp .env.production .env.local
# Edit .env.local and set your local backend URL
```

### Running Locally

```bash
npm run dev
```

The app will start at **http://localhost:5173**

### Linting

```bash
npm run lint
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 🌐 Environment Variables

Create a `.env.local` file in the root directory (for local dev) or set these in your deployment platform:

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Base URL of the Spring Boot backend API | `http://localhost:8080/api` |

> **Production** uses `.env.production` which points to the Railway-hosted backend:
> `https://portfolio-backend-production-d3fc.up.railway.app/api`

---

## 🔗 API Integration

All backend calls are managed through `src/services/api.js` using a pre-configured Axios instance.

| Function | Method | Endpoint | Used In |
|---|---|---|---|
| `getProfile()` | `GET` | `/profile` | Hero, About |
| `getSkills()` | `GET` | `/skills` | Skills |
| `getProjects()` | `GET` | `/projects` | Projects |
| `getExperience()` | `GET` | `/experience` | Experience |
| `getEducation()` | `GET` | `/education` | Education |
| `sendContact(data)` | `POST` | `/contact` | Contact Form |

### Axios Configuration

- **Base URL**: from `VITE_API_URL` environment variable
- **Timeout**: 10 seconds
- **Headers**: `Content-Type: application/json`
- **Error Interceptor**: Logs errors globally to the console

---

## 🧩 Components Overview

| Component | Description |
|---|---|
| `Hero` | Full-height landing section with typewriter effect, name, roles, and CTA buttons |
| `About` | Profile summary, photo, and personal details pulled from API |
| `Skills` | Categorized skill cards with icons and proficiency indicators |
| `Projects` | Card-based project showcase with category filter tabs |
| `Experience` | Vertical timeline of work experience entries |
| `Education` | Vertical timeline of academic qualifications |
| `Contact` | Email form + social links; posts to backend `/contact` endpoint |
| `Navbar` | Sticky navbar with active section highlighting via scroll detection |
| `Footer` | Minimal footer with links |
| `LoadingScreen` | Full-screen animated loader shown during app initialization |

### Common / Shared Components

| Component | Description |
|---|---|
| `ErrorBoundary` | Wraps sections to catch and display render errors gracefully |
| `LoadingSpinner` | Inline spinner for individual async states |
| `BackToTop` | Fixed button that appears after scrolling down 400px |
| `Button` | Styled reusable button with variant support |
| `SectionHeader` | Consistent section title + underline styling |

---

## 🪝 Custom Hooks

All data-fetching logic lives in `src/hooks/usePortfolioData.js`:

| Hook | Returns | Description |
|---|---|---|
| `useProfile()` | `{ data, loading }` | Fetches profile/about data |
| `useSkills()` | `{ data, loading }` | Fetches skills list |
| `useProjects()` | `{ data, loading }` | Fetches projects list |
| `useExperience()` | `{ data, loading }` | Fetches work experience |
| `useEducation()` | `{ data, loading }` | Fetches education entries |

Each hook uses `useState` + `useEffect` and exposes a `loading` flag for rendering spinners.

---

## 📦 Build & Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Set `VITE_API_URL` as an environment variable in the Vercel dashboard.

### Deploy to Netlify

1. Connect your GitHub repo to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variable: `VITE_API_URL=<your-backend-url>`

---

## 💡 What You Can Add Next

Here are ideas to enhance the portfolio further:

- [ ] **Dark / Light Mode Toggle** – Add a theme switch with CSS variables
- [ ] **Blog Section** – Fetch and display markdown blog posts from backend or a CMS
- [ ] **Resume / CV Download** – Add a button to download PDF resume directly
- [ ] **Project Detail Pages** – Use React Router to add individual project pages with galleries
- [ ] **Analytics** – Integrate Google Analytics or Plausible for visitor tracking
- [ ] **i18n / Multi-language** – Add language switcher using `react-i18next`
- [ ] **PWA Support** – Add a service worker for offline support via `vite-plugin-pwa`
- [ ] **Testimonials Section** – Show client/colleague recommendations
- [ ] **GitHub Activity Graph** – Embed a live GitHub contribution graph
- [ ] **Skeleton Loaders** – Replace spinners with shimmer skeleton placeholders
- [ ] **SEO Optimization** – Add `react-helmet-async` for meta tags per section
- [ ] **Unit Tests** – Add Vitest + React Testing Library coverage
- [ ] **TypeScript Migration** – Migrate `.jsx` to `.tsx` for type safety

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

```bash
# Fork and clone
git checkout -b feature/your-feature-name
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
# Open a Pull Request
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ using React + Vite + Spring Boot**

⭐ Star this repo if you found it helpful!

</div>
