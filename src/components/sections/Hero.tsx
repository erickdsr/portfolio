import hero from '../../assets/hero.png';

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <p className="section-label">Portfólio</p>
        <h1>Eu sou Erick Sousa, desenvolvedor full-stack.</h1>
        <p>
          Ajudo empresas a transformar ideias em produtos digitais elegantes,
          escaláveis e com excelente experiência para o usuário.
        </p>

        <div className="hero-actions">
          <a href="#contact" className="button button-primary">
            Vamos conversar
          </a>
          <a href="#projects" className="button button-secondary">
            Ver projetos
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

