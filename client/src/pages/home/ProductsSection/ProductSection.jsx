import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../../Component/ProductCard/ProductCard";
import { mensPantsPage1 } from '../../../config/ProductData/pants/men_page1';
const ProductSection = () => {
    const navigate = useNavigate()

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
                {
                    mensPantsPage1.slice(0, 8).map(item => <Fragment key={item.title}> <ProductCard item={item} /></Fragment>)
                }
            </div>
        </div>
    );
}
export default ProductSection;