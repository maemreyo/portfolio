import { FC } from 'react';
import 'swiper/swiper-bundle.min.css';
import { AnimatedBlock } from '../../common/AnimatedBlock';
import Logo from '../Logo';

interface IHero {
  logo: string;
}

export const Hero: FC<IHero> = ({ logo }) => {
  return (
    <div id="hero" className="grid grid-cols-3 gap-4">
      <AnimatedBlock className="flex justify-end items-center col-span-2">
        <p className="font-mono font-semibold text-2xl subpixel-antialiased uppercase text-yellow-500">
          Hello!
        </p>
        <br />
        <br />
        <p className="font-mono font-semibold text-6xl subpixel-antialiased text-gray-200">
          I'm{' '}
          <span className="font-mono font-semibold  subpixel-antialiased text-yellow-500">
            WilliamT
          </span>
        </p>
        <br />
        <p className="font-mono font-semibold text-6xl subpixel-antialiased text-gray-200">
          A Software Developer
        </p>
      </AnimatedBlock>
      <div className="flex justify-start items-center">
        <AnimatedBlock className="p-[170px]">
          <Logo image={logo} />
        </AnimatedBlock>
      </div>
    </div>
  );
};
