const ListProductCard = () => {
    return (
        <>
            <div className="flex items-stretch gap-4">
                <img
                    src="https://res.cloudinary.com/dkuwlnejd/image/upload/v1707581286/Ecommerce/product-6-2_u0ygxb.jpg"
                    alt=""
                    className="aspect-square w-16 h-16 rounded-lg object-cover"
                />

                <div>
                    <h3 className="text-sm/tight text-gray-900 font-semibold">
                        <a href="">
                            Title goes here goes here Lorem, ipsum.
                        </a>
                    </h3>
                    {/* product price */}
                    <div className="space-x-3 mt-1">
                        <span className='text-[18px] font-bold text-[#088178]'>$238.23</span>
                        <span className='text-[14px] line-through text-[#90908e]'>$285.83</span>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ListProductCard;