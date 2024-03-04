import React, { useEffect, useState } from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const [pages, setPages] = useState([]);

    useEffect(() => {
        // Create an array of page numbers
        const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
        setPages(pageNumbers);
    }, [totalPages]);

    if (!pages.length) return null;

    return (
        <div className="pagination-container flex justify-center gap-1 text-xs font-medium mt-10">
            <button
                className={`inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous Page"
            >
                &laquo;
            </button>

            <div className="pagination space-x-2">
                {pages.map((page) => (
                    <button
                        key={page}
                        className={`inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 hover:bg-main hover:text-white ${page === currentPage ? 'bg-main text-white' : ''}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                className={`inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 ${currentPage === totalPages ? 'disabled' : ''}`}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next Page"
            >
                &raquo;
            </button>
        </div>
    );
};

export default Pagination;
