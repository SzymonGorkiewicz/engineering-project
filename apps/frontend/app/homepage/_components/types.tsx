export type Product = {
    id: number;
    gramature: number,
    product: {
        name: string;
        calories_per_100g: number;
        protein_per_100g: number;
        carbohydrates_per_100g: number;
        fat_per_100g: number;
    }
    
};

export type Meal = {
    id: number;
    meal_type: string;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
};

export type Day = {
    id:number
    date: Date,
    total_protein: string,
    total_carbohydrates:string,
    total_fat:string
}