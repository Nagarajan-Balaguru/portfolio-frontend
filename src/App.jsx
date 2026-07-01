import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/common/BackToTop';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingScreen from './components/LoadingScreen';

const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Contact = lazy(() => import('./components/Contact'));
const Education = lazy(() => import('./components/Education'));

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[#3fb950] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#3fb950] text-sm font-mono">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <div style={{ backgroundColor: '#0d1117' }} className="min-h-screen text-white">
      <LoadingScreen />
      <Navbar />
      <main>
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <section id="hero"><Hero /></section>
            <section id="about"><About /></section>
            <section id="skills"><Skills /></section>
            <section id="projects"><Projects /></section>
            <section id="experience"><Experience /></section>
            <section id="education"><Education /></section>
            <section id="contact"><Contact /></section>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;