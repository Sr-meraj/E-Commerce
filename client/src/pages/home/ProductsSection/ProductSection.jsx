import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../../Component/ProductCard/ProductCard";
import { SkeletonCard } from "../../../Component/Skeleton/SkeletonCard";
import { axiosInstance } from "../../../utility/utility";

const ProductSection = () => {
    const navigate = useNavigate();
    const apiUrl = `products?limit=8`;
    const { isPending, error, data } = useQuery({
        queryKey: ['featuredProductData'],
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
    });

    const handleViewAllClick = () => {
        navigate('/shop');
    };

    return (
        <div className="">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Products</h2>
                <div className="">
                    <button className="btn btn-link" onClick={handleViewAllClick}>View All</button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-6">
                {isPending && (
                    <SkeletonCard count={8} />
                )}
                {error && (
                    <h1>{error?.errors || error?.message || error}</h1>
                )}
                {!isPending && !error && data && data.products.map((item, id) => (
                    <ProductCard key={id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default ProductSection;
