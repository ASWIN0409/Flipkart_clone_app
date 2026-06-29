import { createContext, useContext, useState, useEffect } from "react";
import { axiosInstance } from "../helpers/axiosInstance";

const CartContext = createContext();

export default function CartProvider({ children }) {

    const [cartItems, setCartItems] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchCart = async () => {
            const response = await axiosInstance.get("api/cart/");
            setCartItems(response.data.items);
        };
        fetchCart();
    }, []);

    // Add Product to cart
    const addToCart = async (product) => {
        const response = await axiosInstance.post('api/cart/add/', {
            product_id: product.id
        });
        setCartItems(response.data.cart.items);
    }

    // Remove product from cart
    const removeFromCart = async (id) => {
        const response = await axiosInstance.post('api/cart/remove/', {
            item_id: id
        });
        setCartItems(response.data.cart.items);
    }

    // Update quantity
    const updateQuantity = async (id, quantity) => {
        const response = await axiosInstance.post('api/cart/edit/', {
            item_id: id,
            quantity: quantity,
        });
        setCartItems(response.data.cart.items);
    }

    const emptyCart = () => {
        setCartItems([]);
        setMessage("");
    }

    return (
        <CartContext.Provider value={{ cartItems, message, setMessage, addToCart, removeFromCart, updateQuantity, emptyCart }}>
            {children}
        </CartContext.Provider>
    );
}


export const useCart = () => useContext(CartContext)
