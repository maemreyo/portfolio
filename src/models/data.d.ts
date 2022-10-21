export interface UserData {
  profile: Profile;
  socialMedia: SocialMedia;
  work: Work;
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

export interface Images {
  logo: string;
  about: string;
  projects: string[];
}
