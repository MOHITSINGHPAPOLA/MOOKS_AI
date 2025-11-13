import { Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden px-4 py-24">
      {/* Grain texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.02]" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 mb-10 animate-fade-in hover:bg-white/10 transition-all duration-300 shadow-xl">
          <Sparkles className="w-4 h-4 text-accent animate-spin-slow" />
          <span className="text-sm font-semibold tracking-wide">AI-Powered Recommendations</span>
        </div>

        <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-8 tracking-tighter animate-fade-in-up leading-[0.9] text-3d">
          Discover Your Next
          <br />
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent inline-block animate-gradient-shift text-3d-strong">
            Favorite Story
          </span>
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl text-foreground/90 mb-12 max-w-3xl mx-auto animate-fade-in-up delay-200 leading-relaxed font-light">
          Get personalized movie and book recommendations powered by advanced AI. 
          Tell us what you love, and we'll find your perfect match.
        </p>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-move 4s ease infinite;
        }
        .delay-200 { animation-delay: 0.2s; animation-fill-mode: backwards; }
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        /* 3D readable text treatments */
        .text-3d {
          text-shadow:
            0 1px 0 hsl(var(--background)/0.45),
            0 2px 4px hsl(220 50% 2% / 0.55),
            0 6px 18px hsl(220 60% 2% / 0.45);
        }
        .text-3d-strong {
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke: 0.6px hsla(0,0%,100%,0.35);
          text-shadow:
            0 1px 0 hsl(var(--background)/0.4),
            0 6px 18px hsla(220, 50%, 2%, 0.45),
            0 18px 40px hsla(220, 60%, 2%, 0.4);
        }
      `}</style>
    </section>
  );
};

export default Hero;


