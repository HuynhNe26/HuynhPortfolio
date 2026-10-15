import React from 'react';

export function TechIcon({ name, className = 'w-4 h-4' }: { name: string; className?: string }) {
  const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, '');

  // React
  if (normalized.includes('react')) {
    return (
      <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }

  // Next.js
  if (normalized.includes('next')) {
    return (
      <svg className={className} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="next-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180" style={{ maskType: 'alpha' }}>
          <circle cx="90" cy="90" r="90" fill="black" />
        </mask>
        <g mask="url(#next-mask)">
          <circle cx="90" cy="90" r="90" fill="#000000" />
          <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="white" />
          <rect x="115" y="54" width="12" height="72" fill="white" />
        </g>
      </svg>
    );
  }

  // TypeScript
  if (normalized.includes('typescript')) {
    return (
      <svg className={className} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" rx="20" fill="#3178C6" />
        <path d="M1.5 63.8v-7.6h38.2v7.6H22v47.7H13.6V63.8H1.5zm53.4 20.3c2.7-3.6 6.3-5.5 10.8-5.5 3.3 0 5.9.8 7.9 2.5 2 1.6 3 3.9 3 6.9 0 2.2-.6 4-1.8 5.4-1.2 1.4-3.3 2.8-6.3 4.2-4.5 2.1-7.7 4.1-9.6 6.1-2.9 3-4.3 6.9-4.3 11.6 0 4.8 1.7 8.7 5.1 11.7 3.4 3 8.1 4.5 14.1 4.5 4.3 0 8.2-.8 11.7-2.4v-7.6c-3.6 2.1-7.4 3.1-11.4 3.1-3.6 0-6.4-.8-8.4-2.5-2-1.7-3-4.1-3-7.2 0-2.3.7-4.2 2.1-5.7 1.4-1.5 3.8-3.1 7.2-4.8 4.3-2.1 7.3-4.1 9-6 2.7-3.1 4.1-7 4.1-11.7 0-4.6-1.6-8.3-4.8-11.1-3.2-2.8-7.7-4.2-13.5-4.2-4.4 0-8.5.9-12.3 2.7v7.9z" fill="#FFF" transform="translate(14, 0)" />
      </svg>
    );
  }

  // JavaScript
  if (normalized.includes('javascript') || normalized === 'js') {
    return (
      <svg className={className} viewBox="0 0 630 630" xmlns="http://www.w3.org/2000/svg">
        <rect width="630" height="630" rx="90" fill="#F7DF1E" />
        <path d="m165.4 466.8c10.1 16.3 23.6 28.5 48.7 28.5 21.3 0 35-10.7 35-39v-193.3h51.5v194.5c0 55.4-32.9 80.5-79.8 80.5-43.2 0-67.9-22.7-81.5-50.7l26.1-20.5zm183.1-1.3c11.6 20.3 32.9 34 59.8 34 25.5 0 41.7-13.4 41.7-32.1 0-22.3-17.7-30.5-47.5-43.4l-16.3-7.1c-47-20.3-78.1-45.9-78.1-99.8 0-49.8 37.8-87.3 97.4-87.3 42.1 0 72.3 14.8 91.8 49.3l-38.3 24.6c-9.1-16.3-21.2-22.8-43.5-22.8-21.7 0-35.3 13.4-35.3 30.3 0 20.7 13.4 28.5 43.5 41.4l16.3 7.1c54.7 23.4 83.2 48.9 83.2 103.3 0 59.1-46.4 92.1-104.9 92.1-57.9 0-93.8-31-108.6-63.5l38.9-26.1z" fill="#000" />
      </svg>
    );
  }

  // Node.js
  if (normalized.includes('node')) {
    return (
      <svg className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 3l12 7v14l-12 7-12-7V10l12-7z" fill="#339933" />
        <path d="M16 6.3L6.8 11.6v10.6L16 27.5l9.2-5.3V11.6L16 6.3z" fill="#66CC33" />
        <path d="M16 11.2l-5.3 3.1v6.1l5.3 3.1 5.3-3.1v-6.1l-5.3-3.1z" fill="#FFFFFF" />
      </svg>
    );
  }

  // Vite
  if (normalized.includes('vite')) {
    return (
      <svg className={className} viewBox="0 0 410 404" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M399.641 59.5246L215.643 388.545C211.844 395.338 202.074 395.378 198.219 388.618L10.5773 59.5962C6.38087 52.2393 12.1774 43.3034 20.5099 44.0964L206.275 61.7761C207.241 61.868 208.211 61.8656 209.176 61.7688L389.652 43.6666C397.989 42.8302 403.824 51.7684 399.641 59.5246Z" fill="url(#vite-grad-1)" />
        <path d="M285.806 9.4754L155.907 242.043C153.642 246.096 147.781 245.926 145.748 241.743L87.5252 122.251C84.7072 116.468 89.2439 109.805 95.6493 110.428L276.549 128.025C282.955 128.648 287.164 121.758 284.14 116.035L228.385 10.5015C225.438 4.92429 231.109 -1.21886 236.98 0.407283L280.957 12.5937C284.095 13.463 286.721 15.6548 288.136 18.5772L285.806 9.4754Z" fill="url(#vite-grad-2)" />
        <defs>
          <linearGradient id="vite-grad-1" x1="16.5" y1="26" x2="235" y2="390" gradientUnits="userSpaceOnUse">
            <stop stopColor="#41D1FF" />
            <stop offset="1" stopColor="#BD34FE" />
          </linearGradient>
          <linearGradient id="vite-grad-2" x1="194.5" y1="8.5" x2="236.5" y2="292.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFEA83" />
            <stop offset="0.08" stopColor="#FFDD35" />
            <stop offset="1" stopColor="#FFA800" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // Tailwind CSS
  if (normalized.includes('tailwind')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" fill="#06B6D4" />
      </svg>
    );
  }

  // PostgreSQL / Neon
  if (normalized.includes('postgres') || normalized.includes('neon')) {
    return (
      <svg className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm1.2 5.5c2.3 0 4.2 1.9 4.2 4.2 0 1.2-.5 2.3-1.3 3.1.8.8 1.3 1.9 1.3 3.1 0 2.3-1.9 4.2-4.2 4.2h-3.4V7.5h3.4zm-1.8 2.4h-1.6v3.6h1.6c1 0 1.8-.8 1.8-1.8s-.8-1.8-1.8-1.8zm0 6h-1.6v3.6h1.6c1 0 1.8-.8 1.8-1.8s-.8-1.8-1.8-1.8z" fill="#336791" />
      </svg>
    );
  }

  // MongoDB
  if (normalized.includes('mongo')) {
    return (
      <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.2c-.4.4-6.6 6.8-6.6 13 0 4.3 3.3 7.8 7.3 7.8 4 0 7.3-3.5 7.3-7.8 0-6.2-6.2-12.6-6.6-13h-1.4zm.7 1.8c.8 1 5.9 7.6 5.9 11.2 0 3.3-2.6 6-5.9 6V4z" fill="#47A248" />
      </svg>
    );
  }

  // Redis
  if (normalized.includes('redis')) {
    return (
      <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.5 6.5l-9-5.2c-.3-.2-.7-.2-1 0l-9 5.2c-.3.2-.5.5-.5.8v10.4c0 .3.2.7.5.8l9 5.2c.3.2.7.2 1 0l9-5.2c.3-.2.5-.5.5-.8V7.3c0-.3-.2-.6-.5-.8zm-9.5-3.3l7.1 4.1-3 1.7-7.1-4.1 3-1.7zm-8 4.6l7 4v3.5l-7-4v-3.5zm9 13.9l-7-4v-3.5l7 4v3.5zm1-5.7l-7-4 7.1-4.1 7 4-7.1 4.1zm7-4.7l-7 4v-3.5l7-4v3.5z" fill="#DC382D" />
      </svg>
    );
  }

  // Google Gemini API / AI
  if (normalized.includes('gemini') || normalized.includes('ai')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="url(#gemini-grad)" />
        <defs>
          <linearGradient id="gemini-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1A73E8" />
            <stop offset="0.5" stopColor="#8AB4F8" />
            <stop offset="1" stopColor="#C58AF9" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // LangChain
  if (normalized.includes('langchain')) {
    return (
      <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4zm0 12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h4zm8-6a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h4z" fill="#1C3C3C" />
      </svg>
    );
  }

  // MoMo API
  if (normalized.includes('momo')) {
    return (
      <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="6" fill="#A50064" />
        <circle cx="8" cy="12" r="3" fill="#FFF" />
        <circle cx="16" cy="12" r="3" fill="#FFF" />
      </svg>
    );
  }

  // Cloudinary
  if (normalized.includes('cloudinary')) {
    return (
      <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#3448C5" />
      </svg>
    );
  }

  // Resend
  if (normalized.includes('resend') || normalized.includes('email')) {
    return (
      <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="6" fill="#000000" />
        <path d="M6 8l6 4 6-4v8H6V8zm0-1h12c.6 0 1 .4 1 1v8c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1V8c0-.6.4-1 1-1z" fill="#FFFFFF" />
      </svg>
    );
  }

  // Docker
  if (normalized.includes('docker')) {
    return (
      <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 3h2v2h-2V3zm-3 0h2v2h-2V3zm-3 3h2v2H7V6zm3 0h2v2h-2V6zm3 0h2v2h-2V6zm3 0h2v2h-2V6zm-9 3h2v2H4V9zm3 0h2v2H7V9zm3 0h2v2h-2V9zm3 0h2v2h-2V9zm3 0h2v2h-2V9zm5.5 1.5c-.4-.3-1.1-.4-1.8-.2-.3-.6-.8-1.2-1.5-1.5l-.6-.2-.4.5c-.6.9-.8 1.9-.6 2.9-.6.4-1.3.8-2.1 1.1H1c-.3 1.3 0 2.7.7 3.8 1.3 2.1 3.7 3.4 6.3 3.4 5.2 0 9.8-3.3 11.2-8.3.7.1 1.4 0 2-.4.4-.3.7-.7.8-1.1l.1-.4-.6-.2z" fill="#2496ED" />
      </svg>
    );
  }

  // Git / GitHub
  if (normalized.includes('git')) {
    return (
      <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.7 10.7l-8.4-8.4c-.9-.9-2.4-.9-3.3 0L7.5 4.8l3.6 3.6c.8-.3 1.7-.1 2.3.5.6.6.8 1.5.5 2.3l3.5 3.5c.8-.3 1.7-.1 2.3.5.9.9.9 2.4 0 3.3s-2.4.9-3.3 0c-.7-.7-.9-1.8-.5-2.6l-3.2-3.2v5.8c.4.3.7.8.7 1.4 0 1.1-.9 2-2 2s-2-.9-2-2c0-.6.3-1.1.7-1.4V9.6c-.4-.3-.7-.8-.7-1.4 0-.8.5-1.5 1.2-1.8L6.8 2.8 2.3 7.3c-.9.9-.9 2.4 0 3.3l8.4 8.4c.9.9 2.4.9 3.3 0l7.7-7.7c.9-.9.9-2.4 0-3.3z" fill="#F05032" />
      </svg>
    );
  }

  // Vercel
  if (normalized.includes('vercel')) {
    return (
      <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L24 22H0L12 2Z" fill="#000000" />
      </svg>
    );
  }

  // Postman
  if (normalized.includes('postman')) {
    return (
      <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#FF6C37" />
        <path d="M16 10l-4 4-2-2" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // WebSocket
  if (normalized.includes('websocket')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#3268D8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" opacity="0.3" />
        <circle cx="12" cy="12" r="4" fill="#3268D8" stroke="none" />
      </svg>
    );
  }

  // Default / Clean Generic Code Icon
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export function TechBadge({ tech, className = '' }: { tech: string; className?: string }) {
  return (
    <span className={`tech-badge ${className}`}>
      <span className="tech-badge-icon" aria-hidden="true">
        <TechIcon name={tech} className="w-3.5 h-3.5" />
      </span>
      <span className="tech-badge-name">{tech}</span>
    </span>
  );
}
