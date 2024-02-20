import React, { useState } from 'react';

const DynamicRating = ({ totalStars = 5, defaultRating = 0, onRatingChange }) => {
    const [rating, setRating] = useState(defaultRating);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
        if (onRatingChange) {
            onRatingChange(newRating);
        }
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= totalStars; i++) {
            stars.push(
                <input
                    key={i}
                    type="radio"
                    name="rating"
                    className={`mask mask-star-2 bg-orange-400`}
                    checked={i === rating}
                    onChange={() => handleRatingChange(i)}
                />
            );
        }
        return stars;
    };


    return (
        <div className="rating rating-xs">
            {renderStars()}
        </div>
    );
};

export default DynamicRating;
