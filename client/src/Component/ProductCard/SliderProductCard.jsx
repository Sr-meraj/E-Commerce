import { cn } from "../../utility/utility";

const SliderProductCard = ({ item, className }) => {
    const Title = 'Colorful Pattern Shirts'
    return (
        <>
            <div className="card px-3 my-3 -ml-3 w-full group/card hover:-translate-y-3 transition-transform duration-300 overflow-hidden">
                <div className=" relative overflow-hidden ">
                    {/* product image */}
                    <figure className={cn("relative h-40 max-h-min md:h-40  overflow-hidden rounded-xl group transition-opacity duration-500 ease-in-out", className)}>
                        <img
                            src="https://res.cloudinary.com/dkuwlnejd/image/upload/v1707581285/Ecommerce/product-6-1_uq0s7g.jpg"
                            alt="Shoes"
                            className="h-full w-full object-cover rounded-xl  transition-all duration-500 ease-in-out opacity-100 group-hover/card:opacity-0 absolute inset-0 object-bottom"
                            style={{ objectFit: 'cover' }}
                        />
                        <img
                            src="https://res.cloudinary.com/dkuwlnejd/image/upload/v1707581286/Ecommerce/product-6-2_u0ygxb.jpg"
                            alt="Shoes"
                            className="h-full w-full object-cover rounded-xl transition-all duration-500 ease-in-out opacity-0 group-hover/card:opacity-100 absolute inset-0 object-bottom group-hover/card:scale-105 "
                            style={{ objectFit: 'cover' }}
                        />
                    </figure>
                    {/* product badge */}
                    <div className={`absolute left-2 top-2 badge badge-success gap-2 capitalize text-white md:text-[12px] text-[9px] h-4 md:h-fit`}>
                        new
                    </div>
                </div>
                <div className="card-body pl-5 pb-5 -mt-6 items-center text-center overflow-hidden">
                    {/* product title */}
                    <h6 className="card-title text-[14px] md:text-[16px] leading-5 font-bold">
                        <a href={item?.title} >
                            {Title}
                        </a>
                    </h6>
                    {/* product rating */}
                    <div className="rating rating-xs">
                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-yellow-400" />
                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-yellow-400" />
                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-yellow-400" />
                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-yellow-400" checked />
                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-yellow-400" />
                    </div>
                    {/* product price */}
                    <div className="space-x-3">
                        <span className='text-[16px] font-bold text-[#088178]'>$238.23</span>
                        <span className='text-[14px] line-through text-[#90908e]'>$285.83</span>
                    </div>

                </div>
            </div>
        </>
    );
}
export default SliderProductCard;