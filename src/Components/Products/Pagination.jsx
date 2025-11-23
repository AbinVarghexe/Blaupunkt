/* eslint-disable */
import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";

/**
 * Pagination Component - Navigation for product pages
 */
const Pagination = ({
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage,
}) =>
  totalPages > 1 && (
    <div className="flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-4 mt-6 sm:mt-8 w-full px-2">
      {/* Previous Button */}
      <motion.button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-myriad text-xs sm:text-sm transition-colors ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-blaupunkt-secondary text-white hover:bg-blaupunkt-secondary/90"
        }`}
        whileHover={currentPage !== 1 ? { scale: 1.03 } : {}}
        whileTap={currentPage !== 1 ? { scale: 0.97 } : {}}
      >
        <FiChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="hidden xs:inline">Previous</span>
      </motion.button>

      {/* Page Info */}
      <div className="flex items-center gap-1 sm:gap-2">
        <span className="text-blaupunkt-dark font-myriad text-xs sm:text-sm">
          Page {currentPage} of {totalPages}
        </span>
      </div>

      {/* Next Button */}
      <motion.button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-myriad text-xs sm:text-sm transition-colors ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-blaupunkt-secondary text-white hover:bg-blaupunkt-secondary/90"
        }`}
        whileHover={currentPage !== totalPages ? { scale: 1.03 } : {}}
        whileTap={currentPage !== totalPages ? { scale: 0.97 } : {}}
      >
        <span className="hidden xs:inline">Next</span>
        <FiChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
      </motion.button>
    </div>
  );

export default Pagination;
