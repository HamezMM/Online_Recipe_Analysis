import { useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { WebhookConfig } from "@/components/WebhookConfig";
import { useMealApi } from "@/hooks/useMealApi";
import { ChefHat, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [webhookUrl, setWebhookUrl] = useState(() => {
    return localStorage.getItem("n8n_webhook_url") || "apiKey";
  });
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const { analyzeRecipe, loading } = useMealApi(webhookUrl);

  useEffect(() => {
    localStorage.setItem("n8n_webhook_url", webhookUrl);
  }, [webhookUrl]);

  const handleAnalyze = async (url: string) => {
    setAnalysisResult(null);
    const data = await analyzeRecipe(url);
    if (data) {
      setAnalysisResult(data);
    }
  };

  const handleExportCSV = () => {
    if (!analysisResult?.ingredientList) return;

    const csvContent = [
      ["Ingredient"],
      ...analysisResult.ingredientList.map((ingredient: string) => [ingredient])
    ]
      .map(row => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", "recipe-ingredients.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <ChefHat className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Recipe Analyzer
            </h1>
          </div>
          <WebhookConfig webhookUrl={webhookUrl} onWebhookUrlChange={setWebhookUrl} />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center space-y-6">
          <h2 className="text-5xl font-bold text-foreground">
            Analyze Any Recipe
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enter a recipe URL and get instant analysis and insights
          </p>
          <div className="pt-8">
            <SearchBar onAnalyze={handleAnalyze} />
          </div>
        </div>
      </section>

      {/* Results Section */}
      {loading && (
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">Analyzing recipe...</p>
        </div>
      )}

      {!loading && analysisResult && (
        <section className="container mx-auto px-4 py-8 max-w-4xl">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recipe Ingredients</CardTitle>
                  <p className="text-muted-foreground mt-2">
                    Total: {analysisResult.totalIngredients} ingredients
                  </p>
                </div>
                <Button onClick={handleExportCSV} variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {analysisResult.ingredientList?.map((ingredient: string, index: number) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 p-3 bg-muted rounded-lg hover:bg-muted/70 transition-colors"
                  >
                    <span className="text-primary font-semibold">•</span>
                    <span className="text-foreground capitalize">{ingredient}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  );
};

export default Index;
