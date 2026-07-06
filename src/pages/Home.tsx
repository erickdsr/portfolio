import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact';

type HomeLocationState = {
  focusProjects?: boolean;
};

function Home() {
  const location = useLocation();
  const shouldFocusProjects = (location.state as HomeLocationState | null)?.focusProjects;

  useEffect(() => {
    if (!shouldFocusProjects) {
      return;
    }

    const element = document.getElementById('projects');

    if (!element) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [shouldFocusProjects]);

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
