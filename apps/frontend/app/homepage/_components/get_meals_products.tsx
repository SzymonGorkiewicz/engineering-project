// components/Products.tsx
import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";
import { Product } from "./types";

type ProductsProps = {
    mealId: number;
    refresh: boolean;
};

const Products: React.FC<ProductsProps> = ({ mealId, refresh }) => {
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get<Product[]>(`${process.env.NEXT_PUBLIC_BACKEND_URL}meal-product/${mealId}`, {
                withCredentials: true,
            });
            setProducts(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Błąd przy pobieraniu produktów:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [mealId, refresh]);

    return (
        <List>
            {products.map((product) => (
                <ListItem key={product.id}>
                    <ListItemText
                        primary={product.product.name}
                        secondary={`Kalorie: ${product.product.calories_per_100g}, Białko: ${product.product.protein_per_100g}, Węglowodany: ${product.product.carbohydrates_per_100g}, Tłuszcze: ${product.product.calories_per_100g}`}
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default Products;
