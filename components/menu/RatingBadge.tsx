import { MessageCircle, Star } from "lucide-react";
import { cn } from "@/lib/cn";

interface RatingBadgeProps {
  rating: number;
  reviewCount: number;
  variant?: "default" | "compact";
  className?: string;
}

export function RatingBadge({
  rating,
  reviewCount,
  variant = "default",
  className,
}: RatingBadgeProps) {
  if (variant === "compact") {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-1 rounded-full bg-accent-from px-2 py-0.5 text-[11px] font-semibold text-on-accent",
          className,
        )}
      >
        <Star className="h-3 w-3 fill-on-accent text-on-accent" aria-hidden />
        <span>{rating.toFixed(1)}</span>
        {reviewCount > 0 && (
          <>
            <MessageCircle className="h-3 w-3 opacity-90" aria-hidden />
            <span>{reviewCount}</span>
          </>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-medium text-text",
        className,
      )}
    >
      <Star className="h-3.5 w-3.5 fill-accent-to text-accent-to" aria-hidden />
      <span>{rating.toFixed(1)}</span>
      {reviewCount > 0 && (
        <span className="text-text-muted">({reviewCount})</span>
      )}
    </div>
  );
}
