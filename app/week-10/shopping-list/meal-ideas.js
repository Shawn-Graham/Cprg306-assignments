"use client";

import { useEffect, useState } from "react";

const fetchMealIdeas = async (ingredient) => {
  if (!ingredient) return [];

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching meal ideas:", error);
    return [];
  }
};

const fetchMealDetails = async (mealId) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error("Error fetching meal details:", error);
    return null;
  }
};

const MealIdeas = ({ ingredient }) => {
  const [meals, setMeals] = useState([]);
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [mealDetails, setMealDetails] = useState({});

  useEffect(() => {
    const loadMealIdeas = async () => {
      const fetchedMeals = await fetchMealIdeas(ingredient);
      setMeals(fetchedMeals);
      setSelectedMealId(null);
      setMealDetails({});
    };

    loadMealIdeas();
  }, [ingredient]);

  const handleMealClick = async (mealId) => {
    if (selectedMealId === mealId) {
   
      setSelectedMealId(null);
      return;
    }

    if (!mealDetails[mealId]) {
      const details = await fetchMealDetails(mealId);
      setMealDetails((prev) => ({
        ...prev,
        [mealId]: details,
      }));
    }

    setSelectedMealId(mealId);
  };

  return (
    <div>
      <h3 className="text-xl font-bold">Meal Ideas for {ingredient}</h3>
      <p>Here are some meal ideas using {ingredient}:</p>
      <ul>
        {meals.map((meal) => (
          <li
            className="p-2 m-1 bg-slate-900 max-w-sm hover:bg-orange-800 cursor-pointer"
            key={meal.idMeal}
            onClick={() => handleMealClick(meal.idMeal)}
          >
            <p className="font-bold">{meal.strMeal}</p>
            {selectedMealId === meal.idMeal && mealDetails[meal.idMeal] && (
              <ul className="ml-4 mt-2 text-sm">
                {Array.from({ length: 20 }, (_, i) => i + 1)
                  .map((i) => ({
                    ingredient: mealDetails[meal.idMeal][`strIngredient${i}`],
                    measure: mealDetails[meal.idMeal][`strMeasure${i}`],
                  }))
                  .filter((item) => item.ingredient && item.ingredient.trim() !== "")
                  .map((item, index) => (
                    <li key={index}>
                      {item.measure} {item.ingredient}
                    </li>
                  ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MealIdeas;
