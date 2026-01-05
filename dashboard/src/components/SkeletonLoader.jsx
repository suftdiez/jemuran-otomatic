const SkeletonLoader = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-theme">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="h-8 w-48 rounded-lg animate-shimmer mb-2" />
            <div className="h-4 w-32 rounded animate-shimmer" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-24 rounded-full animate-shimmer" />
            <div className="h-10 w-10 rounded-full animate-shimmer" />
          </div>
        </div>

        {/* Banner Skeleton */}
        <div className="h-20 rounded-lg animate-shimmer mb-6" />

        {/* Metrics Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-3 w-16 rounded animate-shimmer mb-2" />
                  <div className="h-8 w-24 rounded animate-shimmer" />
                </div>
                <div className="h-12 w-12 rounded-xl animate-shimmer" />
              </div>
            </div>
          ))}
        </div>

        {/* Chart Skeleton */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="h-6 w-32 rounded animate-shimmer mb-2" />
              <div className="h-4 w-48 rounded animate-shimmer" />
            </div>
            <div className="h-10 w-24 rounded animate-shimmer" />
          </div>
          <div className="h-64 rounded-lg animate-shimmer" />
        </div>
      </div>

      {/* Bottom Bar Skeleton */}
      <div className="bottom-bar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 w-28 rounded-full animate-shimmer" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
