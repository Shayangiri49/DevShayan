import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  className?: string;
}

export default function ProgressBar({ value, className }: ProgressBarProps) {
  return (
    <div className={cn("w-full bg-muted rounded-full h-2", className)}>
      <div 
        className="bg-primary h-full rounded-full transition-all duration-500 ease-in-out"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
