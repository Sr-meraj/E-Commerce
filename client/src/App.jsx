import { Suspense } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Component/Footer';
import Navigation from './Component/Navigation';
import AuthLayout from './pages/AuthFroms/AuthLayout';
import CartPage from './pages/CartPage/CartPage';
import CheckOutPage from './pages/CheckOutPage/CheckOutPage';
import ContactPage from './pages/contactPage/ContactPage';
import Dashboard from './pages/Dashboard/Dashboard';
import Page404 from './pages/ErrorPage/Page404';
import Home from './pages/home/Home';
import ProductSingle from './pages/ProductSinglePage/ProductSingle';
import StorePage from './pages/shop/StorePage';
import PrivateRoute from './route/PrivateRoute';
import PublicRoute from './route/PublicRoute';
import ScrollToTop from './ScrollToTop';
function App() {
  const images = [
    'https://res.cloudinary.com/dkuwlnejd/image/upload/v1707581284/Ecommerce/product-4-2_jxz1xm.jpg', 'https://res.cloudinary.com/dkuwlnejd/image/upload/v1707581284/Ecommerce/product-4-1_g7tvbq.jpg', 'https://res.cloudinary.com/dkuwlnejd/image/upload/v1707581285/Ecommerce/product-8-2_yi5jgw.jpg', 'https://res.cloudinary.com/dkuwlnejd/image/upload/v1707581285/Ecommerce/product-8-1_rpuzst.jpg', 'https://res.cloudinary.com/dkuwlnejd/image/upload/v1707581286/Ecommerce/product-1-2_gdozjv.jpg', 'https://res.cloudinary.com/dkuwlnejd/image/upload/v1707581286/Ecommerce/product-1-1_y6vtpc.jpg', 'https://res.cloudinary.com/dkuwlnejd/image/upload/v1707581286/Ecommerce/product-6-2_u0ygxb.jpg', 'https://res.cloudinary.com/dkuwlnejd/image/upload/v1707581285/Ecommerce/product-6-1_uq0s7g.jpg'
  ]
  return (
    <>
      <BrowserRouter>
        <ScrollToTop>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route
                path="/"
                element={
                  <div className="">
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
                <Route path='*' element={<Page404 />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route
                  path="shop/"
                  element={<StorePage />}
                >
                  <Route
                    path=":levelOne/:levelTwo/:levelThree"
                    element={<StorePage />}
                  />
                </Route>
                <Route
                  path="product/:slug/details"
                  element={<ProductSingle />}
                />
                <Route path="checkout" element={<CheckOutPage />} />
                <Route path="account" element={<PublicRoute><AuthLayout /></PublicRoute>} />
                <Route path="dashboard/*" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path='support' element={<p>Support</p>} />

              </Route>
            </Routes>
          </Suspense>
        </ScrollToTop>
      </BrowserRouter>
    </>
  )
}

export default App