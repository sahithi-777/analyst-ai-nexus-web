
import React from 'react';

interface MobileLoadingProps {
  type?: 'card' | 'list' | 'stats' | 'chat';
  count?: number;
}

const MobileLoading = ({ type = 'card', count = 3 }: MobileLoadingProps) => {
  const renderCardSkeleton = () => (
    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 animate-pulse">
      <div className="flex items-center justify-between mb-3">
        <div className="h-4 bg-gray-700 rounded w-24"></div>
        <div className="h-8 w-8 bg-gray-700 rounded-lg"></div>
      </div>
      <div className="h-6 bg-gray-700 rounded w-16 mb-2"></div>
      <div className="h-3 bg-gray-700 rounded w-20"></div>
    </div>
  );

  const renderListSkeleton = () => (
    <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50 animate-pulse">
      <div className="flex items-center space-x-3">
        <div className="h-10 w-10 bg-gray-700 rounded-lg"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-700 rounded w-32 mb-2"></div>
          <div className="h-3 bg-gray-700 rounded w-24"></div>
        </div>
      </div>
    </div>
  );

  const renderStatsSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 animate-pulse">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-3 bg-gray-700 rounded w-20 mb-2"></div>
              <div className="h-6 bg-gray-700 rounded w-16 mb-1"></div>
              <div className="h-3 bg-gray-700 rounded w-12"></div>
            </div>
            <div className="h-10 w-10 bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderChatSkeleton = () => (
    <div className="space-y-4 p-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-xs rounded-lg p-3 animate-pulse ${
            i % 2 === 0 ? 'bg-blue-600/20' : 'bg-gray-700/50'
          }`}>
            <div className="h-4 bg-gray-600 rounded w-32 mb-1"></div>
            <div className="h-4 bg-gray-600 rounded w-24"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const skeletons = {
    card: renderCardSkeleton,
    list: renderListSkeleton,
    stats: renderStatsSkeleton,
    chat: renderChatSkeleton,
  };

  if (type === 'stats' || type === 'chat') {
    return skeletons[type]();
  }

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>{skeletons[type]()}</div>
      ))}
    </div>
  );
};

export default MobileLoading;
