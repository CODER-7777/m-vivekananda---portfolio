export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  score: string;
  board?: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'Languages' | 'Frameworks/Libraries' | 'Software/Tools' | 'Operating Systems';
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  period?: string;
  description: string[];
  techStack: string[];
  link?: string;
  image?: string;
}

export interface Leadership {
  id: string;
  role: string;
  organization: string;
  period: string;
}

export interface Certification {
  name: string;
  link: string;
}

export interface ArtworkItem {
  id: string;
  title: string;
  type: 'video' | 'image';
  url: string; // URL to the video or image
  thumbnail?: string;
  description?: string;
}

export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  about: string;
  education: Education[];
  experiences: Experience[];
  skills: Skill[];
  projects: Project[];
  leadership: Leadership[];
  certifications: Certification[];
  artwork: ArtworkItem[];
  socials: {
    linkedin: string;
    github: string;
    email: string | string[];
    phone: string;
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}