import React from 'react';

const SkeletonCard = ({ count }) => {
    const skeletonItems = Array.from({ length: count }, (_, index) => (
        <div key={index} className="flex flex-col gap-2 w-full">
            <div className="skeleton h-16 sm:h-40 w-full mb-2"></div>
            <div className="skeleton h-2 sm:h-4 w-full"></div>
            <div className="skeleton h-2 sm:h-3 w-1/3"></div>
            <div className="skeleton h-2 sm:h-3 w-2/3"></div>
        </div>
    ));

    return <>{skeletonItems}</>;
};

export default SkeletonCard;
