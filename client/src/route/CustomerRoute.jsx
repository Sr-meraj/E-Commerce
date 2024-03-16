import { Outlet, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../Component/Footer";
import Navigation from "../Component/Navigation";
import AuthLayout from "../pages/AuthFroms/AuthLayout";
import CartPage from "../pages/CartPage/CartPage";
import CheckOutPage from "../pages/CheckOutPage/CheckOutPage";
import Home from "../pages/home/Home";
import OrderDetails from "../pages/OrderPage/OrderDetails";
import ProductSingle from "../pages/ProductSinglePage/ProductSingle";
import ShopPage from "../pages/shop/StorePage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";


const CustomerRoute = () => {
    return (
        <>
            {/* Navigation component should be part of the Route content */}
            <Routes>
                <Route
                    path="/*"
                    element={
                        <div>
                            <ToastContainer
                                position="top-center"
                                autoClose={3000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="colored" />

                            <Navigation />
                            <Outlet />
                            <Footer />
                        </div>
                    }
                >
                    <Route index element={<Home />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route
                        path="shop/*"
                        element={<ShopPage />}
                    >
                        <Route
                            path=":levelOne/:levelTwo/:levelThree"
                            element={<ShopPage />}
                        />
                    </Route>
                    <Route
                        path="product/:slug/details"
                        element={<ProductSingle />}
                    />
                    <Route path="checkout" element={<CheckOutPage />} />
                    <Route path="my-account" element={<PublicRoute><AuthLayout /></PublicRoute>} />
                    <Route
                        path="account/my-order"
                        element={<PrivateRoute><OrderDetails /></PrivateRoute>}
                    />
                </Route>
            </Routes>
        </>
    );
};

export default CustomerRoute;
