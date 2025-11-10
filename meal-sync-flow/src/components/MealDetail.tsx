import { X, ChefHat, MapPin, ListOrdered } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MealDetailProps {
  meal: {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory?: string;
    strArea?: string;
    strInstructions?: string;
    strTags?: string;
    [key: string]: any;
  };
  onClose: () => void;
}

export const MealDetail = ({ meal, onClose }: MealDetailProps) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({ ingredient, measure });
    }
  }

  const tags = meal.strTags?.split(',').filter(Boolean) || [];

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
      <ScrollArea className="h-full">
        <div className="container max-w-4xl mx-auto p-6 py-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-6 right-6"
          >
            <X className="h-6 w-6" />
          </Button>

          <div className="mt-8">
            <div className="relative aspect-video rounded-lg overflow-hidden mb-6 shadow-card">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <div>
                <h1 className="text-4xl font-bold mb-3 text-foreground">{meal.strMeal}</h1>
                <div className="flex flex-wrap gap-2 items-center">
                  {meal.strCategory && (
                    <Badge variant="secondary" className="gap-1">
                      <ChefHat className="h-3 w-3" />
                      {meal.strCategory}
                    </Badge>
                  )}
                  {meal.strArea && (
                    <Badge variant="secondary" className="gap-1">
                      <MapPin className="h-3 w-3" />
                      {meal.strArea}
                    </Badge>
                  )}
                  {tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag.trim()}
                    </Badge>
                  ))}
                </div>
              </div>

              {ingredients.length > 0 && (
                <Card className="p-6">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-foreground">
                    <ListOrdered className="h-5 w-5 text-primary" />
                    Ingredients
                  </h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {ingredients.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-foreground">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        <span className="font-medium">{item.measure}</span>
                        <span>{item.ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              {meal.strInstructions && (
                <Card className="p-6">
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">Instructions</h2>
                  <p className="whitespace-pre-line text-foreground leading-relaxed">
                    {meal.strInstructions}
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
