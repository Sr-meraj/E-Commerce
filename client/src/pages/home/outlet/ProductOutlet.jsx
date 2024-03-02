import React, { Fragment } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import ListProductCard from '../../../Component/ProductCard/ListProductCard';
import SkeletonCard from '../../../Component/Skeleton/SkeletonCard';
import useDataFetching from '../../../hook/useDataFatching';

export default function ProductOutlet() {
    const apiUrl = 'products?limit=9';
    const { data, loading, error } = useDataFetching(apiUrl)

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-y-10 gap-x-0 md:gap-y-0 md:gap-x-8 items-stretch py-6 md:py-10">
                <article className="relative overflow-hidden rounded-lg shadow transition">
                    <img
                        alt=""
                        src="https://wp.alithemes.com/html/evara/evara-frontend/assets/imgs/banner/banner-10.jpg"
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="relative  h-full flex items-center">
                        <div className="p-4 sm:p-6">
                            <time dateTime="2022-10-10" className="block text-xs text-gray-600"> 10th Oct 2022 </time>

                            <a href="#">
                                <h3 className="mt-0.5 text-xl text-black font-semibold">Save 17% on <br />
                                    All Items</h3>
                            </a>

                            <a href='' className="mt-2 flex justify-start items-center gap-3 line-clamp-3 text-sm/relaxed text-[#088178]">
                                Shop now <FaArrowRight />
                            </a>
                        </div>
                    </div>
                </article>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-3">
                    <div className="space-y-3">
                        <h4 className='font-medium text-lg/tight pb-5'>
                            Deals & Outlet
                            <span className='block mt-2 h-[1px] bg-slate-300 after:block after:h-[2px] after:w-12 after:bg-[#088178]'></span>
                        </h4>
                        <div className="space-y-7">
                            {
                                loading && (
                                    <div>
                                        <SkeletonCard count={3} />
                                    </div>
                                )
                            }
                            {
                                !loading && !error && data && data.products.slice(0, 3).map((item, id) => (
                                    <Fragment key={id}>
                                        <ListProductCard item={item} />
                                    </Fragment>
                                ))
                            }
                        </div>

                    </div>

                    <div className=" space-y-3">
                        <h4 className='font-medium text-lg/tight pb-5'>
                            Hot Releases
                            <span className='block mt-2 h-[1px] bg-slate-300 after:block after:h-[2px] after:w-12 after:bg-[#088178]'></span>
                        </h4>
                        <div className="space-y-7">
                            {
                                loading && (
                                    <div>
                                        <SkeletonCard count={3} />
                                    </div>
                                )
                            }
                            {
                                !loading && !error && data && data.products.slice(0, 3).map((item, id) => (
                                    <Fragment key={id}>
                                        <ListProductCard item={item} />
                                    </Fragment>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
