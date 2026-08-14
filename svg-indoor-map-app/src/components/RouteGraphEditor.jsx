import { useState } from 'react';

const nodeTypes = ['hallway', 'intersection', 'turn', 'doorway', 'destination_approach', 'entrance', 'reception', 'elevator', 'escalator', 'stair'];

export default function RouteGraphEditor({ floor, graph, onUpdateGraph, onGenerateGraph }) {
  const [open, setOpen] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const [selected, setSelected] = useState([]);
  const [selectedEdgeId, setSelectedEdgeId] = useState('');
  const [nodeType, setNodeType] = useState('hallway');

  const nodeCount = graph?.nodes?.length || 0;
  const edgeCount = graph?.edges?.length || 0;
  const hallwayCount = graph?.nodes?.filter((n) => ['hallway', 'intersection', 'turn'].includes(n.type)).length || 0;
  const status = graph?.status || 'admin_reviewed';

  function update(updater) {
    onUpdateGraph((current) => updater({ floorId: floor.id, nodes: [], edges: [], ...current }));
  }

  function handleGenerate() {
    onGenerateGraph();
    setSelected([]);
  }

  function markReviewed() {
    update((current) => ({ ...current, status: 'admin_reviewed' }));
  }

  function markPublished() {
    update((current) => ({ ...current, status: 'published' }));
  }

  // ── Advanced: manual node/edge editing ───────────────────────────────────
  function addNode() {
    const [x, y, width, height] = floor.viewBox || [0, 0, 1200, 800];
    const node = {
      id: `${floor.id}-manual-${Date.now().toString(36)}`,
      floorId: floor.id,
      x: Math.round(x + width / 2),
      y: Math.round(y + height / 2),
      type: nodeType,
      name: `${nodeType.replace('_', ' ')} node`,
      source: 'admin',
    };
    update((current) => ({ ...current, nodes: [...current.nodes, node] }));
    setSelected([node.id]);
  }

  function connectSelected() {
    if (selected.length !== 2) return;
    const [fromNodeId, toNodeId] = selected;
    update((current) => {
      if (current.edges.some((e) => [e.fromNodeId, e.toNodeId].sort().join('|') === [fromNodeId, toNodeId].sort().join('|'))) return current;
      return { ...current, edges: [...current.edges, { id: `${floor.id}-edge-${Date.now().toString(36)}`, floorId: floor.id, fromNodeId, toNodeId, accessible: true, source: 'admin' }] };
    });
  }

  function deleteSelected() {
    update((current) => ({
      ...current,
      nodes: current.nodes.filter((n) => !selected.includes(n.id)),
      edges: current.edges.filter((e) => !selected.includes(e.fromNodeId) && !selected.includes(e.toNodeId)),
    }));
    setSelected([]);
  }

  function deleteSelectedEdge() {
    if (!selectedEdgeId) return;
    update((current) => ({ ...current, edges: current.edges.filter((e) => e.id !== selectedEdgeId) }));
    setSelectedEdgeId('');
  }

  function exportGraph() {
    navigator.clipboard?.writeText(JSON.stringify(graph || { floorId: floor.id, nodes: [], edges: [] }, null, 2));
  }

  function importGraph(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    file.text().then((text) => {
      const parsed = JSON.parse(text);
      update(() => ({ floorId: floor.id, status: parsed.status || 'generated_suggestion', nodes: parsed.nodes || [], edges: parsed.edges || [] }));
      setSelected([]);
    }).catch(() => {});
  }

  const statusColor = { generated_suggestion: '#f59e0b', admin_reviewed: '#3b82f6', published: '#22c55e' }[status] || '#6b7280';

  return (
    <section className="panel-section route-graph-editor">
      <button className={open ? 'primary-button active' : 'secondary-button'} onClick={() => setOpen((v) => !v)}>
        {open ? 'Hide routing editor' : 'Edit route graph'}
      </button>

      {open && (
        <div className="route-graph-tools">
          {/* ── Status pill ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: statusColor, flexShrink: 0 }} />
            <span className="muted" style={{ fontSize: 12 }}>
              {status === 'generated_suggestion' ? 'Auto-generated — review before publishing' : status === 'admin_reviewed' ? 'Reviewed' : 'Published'}
            </span>
            <span className="muted" style={{ fontSize: 12, marginLeft: 'auto' }}>{hallwayCount} walkway nodes · {edgeCount} edges</span>
          </div>

          {/* ── Primary action ── */}
          <p className="muted" style={{ fontSize: 12, margin: '4px 0 8px' }}>
            Auto-detect identifies corridors, aisles, and walkways from the floor plan and builds a walkable route graph. Run this first, then review and publish.
          </p>
          <div className="tool-row">
            <button className="primary-button" onClick={handleGenerate}>
              Auto-detect hallways
            </button>
            <button className="secondary-button" onClick={markReviewed} disabled={!nodeCount}>Mark reviewed</button>
            <button className="secondary-button" onClick={markPublished} disabled={!nodeCount}>Publish graph</button>
          </div>

          {/* ── Advanced toggle ── */}
          <button
            className="secondary-button"
            style={{ marginTop: 8, fontSize: 12 }}
            onClick={() => setAdvanced((v) => !v)}
          >
            {advanced ? '▲ Hide advanced editing' : '▼ Advanced: manual node editing'}
          </button>

          {advanced && (
            <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 12 }}>
                Node type
                <select value={nodeType} onChange={(e) => setNodeType(e.target.value)} style={{ marginLeft: 6 }}>
                  {nodeTypes.map((t) => <option key={t} value={t}>{t.replace('_', ' ')}</option>)}
                </select>
              </label>
              <div className="tool-row">
                <button className="secondary-button" onClick={addNode}>Add node</button>
                <button className="secondary-button" onClick={() => update((c) => ({ ...c, nodes: c.nodes.map((n) => selected.includes(n.id) ? { ...n, type: nodeType } : n) }))} disabled={!selected.length}>Retype selected</button>
                <button className="secondary-button" onClick={connectSelected} disabled={selected.length !== 2}>Connect 2</button>
                <button className="secondary-button danger" onClick={deleteSelected} disabled={!selected.length}>Delete</button>
              </div>
              <div className="route-node-list">
                {(graph?.nodes || []).slice(0, 80).map((node) => (
                  <button
                    key={node.id}
                    className={selected.includes(node.id) ? 'route-node-row active' : 'route-node-row'}
                    onClick={() => setSelected((c) => c.includes(node.id) ? c.filter((id) => id !== node.id) : [...c.slice(-1), node.id])}
                  >
                    <strong>{node.name || node.id}</strong>
                    <span>{node.type} · {Math.round(node.x)}, {Math.round(node.y)}</span>
                  </button>
                ))}
              </div>
              <label style={{ fontSize: 12 }}>
                Edges
                <select value={selectedEdgeId} onChange={(e) => setSelectedEdgeId(e.target.value)} style={{ marginLeft: 6 }}>
                  <option value="">Choose edge to delete</option>
                  {(graph?.edges || []).map((edge) => {
                    const from = graph.nodes?.find((n) => n.id === edge.fromNodeId);
                    const to = graph.nodes?.find((n) => n.id === edge.toNodeId);
                    return <option key={edge.id} value={edge.id}>{from?.name || edge.fromNodeId} → {to?.name || edge.toNodeId}</option>;
                  })}
                </select>
              </label>
              <button className="secondary-button danger" onClick={deleteSelectedEdge} disabled={!selectedEdgeId}>Delete edge</button>
              <div className="tool-row">
                <button className="secondary-button" onClick={exportGraph}>Copy JSON</button>
                <label className="secondary-button import-graph-button">
                  Import JSON
                  <input type="file" accept="application/json,.json" onChange={importGraph} />
                </label>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
