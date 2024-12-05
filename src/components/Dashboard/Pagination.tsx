import React from "react";
import "../../styles/Pagination.scss";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const maxPageNumbersToShow = 6;

    // Function to determine the page numbers to display
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];

        // Always show the first page
        if (currentPage > 3) pages.push(1);

        // Add ellipsis if needed
        if (currentPage > 4) pages.push("...");

        // Determine start and end pages
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);

        for (let page = startPage; page <= endPage; page++) {
            pages.push(page);
        }

        // Add ellipsis after current range if needed
        if (currentPage + 3 < totalPages) pages.push("...");

        // Always show the last page
        if (currentPage + 2 < totalPages) pages.push(totalPages);

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="pagination">
            <div className="page-info">
                {/* Displaying items info */}
                Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}-
                {Math.min(currentPage * itemsPerPage, totalItems)} out of {totalItems}
            </div>
            <div className="page-controls">
                {/* Previous Button */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={currentPage === 1 ? "disabled" : ""}
                >
                    <IoIosArrowBack />
                </button>

                {/* Page Numbers */}
                <div className="page-numbers">
                    {pageNumbers.map((page, index) =>
                        typeof page === "number" ? (
                            <button
                                key={index}
                                className={currentPage === page ? "active" : ""}
                                onClick={() => onPageChange(page)}
                            >
                                {currentPage === page ? "..." : page}
                            </button>
                        ) : (
                            <span key={index} className="ellipsis">
                                {page}
                            </span>
                        )
                    )}
                </div>

                {/* Next Button */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={currentPage === totalPages ? "disabled" : ""}
                >
                    <IoIosArrowForward />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
