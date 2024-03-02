const ListProductCard = ({ item }) => {
    return (
        <>
            <div className="flex items-stretch gap-4">
                <img
                    src={item?.productImages[0]}
                    alt={item?.title}
                    className="aspect-square w-16 h-16 rounded-lg object-cover"
                />

                <div>
                    <h3 className="text-sm/tight text-gray-900 dark:text-slate-100 font-semibold">
                        <a href="">
                            {item?.title}
                        </a>
                    </h3>
                    {/* product price */}
                    <div className="space-x-3 mt-1">
                        {item?.discountedPrice ? (
                            <>
                                <span className='text-[16px] font-bold text-[#088178]'>${item?.discountedPrice}</span>
                                <span className='text-[14px] line-through text-[#90908e]'>${item?.price}</span>
                            </>
                        ) : (
                            <span className='text-[16px] font-bold text-[#088178]'>${item?.price}</span>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
export default ListProductCard;