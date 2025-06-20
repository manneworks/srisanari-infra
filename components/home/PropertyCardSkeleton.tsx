'use client';

import { Skeleton } from "@/components/ui/skeleton"

export function PropertyCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
      <div className="relative h-48 overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
        <Skeleton className="h-6 w-3/4 mb-3" />
        <div className="space-y-2 flex-grow">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
        </div>
        <div className="mt-4">
          <Skeleton className="h-10 w-32 rounded-xl" />
        </div>
      </div>
    </div>
  )
}
