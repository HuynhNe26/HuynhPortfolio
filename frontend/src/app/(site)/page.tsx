import Link from 'next/link';
import { publicContent } from '@/lib/api';
import { EmptyProjects, ProjectCard } from '@/components/project-card';
import { TechBadge, TechIcon } from '@/components/tech-icon';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const { profile, projects, unavailable } = await publicContent();
  const featuredProjects = projects.filter((project) => project.featured);
  const displayedProjects = (featuredProjects.length ? featuredProjects : projects).slice(0, 4);

  return (
    <main id="main-content" className="homepage-wrapper">
      {/* SECTION 1: HERO */}
      <section className="hero container">
        <div className="hero-copy">
          <div className="hero-status-beacon">
            <span className="beacon-pulse" />
            <span className="beacon-text">SYSTEM OPERATIONAL • EDGE SGN-01 • LATENCY: 12ms</span>
          </div>
          <h1 className="hero-name">
            <span className="hero-name-gradient">{profile.name}</span>
          </h1>
          <p className="hero-subtitle">
            Full-Stack Software Engineer &amp; System Architect
          </p>
          <p className="hero-intro">
            Third-year Information Technology student at <strong>Vietnam Aviation Academy</strong> (GPA 3.1 / 4.0).
            Specializing in high-performance distributed systems, cloud-native architectures, and AI Agentic workflows using <strong>TypeScript</strong>, <strong>Next.js 16</strong>, and <strong>PostgreSQL Neon</strong>.
          </p>
          <div className="hero-actions">
            <Link className="button button-cyber-primary" href="/projects">
              Explore Architecture &amp; Work
              <span aria-hidden="true">↗</span>
            </Link>
            <Link className="button button-cyber-ghost" href="/contact">
              Deploy Collaboration
              <span aria-hidden="true">↗</span>
            </Link>
            <a className="button button-cyber-ghost" href="https://github.com/HuynhNe26" target="_blank" rel="noopener noreferrer">
              <TechIcon name="Git" className="tech-tag-icon" />
              GitHub
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="hero-caption">
            <span className="status-dot" />
            <span>VIETNAM AVIATION ACADEMY • THIRD YEAR IT STUDENT • CUMULATIVE GPA 3.1</span>
          </div>
        </div>

        <div className="hero-art" role="img" aria-label="Terminal IDE & Architecture Console for Nguyễn Hoàng Huynh">
          <div className="art-grid" />
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />

          {/* Floating Top Badge */}
          <div className="cyber-hud-badge top-badge">
            <span className="badge-icon">⚡</span>
            <div className="badge-text-group">
              <strong>Sub-50ms Edge SSR</strong>
              <span>Next.js 16 + React 19</span>
            </div>
          </div>

          {/* Developer Cyber Terminal Window */}
          <div className="code-window">
            <div className="window-bar">
              <div className="window-controls">
                <span className="btn-red" />
                <span className="btn-yellow" />
                <span className="btn-green" />
              </div>
              <div className="window-tabs">
                <span className="window-tab active">system.config.ts</span>
                <span className="window-tab">neon-db.sql</span>
                <span className="window-tab">telemetry.sh</span>
              </div>
              <span className="window-title">TS 5.8 Strict</span>
            </div>
            <div className="code-lines">
              <div>
                <span className="line-no">01</span>
                <span className="code-comment">// Production System Specification</span>
              </div>
              <div>
                <span className="line-no">02</span>
                <span className="code-keyword">export const</span> <span className="code-variable">engineer</span>: <span className="code-type">SystemArchitect</span> = {'{'}
              </div>
              <div>
                <span className="line-no">03</span>
                &nbsp;&nbsp;name: <span className="code-string">"{profile.name}"</span>,
              </div>
              <div>
                <span className="line-no">04</span>
                &nbsp;&nbsp;institution: <span className="code-string">"Vietnam Aviation Academy"</span>,
              </div>
              <div>
                <span className="line-no">05</span>
                &nbsp;&nbsp;major: <span className="code-string">"Information Technology (IT3)"</span>,
              </div>
              <div>
                <span className="line-no">06</span>
                &nbsp;&nbsp;academic_standing: {'{'} gpa: <span className="code-number">3.1</span>, scale: <span className="code-number">4.0</span>, toeic: <span className="code-number">550</span> {'}'},
              </div>
              <div>
                <span className="line-no">07</span>
                &nbsp;&nbsp;core_stack: [<span className="code-string">"React 19"</span>, <span className="code-string">"Next.js 16"</span>, <span className="code-string">"PostgreSQL Neon"</span>, <span className="code-string">"Redis"</span>],
              </div>
              <div>
                <span className="line-no">08</span>
                &nbsp;&nbsp;security: <span className="code-string">"Zero-Trust RBAC • Argon2id • OWASP Top 10"</span>,
              </div>
              <div>
                <span className="line-no">09</span>
                &nbsp;&nbsp;status: <span className="code-string">"OPERATIONAL // OPEN TO OPPORTUNITIES"</span>,
              </div>
              <div>
                <span className="line-no">10</span>
                {'};'}
              </div>
            </div>
            <div className="window-bottom">
              <div className="window-bottom-status">
                <span className="status-dot" />
                <span>STATUS: 200 OK</span>
              </div>
              <span>MEM: 38.4MB • LATENCY: 12ms</span>
              <span>NEON POOL: ACTIVE</span>
            </div>
          </div>

          {/* Floating Bottom Badge */}
          <div className="cyber-hud-badge bottom-badge">
            <span className="badge-icon">🔒</span>
            <div className="badge-text-group">
              <strong>Defensive Security</strong>
              <span>Argon2id Salted • HttpOnly</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: SYSTEM TELEMETRY STRIP */}
      <section className="telemetry-strip" aria-label="System Architecture & Runtime Telemetry">
        <div className="container">
          <div className="telemetry-grid">
            <div className="telemetry-card">
              <span className="telemetry-index">01 / DISTRIBUTED ARCHITECTURE</span>
              <strong className="telemetry-title">Next.js 16 + React 19 Edge</strong>
              <p className="telemetry-desc">Zero cold starts, streaming SSR, WebSocket real-time communication, and responsive micro-frontends.</p>
            </div>
            <div className="telemetry-card">
              <span className="telemetry-index">02 / DATABASE ENGINE</span>
              <strong className="telemetry-title">PostgreSQL Neon Serverless</strong>
              <p className="telemetry-desc">Connection pooled ACID transactions, schema migrations, and high-throughput Redis caching layers.</p>
            </div>
            <div className="telemetry-card">
              <span className="telemetry-index">03 / AI &amp; AGENTIC SYSTEMS</span>
              <strong className="telemetry-title">Google Gemini + LangChain RAG</strong>
              <p className="telemetry-desc">Context-aware conversational pipelines, vector embeddings, and autonomous task execution engines.</p>
            </div>
            <div className="telemetry-card">
              <span className="telemetry-index">04 / DEFENSIVE SECURITY</span>
              <strong className="telemetry-title">Zero-Trust Hardened Model</strong>
              <p className="telemetry-desc">OWASP Top 10 compliance, Argon2id password salting, HttpOnly SameSite cookies, and strict input validation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT PREVIEW */}
      <section id="about-preview" className="about-preview-section">
        <div className="container section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / ABOUT &amp; SYSTEM PROFILE</p>
              <h2>
                Bridging Theory With
                <br />
                Production Engineering<span className="brand-dot">.</span>
              </h2>
            </div>
            <p className="section-aside">
              Connecting academic computer science with scalable production code, hardened architectures, and modern web engineering.
            </p>
          </div>

          <div className="about-preview-grid">
            <div className="about-preview-card highlight">
              <span className="badge-pill">Academic Profile // IT3</span>
              <h3>Vietnam Aviation Academy</h3>
              <p className="academy-sub">Học viện Hàng không Việt Nam • Khoa Công nghệ Thông tin</p>
              <div className="academic-meta">
                <div>
                  <span className="meta-label">Discipline / Major</span>
                  <span className="meta-val">Information Technology</span>
                </div>
                <div>
                  <span className="meta-label">Academic Standing</span>
                  <span className="meta-val">Third Year (2023 – Present)</span>
                </div>
                <div>
                  <span className="meta-label">Cumulative GPA</span>
                  <span className="meta-val gpa-highlight">3.1 / 4.0</span>
                </div>
                <div>
                  <span className="meta-label">English Certification</span>
                  <span className="meta-val">TOEIC 550 [ETS Verified]</span>
                </div>
              </div>
            </div>

            <div className="about-preview-card">
              <span className="badge-pill">Engineering Philosophy // 0xHUYNH</span>
              <h3>Architecture, Security &amp; Pragmatism</h3>
              <p>
                {profile.biography.slice(0, 260)}...
              </p>
              <div className="card-footer-action">
                <Link href="/about" className="text-link">
                  Read full engineering background &amp; coursework ↗
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FEATURED PROJECTS */}
      <section id="work" className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">02 / PRODUCTION WORK</p>
            <h2>
              Featured Case Studies
              <span className="brand-dot">.</span>
            </h2>
          </div>
          <Link className="text-link" href="/projects">
            All 5 projects
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        {displayedProjects.length ? (
          <div className="project-grid">
            {displayedProjects.map((project, index) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <EmptyProjects unavailable={unavailable} />
        )}
      </section>

      {/* SECTION 4: TECHNICAL EXPERTISE */}
      <section className="technical-expertise-section">
        <div className="container section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">03 / TECHNICAL TOOLKIT</p>
              <h2>
                Modern Engineering Stack
                <span className="brand-dot">.</span>
              </h2>
            </div>
            <p className="section-aside">
              Technologies genuinely applied in production projects, academic implementations, and active systems.
            </p>
          </div>

          <div className="expertise-grid">
            <div className="expertise-card">
              <div className="expertise-icon">⚛</div>
              <h3>Frontend Systems &amp; UI</h3>
              <p>Creating responsive, component-driven user interfaces with accessibility, streaming SSR, and sub-second load times.</p>
              <div className="tags">
                {profile.skillsCategorized.frontend.map((skill) => (
                  <TechBadge key={skill} tech={skill} />
                ))}
              </div>
            </div>

            <div className="expertise-card">
              <div className="expertise-icon">⚡</div>
              <h3>Backend &amp; Distributed APIs</h3>
              <p>RESTful APIs, real-time WebSocket communication, session authentication, and defensive security architectures.</p>
              <div className="tags">
                {profile.skillsCategorized.backend.map((skill) => (
                  <TechBadge key={skill} tech={skill} />
                ))}
              </div>
            </div>

            <div className="expertise-card">
              <div className="expertise-icon">🗄</div>
              <h3>Databases &amp; Caching</h3>
              <p>Relational ACID guarantees with PostgreSQL Neon Serverless, flexible document models, and Redis caching layers.</p>
              <div className="tags">
                {profile.skillsCategorized.databases.map((skill) => (
                  <TechBadge key={skill} tech={skill} />
                ))}
              </div>
            </div>

            <div className="expertise-card">
              <div className="expertise-icon">🔌</div>
              <h3>APIs &amp; AI Integrations</h3>
              <p>Third-party service integrations, transactional email pipelines, payment webhooks, and Google Gemini AI Agentic RAG.</p>
              <div className="tags">
                {profile.skillsCategorized.apis.map((skill) => (
                  <TechBadge key={skill} tech={skill} />
                ))}
              </div>
            </div>

            <div className="expertise-card full-width-card">
              <div className="expertise-icon">🛠</div>
              <h3>Tools, Deployment &amp; DevOps</h3>
              <p>Git collaboration, GitHub Actions, Vercel edge deployment, Docker containerization, and automated test pipelines.</p>
              <div className="tags">
                {profile.skillsCategorized.tools.map((skill) => (
                  <TechBadge key={skill} tech={skill} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 & 6: EDUCATION & CERTIFICATIONS */}
      <section className="education-certs-section container section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">04 / EDUCATION &amp; CREDENTIALS</p>
            <h2>
              Academic Foundations
              <span className="brand-dot">.</span>
            </h2>
          </div>
          <Link className="text-link" href="/about">
            Learn more about my studies ↗
          </Link>
        </div>

        <div className="dual-cards-grid">
          {/* Education */}
          <div className="edu-block-card">
            <span className="badge-pill">University Education</span>
            <h3>Vietnam Aviation Academy</h3>
            <p className="edu-degree">Bachelor of Science in Information Technology</p>
            <div className="edu-stats">
              <div className="stat-unit">
                <span className="stat-label">Timeline</span>
                <span className="stat-val">2023 – Present (Third Year)</span>
              </div>
              <div className="stat-unit">
                <span className="stat-label">Academic GPA</span>
                <span className="stat-val gpa-badge">3.1 / 4.0</span>
              </div>
            </div>
            <p className="edu-description">
              Core studies in Data Structures, Algorithms, Database Management Systems, Software Engineering, Network
              Architectures, and Web Technologies.
            </p>
          </div>

          {/* Certifications */}
          <div className="edu-block-card">
            <span className="badge-pill">Language Certification</span>
            <h3>TOEIC Listening &amp; Reading</h3>
            <p className="edu-degree">Educational Testing Service (ETS)</p>
            <div className="edu-stats">
              <div className="stat-unit">
                <span className="stat-label">Verified Score</span>
                <span className="stat-val gpa-badge">550 / 990</span>
              </div>
              <div className="stat-unit">
                <span className="stat-label">Issue Date</span>
                <span className="stat-val">October 2025</span>
              </div>
            </div>
            <p className="edu-description">
              Demonstrates proficiency in reading technical documentation, software engineering specifications, and
              communicating in professional software development settings.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7: CONTACT CTA */}
      <section className="contact-banner container">
        <p className="eyebrow">$ ssh connect@nhhuynh.dev --channel=encrypted</p>
        <h2>
          Architect &amp; Build
          <br />
          Mission-Critical Software<span className="brand-dot">.</span>
        </h2>
        <div className="contact-banner-actions">
          <Link className="button button-cyber-primary" href="/contact">
            Initialize Contact
            <span aria-hidden="true">↗</span>
          </Link>
          <a href={`mailto:${profile.email}`} className="text-link light-link">
            {profile.email}
          </a>
        </div>
        {profile.availability && (
          <p className="availability">
            <span className="status-dot" />
            <span>{profile.availability}</span>
          </p>
        )}
        <span className="banner-mark" aria-hidden="true">
          &gt;_
        </span>
      </section>
    </main>
  );
}
