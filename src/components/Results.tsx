import { ArrowLeft, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Recommendation } from "@/pages/Index";
import Tilt from "@/components/Tilt";

interface ResultsProps {
  recommendations: Recommendation[];
  isLoading: boolean;
  contentType: 'movie' | 'book';
  onBack: () => void;
}

export const Results = ({ recommendations, isLoading, contentType, onBack }: ResultsProps) => {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-16">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-8 hover:bg-muted/50 group transition-all hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Search
          </Button>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent leading-tight">
            Your Personalized {contentType === 'movie' ? 'Movie' : 'Book'} Recommendations
          </h1>
          <p className="text-muted-foreground text-xl md:text-2xl font-light">
            Based on your preferences, here's what we think you'll love
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 animate-pulse shadow-[var(--shadow-card)]">
                <Skeleton className="h-10 w-3/4 mb-6 bg-muted/50" />
                <Skeleton className="h-5 w-1/2 mb-4 bg-muted/50" />
                <Skeleton className="h-5 w-full mb-3 bg-muted/50" />
                <Skeleton className="h-5 w-full mb-6 bg-muted/50" />
                <Skeleton className="h-24 w-full mb-6 bg-muted/50" />
                <Skeleton className="h-12 w-full bg-muted/50" />
              </div>
            ))}
          </div>
        )}

        {/* Results Grid */}
        {!isLoading && recommendations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendations.map((rec, index) => (
              <Tilt key={index} className="relative bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/20 p-[1.5px] rounded-3xl">
                <article
                  className="bg-card/90 backdrop-blur-xl rounded-3xl p-8 border border-border/50 shadow-[var(--shadow-card)] transition-all duration-500 group focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/40 hover:scale-[1.02] bg-gradient-to-b from-black/20 to-transparent"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Rank badge */}
                  <div className="absolute -top-3 -left-3 h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground grid place-items-center text-sm font-bold shadow-lg">
                    {index + 1}
                  </div>

                  {/* Header */}
                  <div className="mb-6">
                    <h3 className="text-3xl font-bold mb-3 group-hover:text-primary transition-colors duration-300 leading-tight">
                      {rec.title}
                    </h3>
                    <p className="text-muted-foreground text-base font-medium">
                      {rec.creator} • {rec.year}
                    </p>
                  </div>

                  {/* Genres */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {rec.genres.map(genre => (
                      <span
                        key={genre}
                        className="px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-6 bg-accent/10 border border-accent/30 rounded-xl px-4 py-3 w-fit">
                    <Star className="w-6 h-6 fill-accent text-accent" />
                    <span className="font-bold text-xl text-accent">{rec.rating}</span>
                    <span className="text-muted-foreground font-medium">/10</span>
                  </div>

                  {/* Description */}
                  <p className="text-foreground/90 mb-6 leading-relaxed text-base">
                    {rec.description}
                  </p>

                  {/* Reasoning */}
                  <div className="p-5 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl border border-primary/30 mb-6 backdrop-blur-sm">
                    <p className="text-sm font-bold text-primary mb-2 tracking-wide">Why we recommend this:</p>
                    <p className="text-sm text-foreground/80 leading-relaxed">{rec.reasoning}</p>
                  </div>

                  {/* Actions */}
                  <Button
                    variant="outline"
                    className="w-full h-12 relative overflow-hidden transition-all duration-300 font-semibold focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    asChild
                  >
                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(rec.title + ' ' + rec.creator)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      <span className="relative z-10">Learn More</span>
                      <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </article>
              </Tilt>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && recommendations.length === 0 && (
          <div className="text-center py-32">
            <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-12 border border-border/50 max-w-2xl mx-auto">
              <p className="text-2xl text-muted-foreground font-light">
                No recommendations found. Please try again with different preferences.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;


