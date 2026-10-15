import Link from 'next/link';
import { publicContent } from '@/lib/api';
import { EmptyProjects, ProjectCard } from '@/components/project-card';

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
          <p className="eyebrow hero-eyebrow">
            <span className="small-line" />
            {profile.title || 'FULL-STACK WEB DEVELOPER'}
          </p>
          <h1 className="hero-name">
            {profile.name}
          </h1>
          <p className="hero-subtitle">
            Building thoughtful digital experiences through design, code, and curiosity.
          </p>
          <p className="hero-intro">
            {profile.introduction}
          </p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/projects">
              Explore My Work
              <span aria-hidden="true">↗</span>
            </Link>
            <Link className="button button-light" href="/contact">
              Get In Touch
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="hero-caption">
            <span className="status-dot live" />
            <span>VIETNAM AVIATION ACADEMY • THIRD YEAR IT STUDENT</span>
          </div>
        </div>

        <div className="hero-art" role="img" aria-label="Portrait & Code Craftsmanship visual for Nguyễn Hoàng Huynh">
          <div className="art-grid" />
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />

          {/* Portrait Placeholder Card */}
          <div className="hero-portrait-card">
            <div className="hero-portrait-frame">
              <span className="hero-avatar-monogram">NH</span>
              <div className="hero-avatar-info">
                <strong>Nguyễn Hoàng Huynh</strong>
                <span>Full-Stack Web Developer</span>
              </div>
            </div>
            <div className="hero-portrait-status">
              <span className="status-dot live" />
              <span>Available for Intern & Junior Roles</span>
            </div>
          </div>

          <div className="code-window">
            <div className="window-bar">
              <span />
              <span />
              <span />
              <span className="window-title">developer.config.ts</span>
            </div>
            <div className="code-lines">
              <div>
                <span className="line-no">01</span>
                <span className="code-purple">export const</span> developer = {'{'}
              </div>
              <div>
                <span className="line-no">02</span>
                &nbsp;&nbsp;name: <span className="code-green">"{profile.name}"</span>,
              </div>
              <div>
                <span className="line-no">03</span>
                &nbsp;&nbsp;education: <span className="code-green">"Vietnam Aviation Academy"</span>,
              </div>
              <div>
                <span className="line-no">04</span>
                &nbsp;&nbsp;gpa: <span className="code-purple">3.1</span>,
              </div>
              <div>
                <span className="line-no">05</span>
                &nbsp;&nbsp;stack: [<span className="code-green">"React"</span>, <span className="code-green">"Next.js"</span>, <span className="code-green">"Node.js"</span>, <span className="code-green">"PostgreSQL"</span>],
              </div>
              <div>
                <span className="line-no">06</span>
                &nbsp;&nbsp;toeic: <span className="code-purple">550</span>,
              </div>
              <div>
                <span className="line-no">07</span>
                {'};'}
              </div>
            </div>
            <div className="window-bottom">
              <span>TypeScript strict</span>
              <span>Less, but better.</span>
            </div>
          </div>

          <div className="art-coordinate">NH / PORTFOLIO • 2026</div>
        </div>

        <div className="hero-bottom">
          <span>CLEAN CODE • MEASURED ARCHITECTURE</span>
          <a href="#about-preview">
            SCROLL TO EXPLORE
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      {/* SECTION 2: ABOUT PREVIEW */}
      <section id="about-preview" className="about-preview-section">
        <div className="container section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / ABOUT</p>
              <h2>
                Turning Ideas Into
                <br />
                Real Products<span className="brand-dot">.</span>
              </h2>
            </div>
            <p className="section-aside">
              Connecting academic theory with hands-on production code across modern web ecosystems.
            </p>
          </div>

          <div className="about-preview-grid">
            <div className="about-preview-card highlight">
              <span className="badge-pill">Academic Profile</span>
              <h3>Vietnam Aviation Academy</h3>
              <p className="academy-sub">Học viện Hàng không Việt Nam</p>
              <div className="academic-meta">
                <div>
                  <span className="meta-label">Major</span>
                  <span className="meta-val">Information Technology</span>
                </div>
                <div>
                  <span className="meta-label">Current Stage</span>
                  <span className="meta-val">Third Year (2023 – Present)</span>
                </div>
                <div>
                  <span className="meta-label">Cumulative GPA</span>
                  <span className="meta-val gpa-highlight">3.1 / 4.0</span>
                </div>
              </div>
            </div>

            <div className="about-preview-card">
              <span className="badge-pill">Engineering Mindset</span>
              <h3>Architecture, Security & Pragmatism</h3>
              <p>
                {profile.biography.slice(0, 240)}...
              </p>
              <div className="card-footer-action">
                <Link href="/about" className="text-link">
                  Read full story & background ↗
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
            <p className="eyebrow">02 / SELECTED WORK</p>
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
              <h3>Frontend Development</h3>
              <p>Creating responsive, component-driven user interfaces with clean accessibility and micro-interactions.</p>
              <div className="tags">
                {profile.skillsCategorized.frontend.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>

            <div className="expertise-card">
              <div className="expertise-icon">⚡</div>
              <h3>Backend Development</h3>
              <p>RESTful APIs, real-time WebSocket communication, session authentication, and defensive security.</p>
              <div className="tags">
                {profile.skillsCategorized.backend.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>

            <div className="expertise-card">
              <div className="expertise-icon">🗄</div>
              <h3>Databases</h3>
              <p>Relational ACID guarantees and flexible document models with caching layers.</p>
              <div className="tags">
                {profile.skillsCategorized.databases.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>

            <div className="expertise-card">
              <div className="expertise-icon">🔌</div>
              <h3>APIs & Integrations</h3>
              <p>Third-party service integrations, transactional email pipelines, payment webhooks, and AI APIs.</p>
              <div className="tags">
                {profile.skillsCategorized.apis.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>

            <div className="expertise-card full-width-card">
              <div className="expertise-icon">🛠</div>
              <h3>Tools, Deployment & Version Control</h3>
              <p>Git collaboration, GitHub Actions, Vercel edge deployment, Docker containerization, and API testing.</p>
              <div className="tags">
                {profile.skillsCategorized.tools.map((skill) => (
                  <span key={skill}>{skill}</span>
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
            <p className="eyebrow">04 / EDUCATION & CREDENTIALS</p>
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
            <h3>TOEIC Listening & Reading</h3>
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
        <p className="eyebrow">READY TO COLLABORATE?</p>
        <h2>
          Let's Build Something
          <br />
          Meaningful<span className="brand-dot">.</span>
        </h2>
        <div className="contact-banner-actions">
          <Link className="button button-light" href="/contact">
            Get In Touch
            <span aria-hidden="true">↗</span>
          </Link>
          <a href={`mailto:${profile.email}`} className="text-link light-link">
            {profile.email}
          </a>
        </div>
        {profile.availability && (
          <p className="availability">
            <span className="status-dot live" />
            {profile.availability}
          </p>
        )}
        <span className="banner-mark" aria-hidden="true">
          ↗
        </span>
      </section>
    </main>
  );
}
