import React, { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

// const items = [
//     <div className="" data-value="1">
//         <img src='https://res.cloudinary.com/dkuwlnejd/image/upload/v1707581285/Ecommerce/product-6-1_uq0s7g.jpg' alt="" />
//     </div>,
//     <div className="" data-value="2">
//         <img src='https://res.cloudinary.com/dkuwlnejd/image/upload/v1707581286/Ecommerce/product-6-2_u0ygxb.jpg' alt="" />
//     </div>,
//     <div className="" data-value="3">
//         <img src='https://res.cloudinary.com/dkuwlnejd/image/upload/v1707581284/Ecommerce/product-4-2_jxz1xm.jpg' alt="" />
//     </div>,
//     <div className="" data-value="4">
//         <img src='https://res.cloudinary.com/dkuwlnejd/image/upload/v1707581284/Ecommerce/product-4-1_g7tvbq.jpg' alt="" />
//     </div>,
//     <div className="" data-value="5">
//         <img src='https://res.cloudinary.com/dkuwlnejd/image/upload/v1707581284/Ecommerce/product-4-1_g7tvbq.jpg' alt="" />
//     </div>,
//     <div className="" data-value="5">
//         <img src='https://res.cloudinary.com/dkuwlnejd/image/upload/v1707581284/Ecommerce/product-4-1_g7tvbq.jpg' alt="" />
//     </div>,
// ];

const thumbItems = (items, [setThumbIndex, setThumbAnimation]) => {
    return items.map((item, i) => (
        <div className="thumb max-w-28 md:max-w-40 w-full  px-2 -ml-3 active:border-4" onClick={() => (setThumbIndex(i), setThumbAnimation(true))}>
            {item}
        </div>
    ));
};

const ProductCarousel = ({ images }) => {
    const [mainIndex, setMainIndex] = useState(0);
    const [mainAnimation, setMainAnimation] = useState(false);
    const [thumbIndex, setThumbIndex] = useState(0);
    const [thumbAnimation, setThumbAnimation] = useState(false);
    const [thumbs] = useState(thumbItems(images, [setThumbIndex, setThumbAnimation]));


    const slideNext = () => {
        if (!thumbAnimation && thumbIndex < thumbs.length - 1) {
            setThumbAnimation(true);
            setThumbIndex((prev) => thumbIndex + 1);
        } else if (!thumbAnimation && thumbIndex === thumbs.length - 1) {
            // If at the end, reset to the first item
            setThumbAnimation(true);
            setThumbIndex(0);
        }
    };

    const slidePrev = () => {
        if (!thumbAnimation && thumbIndex > 0) {
            setThumbAnimation(true);
            setThumbIndex((prev) => thumbIndex - 1);
        } else if (!thumbAnimation && thumbIndex === 0) {
            // If at the beginning, go to the last item
            setThumbAnimation(true);
            setThumbIndex(thumbs.length - 1);
        }
    };
    const syncMainBeforeChange = (e) => {
        setMainAnimation(true);
    };

    const syncMainAfterChange = (e) => {
        setMainAnimation(false);

        if (e.type === 'action') {
            setThumbIndex(e.item);
            setThumbAnimation(false);
        } else {
            setMainIndex(thumbIndex);
        }
    };

    const syncThumbs = (e) => {
        setThumbIndex(e.item);
        setThumbAnimation(false);

        if (!mainAnimation) {
            setMainIndex(e.item);
        }
    };

    return [
        <AliceCarousel
            activeIndex={mainIndex}
            animationType="fadeout"
            animationDuration={800}
            disableDotsControls
            disableButtonsControls
            items={images}
            mouseTracking={!thumbAnimation}
            onSlideChange={syncMainBeforeChange}
            onSlideChanged={syncMainAfterChange}
            touchTracking={!thumbAnimation}
        />,
        <div className="thumbs relative overflow-hidden">
            <div className="px-">
                <AliceCarousel
                    activeIndex={thumbIndex}
                    autoWidth
                    disableDotsControls
                    disableButtonsControls
                    items={thumbs}
                    infinite
                    mouseTracking={false}
                    onSlideChanged={syncThumbs}
                    touchTracking={!mainAnimation}
                />
            </div>

            <div className="flex justify-between items-center absolute top-8 md:top-16 right-0 w-full">
                <div className="btn-prev btn btn-circle w-8 h-8 min-h-8  bg-[#e8f6ea] hover:bg-[#088178] border-[#cce7d0] hover:text-white" onClick={slidePrev}>
                    <RiArrowLeftSLine size={20} />
                </div>
                <div className="btn-next btn btn-circle w-8 h-8 min-h-8  bg-[#e8f6ea] hover:bg-[#088178] border-[#cce7d0] hover:text-white" onClick={slideNext}>
                    <RiArrowRightSLine size={20} />
                </div>
            </div>
        </div>
    ]
};
export default ProductCarousel;
