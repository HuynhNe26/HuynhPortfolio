import Link from 'next/link';
import { publicContent } from '@/lib/api';
import { EmptyProjects, ProjectCard } from '@/components/project-card';

export const dynamic = 'force-dynamic';

const capabilities = [
  {
    number: '01',
    title: 'Interfaces that feel right.',
    text: 'Clear hierarchy, thoughtful interactions, and a consistent experience across every screen.',
    label: 'Frontend development',
    symbol: '⌘'
  },
  {
    number: '02',
    title: 'Built beneath the surface.',
    text: 'Well-structured APIs, considered data models, and security woven into the foundation.',
    label: 'Backend engineering',
    symbol: '{ }'
  },
  {
    number: '03',
    title: 'The details make it.',
    text: 'From an early wireframe to the last micro-interaction, design and code move together.',
    label: 'UI / UX thinking',
    symbol: '↗'
  },
];

export default async function Home() {
  const { profile, projects, unavailable } = await publicContent();
  const selected = projects.filter((project) => project.featured);
  const displayed = (selected.length ? selected : projects).slice(0, 4);

  return (
    <main id="main-content">
      <section className="hero container">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">
            <span className="small-line" />
            DEVELOPER & CREATIVE THINKER
          </p>
          <h1>
            Thoughtfully
            <br />
            designed.
            <br />
            <span>
              Carefully built.
            </span>
          </h1>
          <p className="hero-intro">
            I’m {profile.name}. {profile.introduction}
          </p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/projects">
              Explore my work
              <span aria-hidden="true">
                ↗
              </span>
            </Link>
            <Link className="text-link" href="/contact">
              Let’s talk
              <span aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>
          <div className="hero-caption">
            <span className="status-dot" />
            DESIGN MINDED. ENGINEERING DRIVEN.
          </div>
        </div>
        <div className="hero-art" role="img" aria-label="An abstract browser window illustrating the connection between design and code">
          <div className="art-grid" />
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="floating-label label-top">
            <span className="status-dot" />
            made with intention
          </div>
          <div className="code-window">
            <div className="window-bar">
              <span />
              <span />
              <span />
              <span className="window-title">
                a little about me.ts
              </span>
            </div>
            <div className="code-lines">
              <div>
                <span className="line-no">
                  01
                </span>
                <span className="code-purple">
                  const
                </span>
                developer = {'{'}
              </div>
              <div>
                <span className="line-no">
                  02
                </span>
                name:
                <span className="code-green">
                  “{profile.name}”
                </span>
                ,
              </div>
              <div>
                <span className="line-no">
                  03
                </span>
                focus:
                <span className="code-green">
                  “the details”
                </span>
                ,
              </div>
              <div>
                <span className="line-no">
                  04
                </span>
                approach: [
              </div>
              <div>
                <span className="line-no">
                  05
                </span>

                <span className="code-green">
                  “design thoughtfully”
                </span>
                ,
              </div>
              <div>
                <span className="line-no">
                  06
                </span>

                <span className="code-green">
                  “build carefully”
                </span>
              </div>
              <div>
                <span className="line-no">
                  07
                </span>
                ]
              </div>
              <div>
                <span className="line-no">
                  08
                </span>
                {'};'}
              </div>
            </div>
            <div className="window-bottom">
              <span>
                TypeScript
              </span>
              <span>
                less, but better.
              </span>
            </div>
          </div>
          <div className="floating-label label-bottom">
            <span className="bracket-icon">
              &lt;/&gt;
            </span>
            <div>
              Where design
              <br />
              <strong>
                meets development.
              </strong>
            </div>
          </div>
          <div className="art-coordinate">
            NH / STUDIO NOTES — 001
          </div>
        </div>
        <div className="hero-bottom">
          <span>
            BUILDING FOR THE WEB
          </span>
          <a href="#work">
            SCROLL TO EXPLORE
            <span aria-hidden="true">
              ↓
            </span>
          </a>
        </div>
      </section>
      <div className="stack-strip">
        <div className="container stack-inner">
          <span className="eyebrow">
            THE TOOLKIT
          </span>
          <div>
            {profile.skills.map((skill) => (
              <span key={skill}>
                {skill}
              </span>))}
          </div>
        </div>
      </div>
      <section id="work" className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              01 / SELECTED WORK
            </p>
            <h2>
              Ideas, brought to life
              <span className="brand-dot">
                .
              </span>
            </h2>
          </div>
          <Link className="text-link" href="/projects">
            All projects
            <span aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>
        {displayed.length ? (
          <div className="project-grid">
            {displayed.map((project, index) => (
              <ProjectCard key={project._id} project={project} index={index} />))}
          </div>
        ) : (
          <EmptyProjects unavailable={unavailable} />)}
      </section>
      <section className="capability-section">
        <div className="container section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                02 / WHAT I BRING
              </p>
              <h2>
                The whole picture.
                <br />
                <span className="muted">
                  And every small detail.
                </span>
              </h2>
            </div>
            <p className="section-aside">
              A considered approach to building digital products, from the interface to the infrastructure.
            </p>
          </div>
          <div className="capability-grid">
            {capabilities.map((item) => (
              <article className="capability-card" key={item.number}>
                <div className="capability-top">
                  <span className="capability-symbol" aria-hidden="true">
                    {item.symbol}
                  </span>
                  <span className="eyebrow">
                    {item.number}
                  </span>
                </div>
                <p className="eyebrow">
                  {item.label}
                </p>
                <h3>
                  {item.title}
                </h3>
                <p>
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="about" className="about-section container section">
        <div className="about-art" aria-hidden="true">
          <div className="about-monogram">
            nh
            <span>
              .
            </span>
          </div>
          <div className="about-art-footer">
            <span>
              CURIOUS BY NATURE.
            </span>
            <span>
              ↗
            </span>
          </div>
        </div>
        <div className="about-copy">
          <p className="eyebrow">
            03 / A LITTLE ABOUT ME
          </p>
          <h2>
            {profile.headline}
          </h2>
          <p className="preserve-lines">
            {profile.biography}
          </p>
          {profile.location && (
            <p>
              {profile.location}
            </p>)}
          <div className="social-links">
            {profile.githubUrl && (
              <a href={profile.githubUrl} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>)}{profile.linkedinUrl && (
                <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">
                  LinkedIn ↗
                </a>)}
            <Link href="/contact">
              Say hello ↗
            </Link>
          </div>
        </div>
      </section>
      <section className="contact-banner container">
        <p className="eyebrow">
          HAVE SOMETHING IN MIND?
        </p>
        <h2>
          Good things start
          <br />
          with a conversation.
        </h2>
        <Link className="button button-light" href="/contact">
          Let’s build something
          <span aria-hidden="true">
            ↗
          </span>
        </Link>
        {profile.availability && (
          <p className="availability">
            {profile.availability}
          </p>)}
        <span className="banner-mark" aria-hidden="true">
          ↗
        </span>
      </section>
    </main>
  );
}
