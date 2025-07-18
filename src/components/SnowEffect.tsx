import { useEffect, useState } from "react";

interface SnowEffectProps {
  readonly snowCount?: number;
  readonly snowColor?: string;
  readonly snowShadowColor?: string;
  readonly zIndex?: string;
}

export default function SnowEffect({
  snowCount = 100,
  snowColor = "black",
  snowShadowColor = "black",
  zIndex = "0",
}: SnowEffectProps) {
  const [animations, setAnimations] = useState<string[]>([]);

  useEffect(() => {
    const snowContainer = document.getElementById("snow-container");
    if (!snowContainer) return;

    const animRules: string[] = [];

    for (let i = 0; i < snowCount; i++) {
      const snowflake = document.createElement("div");
      snowflake.classList.add("snow");

      const size = Math.random() * 6 + 4;
      const left = Math.random() * 100;
      const deltaX = (Math.random() - 0.5) * 40;
      const deltaY = Math.random() * 120 + 80;
      const duration = Math.random() * 10 + 5;
      const delay = Math.random() * 5;
      const opacity = Math.random() * 0.5 + 0.3;

      const animName = `fall${i}`;

      animRules.push(`
        @keyframes ${animName} {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(${deltaX}vw, ${deltaY}vh);
          }
        }
      `);

      Object.assign(snowflake.style, {
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}vw`,
        top: `-10px`,
        opacity: `${opacity}`,
        animation: `${animName} ${duration}s linear ${delay}s infinite`,
        position: "absolute",
        backgroundColor: snowColor,
        borderRadius: "50%",
        filter: `drop-shadow(0 0 10px ${snowShadowColor})`,
        pointerEvents: "none",
        zIndex: zIndex,
      });

      snowContainer.appendChild(snowflake);
    }

    setAnimations(animRules);

    return () => {
      snowContainer.innerHTML = "";
    };
  }, [snowCount, snowColor, snowShadowColor, zIndex]);

  return (
    <>
      <div id="snow-container" className="max-h-screen"></div>
      <style>{animations.join("\n")}</style>
    </>
  );
}
