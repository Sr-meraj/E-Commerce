import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import BrandCard from '../../../Component/BrandCard/BrandCard';



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
    return (
        <div>
            <h3 className="card-title "><span className="text-[#088178]">Featured</span> Brands</h3>
            <div className="slider-container py-4 md:py-6">
                <Slider {...settings} >
                    <BrandCard img={'https://wp.alithemes.com/html/evara/evara-frontend/assets/imgs/banner/brand-6.png'} />
                    <BrandCard img={'https://wp.alithemes.com/html/evara/evara-frontend/assets/imgs/banner/brand-1.png'} />
                    <BrandCard img={'https://wp.alithemes.com/html/evara/evara-frontend/assets/imgs/banner/brand-2.png'} />
                    <BrandCard img={'https://wp.alithemes.com/html/evara/evara-frontend/assets/imgs/banner/brand-3.png'} />
                    <BrandCard img={'https://wp.alithemes.com/html/evara/evara-frontend/assets/imgs/banner/brand-5.png'} />
                    <BrandCard img={'https://wp.alithemes.com/html/evara/evara-frontend/assets/imgs/banner/brand-4.png'} />
                </Slider>
            </div>

            <div className="flex justify-center items-center gap-6 py-6 hidden">
                <BrandCard img={'https://wp.alithemes.com/html/evara/evara-frontend/assets/imgs/banner/brand-6.png'} />
                <BrandCard img={'https://wp.alithemes.com/html/evara/evara-frontend/assets/imgs/banner/brand-1.png'} />
                <BrandCard img={'https://wp.alithemes.com/html/evara/evara-frontend/assets/imgs/banner/brand-2.png'} />
                <BrandCard img={'https://wp.alithemes.com/html/evara/evara-frontend/assets/imgs/banner/brand-3.png'} />
                <BrandCard img={'https://wp.alithemes.com/html/evara/evara-frontend/assets/imgs/banner/brand-5.png'} />
                <BrandCard img={'https://wp.alithemes.com/html/evara/evara-frontend/assets/imgs/banner/brand-4.png'} />
            </div>
        </div>
    );
}
export default BrandSection;