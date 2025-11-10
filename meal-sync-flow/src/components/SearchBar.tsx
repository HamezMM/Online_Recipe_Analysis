import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onAnalyze: (url: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ onAnalyze, placeholder = "Enter recipe URL to analyze..." }: SearchBarProps) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={placeholder}
            className="pl-12 pr-4 h-14 text-lg border-2 focus-visible:ring-2 focus-visible:ring-primary transition-all"
          />
        </div>
        <Button 
          type="submit" 
          size="lg"
          className="h-14 px-8 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
        >
          Analyze
        </Button>
      </div>
    </form>
  );
};
