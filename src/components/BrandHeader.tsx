import { Link } from "@tanstack/react-router";

export function BrandHeader({ subtitle }: { subtitle?: string }) {
  return (
    <header className="border-b border-border bg-navy text-navy-foreground">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-navy-foreground/10 font-display text-base font-bold ring-1 ring-navy-foreground/20">
            A
          </span>
          <span className="leading-tight">
            <span className="block font-display text-sm font-bold tracking-tight">ALPHA ACADEMY</span>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-navy-foreground/60">
              From Learning to Leading
            </span>
          </span>
        </Link>
        {subtitle ? (
          <span className="hidden text-xs uppercase tracking-[0.2em] text-navy-foreground/70 sm:block">
            {subtitle}
          </span>
        ) : null}
      </div>
    </header>
  );
}
