export function SirFahadTagline() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl border border-gold-500/20 bg-white px-8 py-10 shadow-card-rest sm:px-12 sm:py-14">
        <div className="text-center">
          <blockquote>
            <p className="font-display text-[26px] font-medium italic leading-[1.2] tracking-[-0.02em] text-navy-900 sm:text-[34px] lg:text-[40px]">
              There is no such thing as luck,
            </p>
            <p className="mt-3 font-display text-[26px] font-semibold italic leading-[1.2] tracking-[-0.02em] text-gold-500 sm:text-[34px] lg:text-[40px]">
              Believe in Hardwork.
            </p>
          </blockquote>

          <div className="mx-auto mt-10 flex max-w-xs items-center gap-4">
            <span
              aria-hidden
              className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-500/50"
            />
            <cite className="font-space text-[13px] font-semibold uppercase tracking-[0.28em] text-navy-900/50 not-italic">
              — FMP
            </cite>
            <span
              aria-hidden
              className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-500/50"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
