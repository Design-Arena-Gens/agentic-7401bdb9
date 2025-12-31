import { useState } from "react";
import {
  defaultProspectProfile,
  type ProspectProfile,
} from "@/lib/scriptBuilder";

type CallScenarioFormProps = {
  onGenerate: (profile: ProspectProfile) => void;
};

const roofOptions = ["Shingle", "Tile", "Metal", "Flat"];

const energyGoals = [
  "Lower my energy bill",
  "Energy independence",
  "Charge my EV cheaply",
  "Boost sustainability",
];

const intents = [
  "Curious / Researching",
  "Ready for a quote",
  "Referred by neighbor",
];

const timelines = ["ASAP (next 30 days)", "Next 2-3 months", "Just exploring"];

export function CallScenarioForm({ onGenerate }: CallScenarioFormProps) {
  const [profile, setProfile] = useState<ProspectProfile>(() => ({
    ...defaultProspectProfile,
  }));

  return (
    <section className="rounded-3xl border border-white/10 bg-white/60 p-8 backdrop-blur-md shadow-xl shadow-emerald-900/5">
      <header className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Call setup
          </p>
          <h2 className="text-2xl font-semibold text-slate-900">
            Personalize the homeowner profile
          </h2>
        </div>
        <div className="hidden flex-col items-end text-xs text-slate-500 md:flex">
          <span>Live utility data refreshed weekly</span>
          <span>Updated incentives synced automatically</span>
        </div>
      </header>

      <form
        className="grid gap-6 md:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          onGenerate(profile);
        }}
      >
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Homeowner name
          <input
            value={profile.homeownerName}
            onChange={(event) =>
              setProfile((current) => ({
                ...current,
                homeownerName: event.target.value,
              }))
            }
            placeholder="Homeowner"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base font-normal text-slate-900 shadow-sm shadow-emerald-900/5 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/60"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Utility provider
          <input
            value={profile.utility}
            onChange={(event) =>
              setProfile((current) => ({
                ...current,
                utility: event.target.value,
              }))
            }
            placeholder="Utility company"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base font-normal text-slate-900 shadow-sm shadow-emerald-900/5 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/60"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Roof type
          <select
            value={profile.roofType}
            onChange={(event) =>
              setProfile((current) => ({
                ...current,
                roofType: event.target.value,
              }))
            }
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-base font-normal text-slate-900 shadow-sm shadow-emerald-900/5 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/60"
          >
            {roofOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Primary energy goal
          <select
            value={profile.energyGoal}
            onChange={(event) =>
              setProfile((current) => ({
                ...current,
                energyGoal: event.target.value,
              }))
            }
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-base font-normal text-slate-900 shadow-sm shadow-emerald-900/5 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/60"
          >
            {energyGoals.map((goal) => (
              <option key={goal} value={goal}>
                {goal}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Call intent
          <select
            value={profile.callIntent}
            onChange={(event) =>
              setProfile((current) => ({
                ...current,
                callIntent: event.target.value,
              }))
            }
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-base font-normal text-slate-900 shadow-sm shadow-emerald-900/5 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/60"
          >
            {intents.map((intent) => (
              <option key={intent} value={intent}>
                {intent}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Decision timeline
          <select
            value={profile.timeline}
            onChange={(event) =>
              setProfile((current) => ({
                ...current,
                timeline: event.target.value,
              }))
            }
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-base font-normal text-slate-900 shadow-sm shadow-emerald-900/5 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/60"
          >
            {timelines.map((timeline) => (
              <option key={timeline} value={timeline}>
                {timeline}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-3 text-sm font-medium text-slate-700 md:col-span-2">
          Monthly utility spend (average)
          <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm shadow-emerald-900/5">
            <input
              type="range"
              min={80}
              max={450}
              value={profile.monthlyBill}
              onChange={(event) =>
                setProfile((current) => ({
                  ...current,
                  monthlyBill: Number(event.target.value),
                }))
              }
              className="accent-emerald-500"
            />
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>$80</span>
              <span className="text-lg font-semibold text-slate-900">
                ${profile.monthlyBill}
              </span>
              <span>$450</span>
            </div>
          </div>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 md:col-span-2">
          Biggest frustration with current energy
          <textarea
            value={profile.painPoint}
            onChange={(event) =>
              setProfile((current) => ({
                ...current,
                painPoint: event.target.value,
              }))
            }
            rows={3}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base font-normal text-slate-900 shadow-sm shadow-emerald-900/5 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/60"
            placeholder="What keeps this homeowner up at night?"
          />
        </label>

        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-medium text-slate-700 shadow-sm shadow-emerald-900/5 md:col-span-2">
          <input
            type="checkbox"
            checked={Boolean(profile.hasEv)}
            onChange={(event) =>
              setProfile((current) => ({
                ...current,
                hasEv: event.target.checked,
              }))
            }
            className="h-5 w-5 rounded border border-slate-300 accent-emerald-500"
          />
          Prospect owns or plans for an EV
        </label>

        <button
          type="submit"
          className="md:col-span-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/50 transition hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-300/70"
        >
          Generate high-converting call flow
        </button>
      </form>
    </section>
  );
}
