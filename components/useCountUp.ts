import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/* Counts from 0 to `to` once `active` is true (e.g. scrolled into view),
   ease-out cubic over `duration` seconds. Respects reduced motion by jumping
   straight to the target. All setState happens inside the rAF callback (async),
   not synchronously in the effect body, to satisfy the set-state-in-effect rule. */
export function useCountUp(to: number, active: boolean, duration = 0.8) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    const durationMs = reduced ? 0 : duration * 1000;
    let raf = 0;
    let start = 0;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = durationMs === 0 ? 1 : Math.min((ts - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, to, duration, reduced]);

  return value;
}
