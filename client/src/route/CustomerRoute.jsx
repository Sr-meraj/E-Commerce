import { Outlet, Route, Routes } from "react-router-dom";
import Footer from "../Component/Footer";
import Navigation from "../Component/Navigation";
import CartPage from "../pages/CartPage/CartPage";
import CheckOutPage from "../pages/CheckOutPage/CheckOutPage";
import Home from "../pages/home/Home";
import OrderDetails from "../pages/OrderPage/OrderDetails";
import ProductSingle from "../pages/ProductSinglePage/ProductSingle";
import ShopPage from "../pages/shop/StorePage";
import Try from "../pages/Try";

const CustomerRoute = () => {
    return (
        <>
            {/* Navigation component should be part of the Route content */}
            <Routes>
                <Route path="/*"
                    element={
                        <div>
                            <Navigation />
                            <Outlet />
                            <Footer />
                        </div>
                    }>
                    <Route index element={<Home />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="shop/*" element={<ShopPage />}>
                        <Route path=":levelOne/:levelTwo/:levelThree" element={<ShopPage />} />
                    </Route>
                    <Route path=":product/:id" element={<ProductSingle />} />
                    <Route path="checkout" element={<CheckOutPage />} />
                    <Route path='account/my-order' element={<OrderDetails />} />
                </Route>
                <Route path="/try" element={<Try />}>

                </Route>
            </Routes>
        </>
    );
};

export default CustomerRoute;
