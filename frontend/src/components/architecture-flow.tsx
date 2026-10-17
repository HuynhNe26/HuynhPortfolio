'use client';

import { useState } from 'react';
import { TechIcon } from './tech-icon';

interface ArchitectureNode {
  id: string;
  category: string;
  name: string;
  role: string;
  latency: string;
  tech: string[];
  description: string;
  status: 'ACTIVE' | 'STREAMING' | 'PERSISTED';
}

const NODES: ArchitectureNode[] = [
  {
    id: 'edge-client',
    category: 'TIER 01 // CLIENT & EDGE',
    name: 'Next.js 16 + React 19',
    role: 'Server Components & Streaming SSR',
    latency: '< 45ms TTFB',
    tech: ['Next.js', 'React.js', 'TypeScript', 'Tailwind CSS'],
    description: 'Edge-rendered micro-frontends with React 19 Server Actions, zero bundle overhead for static pages, and optimistic UI transitions.',
    status: 'STREAMING',
  },
  {
    id: 'api-service',
    category: 'TIER 02 // RUNTIME ENGINE',
    name: 'Node.js 22 LTS API Service',
    role: 'High-Throughput REST & WebSockets',
    latency: '< 15ms Roundtrip',
    tech: ['Node.js', 'Express.js', 'TypeScript', 'WebSocket'],
    description: 'Defensive API runtime with Argon2id salted hashing, HttpOnly session cookies, rate limiting, and CORS validation.',
    status: 'ACTIVE',
  },
  {
    id: 'database-neon',
    category: 'TIER 03 // DATA INFRASTRUCTURE',
    name: 'PostgreSQL (Neon Serverless)',
    role: 'Serverless Pooled ACID Relational DB',
    latency: '< 8ms Pooled Query',
    tech: ['PostgreSQL (Neon)', 'SQL', 'Connection Pooling'],
    description: 'Serverless PostgreSQL with connection pooling, automatic branch snapshots, SSL encryption, and foreign key integrity.',
    status: 'PERSISTED',
  },
  {
    id: 'ai-pipeline',
    category: 'TIER 04 // AGENTIC WORKFLOWS',
    name: 'LangChain + Google Gemini API',
    role: 'Agentic RAG & Structured Generation',
    latency: '< 450ms Context Gen',
    tech: ['Gemini API', 'LangChain.js', 'Vector Search'],
    description: 'Retrieval-Augmented Generation with semantic indexing, grounding verification, and automated customer workflow execution.',
    status: 'ACTIVE',
  },
];

export function ArchitectureFlow() {
  const [selectedId, setSelectedId] = useState<string>('database-neon');
  const activeNode = NODES.find((n) => n.id === selectedId) || NODES[2];

  return (
    <div className="architecture-flow-shell" aria-label="Interactive Full-Stack Architecture Pipeline">
      <div className="arch-flow-header">
        <div className="arch-flow-title-group">
          <span className="arch-badge">SYSTEM TOPOLOGY // END-TO-END</span>
          <h3 className="arch-heading">Production Cloud Architecture Pipeline</h3>
          <p className="arch-sub">
            Click any layer in the distributed pipeline to inspect runtime specifications, latency benchmarks, and tech integrations.
          </p>
        </div>
        <div className="arch-telemetry-pill">
          <span className="pulse-circle green" />
          <span>TOPOLOGY HEALTH: 100% OPERATIONAL</span>
        </div>
      </div>

      {/* PIPELINE NODES GRID */}
      <div className="arch-nodes-grid" role="tablist">
        {NODES.map((node, index) => {
          const isSelected = node.id === selectedId;
          return (
            <button
              key={node.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={`arch-node-card ${isSelected ? 'active' : ''}`}
              onClick={() => setSelectedId(node.id)}
            >
              <div className="node-top">
                <span className="node-step">0{index + 1}</span>
                <span className={`node-status-tag ${node.status.toLowerCase()}`}>
                  ● {node.status}
                </span>
              </div>
              <h4 className="node-name">{node.name}</h4>
              <p className="node-role">{node.role}</p>
              <div className="node-meta">
                <span className="node-latency">⚡ {node.latency}</span>
              </div>
              <div className="node-connector" aria-hidden="true" />
            </button>
          );
        })}
      </div>

      {/* SELECTED NODE INSPECTOR PANEL */}
      <div className="arch-inspector-panel">
        <div className="inspector-hud-bar">
          <div className="hud-left">
            <span className="hud-label">LAYER INSPECTOR</span>
            <strong className="hud-title">{activeNode.category}</strong>
          </div>
          <div className="hud-right">
            <span className="hud-metric-label">PERFORMANCE BENCHMARK:</span>
            <span className="hud-metric-value">{activeNode.latency}</span>
          </div>
        </div>

        <div className="inspector-body">
          <div className="inspector-desc-column">
            <h4>{activeNode.name}</h4>
            <p className="inspector-desc">{activeNode.description}</p>
          </div>

          <div className="inspector-tech-column">
            <span className="tech-column-label">INTEGRATED TECHNOLOGIES</span>
            <div className="inspector-tech-tags">
              {activeNode.tech.map((tech) => (
                <span key={tech} className="inspector-tech-pill">
                  <TechIcon name={tech} className="tech-pill-icon" />
                  <span>{tech}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
