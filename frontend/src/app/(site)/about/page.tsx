import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { publicContent } from '@/lib/api';
import { TechBadge } from '@/components/tech-icon';

export const metadata: Metadata = {
  title: 'About — Nguyễn Hoàng Huynh',
  description:
    'Information Technology student at Vietnam Aviation Academy and Full-Stack Web Developer building thoughtful digital products.',
};

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const { profile } = await publicContent();

  return (
    <main id="main-content" className="container section">
      <div className="page-intro">
        <p className="eyebrow">
          PROFILE &amp; BACKGROUND
        </p>
        <h1>
          Engineering with precision &amp; curiosity
          <span className="brand-dot">
            .
          </span>
        </h1>
        <p className="lead-text">
          {profile.introduction}
        </p>
      </div>

      <div className="about-grid">
        <div className="about-profile-card">
          <div className="pro-portrait-container" role="img" aria-label={`Portrait of ${profile.name}`}>
            <div className="pro-portrait-frame">
              <Image
                src={profile.avatarUrl || '/avatar.jpg'}
                alt={profile.name}
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className="pro-portrait-img"
                unoptimized
                priority
              />
            </div>
            <div className="portrait-badge">
              <span className="status-dot live" />
              <span>Available for Roles</span>
            </div>
          </div>

          <div className="profile-quick-facts">
            <h3>System Profile</h3>
            <ul className="fact-list">
              <li>
                <span className="fact-label">Full Name</span>
                <span className="fact-value">{profile.name}</span>
              </li>
              <li>
                <span className="fact-label">Role</span>
                <span className="fact-value">{profile.title}</span>
              </li>
              <li>
                <span className="fact-label">Date of Birth</span>
                <span className="fact-value">{profile.dateOfBirth}</span>
              </li>
              <li>
                <span className="fact-label">Hometown</span>
                <span className="fact-value">{profile.hometown}</span>
              </li>
              <li>
                <span className="fact-label">Current Base</span>
                <span className="fact-value">{profile.location}</span>
              </li>
              <li>
                <span className="fact-label">Email</span>
                <a href={`mailto:${profile.email}`} className="text-link">
                  {profile.email}
                </a>
              </li>
              <li>
                <span className="fact-label">Phone</span>
                <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} className="text-link">
                  {profile.phone}
                </a>
              </li>
            </ul>

            <div className="profile-actions">
              <Link href="/contact" className="button button-pro-primary full-width">
                Get in Touch
                <span aria-hidden="true">↗</span>
              </Link>
              {profile.resumeUrl && (
                <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="button button-pro-secondary full-width">
                  Download Resume
                  <span aria-hidden="true">↓</span>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="about-details">
          <section className="about-narrative">
            <p className="eyebrow">01 / BIOGRAPHY & OUTLOOK</p>
            <h2>Connecting clean code with human interaction.</h2>
            <div className="prose-text">
              <p>{profile.biography}</p>
              <p>
                My focus centers on developing reliable, accessible, and high-performance applications. I enjoy
                understanding systems from the database layer through API contracts to the pixel-level visual hierarchy
                on mobile and desktop devices.
              </p>
            </div>
          </section>

          <section className="about-section-block">
            <p className="eyebrow">02 / EDUCATION</p>
            <h2>Academic Foundation</h2>
            <div className="timeline-cards">
              {profile.education.map((item, idx) => (
                <div key={idx} className="timeline-card">
                  <div className="timeline-header">
                    <div>
                      <span className="timeline-period">{item.period}</span>
                      <h3>{item.institution}</h3>
                    </div>
                    <span className="gpa-pill">GPA {item.gpa}</span>
                  </div>
                  <p className="timeline-major">{item.degree}</p>
                  {item.note && <p className="timeline-note">{item.note}</p>}
                </div>
              ))}
            </div>
          </section>

          <section className="about-section-block">
            <p className="eyebrow">03 / CERTIFICATIONS</p>
            <h2>Verified Credentials</h2>
            <div className="certificate-cards">
              {profile.certificates.map((cert, idx) => (
                <div key={idx} className="certificate-card">
                  <div className="cert-icon">TOEIC</div>
                  <div className="cert-body">
                    <h3>{cert.name}</h3>
                    <p className="cert-meta">
                      Issued by {cert.issuer} • {cert.issueDate}
                    </p>
                    <div className="cert-badge">Score: {cert.score} / 990</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="about-section-block">
            <p className="eyebrow">04 / TECHNICAL EXPERTISE</p>
            <h2>Categorized Toolkit</h2>
            <div className="skills-categorized-grid">
              <div className="skill-group">
                <h4>Frontend Development</h4>
                <div className="tags">
                  {profile.skillsCategorized.frontend.map((s) => (
                    <TechBadge key={s} tech={s} />
                  ))}
                </div>
              </div>
              <div className="skill-group">
                <h4>Backend Engineering</h4>
                <div className="tags">
                  {profile.skillsCategorized.backend.map((s) => (
                    <TechBadge key={s} tech={s} />
                  ))}
                </div>
              </div>
              <div className="skill-group">
                <h4>Databases</h4>
                <div className="tags">
                  {profile.skillsCategorized.databases.map((s) => (
                    <TechBadge key={s} tech={s} />
                  ))}
                </div>
              </div>
              <div className="skill-group">
                <h4>APIs & Integrations</h4>
                <div className="tags">
                  {profile.skillsCategorized.apis.map((s) => (
                    <TechBadge key={s} tech={s} />
                  ))}
                </div>
              </div>
              <div className="skill-group">
                <h4>Tools & Deployment</h4>
                <div className="tags">
                  {profile.skillsCategorized.tools.map((s) => (
                    <TechBadge key={s} tech={s} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
