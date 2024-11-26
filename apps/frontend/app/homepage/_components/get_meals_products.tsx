import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  const [openDialog, setOpenDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}meal-product/${mealId}`,
        {
          withCredentials: true,
        },
      );
      setProducts(response.data);
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
      fetchProducts();
      fetchDays();
      fetchMeals();
    } catch (error) {
      console.error("Error while changing gramature:", error);
    }
  };

  const calculateProductCalories = (calories: number, gramature: number) => {
    const caloriesCalculated = calories * (gramature / 100);
    return parseFloat(caloriesCalculated.toFixed(1));
  };

  const handleOpenDialog = (productId: number) => {
    setProductToDelete(productId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setProductToDelete(null);
  };

  const handleDeleteProduct = async () => {
    if (productToDelete !== null) {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}meal-product/${productToDelete}`,
          { withCredentials: true },
        );
        handleCloseDialog();
        fetchProducts();
        fetchDays();
        fetchMeals();
      } catch (error) {
        console.error("Error while deleting product:", error);
      }
    }
  };

  return (
    <>
      <List>
        {products.map((product) => (
          <ListItem key={product.id}>
            <ListItemText
              primary={product.product.name}
              secondary={`Calories: ${calculateProductCalories(product.product.calories_per_100g, product.gramature)}, Protein: ${calculateProductCalories(product.product.protein_per_100g, product.gramature)}, Carbohydrates: ${calculateProductCalories(product.product.carbohydrates_per_100g, product.gramature)}, Fat: ${calculateProductCalories(product.product.fat_per_100g, product.gramature)}`}
            />
            <Typography
              sx={{
                fontSize: "0.875rem",
                fontWeight: "bold",
                marginRight: 2,
              }}
            >
              Gramature:{" "}
            </Typography>
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
              sx={{
                width: 100,
                marginRight: 2,
              }}
            />

            <ClearIcon
              onClick={() => handleOpenDialog(product.id)}
              sx={{
                fontSize: 25,
              }}
            />
          </ListItem>
        ))}
      </List>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteProduct}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Products;
