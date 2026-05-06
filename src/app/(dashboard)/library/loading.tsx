export default function Loading() {
  return <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">{Array.from({ length: 12 }).map((_, index) => <div key={index} className="aspect-[2/3] animate-pulse rounded-xl bg-bg-secondary" />)}</div>;
}
