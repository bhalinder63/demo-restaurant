import Header from "@/components/Header";
import Skeleton from "@/components/Skeleton";

export default function AdminMenuLoading() {
  return (
    <div className="relative flex-1 bg-background">
      <Header />
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-4">
        <Skeleton className="mb-6 h-9 w-56" />
        <Skeleton className="mb-8 h-10 w-full" />
        <div className="mb-6 flex justify-end">
          <Skeleton className="h-10 w-40 rounded-full" />
        </div>
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-2xl" />
          ))}
        </div>
      </main>
    </div>
  );
}
