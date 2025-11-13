import { PropsWithChildren, useRef } from "react";

interface TiltProps {
  maxTiltDeg?: number;
  scale?: number;
  className?: string;
}

export const Tilt = ({ children, maxTiltDeg = 8, scale = 1.02, className }: PropsWithChildren<TiltProps>) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 2 - 1; // -1 to 1
    const py = (y / rect.height) * 2 - 1; // -1 to 1
    const rx = (-py * maxTiltDeg).toFixed(2);
    const ry = (px * maxTiltDeg).toFixed(2);
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)`;
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{
        transition: "transform 350ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 350ms",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};

export default Tilt;


