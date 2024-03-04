const BannerSliderItem = ({ img, promoText, buttonText, offterText, heading1, heading2, actions }) => {
    return (
        <>
            <div className="hero place-items-normal h-[500px] rounded-lg py-6 md:py-0">
                <div className="grid grid-cols-5 gap-8 md:gap-2">
                    <div className="col-span-5 md:col-span-2 md:pl-12 flex justify-center md:items-start items-center flex-col gap-1">
                        <h3 className="text-sm md:text-lg font-semibold">{promoText}</h3>
                        <h1 className="text-2xl md:text-5xl font-bold">{heading1}</h1>
                        <h1 className="text-2xl md:text-5xl text-main font-bold">{heading2}</h1>
                        <p className="py-4">{offterText}</p>
                        <button
                            onClick={actions}
                            className="btn bg-[#e8f6ea] border hover:bg-main hover:text-white z-50">{buttonText}
                        </button>
                    </div>

                    <img src={img} alt={heading1 || heading2} className="w-full col-span-5 md:col-span-3 md:-mb-24" />
                </div>
            </div>
        </>
    );
}
export default BannerSliderItem;