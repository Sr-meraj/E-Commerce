// import React, { useState } from 'react';

// const DynamicRating = ({ totalStars = 5, defaultRating = 0, onRatingChange, readOnly = true }) => {
//     const [rating, setRating] = useState(defaultRating);

//     const handleRatingChange = (newRating) => {
//         setRating(newRating);
//         if (onRatingChange) {
//             onRatingChange(newRating);
//         }
//     };

//     const renderStars = () => {
//         const stars = [];
//         for (let i = 1; i <= totalStars; i++) {
//             stars.push(
//                 <input
//                     key={i}
//                     type="radio"
//                     name="rating"
//                     className={`mask mask-star-2 bg-[#ffb300]`}
//                     checked={i === rating}
//                     onChange={() => handleRatingChange(i)}
//                     readOnly={false}
//                 />
//             );
//         }
//         return stars;
//     };


//     return (
//         <div className="rating rating-xs">
//             {renderStars()}
//         </div>
//     );
// };

// export default DynamicRating;
import React, { useState } from 'react';

const CustomRating = ({ defaultRating }) => {
    const [rating, setRating] = useState(defaultRating || 0);
    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    return (
        <div className="">

            {/* <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={`text-3xl cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-300'
                            }`}
                        onClick={() => handleRatingChange(star)}
                    >
                        ★
                    </span>
                ))}
            </div> */}

            <div className="rating rating-xs">
                {Array.from({ length: 5 }).map((_, index) => (
                    <input type="radio" name="rating-5"
                        key={index}
                        className={`mask mask-star-2 ${index + 1 <= rating ? 'bg-yellow-500' : 'bg-gray-300'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default CustomRating;
