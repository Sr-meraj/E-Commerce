import { Fragment } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import SampleNextArrow from "../../../Component/CarouselButton/SampleNextArrow";
import SamplePrevArrow from "../../../Component/CarouselButton/SamplePrevArrow";
import SliderProductCard from "../../../Component/ProductCard/SliderProductCard";
import { SkeletonCard } from "../../../Component/Skeleton/SkeletonCard";
import useDataFetching from "../../../hook/useDataFatching";


const ProductSliderSection = () => {
    const apiUrl = 'products?limit=15'
    const { data, loading, error } = useDataFetching(apiUrl)

    const settings = {
        autoplay: true,
        autoplaySpeed: 4600,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div>
            <h2 className="card-title "><span className="text-main">New</span> Arrivals</h2>
            <div className="slider-container py-4 md:py-6">
                {
                    loading && (
                        <div className="flex flex-nowrap  justify-center items-center gap-5">
                            <SkeletonCard count={6} />
                        </div>
                    )
                }
                <Slider {...settings} >

                    {
                        !loading && !error && data && data.products.map((item, id) => (
                            <Fragment key={id}>
                                <SliderProductCard item={item} />
                            </Fragment>
                        ))
                    }
                </Slider>
            </div>

        </div>
    );
}
export default ProductSliderSection;