import { useState } from "react";
import { toast } from "sonner";
import { Hero } from "@/components/Hero";
import { SearchForm } from "@/components/SearchForm";
import { Results } from "@/components/Results";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export interface Recommendation {
  title: string;
  creator: string;
  year: number;
  genres: string[];
  description: string;
  reasoning: string;
  rating: number;
}

const Index = () => {
  const [contentType, setContentType] = useState<'movie' | 'book'>('movie');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (formData: {
    genres: string[];
    mood: string;
    favorites: string;
    additionalNotes: string;
  }) => {
    setIsLoading(true);
    setShowResults(true);
    
    // Simulate API call - replace with actual Supabase edge function call
    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/recommend`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          contentType,
          ...formData,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        const message = `Recommend failed (${response.status}): ${errorText || response.statusText}`;
        console.error(message);
        toast.error("Couldn't get recommendations", {
          description: message,
        });
        throw new Error(message);
      }

      const data = await response.json().catch((e) => {
        console.error('JSON parse error:', e);
        toast.error('Invalid response from server', {
          description: 'Failed to parse recommendations JSON',
        });
        return { recommendations: [] };
      });
      const recs = Array.isArray(data.recommendations) ? data.recommendations : [];
      setRecommendations(recs);
      if (recs.length === 0) {
        toast.warning('No recommendations returned', {
          description: 'Try adjusting your inputs, or check function logs for errors.',
        });
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      if (error instanceof Error) {
        toast.error('Request error', { description: error.message });
      } else {
        toast.error('Unknown error while requesting recommendations');
      }
      setRecommendations([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setShowResults(false);
    setRecommendations([]);
  };

  return (
    <div className="min-h-screen">
      <Header />
      {!showResults ? (
        <>
          <Hero />
          <div className="container" id="search">
            <SearchForm 
              contentType={contentType}
              onContentTypeChange={setContentType}
              onSearch={handleSearch}
            />
          </div>
        </>
      ) : (
        <div className="container">
          <Results 
            recommendations={recommendations}
            isLoading={isLoading}
            contentType={contentType}
            onBack={handleBack}
          />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Index;
