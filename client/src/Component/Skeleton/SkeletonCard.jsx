import React from 'react';

const SkeletonCard = ({ count }) => {
    const skeletonItems = Array.from({ length: count }, (_, index) => (
        <div key={index} className="flex flex-col gap-2 w-full">
            <div className="skeleton h-16 sm:h-48 w-full mb-2"></div>
            <div className="skeleton h-2 sm:h-4 w-full"></div>
            <div className="skeleton h-2 sm:h-3 w-1/3"></div>
            <div className="skeleton h-2 sm:h-3 w-2/3"></div>
        </div>
    ));

    return <>{skeletonItems}</>;
};
const SkeletonListCard = ({ count }) => {
    const skeletonItems = Array.from({ length: count }, (_, index) => (
        <div key={index} className="grid grid-cols-5 gap-2 w-full mb-4">
            <div className="skeleton size-16"></div>
            <div className="col-span-4 space-y-2">
                <div className="skeleton h-3  w-full"></div>
                <div className="skeleton h-3 w-2/3"></div>
                <div className="skeleton h-3 w-2/3"></div>
            </div>
        </div>
    ));

    return <>{skeletonItems}</>;
};

export { SkeletonCard, SkeletonListCard };

