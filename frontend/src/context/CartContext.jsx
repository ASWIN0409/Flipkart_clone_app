import { createContext, useContext, useState } from "react";
import { axiosInstance } from "../helpers/axiosInstance";

const CartContext = createContext();

export default function CartProvider({ children }) {

    const [cartItems, setCartItems] = useState([]);

    // Add Product to cart
    const addToCart = (product) => {
        const response = axiosInstance.post('api/cart/add/', {
            product_id: product.id
        });
        setCartItems(response.data.cart.items);
    }

    // Remove product from cart
    const removeFromCart = (id) => {
        const response = axiosInstance.post('api/cart/remove/', {
            item_id: id
        });
        setCartItems(response.data.cart.items);
    }

    // Update quantity
    const updateQuantity = (id, quantity) => {
        const response = axiosInstance.post('api/cart/edit/', {
            item_id: id,
            quantity: quantity,
        });
        setCartItems(response.data.cart.items);
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
}


export const useCart = () => useContext(CartContext)
