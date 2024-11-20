// components/Products.tsx
import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
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

    const handleBlur = (productId: number, gramature: number) => {
        updateGramature(productId, gramature);
    };

    const handleGramatureChange = (event: React.ChangeEvent<HTMLInputElement>, productId: number) => {
        let newGramature = parseFloat(event.target.value);
        
    
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === productId ? { ...product, gramature: newGramature } : product
            )
        );
    };

    const updateGramature = async (productId: number, gramature: number) => {
        try {
            await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}meal-product/${productId}`, {
                gramature:gramature,
            }, {
                withCredentials: true,
            });
            console.log("Gramatura została zaktualizowana");
        } catch (error) {
            console.error("Błąd przy aktualizacji gramatury:", error);
        }
    };

    return (
        <List>
            {products.map((product) => (
                <ListItem key={product.id}>
                    <ListItemText
                        primary={product.product.name}
                        secondary={`Kalorie: ${product.product.calories_per_100g/product.gramature}, Białko: ${product.product.protein_per_100g}, Węglowodany: ${product.product.carbohydrates_per_100g}, Tłuszcze: ${product.product.calories_per_100g}`}
                    />
                    <TextField
                        value={product.gramature}
                        onBlur={()=>handleBlur(product.id,product.gramature)}
                        variant="outlined"
                        type="number"
                        onChange={(e)=> handleGramatureChange(e as React.ChangeEvent<HTMLInputElement>,product.id)}
            
                    />
                    <Typography>
                        Gramature
                    </Typography>
                </ListItem>
            ))}
        </List>
    );
};

export default Products;
