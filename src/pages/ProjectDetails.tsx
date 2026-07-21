import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { FaExpandAlt, FaTimes } from 'react-icons/fa';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import garageOsLogin from '../assets/projects/garageos-login.png';
import ArchitectureFlowDiagram from '../components/diagrams/ArchitectureFlowDiagram';
import DatabaseDiagram from '../components/diagrams/DatabaseDiagram';
import { projects } from '../data/projects';

type TabKey = 'about' | 'architecture' | 'highlights';
type ArchitectureTabKey = 'frontend' | 'backend' | 'database';
type TransitionState = {
  originRect?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

const repositoryUrls: Record<string, string> = {
  'Oficina-System': 'https://github.com/erickdsr/oficina-system',
  portfolio: 'https://github.com/erickdsr/portfolio',
};

function ProjectDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>('about');
  const [activeArchitectureTab, setActiveArchitectureTab] = useState<ArchitectureTabKey>('frontend');
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'entering' | 'closing'>('idle');
  const [previewOpen, setPreviewOpen] = useState(false);
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
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setAnimationPhase('entering');
    });

    const timer = window.setTimeout(() => {
      setAnimationPhase('idle');
    }, 240);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [prefersReducedMotion, project, transitionState.originRect]);

  useEffect(() => {
    if (!previewOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPreviewOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [previewOpen]);

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
          <div className="architecture-diagram-card">
            <div className="architecture-diagram-header">
              <h4>Diagrama de relacionamento (DER)</h4>
              <p>
                Estrutura relacional com PostgreSQL, utilizando o DBeaver com gerenciador, organizando por módulos e responsabilidades.
              </p>
            </div>
            <DatabaseDiagram />
          </div>
        );
      case 'frontend':
        return (
          <div className="architecture-diagram-card">
            <div className="architecture-diagram-header">
              <h4>Arquitetura do Frontend</h4>
              <p>
                Interface desenvolvida com React e TypeScript, organizada em páginas, componentes reutilizáveis, gerenciamento de estado e serviços responsáveis pela comunicação com a API REST.
              </p>
            </div>
            <ArchitectureFlowDiagram type="frontend" />
          </div>
        );
      default:
        return (
          <div className="architecture-diagram-card">
            <div className="architecture-diagram-header">
              <h4>Arquitetura do Backend</h4>
              <p>API REST desenvolvida com Spring Boot, organizada em camadas de controle, serviço e persistência, utilizando DTOs, Spring Data JPA, autenticação JWT e tratamento global de exceções.</p>
            </div>
            <ArchitectureFlowDiagram type="backend" />
          </div>
        );
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'architecture':
        return (
          <div className="tab-panel">
            <h3>Arquitetura do projeto</h3>
            <p>
              A aplicação é estruturada em módulos com separação entre camadas de controle,
              serviço e persistência, facilitando manutenção e evolução.
            </p>

            <div className="architecture-subtabs" role="tablist" aria-label="Subcategorias de arquitetura">
              {[
                { key: 'frontend', label: 'Frontend' },
                { key: 'backend', label: 'Backend' },
                { key: 'database', label: 'Banco de Dados' },
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
                <h3>GarageOS</h3>
                <button
                  type="button"
                  className="project-preview"
                  onClick={() => setPreviewOpen(true)}
                  aria-label="Abrir preview da tela de login do GarageOS"
                >
                  <img
                    src={garageOsLogin}
                    alt="Tela de login do sistema GarageOS"
                    className="project-preview__image"
                  />

                  <span className="project-preview__overlay" aria-hidden="true">
                    <span className="project-preview__action">
                      <FaExpandAlt />
                      Visualizar projeto
                    </span>
                  </span>
                </button>
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
                href={repositoryUrls[project.id] ?? 'https://github.com/erickdsr'}
                target="_blank"
                rel="noreferrer"
              >
                Ver código no GitHub
              </a>
             
            </div>
          </div>
        </div>

        {previewOpen && (
          <div
            className="preview-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Preview ampliado do GarageOS"
            onClick={() => setPreviewOpen(false)}
          >
            <div
              className="preview-modal__content"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="preview-modal__close"
                onClick={() => setPreviewOpen(false)}
                aria-label="Fechar preview"
              >
                <FaTimes aria-hidden="true" />
              </button>

              <img
                src={garageOsLogin}
                alt="Tela de login ampliada do sistema GarageOS"
                className="preview-modal__image"
              />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default ProjectDetails;
