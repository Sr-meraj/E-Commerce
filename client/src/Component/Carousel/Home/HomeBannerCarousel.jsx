import React from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import BannerSliderItem from "./BannerSliderItem";


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <button className={`btn btn-circle  bg-[#e8f6ea] hover:bg-main border-[#cce7d0] hover:text-white top-52 absolute z-20 right-0 md:-right-16 md:inline-flex hidden`}
            onClick={onClick}
        >
            <RiArrowRightSLine size={24} />
        </button>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <button className={`btn btn-circle  bg-[#e8f6ea] hover:bg-main border-[#cce7d0] hover:text-white top-52 absolute z-20 left-0 md:-left-16 md:inline-flex hidden`}
            onClick={onClick}
        >
            <RiArrowLeftSLine size={24} />
        </button>
    );
}

function HomeBannerCarousel() {
    const settings = {
        dots: true,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 3600,
        fade: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    return (
        <div className="slider-container">
            <Slider {...settings}>
                <BannerSliderItem
                    img={'https://wp.alithemes.com/html/evara/evara-frontend/assets/imgs/slider/slider-2.png'}
                    promoText="Hot promotions"
                    heading1="Fashion Tranding"
                    heading2="Great Collections"
                    buttonText="Shop now"
                    offterText="save more with coupons & up to 20% off"
                    action={() => console.log('slider1')}
                />
                <BannerSliderItem img={'https://wp.alithemes.com/html/evara/evara-frontend/assets/imgs/slider/slider-3.png'}
                    promoText="Upcomming Offer"
                    heading1="Big Deals From"
                    heading2="Manufacturer"
                    buttonText="Shop now"
                    offterText="save more with coupons & up to 20% off"
                    action={() => console.log('slider2')}
                />
            </Slider>
        </div>
    );
}


export default HomeBannerCarousel;