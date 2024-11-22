export type Product = {
  id: number;
  gramature: number;
  product: {
    name: string;
    calories_per_100g: number;
    protein_per_100g: number;
    carbohydrates_per_100g: number;
    fat_per_100g: number;
  };
};

export type Meal = {
  id: number;
  meal_type: string;
  total_calories: number;
  total_protein: number;
  total_carbohydrates: number;
  total_fat: number;
};

export type Day = {
  id: number;
  date: Date;
  total_protein: number;
  total_carbohydrates: number;
  total_fat: number;
  total_calories: number;
};
