// Types for Personal Information
export interface Location {
  city: string;
  country: string;
}

export interface Contact {
  email: string;
  phone: string;
  preferredContactMethod: string[];
}

export interface Link {
  platform: string;
  url: string;
  username?: string;
}

export interface Language {
  language: string;
  proficiency: string;
}

export interface PersonalInfo {
  fullName: string;
  displayName?: string;
  title: string;
  motto: string;
  location: Location;
  contact: Contact;
  links: Link[];
  photoUrl: string | null;
  logoUrl?: string;
  coverImage?: string;
  languages: Language[];
}

// Types for Profile Summary
export interface ProfileSummary {
  fullText: string;
  keywords: string[];
  yearsOfExperience: number;
  elevatorPitch: string;
  keyStrengths: string[];
  secondaryImage?: string;
}

// Types for Key Highlights
export interface KeyHighlight {
  area: string;
  highlight: string;
  impact: string;
  skillsDemonstrated: string[];
}

// Types for Education
export interface Education {
  degree: string;
  degreeType: string;
  major: string;
  institution: string;
  location: Location;
  startDate: string;
  endDate: string;
  graduationStatus: string;
  honors: string | null;
  gpa: number | null;
  relevantCoursework: string[];
  thesisTitle: string | null;
}

// Types for Work Experience
export interface Achievement {
  description: string;
  metric: string;
  quantification: string;
  skillsApplied: string[];
}

export interface Technologies {
  frontend?: string[];
  backend?: string[];
  stateManagement?: string[];
  uiLibraries?: string[];
  databases?: string[];
  devOps?: string[];
  concepts?: string[];
  collaborationTools?: string[];
  testing?: string[];
  other?: string[];
}

export interface Project {
  projectName: string;
  projectDescription: string;
  projectType: string[];
  roleWithinProject: string;
  responsibilities: string[];
  keyContributions: string[];
  achievements: Achievement[];
  challengesFaced: string[];
  technicalDecisions: string[];
  impactStatement: string;
  technologiesUsed: Technologies;
  teamSize?: number | null;
  teamComposition?: string | null;
}

export interface WorkExperience {
  jobTitle: string;
  companyName: string;
  location: Location;
  startDate: string;
  endDate: string;
  employmentType: string;
  companyWebsite: string;
  companyIndustry: string;
  companyLogo?: string;
  projects: Project[];
}

// Types for Skills
export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Skill {
  name: string;
  level: number;
  years: number;
  yearsOfExperience?: number;
  category: string;
  keywords?: string[];
  description?: string;
  projectHighlights: string[];
  specificApplications: string[];
}

// Types for Contributions and Activities
export interface ContributionActivity {
  type: string;
  name: string;
  description: string;
  url?: string;
  date?: string;
  organization?: string;
  role?: string;
  impact?: string;
}

// Types for Interests
export interface Interest {
  category: string;
  items: string[];
  description?: string;
}

// Main Portfolio Data Type
export interface PortfolioData {
  personalInfo: PersonalInfo;
  profileSummary: ProfileSummary;
  keyHighlights: KeyHighlight[];
  education: Education[];
  workExperience: WorkExperience[];
  skills?: Skill[];
  skillCategories?: SkillCategory[];
  contributionsAndActivities?: ContributionActivity[];
  interests?: Interest[];
}