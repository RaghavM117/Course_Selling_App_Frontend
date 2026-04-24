// Full-page centered spinner
export function PageSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-2 border-bg-border" />
        <div className="absolute inset-0 rounded-full border-2 border-t-gold animate-spin-slow" />
      </div>
    </div>
  )
}

// Inline button spinner
export function ButtonSpinner() {
  return (
    <span className="inline-block w-4 h-4 rounded-full border-2 border-bg-base border-t-transparent animate-spin-slow" />
  )
}

// Skeleton card for course list loading
export function SkeletonCard() {
  return (
    <div className="bg-bg-raised border border-bg-border rounded-xl p-5 space-y-3">
      <div className="skeleton h-3 w-16 rounded-full" />
      <div className="skeleton h-4 w-3/4 rounded" />
      <div className="skeleton h-3 w-full rounded" />
      <div className="skeleton h-3 w-2/3 rounded" />
      <div className="flex justify-between items-center pt-2">
        <div className="skeleton h-6 w-16 rounded" />
        <div className="skeleton h-8 w-20 rounded-lg" />
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
