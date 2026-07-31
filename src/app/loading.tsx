import Header from "@/components/Header";
import Skeleton from "@/components/Skeleton";

export default function HomeLoading() {
  return (
    <div className="relative flex-1 bg-background">
      <Header />
      <div className="mx-auto grid max-w-page grid-cols-1 items-center gap-12 px-6 pb-24 pt-8 lg:grid-cols-2">
        <div>
          <Skeleton className="mb-3 h-4 w-24" />
          <Skeleton className="mb-2 h-12 w-full" />
          <Skeleton className="mb-6 h-12 w-3/4" />
          <Skeleton className="mb-8 h-16 w-full max-w-md" />
          <div className="flex gap-4">
            <Skeleton className="h-12 w-40 rounded-full" />
            <Skeleton className="h-12 w-40 rounded-full" />
          </div>
        </div>
        <Skeleton className="mx-auto h-80 w-80 rounded-full sm:h-96 sm:w-96" />
      </div>
      <section className="mx-auto max-w-page px-6 py-16">
        <Skeleton className="mb-10 h-9 w-64" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-2xl" />
          ))}
        </div>
      </section>
    </div>
  );
}
