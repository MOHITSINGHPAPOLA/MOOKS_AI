import { PropsWithChildren } from "react";

const Face = ({ children, className = "" }: PropsWithChildren<{ className?: string }>) => (
  <div className={`absolute inset-0 grid place-items-center rounded-2xl backdrop-blur-md border border-white/10 bg-card/70 shadow-xl ${className}`}>{children}</div>
);

export const CubeGallery = () => {
  return (
    <section className="relative py-14">
      <div className="container">
        <div className="mx-auto h-[260px] w-[260px] md:h-[320px] md:w-[320px] perspective-1000">
          <div className="cube relative h-full w-full m-auto transform-style-3d animate-cube-spin will-change-transform">
            <Face className="cube-face cube-front">Explore</Face>
            <Face className="cube-face cube-back">Inspire</Face>
            <Face className="cube-face cube-right">Movies</Face>
            <Face className="cube-face cube-left">Books</Face>
            <Face className="cube-face cube-top">MOOKS_AI</Face>
            <Face className="cube-face cube-bottom">Create</Face>
          </div>
        </div>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .cube-face { font-weight: 800; font-size: 24px; letter-spacing: 0.02em; }
        .cube { transition: transform 600ms cubic-bezier(0.16,1,0.3,1); }
        .cube:hover { animation-play-state: paused; }

        /* Faces positioned in 3D space */
        .cube-front  { transform: translateZ(130px); }
        .cube-back   { transform: rotateY(180deg) translateZ(130px); }
        .cube-right  { transform: rotateY(90deg) translateZ(130px); }
        .cube-left   { transform: rotateY(-90deg) translateZ(130px); }
        .cube-top    { transform: rotateX(90deg) translateZ(130px); }
        .cube-bottom { transform: rotateX(-90deg) translateZ(130px); }

        @keyframes cube-spin {
          0%   { transform: rotateX(0deg) rotateY(0deg); }
          25%  { transform: rotateX(0deg) rotateY(90deg); }
          50%  { transform: rotateX(90deg) rotateY(90deg); }
          75%  { transform: rotateX(90deg) rotateY(180deg); }
          100% { transform: rotateX(0deg) rotateY(360deg); }
        }
        .animate-cube-spin { animation: cube-spin 16s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-cube-spin { animation: none; }
        }
      `}</style>
    </section>
  );
};

export default CubeGallery;


