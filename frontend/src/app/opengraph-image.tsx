import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';

export const alt = 'Nguyễn Hoàng Huynh — Full-Stack Web Developer & Software Engineer | Portfolio';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: 'linear-gradient(135deg, #090D16 0%, #0F172A 50%, #1E1B4B 100%)',
          color: '#F8FAFC',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* Decorative ambient background glows */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-120px',
            width: '460px',
            height: '460px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.35) 0%, rgba(124, 58, 237, 0) 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.35) 0%, rgba(37, 99, 235, 0) 70%)',
          }}
        />

        {/* Top Header Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                fontWeight: 900,
                color: '#FFFFFF',
                boxShadow: '0 8px 24px rgba(37, 99, 235, 0.4)',
              }}
            >
              nh.
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#93C5FD',
                }}
              >
                NGUYỄN HOÀNG HUYNH
              </span>
              <span
                style={{
                  fontSize: '13px',
                  color: '#94A3B8',
                }}
              >
                Vietnam Aviation Academy • GPA 3.1 / 4.0
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 18px',
              borderRadius: '9999px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              color: '#34D399',
              fontSize: '14px',
              fontWeight: 700,
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#34D399',
              }}
            />
            <span>Available for Hire • 2026</span>
          </div>
        </div>

        {/* Main Title Center Stage */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: '56px',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            <span style={{ color: '#FFFFFF' }}>Full-Stack Web Developer</span>
            <span style={{ color: '#C4B5FD' }}>& AI Agentic Systems</span>
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '22px',
              lineHeight: 1.4,
              color: '#CBD5E1',
              maxWidth: '880px',
            }}
          >
            Building production web applications with Next.js 16, Node.js, Agentic RAG, and PostgreSQL Neon.
          </div>
        </div>

        {/* Bottom Feature Badges & Stats */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '28px',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          }}
        >
          {/* Tech Badges */}
          <div
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            {['Next.js 16', 'React 19', 'TypeScript', 'Node.js', 'PostgreSQL', 'Agentic RAG'].map((tech) => (
              <span
                key={tech}
                style={{
                  display: 'flex',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#E2E8F0',
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Metrics */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <span style={{ fontSize: '20px', fontWeight: 800, color: '#60A5FA' }}>7 Live Case Studies</span>
              <span style={{ fontSize: '12px', color: '#94A3B8' }}>github.com/HuynhNe26</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
