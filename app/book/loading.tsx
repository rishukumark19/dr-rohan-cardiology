export default function BookingLoading() {
  return (
    <div className="min-h-screen bg-surface-container-low pb-24 md:pb-0">
      <div className="max-w-2xl mx-auto px-margin py-space-xl">
        {/* Progress skeleton */}
        <div className="mb-space-lg flex items-center gap-space-xs">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="flex items-center gap-space-xs flex-1 last:flex-none">
              <div className="w-7 h-7 rounded-full bg-surface-container-high animate-pulse" />
              {i < 7 && <div className="h-0.5 flex-1 bg-surface-container-high rounded-full animate-pulse" />}
            </div>
          ))}
        </div>
        {/* Card skeleton */}
        <div className="bg-surface-container-lowest rounded-xl shadow-card p-space-lg flex flex-col gap-space-md">
          <div className="h-7 w-48 bg-surface-container-high rounded-full animate-pulse" />
          <div className="h-4 w-72 bg-surface-container rounded-full animate-pulse" />
          <div className="grid grid-cols-2 gap-space-md mt-space-sm">
            {[1, 2].map((i) => (
              <div key={i} className="h-36 rounded-lg bg-surface-container-high animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
