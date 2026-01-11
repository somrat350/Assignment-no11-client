// Donation Request Card Skeleton
const DonationRequestSkeleton = ({ index = 0 }) => (
  <div
    className={`skeleton p-4 rounded-2xl shadow-lg border-2 border-secondary/50 bg-base-300 animate-pulse skeleton-stagger-${
      (index % 4) + 1
    }`}
  >
    {/* Blood Group Badge Skeleton */}
    <div className="flex justify-end mb-2">
      <div className="w-16 h-10 bg-secondary/20 rounded-full"></div>
    </div>

    {/* Recipient Name Skeleton */}
    <div className="h-6 bg-secondary/20 rounded-md mb-2 w-3/4"></div>

    {/* Location Info Skeleton */}
    <div className="space-y-3 mb-2">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-secondary/20 rounded"></div>
        <div className="h-4 bg-secondary/20 rounded w-full"></div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-secondary/20 rounded"></div>
        <div className="h-4 bg-secondary/20 rounded w-4/5"></div>
      </div>
    </div>

    {/* Date and Time Skeleton */}
    <div className="space-y-3 mb-2">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-secondary/20 rounded"></div>
        <div className="h-4 bg-secondary/20 rounded w-2/3"></div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-secondary/20 rounded"></div>
        <div className="h-4 bg-secondary/20 rounded w-1/2"></div>
      </div>
    </div>

    {/* Hospital Skeleton */}
    <div className="flex items-center gap-2 mb-4">
      <div className="w-5 h-5 bg-secondary/20 rounded"></div>
      <div className="h-4 bg-secondary/20 rounded w-3/4"></div>
    </div>

    {/* Button Skeleton */}
    <div className="h-12 bg-secondary/20 rounded-full w-full"></div>
  </div>
);

// Search Bar Skeleton
const SearchBarSkeleton = () => (
  <div className="space-y-4 mb-8">
    {/* Search Input Skeleton */}
    <div className="relative max-w-md mx-auto">
      <div className="h-12 bg-base-200 rounded-full"></div>
    </div>

    {/* Filter Controls Skeleton */}
    <div className="flex justify-center items-center gap-4">
      <div className="h-10 w-32 bg-base-200 rounded-full"></div>
      <div className="h-10 w-24 bg-base-200 rounded-full"></div>
    </div>

    {/* Filter Panel Skeleton */}
    <div className="bg-base-200/50 rounded-2xl p-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="h-4 bg-base-300 rounded w-1/3"></div>
          <div className="h-10 bg-base-200 rounded-lg"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-base-300 rounded w-1/3"></div>
          <div className="h-10 bg-base-200 rounded-lg"></div>
        </div>
      </div>
    </div>

    {/* Results Summary Skeleton */}
    <div className="text-center">
      <div className="h-4 bg-base-300 rounded w-48 mx-auto"></div>
    </div>
  </div>
);

// Pagination Skeleton
const PaginationSkeleton = () => (
  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 p-4 bg-base-200/50 rounded-2xl">
    <div className="h-6 bg-base-300 rounded w-32"></div>
    <div className="flex items-center gap-2">
      <div className="h-8 w-16 bg-base-200 rounded-full"></div>
      <div className="h-8 w-16 bg-base-200 rounded-full"></div>
      <div className="flex gap-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-8 w-8 bg-base-200 rounded-full"
          ></div>
        ))}
      </div>
      <div className="h-8 w-16 bg-base-200 rounded-full"></div>
      <div className="h-8 w-16 bg-base-200 rounded-full"></div>
    </div>
  </div>
);

const SkeletonLoader = ({ type = "card", count = 4 }) => {
  if (type === "full-page") {
    return (
      <div className="px-5 py-10 w-full max-w-360 mx-auto">
        {/* Title Skeleton */}
        <div className="text-center mb-10">
          <div className="h-10 bg-base-300 rounded-lg w-80 mx-auto mb-4"></div>
        </div>

        {/* Search and Filters Skeleton */}
        <SearchBarSkeleton />

        {/* Cards Grid Skeleton */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-8">
          {[...Array(count)].map((_, index) => (
            <DonationRequestSkeleton key={index} index={index} />
          ))}
        </div>

        {/* Pagination Skeleton */}
        <PaginationSkeleton />
      </div>
    );
  }

  if (type === "cards-only") {
    return (
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {[...Array(count)].map((_, index) => (
          <DonationRequestSkeleton key={index} index={index} />
        ))}
      </div>
    );
  }

  // Default single card skeleton
  return <DonationRequestSkeleton index={0} />;
};

export default SkeletonLoader;
