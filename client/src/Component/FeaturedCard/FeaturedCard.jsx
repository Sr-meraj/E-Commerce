import React from 'react';

export default function FeaturedCard({ className, title, icon }) {
    return (
        <div className={`${className} rounded-xl `}>
            <a
                className="flex justify-center items-center  rounded-xl py-2 shadow-sm"
                href=""
            >
                <span className="inline-block rounded-lg md:text-4xl text-2xl p-3 ">
                    {icon && icon}
                </span>

                <h2 className="py-1 px-2 text-md md:text-lg rounded-md font-bold capitalize ">{title && title}</h2>
            </a>
        </div>
    )
}
