import { MealCard } from "./MealCard";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
}

interface MealGridProps {
  meals: Meal[];
  onMealClick: (mealId: string) => void;
}

export const MealGrid = ({ meals, onMealClick }: MealGridProps) => {
  if (meals.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">No meals found. Try a different search!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {meals.map((meal) => (
        <MealCard
          key={meal.idMeal}
          meal={meal}
          onClick={() => onMealClick(meal.idMeal)}
        />
      ))}
    </div>
  );
};
