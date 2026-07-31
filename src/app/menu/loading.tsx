import Header from "@/components/Header";
import Skeleton from "@/components/Skeleton";

export default function MenuLoading() {
  return (
    <div className="relative flex-1 bg-background">
      <Header />
      <main className="mx-auto max-w-page px-6 pb-24 pt-4">
        <Skeleton className="mb-2 h-9 w-48" />
        <Skeleton className="mb-6 h-4 w-72" />
        <Skeleton className="mb-8 h-6 w-40" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-surface p-5 shadow-sm ring-1 ring-black/5 dark:ring-white/10">
              <div className="mb-4 flex items-start gap-4">
                <Skeleton className="h-28 w-28 shrink-0 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="mb-2 h-4 w-3/4" />
                  <Skeleton className="mb-2 h-3 w-1/2" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
              <Skeleton className="h-9 w-full rounded-full" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
