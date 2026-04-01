"use client";

import Link from "next/link";

interface ModuleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor?: string;
  href?: string;
}

export default function ModuleCard({
  icon,
  title,
  description,
  accentColor = "rgba(0, 212, 255, 0.3)",
  href,
}: ModuleCardProps) {
  const content = (
    <>
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${accentColor}, transparent 40%)`,
        }}
        aria-hidden="true"
      />
      <div className="relative z-10">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-deep-space-lighter text-neon-blue transition-colors group-hover:bg-neon-blue/10">
          {icon}
        </div>
        <h3 className="mb-2 text-lg font-bold text-text-primary">
          {title}
          {href && (
            <span className="ml-2 inline-block text-neon-blue opacity-0 transition-opacity group-hover:opacity-100">
              &rarr;
            </span>
          )}
        </h3>
        <p className="text-sm leading-relaxed text-text-secondary">
          {description}
        </p>
      </div>
    </>
  );

  const className =
    "group relative block rounded-2xl border border-border-glow bg-surface/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-neon-blue/30 hover:bg-surface-hover";

  if (href) {
    return (
      <Link
        href={href}
        className={className}
        style={{ "--card-accent": accentColor } as React.CSSProperties}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      className={className}
      style={{ "--card-accent": accentColor } as React.CSSProperties}
    >
      {content}
    </div>
  );
}
