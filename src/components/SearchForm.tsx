import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BookOpen, Film, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MOVIE_GENRES = [
  "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary",
  "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", "Thriller"
];

const BOOK_GENRES = [
  "Fiction", "Non-Fiction", "Mystery", "Thriller", "Romance", "Sci-Fi",
  "Fantasy", "Horror", "Biography", "History", "Self-Help", "Poetry"
];

const MOODS = [
  "Uplifting", "Dark", "Thrilling", "Romantic", "Thoughtful",
  "Funny", "Emotional", "Suspenseful", "Lighthearted", "Intense"
];

interface SearchFormProps {
  contentType: 'movie' | 'book';
  onContentTypeChange: (type: 'movie' | 'book') => void;
  onSearch: (data: {
    genres: string[];
    mood: string;
    favorites: string;
    additionalNotes: string;
  }) => void;
}

export const SearchForm = ({ contentType, onContentTypeChange, onSearch }: SearchFormProps) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [mood, setMood] = useState("");
  const [favorites, setFavorites] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const genres = contentType === 'movie' ? MOVIE_GENRES : BOOK_GENRES;

  const handleSwitch = (type: 'movie' | 'book') => {
    if (type === contentType) return;
    onContentTypeChange(type);
    // Smoothly ensure the form stays in view and communicates the switch
    const el = document.getElementById('search');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      genres: selectedGenres,
      mood,
      favorites,
      additionalNotes,
    });
  };

  return (
    <section className="relative py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section divider */}
        <div className="mx-auto mb-12 h-[2px] w-24 bg-gradient-to-r from-primary via-secondary to-accent rounded-full" />
        {/* Content Type Toggle */}
        <div className="relative inline-flex mx-auto w-auto justify-center p-2 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 mb-16 overflow-hidden">
          {/* Active slider */}
          <span
            className={`absolute top-2 bottom-2 rounded-xl bg-white/5 border border-white/10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${contentType === 'book' ? 'left-1/2 right-2' : 'left-2 right-1/2'}`}
            aria-hidden
          />
          <Button
            type="button"
            onClick={() => handleSwitch('movie')}
            variant={contentType === 'movie' ? 'default' : 'ghost'}
            size="lg"
            className={`relative z-10 flex items-center gap-2 min-w-[150px] transition-all duration-300 ${
              contentType === 'movie' 
                ? 'bg-primary text-primary-foreground shadow-lg scale-105' 
                : 'hover:bg-muted/50'
            }`}
          >
            <Film className="w-5 h-5" />
            Movies
          </Button>
          <Button
            type="button"
            onClick={() => handleSwitch('book')}
            variant={contentType === 'book' ? 'default' : 'ghost'}
            size="lg"
            className={`relative z-10 flex items-center gap-2 min-w-[150px] transition-all duration-300 ${
              contentType === 'book' 
                ? 'bg-primary text-primary-foreground shadow-lg scale-105' 
                : 'hover:bg-muted/50'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            Books
          </Button>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="bg-card/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/10 hover:border-primary/30 transition-all duration-500 bg-gradient-to-b from-black/20 to-transparent overflow-hidden">
          {/* Clip-path panel wipe on type switch */}
          <div className={`relative transition-[clip-path] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${contentType === 'movie' ? 'clip-reveal-left' : 'clip-reveal-right'}`}></div>
          <h2 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Tell Us What You Love
          </h2>

          {/* Genres */}
          <div className="mb-10">
            <Label className="text-lg mb-5 block font-semibold">Favorite Genres</Label>
            <div key={contentType} className="flex flex-wrap gap-3 animate-switch">
              {genres.map((genre, idx) => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => handleGenreToggle(genre)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2 focus:ring-offset-background animate-stagger ${
                    selectedGenres.includes(genre)
                      ? 'bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-glow scale-105 border border-primary-glow/50'
                      : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent'
                  }`}
                  style={{ animationDelay: `${idx * 30}ms` }}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Mood */}
          <div className="mb-10">
            <Label htmlFor="mood" className="text-lg mb-5 block font-semibold">Mood</Label>
            <Select value={mood} onValueChange={setMood}>
              <SelectTrigger className="w-full h-12 text-base bg-background/50 border-border/50 hover:border-primary/50 transition-all">
                <SelectValue placeholder="Select a mood..." />
              </SelectTrigger>
              <SelectContent className="bg-card/95 backdrop-blur-xl border-border/50">
                {MOODS.map(m => (
                  <SelectItem 
                    key={m} 
                    value={m.toLowerCase()}
                    className="text-base hover:bg-primary/10 cursor-pointer"
                  >
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Favorites */}
          <div className="mb-10">
            <Label htmlFor="favorites" className="text-lg mb-5 block font-semibold">
              Similar to (Optional)
            </Label>
            <Input
              id="favorites"
              value={favorites}
              onChange={(e) => setFavorites(e.target.value)}
              placeholder={`e.g., "Inception, Interstellar" or "Your favorite ${contentType}s"`}
              className="w-full h-12 text-base bg-background/50 border-border/50 hover:border-primary/50 focus:border-primary transition-all"
            />
          </div>

          {/* Additional Notes */}
          <div className="mb-10">
            <Label htmlFor="notes" className="text-lg mb-5 block font-semibold">
              Additional Preferences (Optional)
            </Label>
            <Textarea
              id="notes"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="Any other preferences? Time period, specific themes, must-avoid content, etc."
              className="w-full min-h-[120px] resize-none text-base bg-background/50 border-border/50 hover:border-primary/50 focus:border-primary transition-all"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 text-lg py-7 font-bold shadow-lg group"
          >
            <Search className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            Get Recommendations
          </Button>
        </form>
      </div>

      <style>{`
        .shadow-glow { box-shadow: var(--shadow-glow); }
        @keyframes switch {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-switch { animation: switch 420ms cubic-bezier(0.16,1,0.3,1); }
        @keyframes stagger {
          from { opacity: 0; transform: translateY(6px); filter: blur(2px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .animate-stagger { animation: stagger 360ms ease-out both; }
        .clip-reveal-left  { clip-path: inset(0 0 0 0 round var(--radius)); }
        .clip-reveal-right { clip-path: inset(0 0 0 0 round var(--radius)); }
      `}</style>
    </section>
  );
};

export default SearchForm;


