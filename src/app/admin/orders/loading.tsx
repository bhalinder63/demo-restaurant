import Header from "@/components/Header";
import Skeleton from "@/components/Skeleton";

export default function AdminOrdersLoading() {
  return (
    <div className="relative flex-1 bg-background">
      <Header />
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-4">
        <Skeleton className="mb-6 h-9 w-56" />
        <Skeleton className="mb-8 h-10 w-full" />
        <div className="flex flex-col gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-2xl" />
          ))}
        </div>
      </main>
    </div>
  );
}
