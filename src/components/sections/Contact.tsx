import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

function Contact() {
  return (
    <section id="contact" className="contact-section section">
      <div className="section-heading">
        <p className="section-label">Contato</p>
        <h2>Pronto para transformar sua ideia em um produto.</h2>
      </div>

      <p className="section-copy">
        Estou aberto a novas oportunidades, projetos freelancer ou apenas para
        trocar uma ideia sobre tecnologia. Entre em contato por onde preferir!
      </p>

      <div className="contact-grid">
        <a href="mailto:erick.s0usa@outlook.com" className="contact-card">
          <span className="contact-card-title">
            <FaEnvelope aria-hidden="true" />
            E-mail
          </span>
          <strong>erick.s0usa@outlook.com</strong>
        </a>
        <a
          href="https://www.linkedin.com/in/erickdsr/"
          target="_blank"
          rel="noreferrer"
          className="contact-card"
        >
          <span className="contact-card-title">
            <FaLinkedin aria-hidden="true" />
            LinkedIn
          </span>
          <strong>Conectar no LinkedIn</strong>
        </a>
        <a
          href="https://github.com/erickdsr"
          target="_blank"
          rel="noreferrer"
          className="contact-card"
        >
          <span className="contact-card-title">
            <FaGithub aria-hidden="true" />
            GitHub
          </span>
          <strong>Acessar GitHub</strong>
        </a>
      </div>
    </section>
  );
}

export default Contact;
