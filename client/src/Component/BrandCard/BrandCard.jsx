const BrandCard = ({ brand }) => {
    return (
        <>
            <div className="size-36 items-center rounded ">
                <img src={brand?.image} alt={brand?.name} className="py-3 grayscale hover:grayscale-0 hover:opacity-100 opacity-60 h-full w-full object-contain transition-all duration-200" />
            </div>
        </>
    );
}
export default BrandCard;