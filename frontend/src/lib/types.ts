export interface Profile {
  name: string;
  headline: string;
  introduction: string;
  biography: string;
  location: string;
  availability: string;
  skills: string[];
  githubUrl: string;
  linkedinUrl: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  role: string;
  year: number;
  technologies: string[];
  problem: string;
  approach: string;
  outcome: string;
  coverUrl: string;
  liveUrl: string;
  sourceUrl: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: 'unread' | 'read' | 'archived';
  delivery: 'pending' | 'sent' | 'failed';
  createdAt: string;
}

// Editorial defaults describe this portfolio, without invented work history.
export const defaultProfile: Profile = {
  name: 'NH HUYNH',
  headline: 'Thoughtful interfaces. Dependable engineering.',
  introduction: 'Bringing design and development together to build clear, considered experiences for the web.',
  biography: 'Good software starts with understanding people. My approach connects thoughtful interaction design with straightforward, maintainable engineering — from the first idea to the final detail.',
  location: '',
  availability: '',
  skills: ['Next.js', 'React', 'TypeScript', 'Node.js', 'MongoDB', 'UI / UX'],
  githubUrl: '',
  linkedinUrl: '',
};
