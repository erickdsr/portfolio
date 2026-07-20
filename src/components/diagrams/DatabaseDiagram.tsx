import { useMemo, useState, type CSSProperties } from 'react';
import { FaDatabase } from 'react-icons/fa';
import './DatabaseDiagram.css';

type TableNode = {
  id: string;
  label: string;
  group: string;
  x: number;
  y: number;
  size?: 'wide' | 'primary';
};

type Relationship = {
  from: string;
  to: string;
};

const diagramNodes: TableNode[] = [
  { id: 'roles', label: 'roles', group: 'Acesso', x: 10, y: 40 },
  { id: 'employees', label: 'employees', group: 'Acesso', x: 25, y: 52 },
  { id: 'sale_payments', label: 'sale_payments', group: 'Pagamentos', x: 42, y: 12, size: 'wide' },
  { id: 'payment_methods', label: 'payment_methods', group: 'Pagamentos', x: 72, y: 12, size: 'wide' },
  { id: 'sales', label: 'sales', group: 'Vendas', x: 44, y: 34 },
  { id: 'clients', label: 'clients', group: 'Vendas', x: 72, y: 34 },
  { id: 'sale_items', label: 'sale_items', group: 'Vendas', x: 30, y: 66 },
  { id: 'products', label: 'products', group: 'Catalogo', x: 52, y: 56, size: 'primary' },
  { id: 'categories', label: 'categories', group: 'Catalogo', x: 84, y: 48 },
  { id: 'stock', label: 'stock', group: 'Estoque', x: 84, y: 66 },
  { id: 'stock_movements', label: 'stock_movements', group: 'Estoque', x: 15, y: 84, size: 'wide' },
  { id: 'purchase_items', label: 'purchase_items', group: 'Compras', x: 42, y: 86, size: 'wide' },
  { id: 'purchases', label: 'purchases', group: 'Compras', x: 66, y: 86 },
  { id: 'suppliers', label: 'suppliers', group: 'Compras', x: 86, y: 84 },
];

const relationships: Relationship[] = [
  { from: 'roles', to: 'employees' },
  { from: 'employees', to: 'sales' },
  { from: 'employees', to: 'purchases' },
  { from: 'employees', to: 'stock_movements' },
  { from: 'clients', to: 'sales' },
  { from: 'categories', to: 'products' },
  { from: 'suppliers', to: 'products' },
  { from: 'products', to: 'stock' },
  { from: 'products', to: 'stock_movements' },
  { from: 'products', to: 'sale_items' },
  { from: 'products', to: 'purchase_items' },
  { from: 'sales', to: 'sale_items' },
  { from: 'sales', to: 'sale_payments' },
  { from: 'payment_methods', to: 'sale_payments' },
  { from: 'purchases', to: 'purchase_items' },
  { from: 'suppliers', to: 'purchases' },
];

const nodeById = new Map(diagramNodes.map((node) => [node.id, node]));
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const nodeDimensions = {
  default: { width: 15, height: 8.6 },
  wide: { width: 18, height: 8.6 },
  primary: { width: 17.5, height: 9.8 },
};

function getConnectedNodes(nodeId: string) {
  return relationships
    .filter((relationship) => relationship.from === nodeId || relationship.to === nodeId)
    .map((relationship) => (relationship.from === nodeId ? relationship.to : relationship.from));
}

function getNodeDimensions(node: TableNode) {
  return nodeDimensions[node.size ?? 'default'];
}

function getConnectionPoint(fromNode: TableNode, toNode: TableNode) {
  const deltaX = toNode.x - fromNode.x;
  const deltaY = toNode.y - fromNode.y;
  const { width, height } = getNodeDimensions(fromNode);

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    return {
      x: fromNode.x + Math.sign(deltaX || 1) * (width / 2),
      y: clamp(fromNode.y + deltaY * 0.08, fromNode.y - height / 2, fromNode.y + height / 2),
    };
  }

  return {
    x: clamp(fromNode.x + deltaX * 0.08, fromNode.x - width / 2, fromNode.x + width / 2),
    y: fromNode.y + Math.sign(deltaY || 1) * (height / 2),
  };
}

