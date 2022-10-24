import { useInView } from "framer-motion";
import { FC, useRef } from "react";
import { Animation } from "./animations";
export interface IAnimatedBlock {
  className: string;
  children?: JSX.Element[] | JSX.Element | undefined;
  animation?: Animation;
}

export const AnimatedBlock: FC<IAnimatedBlock> = ({
  className,
  children,
  animation = Animation.ltr,
  ...rest
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className={className} {...rest}>
      <div
        style={{
          transform: isInView ? "none" : animation,
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}
      >
        {children}
      </div>
    </div>
  );
};
