import heroImage from '../../assets/hero.png';

function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-copy">
        <p className="eyebrow">Portfólio profissional</p>
        <h1>Erick Sousa</h1>
        <p className="hero-subtitle">
          Desenvolvedor criando aplicações modernas, responsivas e organizadas
          para resolver problemas reais.
        </p>

        <div className="hero-actions">
          <a className="button primary" href="#projects">
            Ver projetos
          </a>
          <a className="button secondary" href="#contact">
            Falar comigo
          </a>
        </div>
      </div>

      <div className="hero-visual">
        <img src={heroImage} alt="Mesa de trabalho com tela de código" />
        <div className="status-panel">
          <span>Disponível para projetos</span>
          <strong>Full Stack Developer</strong>
        </div>
      </div>
    </section>
  );
}

export default Hero;
