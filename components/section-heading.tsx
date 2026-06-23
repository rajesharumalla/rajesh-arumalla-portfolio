type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, align = "left" }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto mb-10 max-w-2xl text-center" : "mb-10 max-w-2xl"}>
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-amber">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">{title}</h2>
    </div>
  );
}
