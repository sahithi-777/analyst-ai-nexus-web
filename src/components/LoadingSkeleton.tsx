
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingSkeletonProps {
  type?: 'card' | 'list' | 'dashboard' | 'chat';
  count?: number;
}

const LoadingSkeleton = ({ type = 'card', count = 3 }: LoadingSkeletonProps) => {
  const renderCardSkeleton = () => (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-32 bg-gray-800" />
        <Skeleton className="h-8 w-8 rounded-full bg-gray-800" />
      </div>
      <Skeleton className="h-4 w-full bg-gray-800" />
      <Skeleton className="h-4 w-3/4 bg-gray-800" />
      <div className="flex items-center space-x-2">
        <Skeleton className="h-8 w-16 bg-gray-800" />
        <Skeleton className="h-8 w-20 bg-gray-800" />
      </div>
    </div>
  );

  const renderListSkeleton = () => (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
      <div className="flex items-center space-x-3">
        <Skeleton className="h-10 w-10 rounded bg-gray-800" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4 bg-gray-800" />
          <Skeleton className="h-3 w-1/2 bg-gray-800" />
        </div>
        <Skeleton className="h-6 w-16 bg-gray-800" />
      </div>
    </div>
  );

  const renderDashboardSkeleton = () => (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-64 bg-gray-800" />
        <Skeleton className="h-4 w-96 bg-gray-800" />
      </div>
      
      {/* Stats grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array(4).fill(0).map((_, i) => (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20 bg-gray-800" />
                <Skeleton className="h-6 w-12 bg-gray-800" />
              </div>
              <Skeleton className="h-8 w-8 rounded bg-gray-800" />
            </div>
          </div>
        ))}
      </div>
      
      {/* Content skeleton */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 space-y-4">
        <Skeleton className="h-6 w-48 bg-gray-800" />
        <div className="space-y-3">
          {Array(5).fill(0).map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <Skeleton className="h-12 w-12 rounded bg-gray-800" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-full bg-gray-800" />
                <Skeleton className="h-3 w-3/4 bg-gray-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderChatSkeleton = () => (
    <div className="space-y-4">
      {/* AI message */}
      <div className="flex items-start space-x-3">
        <Skeleton className="h-8 w-8 rounded-full bg-gray-800" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4 bg-gray-800" />
          <Skeleton className="h-4 w-1/2 bg-gray-800" />
        </div>
      </div>
      
      {/* User message */}
      <div className="flex items-start space-x-3 justify-end">
        <div className="flex-1 space-y-2 max-w-xs">
          <Skeleton className="h-4 w-full bg-blue-800 ml-auto" />
          <Skeleton className="h-4 w-2/3 bg-blue-800 ml-auto" />
        </div>
        <Skeleton className="h-8 w-8 rounded-full bg-gray-800" />
      </div>
    </div>
  );

  const skeletonMap = {
    card: renderCardSkeleton,
    list: renderListSkeleton,
    dashboard: renderDashboardSkeleton,
    chat: renderChatSkeleton,
  };

  if (type === 'dashboard') {
    return skeletonMap[type]();
  }

  return (
    <div className="space-y-4">
      {Array(count).fill(0).map((_, index) => (
        <div key={index}>
          {skeletonMap[type]()}
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
