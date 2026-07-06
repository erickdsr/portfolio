import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { projects } from '../data/projects';

type TabKey = 'about' | 'architecture' | 'highlights';
type ArchitectureTabKey = 'backend' | 'database' | 'frontend';
type TransitionState = {
  originRect?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

function ProjectDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>('about');
  const [activeArchitectureTab, setActiveArchitectureTab] = useState<ArchitectureTabKey>('backend');
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'entering' | 'closing'>('idle');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const transitionState = (location.state as TransitionState | null) ?? {};
  const project = projects.find((item) => item.id === id);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    handleChange();

    mediaQuery.addEventListener?.('change', handleChange);

    return () => mediaQuery.removeEventListener?.('change', handleChange);
  }, []);

  useEffect(() => {
    if (!project || !transitionState.originRect || prefersReducedMotion) {
      setAnimationPhase('idle');
      return;
    }

    setAnimationPhase('entering');

    const timer = window.setTimeout(() => {
      setAnimationPhase('idle');
    }, 240);

    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion, project, transitionState.originRect]);

  const handleBack = () => {
    if (!project || prefersReducedMotion) {
      navigate('/', { replace: true, state: { focusProjects: true } });
      return;
    }

    setAnimationPhase('closing');

    window.setTimeout(() => {
      navigate('/', { replace: true, state: { focusProjects: true } });
    }, 240);
  };

  const animationStyle = useMemo(() => {
    if (!transitionState.originRect || prefersReducedMotion) {
      return undefined;
    }

    const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const height = typeof window !== 'undefined' ? window.innerHeight : 800;
    const originX = transitionState.originRect.x + transitionState.originRect.width / 2;
    const originY = transitionState.originRect.y + transitionState.originRect.height / 2;
    const entryTranslateX = width / 2 - originX;
    const entryTranslateY = height / 2 - originY;
    const exitTranslateX = originX - width / 2;
    const exitTranslateY = originY - height / 2;

    return {
      '--origin-x': `${originX}px`,
      '--origin-y': `${originY}px`,
      '--entry-translate-x': `${entryTranslateX}px`,
      '--entry-translate-y': `${entryTranslateY}px`,
      '--exit-translate-x': `${exitTranslateX}px`,
      '--exit-translate-y': `${exitTranslateY}px`,
      '--origin-scale': `${Math.max(0.14, Math.min(transitionState.originRect.width / width, transitionState.originRect.height / height))}`,
    } as CSSProperties;
  }, [prefersReducedMotion, transitionState.originRect]);

  if (!project) {
    return (
      <div className="project-details-shell">
        <section className="section project-details-page" aria-labelledby="project-details-title">
          <button type="button" className="back-link" onClick={handleBack}>
            ← Voltar para os projetos
          </button>
          <div className="project-details-card">
            <h2 id="project-details-title">Projeto não encontrado</h2>
            <p className="project-details-description">
              Não foi possível localizar este projeto no momento.
            </p>
          </div>
        </section>
      </div>
    );
  }

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'about', label: 'Sobre' },
    { key: 'architecture', label: 'Arquitetura' },
    { key: 'highlights', label: 'Destaques' },
  ];

  const renderArchitectureContent = () => {
    switch (activeArchitectureTab) {
      case 'database':
        return (
          <div className="architecture-preview-card">
            <h4>Diagrama de relacionamento (DER)</h4>
            <p>Espaço reservado para o modelo relacional do PostgreSQL com tabelas, chaves e relações.</p>
            <div className="architecture-placeholder" />
          </div>
        );
      case 'frontend':
        return (
          <div className="architecture-preview-card">
            <h4>Estrutura do Frontend</h4>
            <p>Espaço reservado para a organização das telas, componentes e fluxo de navegação do front.</p>
            <div className="architecture-placeholder" />
          </div>
        );
      default:
        return (
          <div className="architecture-preview-card">
            <h4>Diagrama de arquitetura do Spring Boot</h4>
            <p>Espaço reservado para o fluxo da API, controllers, services, repositories e integração externa.</p>
            <div className="architecture-placeholder" />
          </div>
        );
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'architecture':
        return (
          <div className="tab-panel">
            <h3>Arquitetura em Camadas (Layered)</h3>
            <p>
              A aplicação é estruturada em módulos com separação entre camadas de controle,
              serviço e persistência, facilitando manutenção e evolução.
            </p>

            <div className="architecture-subtabs" role="tablist" aria-label="Subcategorias de arquitetura">
              {[
                { key: 'backend', label: 'Backend' },
                { key: 'database', label: 'Banco de Dados' },
                { key: 'frontend', label: 'Frontend' },
              ].map((subTab) => (
                <button
                  key={subTab.key}
                  type="button"
                  className={`architecture-subtab ${activeArchitectureTab === subTab.key ? 'active' : ''}`}
                  onClick={() => setActiveArchitectureTab(subTab.key as ArchitectureTabKey)}
                >
                  {subTab.label}
                </button>
              ))}
            </div>

            {renderArchitectureContent()}
          </div>
        );
      case 'highlights':
        return (
          <div className="tab-panel">
            <h3>Principais diferenciais</h3>
            <ul className="detail-list">
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        );
      default:
        return (
          <div className="tab-panel">
            <h3>Desafio e solução</h3>
            <p>{project.challenge}</p>
            <p>{project.solution}</p>
          </div>
        );
    }
  };

  return (
    <div
      className={`project-details-shell ${animationPhase === 'entering' ? 'is-entering' : ''} ${animationPhase === 'closing' ? 'is-closing' : ''}`}
      style={animationStyle}
    >
      <section className="section project-details-page" aria-labelledby="project-details-title">
        <button type="button" className="back-link" onClick={handleBack}>
          ← Voltar para os projetos
        </button>

        <div className="project-details-card">
          <div className="project-preview-column">
            <div className="project-preview-shell">
              <div className="preview-toolbar">
                <span />
                <span />
                <span />
              </div>
              <div className="preview-content">
                <p className="preview-label">Preview do projeto</p>
                <h3>{project.title}</h3>
                <p>{project.longDescription}</p>
                <div className="preview-visual" />
              </div>
            </div>
          </div>

          <div className="project-info-column">
            <div className="project-details-header">
              <span className="project-category-pill">{project.stack}</span>
              <h2 id="project-details-title">{project.title}</h2>
              <p className="project-details-description">{project.longDescription}</p>
            </div>

            <div className="project-tech-list">
              {project.technologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>

            <div className="tabs" role="tablist" aria-label="Informações do projeto">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {renderTabContent()}

            <div className="project-actions">
              <a
                className="btn btn-primary"
                href={project.id === 'Oficina-System' ? 'https://github.com/erickdsr/oficina-system' : 'https://github.com/erickdsr/portfolio'}
                target="_blank"
                rel="noreferrer"
              >
                Ver Código no GitHub
              </a>
              <a className="btn btn-secondary" href="#contact" rel="noreferrer">
                Acessar Documentação
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProjectDetails;