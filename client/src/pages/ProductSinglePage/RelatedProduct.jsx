import { useQuery } from "@tanstack/react-query";
import { Fragment } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import SliderProductCard from "../../Component/ProductCard/SliderProductCard";
import { axiosInstance } from "../../utility/utility";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <button className={`btn btn-circle w-8 h-8 min-h-8  bg-[#e8f6ea] hover:bg-main border-[#cce7d0] hover:text-white -top-20 absolute z-20  right-2`}
            onClick={onClick}
        >
            <RiArrowRightSLine size={20} />
        </button>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <button className={`btn btn-circle w-8 h-8 min-h-8  bg-[#e8f6ea] hover:bg-main border-[#cce7d0] hover:text-white -top-20 absolute z-20  right-12`}
            onClick={onClick}
        >
            <RiArrowLeftSLine size={20} />
        </button>
    );
}
const RelatedProduct = ({ showItem, data }) => {
    const settings = {
        autoplay: true,
        autoplaySpeed: 4600,
        infinite: true,
        slidesToShow: showItem,
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
                    slidesToShow: 4,
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
    const apiUrl = `products/category/${data?.category?._id}`;
    const { isPending, error, data: rltData } = useQuery({
        queryKey: ['relatedProductData'],
        queryFn: async () => {
            const { data } = await axiosInstance.get(
                apiUrl,
            )
            if (data.success) {
                return data.data;
            } else {
                throw new Error('Failed to fetch products');
            }
        },
    })
    // exicute all data expect the data provided
    // Check for errors
    if (error) {
        return <p>An error has occurred: {error.message}</p>;
    }

    // Check if data is not an array
    if (!Array.isArray(rltData)) {
        return <p>No related products found.</p>;
    }

    // Filter related products
    const relatedProducts = rltData.filter(item => item._id !== data?._id);


    return (
        <div>
            <h4 className='font-medium text-2xl pb-5'>
                Related Product's
                <span className='block mt-2 h-px bg-slate-300 after:block after:h-[3px] after:w-20 after:bg-main'></span>
            </h4>
            <div className="slider-container py-4">
                {isPending && (
                    <div className="flex flex-nowrap  justify-center items-center gap-5">
                        <SkeletonCard count={4} /> {/* Adjust the count as needed */}
                    </div>
                )}
                {!isPending && relatedProducts.length === 0 && (
                    <p>No related products found.</p>
                )}
                {!isPending && relatedProducts.length > 0 && (
                    <div className="slider-container py-4">
                        <Slider {...settings} >
                            {relatedProducts.map((item) => (
                                <Fragment key={item}>
                                    <SliderProductCard item={item} className={`${showItem < 5 ? 'h-44 md:h-[280px]' : ''}`} />
                                </Fragment>
                            ))}
                        </Slider>
                    </div>
                )}
            </div>
        </div>
    );
}
export default RelatedProduct;