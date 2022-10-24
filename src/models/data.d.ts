export interface UserData {
  profile: Profile;
  socialMedia: SocialMedia;
  work: Work;
  resume: Resume[];
  images: Images;
}

export interface Profile {
  name: string;
  nickname: string;
  dob: string;
  address: string;
  zipCode: number;
  email: string;
  phone: string;
  hobbies: string[];
}

export interface SocialMedia {
  facebook: string;
  instagram: string;
  linkedin: string;
  github: string;
}

export interface Work {
  role: string;
  position: string;
}

export interface Resume {
  type: ResumeType;
  fromDate: string;
  toDate: string;
  role: string;
  organization: Organization;
  location: string;
  description: string[];
  projects: Project[];
  accquiredKnowledge: AccquiredKnowledge[];
}

export enum ResumeType {
  LEARNING = "learning",
  WORKING = "working",
}

export interface Organization {
  name: string;
  link: string;
}

export interface Project {
  name: string;
  description: string;
  responsibility: string;
  technologies: string[];
}

export interface AccquiredKnowledge {
  name: string;
  level: Level;
  isNew: boolean;
}

export enum Level {
  BEGINNER = "beginner",
  HIGH_BEGINNER = "high beginner",
  LOW_INTERMEDIATE = "low intermediate",
  INTERMEDIATE = "intermediate",
  HIGH_INTERMEDIATE = "high intermediate",
  LOW_ADVANCED = "low advanced",
  ADVANCED = "advanced",
}

export interface Images {
  logo: string;
  about: string;
  projects: string[];
}
