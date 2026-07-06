function About() {
  return (
    <section id="about" className="section">
      <div className="section-heading">
        <p className="section-label">Sobre</p>
        <h2>Desenvolvedor com foco em  soluções e resultado.</h2>
      </div>

      <div className="about-grid">
        <div className="about-description">
          <p>
          Sou desenvolvedor Full Stack em formação, com foco em Java, Spring Boot, React e TypeScript. Tenho interesse em construir aplicações web bem estruturadas, com código limpo, organização em camadas, integração com banco de dados e boas práticas de desenvolvimento.
          </p>
          <p>
          Atualmente curso Análise e Desenvolvimento de Sistemas na UNIASSELVI e venho desenvolvendo projetos práticos para consolidar meus conhecimentos em Back-end, Front-end, APIs REST, autenticação, banco de dados, Docker e versionamento com Git .
          </p>
          <p>
          Busco evoluir constantemente como desenvolvedor, criando soluções que resolvam problemas reais e entreguem uma boa experiência para o usuário.
          </p>
        </div>

        <div className="about-highlights">
          <div className="highlight-card">
            <div className="highlight-card-header">
              <strong className="highlight-number">+3</strong>
              <span className="highlight-subtitle"></span>
              <strong>Projetos Desenvolvidos</strong>
            </div>
            <p>Desenvolvimento de aplicações web, APIs REST e sistemas com foco em aprendizado, organização de código e resolução de problemas reais.</p>
          </div>
          <div className="highlight-card">
            <strong>Qualidade & Arquitetura</strong>
            <p>Código manutenível, modelagem eficiente de bancos de dados relacionais e compromisso com boas práticas de desenvolvimento (SOLID).</p>
          </div>
          <div className="highlight-card">
            <strong>Full Stack</strong>
            <p>Java, Spring Boot, React, TypeScript, JavaScript, PostgreSQL, MySQL, Docker, Git e GitHub.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
