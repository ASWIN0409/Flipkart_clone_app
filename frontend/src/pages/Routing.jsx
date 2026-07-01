import { Route, Routes, useLocation } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ProductDetails from "./ProductDetails";
import ProductList from "./ProductList";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Login from "./Login";
import Register from "./Register";
import PrivateRoute from "./Auth/PrivateRoute";
import { ErrorBoundary } from "react-error-boundary";
import CustomErrorBoundary from "../components/ErrorBoundary/CustomErrorBoundary";

function Routing() {

    const location =  useLocation();

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/" element={<MainLayout />}>
                <Route index element={
                    <ErrorBoundary
                        FallbackComponent={CustomErrorBoundary}
                        onReset={[location.pathname]}
                    >
                        <ProductList />
                    </ErrorBoundary>
                } />
                <Route path="product/details/:id" element={
                    <ErrorBoundary
                        FallbackComponent={CustomErrorBoundary}
                        onReset={[location.pathname]}
                    >
                        <ProductDetails />
                    </ErrorBoundary>
                } />

                {/* Protected routes */}
                <Route element={<PrivateRoute />}>
                    <Route path="cart" element={<Cart />} />
                    <Route path="checkout" element={<Checkout />} />
                </Route>
            </Route>

            <Route path="*" element={<div className="text-red-500 font-bold">Page not found</div>} />
        </Routes>
    );
}

export default Routing;