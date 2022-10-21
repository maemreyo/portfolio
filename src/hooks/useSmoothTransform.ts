/* eslint-disable @typescript-eslint/no-explicit-any */
import { MotionValue, useSpring, useTransform } from "framer-motion";
import { SpringOptions } from "popmotion";

export function useSmoothTransform(
  value: MotionValue<unknown>,
  springOptions: SpringOptions | undefined,
  transformer: {
    (x: any): number;
    (y: any): number;
    (v: any): number;
    (v: any): number;
    (input: unknown): any;
  }
) {
  return useSpring(useTransform(value, transformer), springOptions);
}
