import hero from '../../assets/hero.png';

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-actions">
          <a href="#about" className="hero-link">
            Sobre
          </a>
          <a href="#skills" className="hero-link">
            Skills
          </a>
          <a href="#projects" className="hero-link">
            Projetos
          </a>
          <a href="#contact" className="hero-link">
            Contato
          </a>
        </div>

      <div className="hero-content">
        <p className="section-label">Portfólio</p>
        <h1>Erick Sousa</h1>
        <h2>Desenvolvedor Full Stack</h2>
        <p>
          Desenvolvo aplicações web modernas, escaláveis e focadas em performance utilizando <strong>Java</strong>, <strong>Spring Boot</strong>, <strong>React</strong>, <strong>JavaScript</strong>, <strong>TypeScript</strong> e <strong>SQL</strong>.
        </p>

        <div className="hero-cta">
          <a href="/curriculo.pdf" className="button button-primary" download>
            Download CV
          </a>
        </div>
      </div>

      <div className="hero-image">
        <img src={hero} alt="Erick Sousa" />
      </div>
    </section>
  );
}

export default Hero;

