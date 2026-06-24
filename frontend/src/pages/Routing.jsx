import { Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ProductDetails from "./ProductDetails";
import ProductList from "./ProductList";
import Cart from "./Cart";

function Routing() {
    return(
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<ProductList />} />
                <Route path="/product/details/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
            </Route>
        </Routes>
    );
}

export default Routing;