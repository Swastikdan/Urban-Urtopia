import React from 'react'
import PlaceLoader from '@/components/places/placecard/PlaceLoader'
export default function loading() {
  return (
    <div>
      <div className="flex min-h-[90vh] flex-col rounded-xl border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-slate-700/[.7]">
        <div className="flex flex-auto flex-col items-center justify-center p-4 md:p-5">
          <div className="flex justify-center">
            <div
              className="inline-block size-6 animate-spin rounded-full border-[3px] border-current border-t-transparent text-blue-600 dark:text-blue-500"
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>{' '}
    </div>
  );
}
