import { type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../../data/projects';

function Projects() {
  const navigate = useNavigate();

  const handleOpenProject = (event: MouseEvent<HTMLAnchorElement>, projectId: string) => {
    event.preventDefault();

    const rect = event.currentTarget.getBoundingClientRect();

    navigate(`/project/${projectId}`, {
      state: {
        originRect: {
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height,
        },
      },
    });
  };

  return (
    <section id="projects" className="section">
      <div className="section-heading">
        <p className="section-label">Projetos</p>
        <h2>Projetos em destaque</h2>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.id}>
            <span className="project-stack">{project.stack}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a
              href={`/project/${project.id}`}
              className="project-link"
              onClick={(event) => handleOpenProject(event, project.id)}
            >
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
