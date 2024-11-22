// components/Meals.tsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import axios from "axios";
import Products from "./get_meals_products";
import { Meal } from "./types";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
type MealsProps = {
  dayId: number;
  fetchDays: () => void;
};

const Meals: React.FC<MealsProps> = ({ dayId, fetchDays }) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [expandedMealId, setExpandedMealId] = useState<number | null>(null);
  const [productName, setProductName] = useState<string>("");
  const [refreshProducts, setRefreshProducts] = useState<boolean>(false);

  const addProduct = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}products/add`,
        { mealID: expandedMealId, productName: productName },
        { withCredentials: true },
      );
      setProductName("");
      setRefreshProducts(!refreshProducts);
      fetchMeals();
      fetchDays();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        enqueueSnackbar(error.response?.data.message, {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
    }
  };

  const fetchMeals = async () => {
    try {
      const response = await axios.get<Meal[]>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}meals/${dayId}`,
        {
          withCredentials: true,
        },
      );
      console.log(response.data);
      setMeals(response.data);
    } catch (error) {
      console.error("Error while fetching meals", error);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, [dayId]);

  const handleToggleExpand = (mealId: number) => {
    setExpandedMealId(expandedMealId === mealId ? null : mealId);
  };

  return (
    <SnackbarProvider preventDuplicate autoHideDuration={3000}>
      <List>
        {meals.map((meal) => (
          <Box key={meal.id}>
            <ListItem onClick={() => handleToggleExpand(meal.id)}>
              <ListItemText
                primary={`${meal.meal_type} - Calories: ${meal.total_calories.toFixed(1)}`}
                secondary={`Protein: ${meal.total_protein.toFixed(1)}, Carbohydrates: ${meal.total_carbohydrates.toFixed(1)}, Fat: ${meal.total_fat.toFixed(1)}`}
              />
            </ListItem>
            <Collapse
              in={expandedMealId === meal.id}
              timeout="auto"
              unmountOnExit
            >
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
                  Add product
                </Button>
                <Products
                  mealId={meal.id}
                  refresh={refreshProducts}
                  fetchMeals={fetchMeals}
                  fetchDays={fetchDays}
                />
              </Box>
            </Collapse>
          </Box>
        ))}
      </List>
    </SnackbarProvider>
  );
};

export default Meals;
