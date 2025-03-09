import React from 'react';
import { calculatePageNumbers } from '@/lib/helpers/calculatePageNumbers';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import { ChevronRightIcon } from "lucide-react";

type Props = {
  totalPages: number,
  currentPage: number,
  oneSidePageNeighborsAmount?: number,
  className?: string
}

function Pagination({ totalPages, currentPage, oneSidePageNeighborsAmount = 1, className }: Props) {
  const pageNumbers = calculatePageNumbers({ totalPages, currentPage, oneSidePageNeighborsAmount });
  return (
    <div className={cn(className, 'flex items-center justify-center gap-2')}>
      {/* Previous page button */}
      {currentPage !== 1 && (
        <Link href={`?page=${currentPage - 1}`}>
          <button className='rounded-md bg-slate-200 p-2 hover:text-sky-600'>
            <ChevronLeftIcon className="w-4" />
          </button>
        </Link>
      )}

      {pageNumbers.map((pageNumber) => (
        <>
          {pageNumber === '...' && (
            <p className="cursor-not-allowed">...</p>
          )}
          {pageNumber === currentPage && (
            <button key={ pageNumber }
                    className='px-3 py-1 rounded-md transition bg-blue-500 text-white !cursor-default'>
              {pageNumber}
            </button>
          )}
          {(pageNumber !== '...' && pageNumber !== currentPage) && (
            <Link href={`/?page=${pageNumber}`}>
              <button key={ pageNumber } className='px-3 py-1 rounded-md transition bg-slate-200 hover:text-sky-600'>
                {pageNumber}
              </button>
            </Link>)
          }
        </>

      ))}

      {/* Next page button */}
      {currentPage !== totalPages && (
        <Link href={`/?page=${currentPage + 1}`}>
          <button className='rounded-md bg-slate-200 p-2 hover:text-sky-600'>
            <ChevronRightIcon className="w-4" />
          </button>
        </Link>
      )}
    </div>
  );
}

export default Pagination;