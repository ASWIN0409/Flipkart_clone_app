import { Route, Routes, useLocation } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Login from "./Login";
import Register from "./Register";
import PrivateRoute from "./Auth/PrivateRoute";
import { ErrorBoundary } from "react-error-boundary";
import CustomErrorBoundary from "../components/ErrorBoundary/CustomErrorBoundary";
import { lazy, Suspense } from "react";

const ProductList = lazy(() => import("./ProductList"));
const ProductDetails = lazy(() => import("./ProductDetails"));
const Cart = lazy(() => import("./Cart"));
const Checkout = lazy(() => import("./Checkout"));

function Routing() {

    const location = useLocation();

    return (
        <Suspense fallback={<div className="p-10">Loading...</div>}>
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
                        <Route path="cart" element={
                            <ErrorBoundary
                                FallbackComponent={CustomErrorBoundary}
                                onReset={[location.pathname]}
                            >
                                <Cart />
                            </ErrorBoundary>
                        } />
                        <Route path="checkout" element={
                            <ErrorBoundary
                                FallbackComponent={CustomErrorBoundary}
                                onReset={[location.pathname]}
                            >
                                <Checkout />
                            </ErrorBoundary>
                        } />
                    </Route>
                </Route>

                <Route path="*" element={<div className="text-red-500 font-bold">Page not found</div>} />
            </Routes>
        </Suspense>
    );
}

export default Routing;