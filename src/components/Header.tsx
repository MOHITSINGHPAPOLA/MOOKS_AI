import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export const Header = () => {
  return (
    <header id="top" className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary grid place-items-center shadow-md overflow-hidden">
            <img
              src="/mooks_ai.svg"
              alt="MOOKS_AI logo"
              className="h-full w-full object-contain"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <NavLink to="/" className="text-lg font-bold tracking-tight">
            MOOKS_AI
          </NavLink>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm" />

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex bg-gradient-to-b from-white/10 to-white/0 hover:from-white/20 hover:to-white/5 shadow-sm border border-white/10">
            <a href="#">Home</a>
          </Button>
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex bg-gradient-to-b from-white/10 to-white/0 hover:from-primary/20 hover:to-secondary/10 border-white/10 shadow-md">
            <a href="#search">Get Started</a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

