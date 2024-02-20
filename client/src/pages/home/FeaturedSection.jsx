
import { MdOutlineAutoGraph } from "react-icons/md";

import { LiaMoneyCheckAltSolid, LiaShippingFastSolid } from "react-icons/lia";
import { TbClock24 } from 'react-icons/tb';

import FeaturedCard from "../../Component/FeaturedCard/FeaturedCard";

const FeaturedSection = () => {
    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-4 md:gap-6 gap-3 py-7">
                <FeaturedCard title='Free Shipping' icon={<LiaShippingFastSolid />} className={'bg-[#faf6aa]/80'} />
                <FeaturedCard title='Save Money' icon={<LiaMoneyCheckAltSolid />} className='bg-[#aab6fa]/80' />
                <FeaturedCard title='Promotions' icon={<MdOutlineAutoGraph />} className={'bg-[#fedbef]/80'} />
                <FeaturedCard title='24/7 Supports' icon={<TbClock24 />} className={'bg-[#e8f6ea]/80'} />
            </div>
        </>
    );
}
export default FeaturedSection;