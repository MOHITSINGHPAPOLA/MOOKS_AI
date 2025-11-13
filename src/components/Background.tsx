import { useEffect } from "react";

export const Background = () => {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
      {/* Global hero-grade gradient base across entire page */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'var(--gradient-hero)'
        }}
      />
      {/* Central glow + vignette to match hero look across full page */}
      <div className="absolute inset-0" style={{
        background: `radial-gradient(900px 600px at 50% 40%, hsl(210 60% 88% / 0.10) 0%, transparent 65%)`
      }} />
      <div className="absolute inset-0" style={{
        background: `radial-gradient(closest-side at 50% 55%, transparent 65%, hsl(220 30% 4% / 0.35) 100%)`
      }} />
      {/* Subtle diagonal sheen for depth */}
      <div className="absolute inset-0 opacity-[0.12]" style={{
        background: `linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.06) 40%, transparent 60%)`
      }} />
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(var(--foreground)/0.25) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Soft radial glows with motion and parallax */}
      <div className="parallax-1 absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-primary/22 blur-[120px] animate-bg-float" />
      <div className="parallax-2 absolute top-1/3 -right-24 h-[520px] w-[520px] rounded-full bg-secondary/22 blur-[140px] animate-bg-float-slow" />
      <div className="parallax-3 absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full bg-accent/18 blur-[120px] animate-bg-pulse" />

      <style>{`
        @keyframes bg-float {
          0% { transform: translate3d(0,0,0); }
          100% { transform: translate3d(18px,-12px,0); }
        }
        @keyframes bg-float-slow {
          0% { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-16px,12px,0); }
        }
        @keyframes bg-pulse {
          0%,100% { opacity: 0.22; transform: scale(1); }
          50% { opacity: 0.32; transform: scale(1.05); }
        }
        .animate-bg-float { animation: bg-float 16s ease-in-out infinite alternate; }
        .animate-bg-float-slow { animation: bg-float-slow 22s ease-in-out infinite alternate; }
        .animate-bg-pulse { animation: bg-pulse 14s ease-in-out infinite; }
        .parallax-1, .parallax-2, .parallax-3 { will-change: transform; }
      `}</style>
      {/* Mouse parallax */}
      <ParallaxScript />
    </div>
  );
};

const ParallaxScript = () => {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const px = (e.clientX / innerWidth) * 2 - 1;
      const py = (e.clientY / innerHeight) * 2 - 1;
      const l1 = document.querySelector<HTMLElement>(".parallax-1");
      const l2 = document.querySelector<HTMLElement>(".parallax-2");
      const l3 = document.querySelector<HTMLElement>(".parallax-3");
      if (l1) l1.style.transform = `translate3d(${px * 24}px, ${py * 20}px, 0)`;
      if (l2) l2.style.transform = `translate3d(${px * -20}px, ${py * 16}px, 0)`;
      if (l3) l3.style.transform = `translate3d(${px * 14}px, ${py * -12}px, 0)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return null;
};

export default Background;


