import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact';

type HomeLocationState = {
  focusProjects?: boolean;
  focusContact?: boolean;
};

function Home() {
  const location = useLocation();
  const state = location.state as HomeLocationState | null;
  const targetSection = state?.focusProjects ? 'projects' : state?.focusContact ? 'contact' : null;

  useEffect(() => {
    if (!targetSection) {
      return;
    }

    const element = document.getElementById(targetSection);

    if (!element) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [targetSection]);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}

export default Home;
