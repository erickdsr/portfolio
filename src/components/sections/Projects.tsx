const projects = [
  {
    title: 'Sistema de agendamentos',
    description:
      'Dashboard para organizar horários, clientes e status de atendimentos.',
    stack: 'React / TypeScript / CSS',
  },
  {
    title: 'API de gestão',
    description:
      'Back-end com autenticação, regras de negócio e documentação de rotas.',
    stack: 'Java / Spring Boot / PostgreSQL',
  },
  {
    title: 'Landing page comercial',
    description:
      'Página responsiva para apresentar serviços e converter visitantes em contatos.',
    stack: 'HTML / CSS / JavaScript',
  },
];

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section-heading">
        <p className="section-label">Projetos</p>
        <h2>Trabalhos em destaque</h2>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <span>{project.stack}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a href="#contact">Ver detalhes</a>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;
