export default function LabelRow({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-baseline gap-3.5 mb-14">
      <span className="text-[13px] text-accent tracking-wide font-medium">{index}</span>
      <span className="h-px flex-1 max-w-[100px] bg-line" />
      <span className="text-[13px] uppercase tracking-widest text-muted">{label}</span>
    </div>
  );
}
