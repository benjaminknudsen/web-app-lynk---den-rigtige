import { useEffect, useRef } from "react";
import lottie from "lottie-web";

export default function LottieCanvas({
  animationData,
  className,
  loop = true,
  autoplay = true,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    let animation = null;

    try {
      animation = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "canvas",
        loop,
        autoplay,
        animationData,
      });
    } catch {
      return undefined;
    }

    return () => {
      animation?.destroy();
    };
  }, [animationData, autoplay, loop]);

  return <div ref={containerRef} className={className} aria-hidden="true" />;
}