function getRelationshipPath(fromPoint: { x: number; y: number }, toPoint: { x: number; y: number }) {
  const deltaX = toPoint.x - fromPoint.x;
  const deltaY = toPoint.y - fromPoint.y;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    const curve = clamp(Math.abs(deltaX) * 0.42, 5, 14);

    return `M ${fromPoint.x} ${fromPoint.y} C ${fromPoint.x + Math.sign(deltaX) * curve} ${fromPoint.y}, ${toPoint.x - Math.sign(deltaX) * curve} ${toPoint.y}, ${toPoint.x} ${toPoint.y}`;
  }

  const curve = clamp(Math.abs(deltaY) * 0.42, 5, 12);

  return `M ${fromPoint.x} ${fromPoint.y} C ${fromPoint.x} ${fromPoint.y + Math.sign(deltaY) * curve}, ${toPoint.x} ${toPoint.y - Math.sign(deltaY) * curve}, ${toPoint.x} ${toPoint.y}`;
}

function DatabaseDiagram() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const relatedNodes = useMemo(() => {
    if (!activeNode) {
      return new Set<string>();
    }

    return new Set([activeNode, ...getConnectedNodes(activeNode)]);
  }, [activeNode]);

  const isRelationshipActive = (relationship: Relationship) => (
    activeNode === null || relationship.from === activeNode || relationship.to === activeNode
  );

  const renderNode = (node: TableNode) => {
    const connectedNodes = getConnectedNodes(node.id);
    const isPrimary = node.id === 'products';
    const isDimmed = activeNode !== null && !relatedNodes.has(node.id);
    const style = {
      '--node-x': `${clamp(node.x, 10, 90)}%`,
      '--node-y': `${clamp(node.y, 10, 90)}%`,
    } as CSSProperties;

    return (
      <button
        key={node.id}
        type="button"
        className={`database-node ${isPrimary ? 'database-node--primary' : ''} ${isDimmed ? 'is-dimmed' : ''}`}
        style={style}
        data-node={node.id}
        aria-label={`Tabela ${node.label}, grupo ${node.group}`}
        onMouseEnter={() => setActiveNode(node.id)}
        onMouseLeave={() => setActiveNode(null)}
        onFocus={() => setActiveNode(node.id)}
        onBlur={() => setActiveNode(null)}
      >
        <span className="database-node__icon" aria-hidden="true">
          <FaDatabase />
        </span>
        <span className="database-node__name">{node.label}</span>
        <span className="database-node__relations">
          {connectedNodes.map((connectedNode) => (
            <span key={connectedNode}>{connectedNode}</span>
          ))}
        </span>
      </button>
    );
  };

  return (
    <div className="database-diagram" onMouseLeave={() => setActiveNode(null)}>
      <svg className="database-diagram__connections" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {relationships.map((relationship) => {
            const fromNode = nodeById.get(relationship.from);
            const toNode = nodeById.get(relationship.to);

            if (!fromNode || !toNode) {
              return null;
            }

            const isActive = isRelationshipActive(relationship);
            const fromPoint = getConnectionPoint(fromNode, toNode);
            const toPoint = getConnectionPoint(toNode, fromNode);
            const path = getRelationshipPath(fromPoint, toPoint);

            return (
              <g
                key={`${relationship.from}-${relationship.to}`}
                className={`database-connection ${isActive ? 'is-active' : 'is-muted'}`}
              >
                <path d={path} vectorEffect="non-scaling-stroke" />
                <circle cx={fromPoint.x} cy={fromPoint.y} r="0.75" vectorEffect="non-scaling-stroke" />
                <circle cx={toPoint.x} cy={toPoint.y} r="0.75" vectorEffect="non-scaling-stroke" />
              </g>
            );
          })}
      </svg>

      {diagramNodes.map(renderNode)}
    </div>
  );
}

export default DatabaseDiagram;
