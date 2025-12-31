import type { FollowUp } from "@/lib/scriptBuilder";

type FollowUpBoardProps = {
  followUps: FollowUp[];
};

const urgencyColors = ["bg-emerald-100", "bg-emerald-200", "bg-emerald-300"];

export function FollowUpBoard({ followUps }: FollowUpBoardProps) {
  return (
    <section className="rounded-3xl border border-emerald-200 bg-white p-8 shadow-xl shadow-emerald-900/10">
      <header className="mb-4">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-500">
          Pipeline hygiene
        </p>
        <h2 className="text-2xl font-semibold text-slate-900">
          Follow-up queue
        </h2>
        <p className="text-sm text-slate-500">
          Tasks auto-sync with HubSpot and remind you before deadlines hit.
        </p>
      </header>

      <ul className="space-y-4">
        {followUps.map((item, index) => (
          <li
            key={item.id}
            className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-emerald-400 hover:bg-white"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-semibold text-emerald-800 ${urgencyColors[index] ?? urgencyColors[urgencyColors.length - 1]
                    }`}
                >
                  D+{item.dueInDays}
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-500">
                Automation ready
              </span>
            </div>
            <p className="text-sm text-slate-600">{item.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
