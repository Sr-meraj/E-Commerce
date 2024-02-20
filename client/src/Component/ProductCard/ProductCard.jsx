import React from 'react';
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { TbShoppingBagPlus } from "react-icons/tb";
import { Link } from 'react-router-dom';


export default function ProductCard({ item }) {
    const isNewProduct = () => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const creationDate = new Date(item?.created_date);
        return creationDate >= oneWeekAgo;
    };
    return (
        <>
            <div className="card w-full group/card rounded-3xl border-[1px] hover:shadow-lg">
                <div className="px-2  pt-2 relative overflow-hidden">
                    {/* product image */}
                    <Link to={`/product/5`}>
                        <figure className="relative h-80 max-h-80 md:h-60 xl:h-[250px] overflow-hidden rounded-xl group transition-opacity duration-500 ease-in-out">

                            <img
                                src={item?.imageUrl || item?.image}
                                alt="Shoes"
                                className="h-full w-full object-cover object-top scale-95 rounded-2xl"
                            />
                            {/* <img
                            src="https://res.cloudinary.com/dkuwlnejd/image/upload/v1707581285/Ecommerce/product-6-1_uq0s7g.jpg"
                            alt="Shoes"
                            className="h-full w-full object-contain rounded-2xl  transition-all duration-500 ease-in-out opacity-100 group-hover/card:opacity-0 absolute inset-0"
                        />
                        <img
                            src="https://res.cloudinary.com/dkuwlnejd/image/upload/v1707581286/Ecommerce/product-6-2_u0ygxb.jpg"
                            alt="Shoes"
                            className="h-full w-full object-cover lg:object-bottom rounded-2xl transition-all duration-500 ease-in-out opacity-0 group-hover/card:opacity-100 absolute inset-0 group-hover/card:scale-105"
                        /> */}
                        </figure>
                    </Link>
                    {/* product badge */}
                    <div className={`absolute left-7 top-7 sm:left-5 sm:top-5 badge bg-[#088178] border-none gap-2 capitalize text-white text-[12px]`}>
                        {item?.discountPersent || item?.discount ? (<>{item?.discountPersent || item?.discount}</>) : isNewProduct() ? 'new' : 'Hot'}
                    </div>
                </div>
                <div className="card-body pl-4 pb-5 -mt-6 items-start text-start">
                    {/* category */}
                    <div className="-mb-2">
                        <a href={item?.secondLavelCategory} className='text-[#90908e] text-[14px]'>{item?.secondLavelCategory}</a>
                    </div>
                    {/* product title */}
                    <h6 className="text-[16px] leading-5 sm:!leading-7 !font-bold text-gray-900 sm:card-title sm:!text-[18px]">
                        <a href={`product/${item?.title}`}>
                            {item?.title}
                        </a>
                    </h6>
                    {/* product rating */}
                    <div className="rating rating-xs">
                        <FaStar color='#ffb300' size={12} />
                        <FaStar color='#ffb300' size={12} />
                        <FaStar color='#ffb300' size={12} />
                        <FaStar color='#ffb300' size={12} />
                        <FaStarHalfAlt color='#ffb300' size={12} />
                    </div>
                    {/* product price */}
                    <div className="space-x-3">
                        <span className='text-[18px] font-bold text-[#088178]'>${item?.price}</span>
                        <span className='text-[14px] line-through text-[#90908e]'>${item?.discountedPrice || item?.selling_price}</span>
                    </div>
                    {/* product action */}
                    <div className="absolute right-5 bottom-8 tooltip tooltip-success before:bg-[#088178] before:text-white before:text-[12px] after:border-t-[#088178]" data-tip="Add To Cart">
                        <button className="btn btn-circle min-h-10 h-10 w-10 bg-[#e8f6ea] hover:bg-[#088178] border-[#cce7d0] hover:text-white">
                            <TbShoppingBagPlus size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
