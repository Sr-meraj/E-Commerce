import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import BrandCard from '../../../Component/BrandCard/BrandCard';
import { SkeletonCard } from "../../../Component/Skeleton/SkeletonCard";
import useDataFetching from "../../../hook/useDataFatching";



function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <button className={`btn btn-circle w-8 h-8 min-h-8  bg-[#e8f6ea] hover:bg-[#088178] border-[#cce7d0] hover:text-white -top-14 absolute z-20  right-2`}
            onClick={onClick}
        >
            <RiArrowRightSLine size={20} />
        </button>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <button className={`btn btn-circle w-8 h-8 min-h-8  bg-[#e8f6ea] hover:bg-[#088178] border-[#cce7d0] hover:text-white -top-14 absolute z-20  right-12`}
            onClick={onClick}
        >
            <RiArrowLeftSLine size={20} />
        </button>
    );
}


const BrandSection = () => {
    const settings = {
        autoplay: true,
        autoplaySpeed: 4500,
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
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }
        ]
    };
    const apiUrl = 'brands'
    const { data, loading, error } = useDataFetching(apiUrl)
    console.log(data);
    return (
        <div>
            <h3 className="card-title "><span className="text-[#088178]">Featured</span> Brands</h3>
            <div className="slider-container py-4 md:py-6">
                {
                    loading && (
                        <div className="flex flex-nowrap  justify-center items-center gap-5">
                            <SkeletonCard count={6} />
                        </div>
                    )
                }
                <Slider {...settings} >
                    {!loading && !error && data && data.map((brand) => (
                        <BrandCard brand={brand} key={`${brand.name}-${brand._id}`} />
                    ))}
                </Slider>
            </div>
        </div>
    );
}
export default BrandSection;