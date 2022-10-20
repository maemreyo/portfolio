// 👇️ ts-nocheck disables type checking for entire file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { motion } from 'framer-motion';
import { FC, ReactElement } from 'react';

interface IMenuToggle {
  toggle: () => void;
}

const Path: FC<ReactElement> = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

export const MenuToggle: FC<IMenuToggle> = ({ toggle }) => (
  <button onClick={toggle}>
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' }
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 }
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' }
        }}
      />
    </svg>
  </button>
);
