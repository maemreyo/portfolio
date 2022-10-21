export interface Banner {
  id: number;
  content: string[];
  image: string;
  description: string;
}

export const banner: Banner = {
  id: 1,
  content: ['Hello!', "I'm WilliamTee", 'A Software Developer'],
  image: 'assets/logo.jpg',
  description: 'Hero banner 1'
};
