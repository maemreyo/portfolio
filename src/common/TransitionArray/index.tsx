/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { FC, useEffect, useState } from "react";
import { useTransition, animated, config } from "react-spring";

const NUM_TRANS = [
  {
    fig: "W",
    op: { range: [0.75, 1], output: [0, 1] },
    trans: {
      range: [0.75, 1],
      output: [-80, 0],
      extrapolate: "clamp",
    },
  },
  {
    fig: "i",
    op: {
      range: [0.25, 0.5],
      output: [0, 1],
    },
    trans: {
      range: [0.25, 0.5],
      output: [-70, 0],
      extrapolate: "clamp",
    },
  },
  {
    fig: "l",
    op: {
      range: [0, 0.25],
      output: [0, 1],
    },
    trans: {
      range: [0, 0.25],
      output: [-60, 0],
      extrapolate: "clamp",
    },
  },
  {
    fig: "l",
    op: {
      range: [0.5, 0.75],
      output: [0, 1],
    },
    trans: {
      range: [0.5, 0.75],
      output: [-50, 0],
      extrapolate: "clamp",
    },
  },
  {
    fig: "i",
    op: { range: [0.75, 1], output: [0, 1] },
    trans: {
      range: [0.75, 1],
      output: [-40, 0],
      extrapolate: "clamp",
    },
  },
  {
    fig: "a",
    op: {
      range: [0.25, 0.5],
      output: [0, 1],
    },
    trans: {
      range: [0.25, 0.5],
      output: [-40, 0],
      extrapolate: "clamp",
    },
  },
  {
    fig: "m",
    op: {
      range: [0, 0.25],
      output: [0, 1],
    },
    trans: {
      range: [0, 0.25],
      output: [-40, 0],
      extrapolate: "clamp",
    },
  },
  {
    fig: "T",
    op: {
      range: [0.5, 0.75],
      output: [0, 1],
    },
    trans: {
      range: [0.5, 0.75],
      output: [-40, 0],
      extrapolate: "clamp",
    },
  },
];
export const TransitionArray: FC = () => {
  const [items, setItems] = useState(NUM_TRANS);

  const transitions = useTransition(items, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    delay: 200,
    config: config.molasses,
    onRest: () => setItems([]),
  });

  useEffect(() => {
    if (items.length === 0) {
      setTimeout(() => {
        setItems(NUM_TRANS);
      }, 2000);
    }
  }, [items]);

  return (
    <div style={{ display: "inline-flex" }}>
      {transitions(({ opacity }, item) => (
        <animated.div
          style={{
            opacity: opacity.to(item.op),
            transform: opacity
              .to(item.trans)
              .to((y) => `translate3d(0,${y}px,0)`),
          }}
        >
          {item.fig}
        </animated.div>
      ))}
    </div>
  );
};
