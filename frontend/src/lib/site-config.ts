/**
 * Centralized SEO & Brand Configuration for Nguyễn Hoàng Huynh Portfolio
 * Optimized for Google Knowledge Graph, Search Engine Dominance, and Social Share Previews
 */

export function getSiteUrl(): string {
  // Priority 1: User explicitly configured domain in environment
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.APP_URL ||
    process.env.URL;

  if (raw && !raw.includes('localhost') && !raw.includes('127.0.0.1')) {
    return raw.replace(/\/$/, '');
  }

  // Priority 2: Production Netlify or canonical fallback
  if (process.env.NODE_ENV === 'production') {
    return (raw || 'https://huynhportfolio.netlify.app').replace(/\/$/, '');
  }

  // Local development default
  return raw ? raw.replace(/\/$/, '') : 'http://localhost:3000';
}

export const siteConfig = {
  name: 'Nguyễn Hoàng Huynh',
  alternateNames: [
    'Nguyen Hoang Huynh',
    'HuynhNe26',
    'NH HUYNH',
    'Hoàng Huynh',
    'Nguyen Hoang Huynh Developer',
    'Huynh Nguyễn',
  ],
  title: 'Nguyễn Hoàng Huynh — Full-Stack Web Developer & Software Engineer | Portfolio',
  shortTitle: 'NH HUYNH | Full-Stack Web Developer',
  headline: 'Full-Stack Web Developer & AI Agentic RAG Engineer',
  description:
    'Hồ sơ kỹ thuật và portfolio chính thức của Nguyễn Hoàng Huynh — Sinh viên Công nghệ thông tin Học viện Hàng không Việt Nam (VAA), Full-Stack Web Developer chuyên sâu Next.js 16, React, Node.js, AI Agentic RAG, PostgreSQL (Neon) và Scrollytelling trực quan.',
  descriptionEn:
    'Official portfolio of Nguyễn Hoàng Huynh — Information Technology student at Vietnam Aviation Academy (VAA), Full-Stack Web Developer specializing in Next.js 16, React, Node.js, Agentic RAG AI systems, PostgreSQL (Neon), and interactive engineering case studies.',
  url: getSiteUrl(),
  ogImage: '/og-image.png',
  locale: 'vi_VN',
  alternateLocales: ['en_US'],
  author: {
    name: 'Nguyễn Hoàng Huynh',
    asciiName: 'Nguyen Hoang Huynh',
    url: 'https://github.com/HuynhNe26',
    email: 'nguyenhoanghuynh.vn@gmail.com',
    phone: '+84 937 569 205',
    github: 'https://github.com/HuynhNe26',
    repo: 'https://github.com/HuynhNe26/HuynhPortfolio',
    role: 'Full-Stack Web Developer & Software Engineer',
    university: 'Học viện Hàng không Việt Nam (Vietnam Aviation Academy)',
    major: 'Information Technology (Công nghệ thông tin)',
    gpa: '3.1 / 4.0',
    hometown: 'Đồng Nai, Việt Nam',
    location: 'Thành phố Hồ Chí Minh & Đồng Nai, Việt Nam',
    availability: 'Available for Full-Stack Intern, Fresher & Junior roles',
    avatar: '/avatar.jpg',
  },
  keywords: [
    // Brand & Personal Names
    'Nguyễn Hoàng Huynh',
    'Nguyen Hoang Huynh',
    'HuynhNe26',
    'NH HUYNH',
    'Hoàng Huynh',
    'Nguyen Hoang Huynh developer',
    'Nguyen Hoang Huynh portfolio',
    'Nguyễn Hoàng Huynh portfolio',
    'Huynh Nguyễn portfolio',
    'HuynhNe26 GitHub',

    // Academic & University
    'Nguyễn Hoàng Huynh Học viện Hàng không',
    'Nguyễn Hoàng Huynh VAA',
    'Học viện Hàng không Việt Nam',
    'Vietnam Aviation Academy',
    'VAA Information Technology',
    'Sinh viên CNTT Học viện Hàng không',

    // Roles & Titles
    'Full-Stack Web Developer',
    'Full-Stack Developer Vietnam',
    'Software Engineer Vietnam',
    'Lập trình viên Full-Stack',
    'Lập trình viên Web',
    'Frontend Developer React Next.js',
    'Backend Developer Node.js',
    'Fresher Full-Stack Developer',
    'Junior Web Developer',

    // Core Technologies
    'Next.js 16',
    'React 19',
    'TypeScript',
    'Node.js',
    'Agentic RAG',
    'LangChain.js',
    'Google Gemini API',
    'PostgreSQL Neon',
    'MongoDB Atlas',
    'Redis Geo',
    'Docker',
    'Tailwind CSS',
    'WebSocket',
    'Resend API',
    'Scrollytelling Web',

    // Projects (SEO keyword anchoring for direct project search)
    'Ticket Concert Support System Based on Agentic RAG',
    'ticket concert agentic rag',
    'ticketconcert online',
    'Fashion Nail Morley',
    'fashion nail morley landing page',
    'fashionnailmorley com au',
    'ExamPlatform AI',
    'exam platform online',
    'VK Digital Hub',
    'vkdigitalhub netlify app',
    'SkyRoute Dispatcher Real-Time Flight Operations',
    'skyroute aviation ops',
    'aviaops online',
    'MediCare AI Smart Telehealth Clinical Decision',
    'medicare ai triage',
    'medicare-ai health',
    'NH HUYNH Portfolio Scrollytelling',
  ],
};
