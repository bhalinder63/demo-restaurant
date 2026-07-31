import Header from "@/components/Header";
import Skeleton from "@/components/Skeleton";

export default function AdminLoading() {
  return (
    <div className="relative flex-1 bg-background">
      <Header />
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-4">
        <Skeleton className="mb-2 h-9 w-56" />
        <Skeleton className="mb-6 h-4 w-40" />
        <Skeleton className="mb-8 h-10 w-full" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-2xl" />
          ))}
        </div>
      </main>
    </div>
  );
}
