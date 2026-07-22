import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import {
  FaBoxOpen,
  FaBolt,
  FaBuilding,
  FaChartLine,
  FaChartPie,
  FaCheckCircle,
  FaClipboardCheck,
  FaCodeBranch,
  FaCog,
  FaCubes,
  FaDatabase,
  FaDesktop,
  FaDocker,
  FaExchangeAlt,
  FaExpandAlt,
  FaFileCode,
  FaGithub,
  FaKey,
  FaLayerGroup,
  FaLock,
  FaProjectDiagram,
  FaRoute,
  FaShieldAlt,
  FaShoppingCart,
  FaSitemap,
  FaStar,
  FaTimes,
  FaUsers,
  FaUserTie,
} from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import garageOsLogin from '../assets/projects/garageos-login.png';
import ArchitectureFlowDiagram from '../components/diagrams/ArchitectureFlowDiagram';
import DatabaseDiagram from '../components/diagrams/DatabaseDiagram';
import { projects } from '../data/projects';

type TabKey = 'architecture' | 'highlights';
type ArchitectureTabKey = 'frontend' | 'backend' | 'database';
type HighlightTabKey = 'metrics' | 'features' | 'patterns';
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
  const [activeTab, setActiveTab] = useState<TabKey>('architecture');
  const [activeArchitectureTab, setActiveArchitectureTab] = useState<ArchitectureTabKey>('frontend');
  const [activeHighlightTab, setActiveHighlightTab] = useState<HighlightTabKey>('metrics');
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
    { key: 'architecture', label: 'Arquitetura' },
    { key: 'highlights', label: 'Destaques' },
  ];
  const architectureTabs: {
    key: ArchitectureTabKey;
    label: string;
    badge: string;
    Icon: IconType;
  }[] = [
    { key: 'frontend', label: 'Frontend', badge: '7 módulos', Icon: FaDesktop },
    { key: 'backend', label: 'Backend', badge: '12 módulos', Icon: FaCog },
    { key: 'database', label: 'Banco de Dados', badge: '14 tabelas', Icon: FaDatabase },
  ];
  const activeArchitectureIndex = architectureTabs.findIndex((tab) => tab.key === activeArchitectureTab);
  const highlightTabs: {
    key: HighlightTabKey;
    label: string;
    badge: string;
    Icon: IconType;
  }[] = [
    { key: 'metrics', label: 'Métricas', badge: '6 indicadores', Icon: FaChartPie },
    { key: 'features', label: 'Funcionalidades', badge: '10 recursos', Icon: FaBolt },
    { key: 'patterns', label: 'Padrões Utilizados', badge: '10 práticas', Icon: FaProjectDiagram },
  ];
  const activeHighlightIndex = highlightTabs.findIndex((tab) => tab.key === activeHighlightTab);
  const projectMetrics = [
    { value: '14', label: 'Tabelas', description: 'Modelo relacional organizado por módulos.', Icon: FaDatabase },
    { value: '40+', label: 'Endpoints', description: 'API REST cobrindo os fluxos principais.', Icon: FaRoute },
    { value: '9', label: 'Módulos', description: 'Áreas funcionais separadas por domínio.', Icon: FaCubes },
    { value: 'JWT', label: 'Segurança', description: 'Autenticação stateless para rotas protegidas.', Icon: FaShieldAlt },
    { value: 'Docker', label: 'Container', description: 'Ambiente preparado para execução isolada.', Icon: FaDocker },
    { value: 'REST', label: 'API', description: 'Contrato HTTP claro entre frontend e backend.', Icon: FaExchangeAlt },
  ];
  const projectFeatures = [
    { title: 'Login com JWT', description: 'Autenticação segura com sessão baseada em token.', Icon: FaLock },
    { title: 'Clientes', description: 'Cadastro e gerenciamento da carteira de clientes.', Icon: FaUsers },
    { title: 'Fornecedores', description: 'Controle de parceiros e origem dos produtos.', Icon: FaBuilding },
    { title: 'Produtos', description: 'Catálogo com categorias, preço e dados operacionais.', Icon: FaBoxOpen },
    { title: 'Estoque', description: 'Acompanhamento de quantidade e movimentações.', Icon: FaChartLine },
    { title: 'Compras', description: 'Registro de entradas e itens adquiridos.', Icon: FaShoppingCart },
    { title: 'Vendas', description: 'Fluxo comercial com itens e formas de pagamento.', Icon: FaChartPie },
    { title: 'Funcionários', description: 'Gestão de usuários internos do sistema.', Icon: FaUserTie },
    { title: 'Dashboard', description: 'Visão rápida de indicadores operacionais.', Icon: FaChartLine },
    { title: 'Controle de Permissões', description: 'Perfis de acesso para proteger funcionalidades.', Icon: FaKey },
  ];
  const projectPatterns = [
    { title: 'MVC', description: 'Separa apresentação, regras e dados em responsabilidades claras.', Icon: FaSitemap },
    { title: 'Arquitetura em Camadas', description: 'Organiza controller, service e repository por função.', Icon: FaLayerGroup },
    { title: 'DTO Pattern', description: 'Modela entradas e saídas sem expor entidades internas.', Icon: FaExchangeAlt },
    { title: 'Repository Pattern', description: 'Centraliza o acesso aos dados e desacopla a persistência.', Icon: FaDatabase },
    { title: 'REST API', description: 'Expõe recursos por rotas HTTP previsíveis e objetivas.', Icon: FaRoute },
    { title: 'SOLID', description: 'Guia classes mais coesas, extensíveis e fáceis de manter.', Icon: FaCodeBranch },
    { title: 'Clean Code', description: 'Prioriza nomes claros, baixo acoplamento e leitura simples.', Icon: FaFileCode },
    { title: 'Tratamento Global de Exceções', description: 'Padroniza erros e respostas da API em um único fluxo.', Icon: FaClipboardCheck },
    { title: 'Validações', description: 'Protege regras de entrada antes da persistência.', Icon: FaCheckCircle },
    { title: 'Swagger/OpenAPI', description: 'Documenta endpoints e contratos para consumo da API.', Icon: FaFileCode },
  ];

  const renderArchitectureContent = () => {
    switch (activeArchitectureTab) {
      case 'database':
        return (
          <div className="architecture-diagram-card">
            <div className="architecture-diagram-header">
              <h4>Diagrama de relacionamento (DER)</h4>
              <p>
                Estrutura relacional com PostgreSQL, utilizando o DBeaver como gerenciador, organizando por módulos e responsabilidades.
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

  const renderHighlightsContent = () => {
    switch (activeHighlightTab) {
      case 'features':
        return (
          <div className="technical-card-grid technical-card-grid--features">
            {projectFeatures.map(({ title, description, Icon }) => (
              <article className="technical-card" key={title}>
                <span className="technical-card__icon" aria-hidden="true">
                  <Icon />
                </span>
                <div>
                  <h4>{title}</h4>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
        );
      case 'patterns':
        return (
          <div className="technical-card-grid technical-card-grid--patterns">
            {projectPatterns.map(({ title, description, Icon }) => (
              <article className="technical-card" key={title}>
                <span className="technical-card__icon" aria-hidden="true">
                  <Icon />
                </span>
                <div>
                  <h4>{title}</h4>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
        );
      default:
        return (
          <div className="metrics-grid">
            {projectMetrics.map(({ value, label, description, Icon }) => (
              <article className="metric-card" key={label}>
                <span className="metric-card__icon" aria-hidden="true">
                  <Icon />
                </span>
                <strong>{value}</strong>
                <span>{label}</span>
                <p>{description}</p>
              </article>
            ))}
          </div>
        );
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'architecture':
        return (
          <div className="tab-panel architecture-panel">
            <div className="architecture-panel__intro">
              <h3>
                <FaProjectDiagram aria-hidden="true" />
                Arquitetura da Aplicação
              </h3>
              <p>
                Explore como o sistema foi organizado em Frontend, Backend e Banco de Dados.
              </p>
            </div>

            <div className="architecture-nav-shell">
              <div
                className="architecture-subtabs"
                role="tablist"
                aria-label="Subcategorias de arquitetura"
                style={{ '--active-architecture-tab': Math.max(activeArchitectureIndex, 0) } as CSSProperties}
              >
                {architectureTabs.map(({ key, label, badge, Icon }) => {
                  const isActive = activeArchitectureTab === key;

                  return (
                    <button
                      key={key}
                      id={`architecture-tab-${key}`}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`architecture-panel-${key}`}
                      className={`architecture-subtab ${isActive ? 'active' : ''}`}
                      onClick={() => setActiveArchitectureTab(key)}
                    >
                      <span className="architecture-subtab__main">
                        <Icon className="architecture-subtab__icon" aria-hidden="true" />
                        <span>{label}</span>
                      </span>
                      <span className="architecture-subtab__badge">{badge}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              key={activeArchitectureTab}
              id={`architecture-panel-${activeArchitectureTab}`}
              className="architecture-content-shell"
              role="tabpanel"
              aria-labelledby={`architecture-tab-${activeArchitectureTab}`}
            >
              {renderArchitectureContent()}
            </div>
          </div>
        );
      case 'highlights':
        return (
          <div className="tab-panel architecture-panel">
            <div className="architecture-panel__intro">
              <h3>
                <FaStar aria-hidden="true" />
                Destaques Técnicos
              </h3>
              <p>
                Indicadores, recursos e padrões que demonstram a estrutura profissional do GarageOS.
              </p>
            </div>

            <div className="architecture-nav-shell">
              <div
                className="architecture-subtabs"
                role="tablist"
                aria-label="Categorias de destaques"
                style={{ '--active-architecture-tab': Math.max(activeHighlightIndex, 0) } as CSSProperties}
              >
                {highlightTabs.map(({ key, label, badge, Icon }) => {
                  const isActive = activeHighlightTab === key;

                  return (
                    <button
                      key={key}
                      id={`highlight-tab-${key}`}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`highlight-panel-${key}`}
                      className={`architecture-subtab ${isActive ? 'active' : ''}`}
                      onClick={() => setActiveHighlightTab(key)}
                    >
                      <span className="architecture-subtab__main">
                        <Icon className="architecture-subtab__icon" aria-hidden="true" />
                        <span>{label}</span>
                      </span>
                      <span className="architecture-subtab__badge">{badge}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              key={activeHighlightTab}
              id={`highlight-panel-${activeHighlightTab}`}
              className="architecture-content-shell highlights-content-shell"
              role="tabpanel"
              aria-labelledby={`highlight-tab-${activeHighlightTab}`}
            >
              {renderHighlightsContent()}
            </div>
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

            <div className="project-primary-nav">
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

              <a
                className="tab-button project-code-link"
                href={repositoryUrls[project.id] ?? 'https://github.com/erickdsr'}
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub aria-hidden="true" />
                Ver repositório no GitHub
              </a>
            </div>

            {renderTabContent()}
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
