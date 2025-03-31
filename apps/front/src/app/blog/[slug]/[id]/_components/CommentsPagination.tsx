import { calculatePageNumbers } from "@/lib/helpers/calculatePageNumbers";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import { ChevronRightIcon } from "lucide-react";
import React from "react";

type Props = {
  totalPages: number,
  currentPage: number,
  oneSidePageNeighborsAmount?: number,
  setCurrentPage: (page: number) => void,
  className?: string
}

const CommentsPagination = ({
                              totalPages,
                              currentPage,
                              oneSidePageNeighborsAmount = 2,
                              setCurrentPage,
                              className
                            }: Props) => {
  const pageNumbers = calculatePageNumbers({ totalPages, currentPage, oneSidePageNeighborsAmount });

  const handlePageClick = (page: number | string) => {
    if ( typeof page === 'number' && page > 0 && page <= totalPages ) {
      setCurrentPage(page)
    }
  }
  return (
    <div className={ cn(className, "flex justify-center items-center gap-2") }>
      {/* Previous page button */ }
      { currentPage !== 1 && (
        <button className='rounded-md bg-slate-200 p-2 hover:text-sky-600'
                onClick={ () => handlePageClick(currentPage - 1) }
          // disabled={ currentPage === 1 }
        >
          < ChevronLeftIcon className="w-4"/>
        </button>
      ) }

      { pageNumbers.map((pageNumber) => (
        <div key={ pageNumber }>
          { pageNumber === '...' && (
            <p className="cursor-not-allowed">...</p>
          ) }
          { pageNumber === currentPage && (
            <button
                    className='px-3 py-1 rounded-md transition bg-blue-500 text-white !cursor-default'
            >
              { pageNumber }
            </button>
          ) }
          { ( pageNumber !== '...' && pageNumber !== currentPage ) && (
            <button
                    className='px-3 py-1 rounded-md transition bg-slate-200 hover:text-sky-600'
                    onClick={ () => handlePageClick(pageNumber) }
            >
              { pageNumber }
            </button>
          ) }
        </div>

      )) }

      {/* Next page button */ }
      { currentPage !== totalPages && (
        <button className='rounded-md bg-slate-200 p-2 hover:text-sky-600'
                onClick={ () => handlePageClick(currentPage + 1) }
          // disabled={ currentPage === totalPages }
        >
          <ChevronRightIcon className="w-4"/>
        </button>
      ) }
    </div>
  )
    ;
}

export default CommentsPagination;