const BrandCard = ({ brand }) => {
    return (
        <>
            <div className="w-[200px] items-center rounded ">
                <img src={brand?.img} alt={brand?.name} className="py-3 grayscale hover:grayscale-0 hover:opacity-100 opacity-60 h-full w-full object-contain transition-all duration-200" />
            </div>
        </>
    );
}
export default BrandCard;