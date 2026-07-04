import { Link } from 'react-router-dom';
import { projects } from '../../data/projects';

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section-heading">
        <p className="section-label">Projetos</p>
        <h2>Projetos em destaque</h2>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.id}>
            <span>{project.stack}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <Link to={`/project/${project.id}`} className="project-link">
              Ver detalhes
              <span className="link-arrow">→</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;
