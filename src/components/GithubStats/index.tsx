import { CSSProperties, useEffect, useState } from "react";
import {
  useTransition,
  animated,
  AnimatedProps,
  useSpringRef,
} from "react-spring";

// import styles from "./styles.module.css";

const pages: ((
  props: AnimatedProps<{ style: CSSProperties }>
) => React.ReactElement)[] = [
  ({ style }) => (
    <animated.div style={{ ...style, background: "lightpink" }}>A</animated.div>
  ),
  ({ style }) => (
    <animated.div style={{ ...style, background: "lightblue" }}>B</animated.div>
  ),
  ({ style }) => (
    <animated.div style={{ ...style, background: "lightgreen" }}>
      C
    </animated.div>
  ),
];
/**
 * Follow this link: https://github.com/anuraghazra/github-readme-stats
 * to generate markdowns.
 */

export const GithubStats = () => {
  const [index, set] = useState(0);
  const onClick = () => set((state) => (state + 1) % 3);
  const transRef = useSpringRef();
  const transitions = useTransition(index, {
    ref: transRef,
    keys: null,
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
  });
  useEffect(() => {
    transRef.start();
  }, [index]);
  return (
    <div id="github-stats" className="mt-24">
      <div className="relative col-span-10 col-start-2 text-center mb-12">
        <h1 className="text-center absolute top-0 left-0 right-0 text-[11vh] text-[#ffffff1a] -z-50 font-[900]">
          Github
        </h1>
        <h2 className="text-[50px] text-white font-[700] mb-[1.5rem]">
          Github
        </h2>
        <p>This is what I did on Github.</p>
      </div>
      <div className="flex flex-col container">
        <div className="flex justify-around">
          <img
            src={`${process.env.REACT_APP_GIT_STATS}?username=maemreyo&show_icons=true&theme=nightowl`}
          />
          <img
            src={`${process.env.REACT_APP_GIT_STREAK}?user=maemreyo&theme=nightowl`}
          />
        </div>
        <div className="flex justify-around">
          <img
            src={`${process.env.REACT_APP_GIT_STATS}/top-langs/?username=maemreyo&langs_count=6&hide=rust&layout=compact`}
          />
          {/* <img
            src={`${process.env.REACT_APP_GIT_STATS}/wakatime?username=maemreyo`}
          /> */}
        </div>
      </div>
      {/* <a href="https://wakatime.com/@8139720f-ed2a-4189-bfd3-f0c95d1191dc">
        <img
          src="https://wakatime.com/badge/user/8139720f-ed2a-4189-bfd3-f0c95d1191dc.svg"
          alt="Total time coded since Oct 25 2022"
        />
      </a> */}
      <div
        className="flex fill cursor-pointer absolute w-full h-full justify-content-center items-center text-white font-bold text-[25em]  select-none"
        style={{ willChange: "transform opacity" }}
        onClick={onClick}
      >
        {transitions((style, i) => {
          const Page = pages[i];
          return <Page style={style} />;
        })}
      </div>
    </div>
  );
};
