import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { cn } from "../../utility/utility";

import React, { useEffect, useState } from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const [pages, setPages] = useState([]);

    useEffect(() => {
        // Create an array of page numbers
        const pageNumbers = Array.from({ length: totalPages }, (_, index) => index);
        setPages(pageNumbers);
    }, [totalPages]);

    if (!pages.length) return null;

    return (
        <div className="pagination-container flex justify-center gap-1 text-xs font-medium mt-10">
            <button
                className={`inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white hover:bg-main hover:text-white text-gray-900 rtl:rotate-180 ${currentPage === 0 ? 'disabled:bg-slate-200 hover:text-black' : ''}`}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
                aria-label="Previous Page"
            >
                <IoIosArrowBack />
            </button>

            <div className="pagination space-x-2">
                {pages.map((page) => (
                    <button
                        key={page}
                        className={cn(`inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 hover:bg-main hover:text-white`, `${page === currentPage ? 'bg-main text-white' : ''}`)}
                        onClick={() => onPageChange(page)}
                    >
                        {page + 1}
                    </button>
                ))}
            </div>

            <button
                className={`inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white hover:bg-main hover:text-white text-gray-900 rtl:rotate-180 ${currentPage === totalPages - 1 ? ' disabled:bg-slate-200 hover:text-black' : ''}`}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                aria-label="Next Page"
            >
                <IoIosArrowForward />
            </button>
        </div>
    );
};

export default Pagination;
