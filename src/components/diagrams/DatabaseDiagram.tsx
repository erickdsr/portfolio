import { useMemo, useState, type CSSProperties } from 'react';
import { FaDatabase } from 'react-icons/fa';
import './DatabaseDiagram.css';

type TableNode = {
  id: string;
  label: string;
  group: string;
  position: {
    x: number;
    y: number;
  };
};

type Relationship = {
  from: string;
  to: string;
};

const tableNodes: TableNode[] = [
  { id: 'roles', label: 'roles', group: 'Acesso', position: { x: 10, y: 38 } },
  { id: 'employees', label: 'employees', group: 'Acesso', position: { x: 23, y: 50 } },
  { id: 'sale_payments', label: 'sale_payments', group: 'Pagamentos', position: { x: 41, y: 13 } },
  { id: 'payment_methods', label: 'payment_methods', group: 'Pagamentos', position: { x: 62, y: 13 } },
  { id: 'sales', label: 'sales', group: 'Vendas', position: { x: 42, y: 34 } },
  { id: 'clients', label: 'clients', group: 'Vendas', position: { x: 61, y: 34 } },
  { id: 'products', label: 'products', group: 'Catalogo', position: { x: 52, y: 55 } },
  { id: 'categories', label: 'categories', group: 'Catalogo', position: { x: 80, y: 31 } },
  { id: 'stock', label: 'stock', group: 'Estoque', position: { x: 85, y: 55 } },
  { id: 'suppliers', label: 'suppliers', group: 'Compras', position: { x: 80, y: 77 } },
  { id: 'stock_movements', label: 'stock_movements', group: 'Estoque', position: { x: 24, y: 80 } },
  { id: 'purchase_items', label: 'purchase_items', group: 'Compras', position: { x: 49, y: 84 } },
  { id: 'purchases', label: 'purchases', group: 'Compras', position: { x: 64, y: 80 } },
  { id: 'sale_items', label: 'sale_items', group: 'Vendas', position: { x: 35, y: 63 } },
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

const mobileGroups = [
  { id: 'access', title: 'Acesso', nodes: ['roles', 'employees'] },
  { id: 'sales-payments', title: 'Vendas e pagamentos', nodes: ['clients', 'sales', 'sale_items', 'sale_payments', 'payment_methods'] },
  { id: 'catalog-stock', title: 'Catalogo e estoque', nodes: ['categories', 'products', 'stock', 'stock_movements'] },
  { id: 'purchases', title: 'Compras', nodes: ['suppliers', 'purchases', 'purchase_items'] },
];

const nodeById = new Map(tableNodes.map((node) => [node.id, node]));
const connectionOffset = 5.8;

function getConnectedNodes(nodeId: string) {
  return relationships
    .filter((relationship) => relationship.from === nodeId || relationship.to === nodeId)
    .map((relationship) => (relationship.from === nodeId ? relationship.to : relationship.from));
}

function getConnectionPoint(fromNode: TableNode, toNode: TableNode) {
  const deltaX = toNode.position.x - fromNode.position.x;
  const deltaY = toNode.position.y - fromNode.position.y;
  const length = Math.hypot(deltaX, deltaY);

  if (length === 0) {
    return fromNode.position;
  }

  return {
    x: fromNode.position.x + (deltaX / length) * connectionOffset,
    y: fromNode.position.y + (deltaY / length) * connectionOffset,
  };
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
      '--node-x': `${node.position.x}%`,
      '--node-y': `${node.position.y}%`,
    } as CSSProperties;

    return (
      <button
        key={node.id}
        type="button"
        className={`database-node ${isPrimary ? 'database-node--primary' : ''} ${isDimmed ? 'is-dimmed' : ''}`}
        style={style}
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
      <div className="database-diagram__canvas" aria-label="Diagrama relacional do banco de dados GarageOS">
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

            return (
              <g
                key={`${relationship.from}-${relationship.to}`}
                className={`database-connection ${isActive ? 'is-active' : 'is-muted'}`}
              >
                <line
                  x1={fromPoint.x}
                  y1={fromPoint.y}
                  x2={toPoint.x}
                  y2={toPoint.y}
                  vectorEffect="non-scaling-stroke"
                />
                <circle cx={fromPoint.x} cy={fromPoint.y} r="0.75" vectorEffect="non-scaling-stroke" />
                <circle cx={toPoint.x} cy={toPoint.y} r="0.75" vectorEffect="non-scaling-stroke" />
              </g>
            );
          })}
        </svg>

        {tableNodes.map(renderNode)}
      </div>

      <div className="database-diagram__mobile" aria-label="Relacionamentos do banco de dados GarageOS">
        {mobileGroups.map((group) => (
          <section key={group.id} className="database-mobile-group" aria-labelledby={`database-group-${group.id}`}>
            <h5 id={`database-group-${group.id}`}>{group.title}</h5>
            <div className="database-mobile-group__nodes">
              {group.nodes.map((nodeId) => {
                const node = nodeById.get(nodeId);

                if (!node) {
                  return null;
                }

                return renderNode(node);
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default DatabaseDiagram;
