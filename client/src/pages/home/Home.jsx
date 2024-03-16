import React from 'react';
import HomeBannerCarousel from '../../Component/Carousel/Home/HomeBannerCarousel';

import BrandSection from './BrandSection/BrandSection';
import FeaturedSection from './FeaturedSection';
import ProductOutlet from './outlet/ProductOutlet';
import ProductSliderSection from './ProductSliderSection/ProductSliderSection';
import ProductSection from './ProductsSection/ProductSection';

function Home() {
    return (
        <div className='container mx-auto px-4'>
            <div className="">
                <HomeBannerCarousel />
            </div>
            <div className="py-3">
                <FeaturedSection />
            </div>
            <div className="py-5">
                <ProductSection />
            </div>
            <div className="py-1">
                <ProductSliderSection />
            </div>
            <div className="py-1">
                <BrandSection />
            </div>

            <div>
                <ProductOutlet />
            </div>

        </div >
    )
}

export default Home
