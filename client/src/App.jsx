import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CustomerRoute from './route/CustomerRoute';
function App() {
  const images = [
    'https://res.cloudinary.com/dkuwlnejd/image/upload/v1707581284/Ecommerce/product-4-2_jxz1xm.jpg', 'https://res.cloudinary.com/dkuwlnejd/image/upload/v1707581284/Ecommerce/product-4-1_g7tvbq.jpg', 'https://res.cloudinary.com/dkuwlnejd/image/upload/v1707581285/Ecommerce/product-8-2_yi5jgw.jpg', 'https://res.cloudinary.com/dkuwlnejd/image/upload/v1707581285/Ecommerce/product-8-1_rpuzst.jpg', 'https://res.cloudinary.com/dkuwlnejd/image/upload/v1707581286/Ecommerce/product-1-2_gdozjv.jpg', 'https://res.cloudinary.com/dkuwlnejd/image/upload/v1707581286/Ecommerce/product-1-1_y6vtpc.jpg', 'https://res.cloudinary.com/dkuwlnejd/image/upload/v1707581286/Ecommerce/product-6-2_u0ygxb.jpg', 'https://res.cloudinary.com/dkuwlnejd/image/upload/v1707581285/Ecommerce/product-6-1_uq0s7g.jpg'
  ]
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/*" element={<CustomerRoute />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
