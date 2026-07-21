import hero from '../../assets/hero-optimized.jpg';
import { FaCircle, FaGraduationCap, FaLaptopCode, FaMapMarkerAlt } from 'react-icons/fa';

const profileItems = [
  { Icon: FaMapMarkerAlt, label: 'Araripina - PE' },
  { Icon: FaLaptopCode, label: 'Desenvolvedor Full Stack' },
  { Icon: FaGraduationCap, label: 'ADS • UNIASSELVI' },
  { Icon: FaCircle, label: 'Disponível para oportunidades' },
];

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <p className="section-label">Portfólio</p>
        <h1>Erick Sousa</h1>
        <h2>Desenvolvedor Full Stack</h2>
        <p>
          Desenvolvo aplicações web modernas utilizando Java, Spring Boot e React, com foco em arquitetura
          escalável, APIs REST, autenticação JWT, bancos relacionais e interfaces responsivas.
        </p>

        <div className="hero-cta">
          <a href="/Erick_Sousa_CV.pdf" className="button button-primary" download>
            Download CV
          </a>
          <a href="#projects" className="button button-outline">
            Ver Projetos
          </a>
        </div>

        <p className="hero-tech-signature" aria-label="Java, Spring Boot, React, PostgreSQL e Docker">
          <span>Java</span>
          <span aria-hidden="true">•</span>
          <span>Spring Boot</span>
          <span aria-hidden="true">•</span>
          <span>React</span>
          <span aria-hidden="true">•</span>
          <span>PostgreSQL</span>
          <span aria-hidden="true">•</span>
          <span>Docker</span>
        </p>
      </div>

      <div className="hero-visual">
        <div className="hero-image">
          <img src={hero} alt="Erick Sousa" fetchPriority="high" />
        </div>

        <aside className="hero-tech-panel" aria-label="Perfil profissional">
          <span className="hero-tech-panel__eyebrow">Profile</span>
          <div className="hero-tech-panel__list">
            {profileItems.map((item) => (
              <span className="hero-tech-panel__item" key={item.label}>
                <span className="hero-tech-panel__marker" aria-hidden="true">
                  <item.Icon />
                </span>
                {item.label}
              </span>
            ))}
          </div>
        </aside>
      </div>

      <a href="#about" className="hero-scroll-indicator" aria-label="Rolar para a seção Sobre">
        <span className="hero-scroll-indicator__mouse" aria-hidden="true" />
        <span>Scroll Down</span>
      </a>
    </section>
  );
}

export default Hero;
