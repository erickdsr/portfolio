import { useMemo, useState, type CSSProperties, type ReactNode } from 'react';
import {
  FaCode,
  FaCubes,
  FaDatabase,
  FaDocker,
  FaExchangeAlt,
  FaExclamationTriangle,
  FaFileAlt,
  FaKey,
  FaLayerGroup,
  FaLock,
  FaPlug,
  FaServer,
  FaShieldAlt,
  FaUser,
} from 'react-icons/fa';
import './ArchitectureFlowDiagram.css';

type Anchor = 'top' | 'right' | 'bottom' | 'left';
type DiagramType = 'frontend' | 'backend';
type NodeKind = 'compact' | 'layer' | 'service' | 'auxiliary' | 'primary';

type FlowNode = {
  id: string;
  label: string;
  description?: string;
  items?: string[];
  x: number;
  y: number;
  icon: ReactNode;
  kind?: NodeKind;
};

type FlowConnection = {
  from: string;
  to: string;
  fromAnchor?: Anchor;
  toAnchor?: Anchor;
};

const frontendNodes: FlowNode[] = [
  { id: 'user', label: 'Usuário', x: 50, y: 8, icon: <FaUser />, kind: 'compact' },
  {
    id: 'pages',
    label: 'Pages',
    x: 50,
    y: 24,
    icon: <FaFileAlt />,
    kind: 'layer',
    items: ['Login', 'Dashboard', 'Produtos', 'Clientes', 'Vendas', 'Compras', 'Estoque'],
  },
  {
    id: 'components',
    label: 'Components',
    x: 50,
    y: 40,
    icon: <FaCubes />,
    kind: 'layer',
    items: ['Forms', 'Tables', 'Cards', 'Modals', 'Sidebar', 'Header'],
  },
  {
    id: 'state',
    label: 'Estado e Autenticação',
    x: 50,
    y: 56,
    icon: <FaLock />,
    kind: 'primary',
    items: ['Context API', 'Custom Hooks', 'JWT', 'Rotas protegidas'],
  },
  {
    id: 'services',
    label: 'Services',
    x: 50,
    y: 73,
    icon: <FaPlug />,
    kind: 'service',
    items: ['authService', 'productService', 'clientService', 'saleService', 'purchaseService'],
  },
  { id: 'api', label: 'Axios / API REST', x: 50, y: 90, icon: <FaExchangeAlt />, kind: 'compact' },
];

const frontendConnections: FlowConnection[] = [
  { from: 'user', to: 'pages' },
  { from: 'pages', to: 'components' },
  { from: 'components', to: 'state' },
  { from: 'state', to: 'services' },
  { from: 'services', to: 'api' },
];

const backendNodes: FlowNode[] = [
  { id: 'react', label: 'React Frontend', x: 52, y: 7, icon: <FaCode />, kind: 'compact' },
  {
    id: 'security',
    label: 'Spring Security + JWT',
    description: 'Autenticação e autorização',
    x: 52,
    y: 20,
    icon: <FaShieldAlt />,
    kind: 'primary',
  },
  {
    id: 'controllers',
    label: 'Controllers',
    description: 'Recebimento das requisições HTTP',
    x: 52,
    y: 33,
    icon: <FaServer />,
    kind: 'service',
  },
  {
    id: 'dtos',
    label: 'DTOs e Mappers',
    description: 'Entrada e saída de dados',
    x: 52,
    y: 46,
    icon: <FaExchangeAlt />,
    kind: 'service',
  },
  {
    id: 'services',
    label: 'Services',
    description: 'Regras de negócio',
    x: 52,
    y: 59,
    icon: <FaLayerGroup />,
    kind: 'service',
  },
  {
    id: 'repositories',
    label: 'Repositories',
    description: 'Persistência com Spring Data JPA',
    x: 52,
    y: 72,
    icon: <FaDatabase />,
    kind: 'service',
  },
  {
    id: 'postgres',
    label: 'PostgreSQL',
    description: 'Armazenamento dos dados',
    x: 52,
    y: 87,
    icon: <FaDatabase />,
    kind: 'compact',
  },
  { id: 'validation', label: 'Bean Validation', x: 17, y: 39, icon: <FaKey />, kind: 'auxiliary' },
  { id: 'exceptions', label: 'Global Exception Handler', x: 84, y: 46, icon: <FaExclamationTriangle />, kind: 'auxiliary' },
  { id: 'swagger', label: 'Swagger / OpenAPI', x: 84, y: 27, icon: <FaFileAlt />, kind: 'auxiliary' },
  { id: 'hibernate', label: 'Hibernate / JPA', x: 17, y: 72, icon: <FaLayerGroup />, kind: 'auxiliary' },
  { id: 'docker', label: 'Docker', x: 17, y: 16, icon: <FaDocker />, kind: 'auxiliary' },
];

const backendConnections: FlowConnection[] = [
  { from: 'react', to: 'security' },
  { from: 'security', to: 'controllers' },
  { from: 'controllers', to: 'dtos' },
  { from: 'dtos', to: 'services' },
  { from: 'services', to: 'repositories' },
  { from: 'repositories', to: 'postgres' },
  { from: 'validation', to: 'controllers', fromAnchor: 'right', toAnchor: 'left' },
  { from: 'validation', to: 'dtos', fromAnchor: 'right', toAnchor: 'left' },
  { from: 'exceptions', to: 'controllers', fromAnchor: 'left', toAnchor: 'right' },
  { from: 'exceptions', to: 'services', fromAnchor: 'left', toAnchor: 'right' },
  { from: 'swagger', to: 'controllers', fromAnchor: 'left', toAnchor: 'right' },
  { from: 'hibernate', to: 'repositories', fromAnchor: 'right', toAnchor: 'left' },
  { from: 'docker', to: 'security', fromAnchor: 'right', toAnchor: 'left' },
  { from: 'docker', to: 'postgres', fromAnchor: 'bottom', toAnchor: 'left' },
];

