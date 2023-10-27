import { SkeletonScheduleCard } from "@/components";

export default function Loading() {
  return (
    <div>
      <div className="mt-5 grid gap-10">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonScheduleCard key={i} />
        ))}
      </div>
    </div>
  );
}
