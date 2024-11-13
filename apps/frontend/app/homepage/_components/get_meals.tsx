// components/Meals.tsx
import React, { useState, useEffect } from "react";
import { Box, Button, Collapse, List, ListItem, ListItemText, TextField } from "@mui/material";
import axios from "axios";
import Products from "./get_meals_products";
import { Meal } from "./types";

type MealsProps = {
    dayId: number;
};

const Meals: React.FC<MealsProps> = ({ dayId }) => {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [expandedMealId, setExpandedMealId] = useState<number | null>(null);
    const [productName, setProductName] = useState<string>("");
    const [refreshProducts, setRefreshProducts] = useState<boolean>(false);

    const addProduct = async () =>{
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}products/add`,{mealID:expandedMealId, productName:productName},{withCredentials:true});
            setProductName("")
            setRefreshProducts(!refreshProducts);
        } catch (error) {
            console.error("Błąd przy pobieraniu posiłków:", error);
        }
    }


    const fetchMeals = async () => {
        try {
            const response = await axios.get<Meal[]>(`${process.env.NEXT_PUBLIC_BACKEND_URL}meals/${dayId}`, {
                withCredentials: true,
            });
            setMeals(response.data);
        } catch (error) {
            console.error("Błąd przy pobieraniu posiłków:", error);
        }
    };

    useEffect(() => {
        fetchMeals();
    }, [dayId]);

    const handleToggleExpand = (mealId: number) => {
        setExpandedMealId(expandedMealId === mealId ? null : mealId);
    };

    return (
        <List>
            {meals.map((meal) => (
                <Box key={meal.id}>
                    <ListItem onClick={() => handleToggleExpand(meal.id)}>
                        <ListItemText
                            primary={`${meal.meal_type} - Kalorie: ${meal.calories}`}
                            secondary={`Białko: ${meal.protein}, Węglowodany: ${meal.carbohydrates}, Tłuszcze: ${meal.fat}`}
                        />
                    </ListItem>
                    <Collapse in={expandedMealId === meal.id} timeout="auto" unmountOnExit>
                    <Box ml={4}>
                            <TextField
                                label="Product name"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={addProduct}
                                disabled={!productName.trim()}
                            >
                                Dodaj produkt
                            </Button>
                            <Products mealId={meal.id} refresh={refreshProducts} />
                        </Box>
                    </Collapse>
                </Box>
            ))}
        </List>
    );
};

export default Meals;
