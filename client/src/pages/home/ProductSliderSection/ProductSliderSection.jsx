import { Fragment } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import SliderProductCard from "../../../Component/ProductCard/SliderProductCard";
import SkeletonCard from "../../../Component/Skeleton/SkeletonCard";
import useDataFetching from "../../../hook/useDataFatching";


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <button className={`btn btn-circle w-8 h-8 min-h-8  bg-[#e8f6ea] hover:bg-[#088178] border-[#cce7d0] hover:text-white -top-12 md:-top-14 absolute z-20  right-2`}
            onClick={onClick}
        >
            <RiArrowRightSLine size={20} />
        </button>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <button className={`btn btn-circle w-8 h-8 min-h-8  bg-[#e8f6ea] hover:bg-[#088178] border-[#cce7d0] hover:text-white -top-12 md:-top-14 absolute z-20  right-12`}
            onClick={onClick}
        >
            <RiArrowLeftSLine size={20} />
        </button>
    );
}
const ProductSliderSection = () => {
    const apiUrl = 'http://localhost:4000/api/v1/products'
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
            <h2 className="card-title "><span className="text-[#088178]">New</span> Arrivals</h2>
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