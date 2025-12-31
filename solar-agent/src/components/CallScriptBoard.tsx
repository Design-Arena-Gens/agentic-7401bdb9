import type { ScriptStep } from "@/lib/scriptBuilder";

type CallScriptBoardProps = {
  script: ScriptStep[];
  completed: Record<string, boolean>;
  onToggleStep: (stepId: string) => void;
};

export function CallScriptBoard({
  script,
  completed,
  onToggleStep,
}: CallScriptBoardProps) {
  return (
    <section className="rounded-3xl border border-emerald-400/40 bg-gradient-to-b from-white/90 to-emerald-50/60 p-8 backdrop-blur-md shadow-xl shadow-emerald-900/10">
      <header className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-400">
            Talk track
          </p>
          <h2 className="text-2xl font-semibold text-slate-900">
            Solar call narrative
          </h2>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-sm shadow-emerald-900/5">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
          {Object.values(completed).filter(Boolean).length} / {script.length}{" "}
          steps locked
        </div>
      </header>

      <ol className="space-y-6">
        {script.map((step, index) => {
          const isComplete = completed[step.id] ?? false;

          return (
            <li
              key={step.id}
              className={`group relative overflow-hidden rounded-3xl border transition ${
                isComplete
                  ? "border-emerald-500 bg-white shadow-lg shadow-emerald-500/20"
                  : "border-white/60 bg-white/70 backdrop-blur"
              }`}
            >
              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600" />
              <div className="grid gap-4 p-6 md:grid-cols-[auto,1fr] md:gap-6 md:px-8 md:py-7">
                <button
                  onClick={() => onToggleStep(step.id)}
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl border text-sm font-semibold transition ${
                    isComplete
                      ? "border-transparent bg-emerald-500 text-white shadow-inner shadow-emerald-900/20"
                      : "border-emerald-400/50 bg-white text-emerald-500"
                  }`}
                  aria-label={`Mark ${step.label} as ${
                    isComplete ? "incomplete" : "complete"
                  }`}
                >
                  {isComplete ? "✓" : index + 1}
                </button>

                <div className="space-y-3">
                  <div className="flex flex-wrap items-start gap-3">
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-700">
                      {step.speaker}
                    </span>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {step.label}
                    </h3>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
                      {step.goal}
                    </span>
                  </div>

                  <p className="text-base leading-7 text-slate-700">
                    {step.script}
                  </p>

                  {step.tip && (
                    <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                      <span className="font-semibold">Coach tip:</span>{" "}
                      {step.tip}
                    </p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
