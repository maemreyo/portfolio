import { FC } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProgressBar {}

export const ProgressBar: FC<IProgressBar> = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return <motion.div className="progress-bar" style={{ scaleX }} />;
};
