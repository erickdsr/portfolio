function Contact() {
  return (
    <section id="contact" className="contact-section">
      <p className="section-label">Contato</p>
      <h2>Vamos construir algo com uma cara profissional.</h2>
      <p>
        Troque estes links pelo seu e-mail, LinkedIn, GitHub, WhatsApp ou
        currículo.
      </p>

      <div className="contact-links">
        <a href="mailto:seuemail@exemplo.com">seuemail@exemplo.com</a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href="https://github.com/" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </div>
    </section>
  );
}

export default Contact;
