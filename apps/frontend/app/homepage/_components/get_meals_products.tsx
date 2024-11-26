import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Product } from "./types";
import ClearIcon from "@mui/icons-material/Clear";
type ProductsProps = {
  mealId: number | null;
  refresh: boolean;
  fetchMeals: () => void;
  fetchDays: () => void;
};

const Products: React.FC<ProductsProps> = ({
  mealId,
  refresh,
  fetchMeals,
  fetchDays,
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}meal-product/${mealId}`,
        {
          withCredentials: true,
        },
      );
      setProducts(response.data);
      fetchDays();
    } catch (error) {
      console.error("Error while fetching the products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [mealId, refresh]);

  const handleBlur = (productId: number, gramature: number) => {
    updateGramature(productId, gramature);
  };

  const handleGramatureChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    productId: number,
  ) => {
    const inputValue = event.target.value;
    const newGramature = Number(inputValue);
    //const newGramature = parseFloat(event.target.value);

    if (isNaN(newGramature)) {
      console.warn("Invalid gramature value:", inputValue);
      return;
    }

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, gramature: newGramature }
          : product,
      ),
    );
  };

  const updateGramature = async (productId: number, gramature: number) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}meal-product/${productId}`,
        {
          gramature: gramature,
        },
        {
          withCredentials: true,
        },
      );
      fetchMeals();
      fetchDays();
    } catch (error) {
      console.error("Error while changing gramature:", error);
    }
  };

  const calculateProductCalories = (calories: number, gramature: number) => {
    const caloriesCalculated = calories * (gramature / 100);
    return parseFloat(caloriesCalculated.toFixed(1));
  };

  return (
    <List>
      {products.map((product) => (
        <ListItem key={product.id}>
          <ListItemText
            primary={product.product.name}
            secondary={`Calories: ${calculateProductCalories(product.product.calories_per_100g, product.gramature)}, Protein: ${calculateProductCalories(product.product.protein_per_100g, product.gramature)}, Carbohydrates: ${calculateProductCalories(product.product.carbohydrates_per_100g, product.gramature)}, Fat: ${calculateProductCalories(product.product.fat_per_100g, product.gramature)}`}
          />
          <TextField
            value={product.gramature}
            onBlur={() => handleBlur(product.id, product.gramature)}
            variant="outlined"
            type="number"
            onChange={(e) =>
              handleGramatureChange(
                e as React.ChangeEvent<HTMLInputElement>,
                product.id,
              )
            }
          />
          <Typography>Gramature</Typography>
          <ClearIcon />
        </ListItem>
      ))}
    </List>
  );
};

export default Products;
