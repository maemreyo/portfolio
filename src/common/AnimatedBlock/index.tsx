import { useInView } from 'framer-motion';
import { FC, useRef } from 'react';

export interface IAnimatedBlock {
  className: string;
  children?: JSX.Element[] | JSX.Element | undefined;
}

export const AnimatedBlock: FC<IAnimatedBlock> = ({ className, children, ...rest }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <div ref={ref} className={className} {...rest}>
      <div
        style={{
          transform: isInView ? 'none' : 'translateX(-200px)',
          opacity: isInView ? 1 : 0,
          transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s'
        }}
      >
        {children}
      </div>
    </div>
  );
};
