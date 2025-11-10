import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MealCardProps {
  meal: {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory?: string;
    strArea?: string;
  };
  onClick: () => void;
}

export const MealCard = ({ meal, onClick }: MealCardProps) => {
  return (
    <Card 
      className="overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-300 border-border"
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {meal.strCategory && (
          <Badge className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm">
            {meal.strCategory}
          </Badge>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-foreground">
          {meal.strMeal}
        </h3>
        {meal.strArea && (
          <p className="text-sm text-muted-foreground">
            {meal.strArea} Cuisine
          </p>
        )}
      </div>
    </Card>
  );
};
