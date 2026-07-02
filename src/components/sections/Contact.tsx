function Contact() {
  return (
    <section id="contact" className="contact-section section">
      <div className="section-heading">
        <p className="section-label">Contato</p>
        <h2>Pronto para transformar sua ideia em um produto.</h2>
      </div>

      <p className="section-copy">
        Substitua estes dados pelos seus canais reais para facilitar o primeiro
        contato com clareza e confiança.
      </p>

      <div className="contact-grid">
        <a href="mailto:seuemail@exemplo.com" className="contact-card">
          <span>E-mail</span>
          <strong>seuemail@exemplo.com</strong>
        </a>
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noreferrer"
          className="contact-card"
        >
          <span>LinkedIn</span>
          <strong>linkedin.com/in/seunome</strong>
        </a>
        <a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          className="contact-card"
        >
          <span>GitHub</span>
          <strong>github.com/seunome</strong>
        </a>
      </div>
    </section>
  );
}

export default Contact;
