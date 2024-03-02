import React, { Fragment } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import ListProductCard from '../../../Component/ProductCard/ListProductCard';
import { SkeletonListCard } from '../../../Component/Skeleton/SkeletonCard';
import useDataFetching from '../../../hook/useDataFatching';

export default function ProductOutlet() {
    const descendingUrl = 'products?limit=3';
    const ascendingUrl = 'products?sort=createdAt&order=asc&limit=3';

    const { data: descendingData, loading: descendingLoading, error: descendingError } = useDataFetching(descendingUrl);
    const { data: ascendingData, loading: ascendingLoading, error: ascendingError } = useDataFetching(ascendingUrl);

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
                    <ProductSection title="Deals & Outlet" loading={descendingLoading} error={descendingError} data={descendingData} />
                    <ProductSection title="Hot Releases" loading={ascendingLoading} error={ascendingError} data={ascendingData} />
                </div>
            </div>
        </>
    )
}


const ProductSection = ({ title, loading, error, data }) => (
    <div className="space-y-3">
        <h4 className="font-medium text-lg/tight pb-5">
            {title}
            <span className="block mt-2 h-[1px] bg-slate-300 after:block after:h-[2px] after:w-12 after:bg-[#088178]"></span>
        </h4>
        <div className="space-y-7">
            {loading ? (
                <SkeletonListCard count={3} />
            ) : !error && data && data.products ? (
                data.products.map((item, id) => (
                    <Fragment key={id}>
                        <ListProductCard item={item} />
                    </Fragment>
                ))
            ) : null}
        </div>
    </div>
);