export interface Banner {
  id: number;
  content: string[];
  image: string;
  description: string;
}

export const banners: Banner[] = [
  {
    id: 1,
    content: ['Hello!', "I'm WilliamTee", 'A Software Developer'],
    image: 'assets/logo.jpg',
    description: 'Hero banner 1'
  },
  {
    id: 2,
    content: ['Hello!', "I'm Frontend Developer based in Hanoi"],
    image: 'assets/bg_2.png',
    description: 'Hero banner 2'
  }
];
