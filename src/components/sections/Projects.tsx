const projects = [
  {
    title: 'PROJECTS...',
    description:
      'under construction...',
    stack: 'LANGUAGE / FRAMEWORK / DATABASE',
  },
  {
    title: 'API de gestão',
    description:
      'Back-end com autenticação, regras de negócio e documentação de rotas.',
    stack: 'Java / Spring Boot / PostgreSQL',
  },
  {
    title: 'PROJECTS...',
    description:
      'under construction...',
    stack: 'LANGUAGE / FRAMEWORK / DATABASE',
  },
];

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section-heading">
        <p className="section-label">Projetos</p>
        <h2>Projetos em destaque</h2>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <span>{project.stack}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a href="#contact">
              Ver detalhes
              <span className="link-arrow">→</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;
