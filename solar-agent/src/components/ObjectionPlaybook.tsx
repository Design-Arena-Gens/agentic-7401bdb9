import type { Objection } from "@/lib/scriptBuilder";

type ObjectionPlaybookProps = {
  objections: Objection[];
};

export function ObjectionPlaybook({ objections }: ObjectionPlaybookProps) {
  return (
    <section className="rounded-3xl border border-white/30 bg-slate-900/90 p-8 text-slate-100 shadow-xl shadow-slate-900/60">
      <header className="mb-6 flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">
          Objection handling
        </p>
        <h2 className="text-2xl font-semibold text-white">
          Real-time response library
        </h2>
        <p className="text-sm text-slate-400">
          Convert uncertainty into commitment with empathetic, data-backed
          replies.
        </p>
      </header>

      <div className="space-y-5">
        {objections.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-emerald-300/40 hover:bg-emerald-500/5"
          >
            <header className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-white">
                {item.title}
              </h3>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
                Use when: {item.whenToUse}
              </span>
            </header>

            <div className="space-y-3 text-sm leading-6 text-slate-200">
              <p className="rounded-xl bg-white/5 px-4 py-3 text-emerald-200">
                <span className="font-semibold uppercase tracking-wide text-emerald-300">
                  Homeowner:
                </span>{" "}
                {item.homeownerLine}
              </p>
              <p>
                <span className="font-semibold text-white">Agent:</span>{" "}
                {item.response}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
