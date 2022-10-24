import { FC } from "react";
import "swiper/swiper-bundle.min.css";
import { AnimatedBlock } from "../../common/AnimatedBlock";
import { TransitionArray } from "../../common/TransitionArray";
import Logo from "../Logo";

interface IHero {
  logo: string;
}

export const Hero: FC<IHero> = ({ logo }) => {
  return (
    <div id="hero" className="section grid grid-cols-3 gap-4">
      <AnimatedBlock className="flex items-center lg:col-span-2 md:col-span-3 md:row-start-1">
        <p className="font-mono font-semibold text-2xl subpixel-antialiased uppercase text-yellow-500">
          Hello!
        </p>
        <br />
        <br />
        <p className="font-mono font-semibold text-6xl subpixel-antialiased text-gray-200">
          I'm{" "}
          <span className="font-mono font-semibold  subpixel-antialiased text-yellow-500">
            <TransitionArray />
          </span>
        </p>
        <br />
        <p className="font-mono font-semibold text-6xl subpixel-antialiased text-gray-200">
          A Software Developer
        </p>
      </AnimatedBlock>
      <div className="flex justify-start items-center lg:col-span-1 md:col-span-3 md:row-start-0">
        <AnimatedBlock className="p-12">
          <Logo image={logo} />
        </AnimatedBlock>
      </div>
    </div>
  );
};
