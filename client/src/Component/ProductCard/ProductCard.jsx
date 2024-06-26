import React from 'react';
import { TbShoppingBagPlus } from "react-icons/tb";
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../provider/AuthProvider';
import { calculateCartTotal, handleAddToCart } from '../../utility/cart-action';
import { truncateText } from '../../utility/truncateText';
import CustomRating from '../Rating/Rating';

export default function ProductCard({ item }) {
    const { currentUser, loading } = useAuthContext()
    const iscreateProduct = () => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const creationDate = new Date(item?.createdAt);
        return creationDate >= oneWeekAgo;
    };

    const percentage = ((item?.price - item?.discountedPrice) / item?.price) * 100
    return (
        <>
            <div className="card w-full bg-white group/card rounded-3xl border-[1px]  hover:shadow-lg">
                <div className="px-2 pt-2 relative overflow-hidden">
                    {/* product image */}
                    <Link to={`/product/${item.slug}/details`}>
                        <figure className="relative h-80 max-h-80 md:h-60 xl:h-[250px] overflow-hidden group transition-opacity duration-500 ease-in-out rounded-2xl">

                            {item?.productImages.length > 1 ? <>
                                <img
                                    src={item?.productImages[0]}
                                    alt={item.title}
                                    className="h-full w-full object-cover object-top rounded-2xl  transition-all duration-500 ease-in-out opacity-100 group-hover/card:opacity-0 absolute inset-0"
                                />
                                <img
                                    src={item?.productImages[1]}
                                    alt={item.title}
                                    className="h-full w-full object-cover rounded-2xl object-top transition-all duration-500 ease-in-out opacity-0 group-hover/card:opacity-100 absolute inset-0 group-hover/card:scale-105"
                                />
                            </> : <>
                                <img
                                    src={item?.productImages[0]}
                                    alt="Shoes"
                                    className="h-full w-full object-cover object-top  rounded-2xl"
                                />
                            </>}
                        </figure>
                    </Link>
                    {/* product badge */}
                    <div className={`absolute left-7 top-7 sm:left-5 sm:top-5 badge bg-main border-none gap-2 capitalize text-white text-[12px]`}>
                        {item?.discountedPrice ? (<>{percentage.toFixed()}% off</>) : iscreateProduct() ? 'new' : 'Hot'}
                    </div>
                </div>
                <div className="card-body pl-4 pb-5 -mt-6 items-start text-start">
                    {/* category */}
                    <div className="-mb-2 flex items-center gap-1 text-[#90908e] text-[14px]">
                        {item?.subcategory ? (
                            <>
                                <Link to={`/product-category/${item?.subcategory?.slug}`} className='text-[#90908e] text-[14px]'>{item.subcategory?.name}</Link>
                            </>
                        ) : (
                            <>
                                <Link to={`/product-category/${item?.category?.slug}`} className='text-[#90908e] text-[14px]'>{item.category?.name}</Link>
                            </>
                        )}
                    </div>

                    {/* product title */}
                    <h6 className="text-[16px] leading-5 sm:!leading-7 !font-bold text-gray-900  sm:card-title sm:!text-[18px] capitalize">
                        <Link to={`/product/${item?.slug}/details`}>
                            {truncateText(item?.title, 35, '...')}
                        </Link>
                    </h6>
                    {/* product rating */}
                    <span className={`${item?.reviews?.length ? 'inline-flex' : 'hidden'}`}>
                        <CustomRating />
                    </span>

                    {/* product price */}
                    <div className="space-x-3">
                        {item?.discountedPrice ? (
                            <>
                                <span className='text-[18px] font-bold text-main'>${item?.discountedPrice}</span>
                                <span className='text-[14px] line-through text-[#90908e]'>${item?.price}</span>
                            </>
                        ) : (
                            <span className='text-[18px] font-bold text-main'>${item?.price}</span>
                        )}
                    </div>

                    {/* product action */}
                    <div className="absolute right-5 bottom-4 tooltip tooltip-success before:bg-main before:text-white before:text-[12px] after:border-t-main" data-tip="Add To Cart">
                        <button className="btn btn-circle min-h-10 h-10 w-10 bg-[#e8f6ea]  hover:bg-main border-[#cce7d0] hover:text-white" onClick={() => handleAddToCart(item, 1, calculateCartTotal)}>
                            <TbShoppingBagPlus size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
