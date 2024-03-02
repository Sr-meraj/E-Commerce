import { RiArrowRightSLine } from "react-icons/ri";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <button className={`btn btn-circle w-8 h-8 min-h-8  bg-[#e8f6ea] hover:bg-[#088178] border-[#cce7d0] hover:text-white -top-12 md:-top-14 absolute z-20  right-2`}
            onClick={onClick}
        >
            <RiArrowRightSLine size={20} />
        </button>
    );
}

SampleNextArrow.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func
};
export default SampleNextArrow;