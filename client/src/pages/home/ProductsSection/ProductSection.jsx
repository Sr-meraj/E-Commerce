import axios from 'axios';
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../../Component/ProductCard/ProductCard";
import SkeletonCard from "../../../Component/Skeleton/SkeletonCard";

const ProductSection = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get data from API
    useEffect(() => {
        axios.get('http://localhost:4000/api/v1/products')
            .then(res => {
                if (res.data && res.data.data) {
                    setLoading(false);
                    setError(null);
                    setData(res.data.data);
                } else {
                    setError('Invalid data structure in the response');
                }
            })
            .catch(err => {
                setLoading(false);
                setError(err.message || 'An error occurred while fetching data');
            });
    }, []);

    return (
        <div className="">
            <div className="flex justify-between items-center">
                <div className="flex items-center justify-center gap-3">
                    <button className="btn bg-emerald-500 text-white">Featured</button>
                    <button className="btn hover:bg-[] hover:text-[#088178]">Popular</button>
                    <button className="btn">New added</button>
                </div>
                <div className=""><button className="btn btn-link" onClick={() => navigate('/shop')}>View All</button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-6">
                {loading && (
                    <SkeletonCard count={8} />
                )}
                {error && (
                    <h1>{error?.errors || error?.message || error}</h1>
                )}
                {!loading && !error && data && data.products.map((item, id) => (
                    <Fragment key={id}>
                        <ProductCard item={item} />
                    </Fragment>
                ))}
            </div>
        </div>
    );
}
export default ProductSection;