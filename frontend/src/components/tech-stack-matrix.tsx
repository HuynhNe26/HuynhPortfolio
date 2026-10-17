'use client';

import { useState } from 'react';
import { TechIcon } from './tech-icon';

type CategoryKey = 'all' | 'frontend' | 'backend' | 'database' | 'ai' | 'devops';

interface TechItem {
  name: string;
  category: CategoryKey;
  role: string;
  experience: string;
  level: 'Core' | 'Advanced' | 'Proficient';
  highlight: string;
}

const TECH_CATALOG: TechItem[] = [
  // Frontend
  {
    name: 'TypeScript',
    category: 'frontend',
    role: 'Language Standard',
    experience: 'Strict Typing',
    level: 'Core',
    highlight: 'Zero `any` policy, type inference, discriminative unions',
  },
  {
    name: 'Next.js',
    category: 'frontend',
    role: 'Full-Stack Framework',
    experience: 'Next.js 16 App Router',
    level: 'Core',
    highlight: 'Streaming SSR, Server Components, Edge runtime',
  },
  {
    name: 'React.js',
    category: 'frontend',
    role: 'UI Library',
    experience: 'React 19 Hooks & Compiler',
    level: 'Core',
    highlight: 'Custom hooks, optimistic state, accessible components',
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    role: 'Utility-First Styling',
    experience: 'Modern Design System',
    level: 'Advanced',
    highlight: 'Dark mode design tokens, glassmorphism, responsive grids',
  },

  // Backend
  {
    name: 'Node.js',
    category: 'backend',
    role: 'Server Runtime',
    experience: 'Node.js 22 LTS',
    level: 'Core',
    highlight: 'Event-driven async architecture, stream processing, native test runner',
  },
  {
    name: 'Express.js',
    category: 'backend',
    role: 'API Framework',
    experience: 'RESTful Architecture',
    level: 'Advanced',
    highlight: 'Modular routing, defense-in-depth middleware, CORS, rate limiting',
  },
  {
    name: 'WebSocket',
    category: 'backend',
    role: 'Real-Time Protocol',
    experience: 'Bi-Directional Channels',
    level: 'Advanced',
    highlight: 'Sub-millisecond event streaming, heartbeat sync, chat pipelines',
  },

  // Database
  {
    name: 'PostgreSQL (Neon)',
    category: 'database',
    role: 'Serverless Relational DB',
    experience: 'Connection Pooled Neon',
    level: 'Core',
    highlight: 'ACID transactions, relational constraints, automated seed scripts',
  },
  {
    name: 'MongoDB',
    category: 'database',
    role: 'Document Store',
    experience: 'MongoDB Atlas',
    level: 'Advanced',
    highlight: 'Dynamic schemas, indexing, aggregation pipelines',
  },
  {
    name: 'Redis',
    category: 'database',
    role: 'In-Memory Cache',
    experience: 'Key-Value Acceleration',
    level: 'Proficient',
    highlight: 'Session storage, rate-limit buckets, query caching',
  },

  // AI & APIs
  {
    name: 'Gemini API',
    category: 'ai',
    role: 'LLM Intelligence',
    experience: 'Multimodal Models',
    level: 'Advanced',
    highlight: 'Contextual prompt engineering, function calling, ticket assistance',
  },
  {
    name: 'LangChain.js',
    category: 'ai',
    role: 'Orchestration Engine',
    experience: 'Agentic Workflows',
    level: 'Advanced',
    highlight: 'Retrieval-Augmented Generation (RAG), vector similarity search',
  },
  {
    name: 'Resend API',
    category: 'ai',
    role: 'Email Delivery',
    experience: 'Transactional Service',
    level: 'Proficient',
    highlight: 'DKIM/SPF verified transactional messaging, event webhooks',
  },
  {
    name: 'MoMo API',
    category: 'ai',
    role: 'Fintech Payments',
    experience: 'Payment Gateway',
    level: 'Proficient',
    highlight: 'HMAC-SHA256 signature verification, IPN callback processing',
  },

  // DevOps & Cloud
  {
    name: 'Git',
    category: 'devops',
    role: 'Version Control',
    experience: 'Git Flow & Trunk-Based',
    level: 'Core',
    highlight: 'Branching strategy, pull requests, semantic commit conventions',
  },
  {
    name: 'GitHub',
    category: 'devops',
    role: 'CI/CD & Collaboration',
    experience: 'Actions & Automation',
    level: 'Advanced',
    highlight: 'Automated test workflows, code reviews, release tags',
  },
  {
    name: 'Vercel',
    category: 'devops',
    role: 'Edge Cloud Platform',
    experience: 'Global Deployment',
    level: 'Advanced',
    highlight: 'Zero-configuration deployments, edge caching, analytics',
  },
  {
    name: 'Docker',
    category: 'devops',
    role: 'Containerization',
    experience: 'Reproducible Runtimes',
    level: 'Proficient',
    highlight: 'Multi-stage builds, minimal production images, docker-compose',
  },
];

const CATEGORIES: { key: CategoryKey; label: string; count: number }[] = [
  { key: 'all', label: 'All Technologies', count: TECH_CATALOG.length },
  { key: 'frontend', label: 'Frontend & UI', count: TECH_CATALOG.filter((t) => t.category === 'frontend').length },
  { key: 'backend', label: 'Backend & APIs', count: TECH_CATALOG.filter((t) => t.category === 'backend').length },
  { key: 'database', label: 'Database & Neon', count: TECH_CATALOG.filter((t) => t.category === 'database').length },
  { key: 'ai', label: 'AI & Integrations', count: TECH_CATALOG.filter((t) => t.category === 'ai').length },
  { key: 'devops', label: 'DevOps & Cloud', count: TECH_CATALOG.filter((t) => t.category === 'devops').length },
];

export function TechStackMatrix() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = TECH_CATALOG.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.highlight.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="tech-matrix-section" id="tech-matrix">
      <div className="matrix-control-bar">
        {/* Category Filter Chips */}
        <div className="matrix-filter-chips" role="tablist" aria-label="Technology filter categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat.key}
              className={`matrix-chip ${activeCategory === cat.key ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.key)}
            >
              <span>{cat.label}</span>
              <span className="chip-badge">{cat.count}</span>
            </button>
          ))}
        </div>

        {/* Live Search Input */}
        <div className="matrix-search-box">
          <span className="search-icon" aria-hidden="true">⌕</span>
          <input
            type="text"
            placeholder="Search stack, libraries, protocols..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="matrix-search-input"
            aria-label="Filter technologies"
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* MATRIX CARDS GRID */}
      <div className="matrix-cards-grid">
        {filteredItems.map((item) => (
          <div key={item.name} className="matrix-card">
            <div className="matrix-card-glow" />
            <div className="matrix-card-header">
              <div className="matrix-icon-wrapper">
                <TechIcon name={item.name} className="matrix-tech-icon" />
              </div>
              <span className={`level-pill level-${item.level.toLowerCase()}`}>
                {item.level}
              </span>
            </div>

            <div className="matrix-card-body">
              <h4 className="matrix-tech-name">{item.name}</h4>
              <p className="matrix-tech-role">{item.role}</p>
              <p className="matrix-tech-highlight">{item.highlight}</p>
            </div>

            <div className="matrix-card-footer">
              <span className="matrix-experience-tag">⚡ {item.experience}</span>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="matrix-empty-state">
            <span className="empty-symbol">[ 404 ]</span>
            <p>No matching technologies found for &ldquo;{searchQuery}&rdquo;.</p>
            <button type="button" className="button button-cyber-ghost" onClick={() => setSearchQuery('')}>
              Reset Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
