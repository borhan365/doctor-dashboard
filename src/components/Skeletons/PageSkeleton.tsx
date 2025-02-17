import { Skeleton } from "@/components/ui/Skeleton";

export function PageSkeleton() {
  return (
    <div className="mx-auto max-w-4xl animate-pulse px-4 py-16 sm:px-6">
      {/* Thumbnail skeleton */}
      <div className="aspect-w-16 aspect-h-9 relative mb-12 rounded-2xl">
        <Skeleton className="h-[400px] w-full" />
      </div>

      {/* Title and content skeletons */}
      <div className="space-y-8">
        <Skeleton className="h-12 w-3/4" /> {/* Title */}
        <Skeleton className="h-8 w-2/3" /> {/* Subtitle */}
        {/* Content paragraphs */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
        </div>
        {/* Footer skeleton */}
        <div className="mt-12 border-t border-slate-100 pt-6">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-48" />
          </div>
        </div>
      </div>
    </div>
  );
}