const nodeDimensions: Record<NodeKind, { width: number; height: number }> = {
  compact: { width: 22, height: 8 },
  layer: { width: 34, height: 12 },
  service: { width: 30, height: 10 },
  auxiliary: { width: 23, height: 8 },
  primary: { width: 32, height: 11 },
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const diagrams = {
  frontend: {
    className: 'architecture-flow--frontend',
    nodes: frontendNodes,
    connections: frontendConnections,
  },
  backend: {
    className: 'architecture-flow--backend',
    nodes: backendNodes,
    connections: backendConnections,
  },
};

function getConnectedNodes(nodeId: string, connections: FlowConnection[]) {
  return connections
    .filter((connection) => connection.from === nodeId || connection.to === nodeId)
    .map((connection) => (connection.from === nodeId ? connection.to : connection.from));
}

function getDefaultAnchor(fromNode: FlowNode, toNode: FlowNode): Anchor {
  const deltaX = toNode.x - fromNode.x;
  const deltaY = toNode.y - fromNode.y;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    return deltaX > 0 ? 'right' : 'left';
  }

  return deltaY > 0 ? 'bottom' : 'top';
}

function getAnchorPoint(node: FlowNode, anchor: Anchor) {
  const { width, height } = nodeDimensions[node.kind ?? 'service'];

  switch (anchor) {
    case 'top':
      return { x: node.x, y: node.y - height / 2 };
    case 'right':
      return { x: node.x + width / 2, y: node.y };
    case 'bottom':
      return { x: node.x, y: node.y + height / 2 };
    case 'left':
      return { x: node.x - width / 2, y: node.y };
  }
}

function getConnectionPath(fromPoint: { x: number; y: number }, toPoint: { x: number; y: number }) {
  const deltaX = toPoint.x - fromPoint.x;
  const deltaY = toPoint.y - fromPoint.y;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    const curve = clamp(Math.abs(deltaX) * 0.42, 5, 13);

    return `M ${fromPoint.x} ${fromPoint.y} C ${fromPoint.x + Math.sign(deltaX || 1) * curve} ${fromPoint.y}, ${toPoint.x - Math.sign(deltaX || 1) * curve} ${toPoint.y}, ${toPoint.x} ${toPoint.y}`;
  }

  const curve = clamp(Math.abs(deltaY) * 0.42, 4, 10);

  return `M ${fromPoint.x} ${fromPoint.y} C ${fromPoint.x} ${fromPoint.y + Math.sign(deltaY || 1) * curve}, ${toPoint.x} ${toPoint.y - Math.sign(deltaY || 1) * curve}, ${toPoint.x} ${toPoint.y}`;
}

function ArchitectureFlowDiagram({ type }: { type: DiagramType }) {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const diagram = diagrams[type];
  const nodeById = useMemo(() => new Map(diagram.nodes.map((node) => [node.id, node])), [diagram.nodes]);

  const relatedNodes = useMemo(() => {
    if (!activeNode) {
      return new Set<string>();
    }

    return new Set([activeNode, ...getConnectedNodes(activeNode, diagram.connections)]);
  }, [activeNode, diagram.connections]);

  const renderNode = (node: FlowNode) => {
    const isDimmed = activeNode !== null && !relatedNodes.has(node.id);
    const style = {
      '--flow-node-x': `${clamp(node.x, 8, 92)}%`,
      '--flow-node-y': `${clamp(node.y, 7, 93)}%`,
    } as CSSProperties;

    return (
      <button
        key={node.id}
        type="button"
        className={`architecture-flow-node architecture-flow-node--${node.kind ?? 'service'} ${isDimmed ? 'is-dimmed' : ''}`}
        style={style}
        onMouseEnter={() => setActiveNode(node.id)}
        onMouseLeave={() => setActiveNode(null)}
        onFocus={() => setActiveNode(node.id)}
        onBlur={() => setActiveNode(null)}
      >
        <span className="architecture-flow-node__title">
          <span className="architecture-flow-node__icon" aria-hidden="true">
            {node.icon}
          </span>
          <span>{node.label}</span>
        </span>

        {node.description && <span className="architecture-flow-node__description">{node.description}</span>}

        {node.items && (
          <span className="architecture-flow-node__items">
            {node.items.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </span>
        )}
      </button>
    );
  };

  return (
    <div className={`architecture-flow ${diagram.className}`} onMouseLeave={() => setActiveNode(null)}>
      <svg className="architecture-flow__connections" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <marker id={`architecture-arrow-${type}`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 0 L 8 4 L 0 8 z" />
          </marker>
        </defs>

        {diagram.connections.map((connection) => {
          const fromNode = nodeById.get(connection.from);
          const toNode = nodeById.get(connection.to);

          if (!fromNode || !toNode) {
            return null;
          }

          const fromAnchor = connection.fromAnchor ?? getDefaultAnchor(fromNode, toNode);
          const toAnchor = connection.toAnchor ?? getDefaultAnchor(toNode, fromNode);
          const fromPoint = getAnchorPoint(fromNode, fromAnchor);
          const toPoint = getAnchorPoint(toNode, toAnchor);
          const isActive = activeNode === null || connection.from === activeNode || connection.to === activeNode;

          return (
            <path
              key={`${connection.from}-${connection.to}`}
              className={`architecture-flow-connection ${isActive ? 'is-active' : 'is-muted'}`}
              d={getConnectionPath(fromPoint, toPoint)}
              markerEnd={`url(#architecture-arrow-${type})`}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>

      {diagram.nodes.map(renderNode)}
    </div>
  );
}

export default ArchitectureFlowDiagram;
