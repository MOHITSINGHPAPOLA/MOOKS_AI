export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/50 mt-20">
      <div className="container py-6 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-foreground font-semibold">MOOKS_AI</span>
          <span>© {year}</span>
        </div>
        <nav className="flex flex-wrap items-center gap-3 md:gap-5">
          <a href="#" className="hover:text-foreground transition-colors">About</a>
          <span className="opacity-40">•</span>
          <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          <span className="opacity-40">•</span>
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <span className="opacity-40">•</span>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;


