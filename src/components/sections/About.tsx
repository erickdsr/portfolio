function About() {
  return (
    <section id="about" className="section">
      <div className="section-heading">
        <p className="section-label">Sobre</p>
        <h2>Desenvolvedor que entrega soluções com foco em resultado.</h2>
      </div>

      <div className="about-grid">
        <div className="about-description">
          <p>
            Sou apaixonado por transformar problemas complexos em experiências
            digitais intuitivas. Com foco em qualidade e atenção ao detalhe,
            construo aplicações robustas para web e APIs modernas.
          </p>
          <p>
            Aqui você pode adicionar sua formação, experiência mais relevante,
            tecnologias dominadas e projetos que mais se destacam na sua carreira.
          </p>
        </div>

        <div className="about-highlights">
          <div className="highlight-card">
            <strong>+5 projetos concluídos</strong>
            <p>Dashboards, APIs, landing pages e soluções completas para clientes.</p>
          </div>
          <div className="highlight-card">
            <strong>Entrega profissional</strong>
            <p>Boa comunicação, compromisso com prazos e documentação clara.</p>
          </div>
          <div className="highlight-card">
            <strong>Front-end + Back-end</strong>
            <p>React, TypeScript, Java, Spring Boot, PostgreSQL, Docker e Git.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
