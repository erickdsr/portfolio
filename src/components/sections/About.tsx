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
          Sou um Desenvolvedor Full Stack focado em construir sistemas robustos, escaláveis e de alta performance. Unindo o poder e a segurança do ecossistema Java (Spring Boot) no Back-end com a agilidade e interatividade do React no Front-end, meu foco é transformar requisitos complexos em softwares fluidos e intuitivos. Busco constantemente alinhar boas práticas de arquitetura de software, código limpo (Clean Code) e testes automatizados para entregar produtos que resolvam problemas reais e gerem impacto direto nos objetivos do negócio.

Atualmente, estou expandindo minha base teórica e técnica cursando Análise e Desenvolvimento de Sistemas na UNIASSELVI, combinando o aprendizado acadêmico com o desenvolvimento contínuo de projetos práticos.
          </p>
        </div>

        <div className="about-highlights">
          <div className="highlight-card">
            <div className="highlight-card-header">
              <strong className="highlight-number">+3</strong>
              <span className="highlight-subtitle"></span>
              <strong>Projetos Desenvolvidos</strong>
            </div>
            <p>Criação de APIs RESTful estruturadas, aplicações web modernas voltadas para a experiência do usuário.</p>
          </div>
          <div className="highlight-card">
            <strong>Qualidade & Arquitetura</strong>
            <p>Código manutenível, modelagem eficiente de bancos de dados relacionais e compromisso com boas práticas de desenvolvimento (SOLID).</p>
          </div>
          <div className="highlight-card">
            <strong>Full Stack</strong>
            <p>Java, Spring Boot, React, JavaScript, TypeScript, MySQL, PostgreSQL, Docker e controle de versão com Git.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
