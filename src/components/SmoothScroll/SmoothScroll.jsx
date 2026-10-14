import { useEffect } from "react";
import Lenis from "lenis";

import { registerLenis } from "../../lib/lenis";

const DESKTOP_WHEEL_QUERY = "(hover: hover) and (pointer: fine)";

function SmoothScroll() {
  useEffect(() => {
    const desktopWheelMedia = window.matchMedia(DESKTOP_WHEEL_QUERY);
    let lenis = null;
    let unregisterLenis = null;

    const destroyLenis = () => {
      unregisterLenis?.();
      unregisterLenis = null;
      lenis?.destroy();
      lenis = null;
    };

    const syncLenis = () => {
      if (!desktopWheelMedia.matches) {
        destroyLenis();
        return;
      }

      if (lenis) return;

      try {
        lenis = new Lenis({
          autoRaf: true,
          smoothWheel: true,
          syncTouch: false,
          lerp: 0.12,
          anchors: true,
          respectReducedMotion: true,
        });
        unregisterLenis = registerLenis(lenis);
      } catch {
        destroyLenis();
      }
    };

    syncLenis();
    desktopWheelMedia.addEventListener("change", syncLenis);

    return () => {
      desktopWheelMedia.removeEventListener("change", syncLenis);
      destroyLenis();
    };
  }, []);

  return null;
}

export default SmoothScroll;
