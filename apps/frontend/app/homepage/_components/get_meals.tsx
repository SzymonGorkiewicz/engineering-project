import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  useTheme,
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
  const theme = useTheme();
  const addProduct = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}products/add`,
        { mealID: expandedMealId, productName: productName },
        { withCredentials: true },
      );
      setProductName("");
      setRefreshProducts(!refreshProducts);
      fetchDays();
      fetchMeals();
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
    setExpandedMealId(null);
  }, [dayId]);

  const handleToggleExpand = (mealId: number) => {
    setExpandedMealId(expandedMealId === mealId ? null : mealId);
  };

  return (
    <SnackbarProvider preventDuplicate autoHideDuration={3000}>
      <Grid container spacing={2} marginTop={2}>
        {meals.map((meal) => (
          <Grid item xs={12} sm={6} md={5} lg={4} key={meal.id}>
            <Card
              onClick={() => handleToggleExpand(meal.id)}
              sx={{
                cursor: "pointer",
                border:
                  expandedMealId === meal.id
                    ? "2px solid #1976d2"
                    : "2px solid transparent",
                backgroundColor: theme.palette.background.default,
              }}
            >
              <CardContent>
                <Typography variant="h6">{meal.meal_type}</Typography>
                <Typography>
                  Calories: {meal.total_calories.toFixed(1)}
                </Typography>
                <Typography>
                  Protein: {meal.total_protein.toFixed(1)}
                </Typography>
                <Typography>
                  Carbs: {meal.total_carbohydrates.toFixed(1)}
                </Typography>
                <Typography>Fat: {meal.total_fat.toFixed(1)}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box>
        {expandedMealId && (
          <>
            <Box mt={2}>
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
            </Box>
            <Products
              mealId={expandedMealId}
              refresh={refreshProducts}
              fetchMeals={fetchMeals}
              fetchDays={fetchDays}
            />
          </>
        )}
      </Box>
    </SnackbarProvider>
  );
};

export default Meals;
