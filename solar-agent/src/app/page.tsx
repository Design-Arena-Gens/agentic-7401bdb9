"use client";

import { useMemo, useState } from "react";
import { CallScenarioForm } from "@/components/CallScenarioForm";
import { CallScriptBoard } from "@/components/CallScriptBoard";
import { ObjectionPlaybook } from "@/components/ObjectionPlaybook";
import { FollowUpBoard } from "@/components/FollowUpBoard";
import {
  buildFollowUps,
  buildObjections,
  buildScript,
  defaultProspectProfile,
  type ProspectProfile,
} from "@/lib/scriptBuilder";

export default function Home() {
  const [profile, setProfile] =
    useState<ProspectProfile>(defaultProspectProfile);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(
    {},
  );

  const script = useMemo(() => buildScript(profile), [profile]);
  const objections = useMemo(() => buildObjections(profile), [profile]);
  const followUps = useMemo(() => buildFollowUps(profile), [profile]);

  const projectedFederalCredit = Math.round(profile.monthlyBill * 12 * 0.3);
  const evOpportunity = profile.hasEv ? "Bundle EV load for off-peak gains" : "Upsell smart EV charging";

  return (
    <main className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 pb-16 pt-12 md:px-12 lg:px-16">
      <div className="absolute inset-x-0 top-0 -z-10 h-[42rem] bg-gradient-to-b from-emerald-500/20 via-emerald-500/5 to-transparent blur-3xl" />

      <header className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/10 p-8 text-slate-100 backdrop-blur-lg shadow-xl shadow-emerald-600/20 md:flex-row md:items-center md:justify-between md:gap-12">
        <div className="space-y-4 md:w-2/3">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
            Helios Call Agent
          </span>
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
            Close solar consultations in one focused workspace.
          </h1>
          <p className="text-base leading-relaxed text-slate-200 md:text-lg">
            Equip your reps with a dynamic talk track, tailored objection
            playbook, and automated follow-up plan. The result: consistent
            conversations that convert curious homeowners into installations.
          </p>
        </div>

        <div className="flex flex-col gap-4 rounded-3xl bg-white/5 p-6 text-slate-100 shadow-lg shadow-emerald-900/40 md:w-1/3">
          <div className="flex items-center justify-between text-sm text-slate-300">
            <span>Profile readiness</span>
            <span className="font-semibold text-white">
              {Math.floor(
                (Object.values(completedSteps).filter(Boolean).length /
                  Math.max(script.length, 1)) *
                  100,
              )}
              %
            </span>
          </div>
          <div className="h-2 rounded-full bg-white/10">
            <div
              className="h-2 rounded-full bg-emerald-400 transition-all"
              style={{
                width: `${
                  (Object.values(completedSteps).filter(Boolean).length /
                    Math.max(script.length, 1)) *
                  100
                }%`,
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
              <p className="text-xs uppercase tracking-widest text-emerald-200">
                Fed credit
              </p>
              <p className="text-lg font-semibold text-white">
                ${projectedFederalCredit.toLocaleString()}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
              <p className="text-xs uppercase tracking-widest text-emerald-200">
                EV play
              </p>
              <p className="text-sm font-medium text-slate-200">{evOpportunity}</p>
            </div>
            <div className="col-span-2 rounded-2xl border border-white/10 bg-emerald-400/20 p-3 text-slate-900">
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-900">
                Incentive alert
              </p>
              <p className="text-sm">
                {profile.utility} just approved the 2025 net metering update —
                lock your quote within 14 days to secure peak export rates.
              </p>
            </div>
          </div>
        </div>
      </header>

      <CallScenarioForm
        onGenerate={(newProfile) => {
          setProfile({ ...newProfile });
          setCompletedSteps({});
        }}
      />

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <CallScriptBoard
          script={script}
          completed={completedSteps}
          onToggleStep={(stepId) =>
            setCompletedSteps((current) => ({
              ...current,
              [stepId]: !current[stepId],
            }))
          }
        />

        <div className="flex flex-col gap-8">
          <ObjectionPlaybook objections={objections} />
          <FollowUpBoard followUps={followUps} />
        </div>
      </section>

      <footer className="rounded-3xl border border-white/10 bg-white/10 p-6 text-sm text-slate-200 backdrop-blur-lg shadow-lg shadow-emerald-900/30">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">
              Performance guardrails
            </p>
            <p>
              Scripts auto-sync with compliance, and call notes push straight to
              your CRM after each conversation.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/20 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Live dialing enabled
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-slate-200">
              <span className="h-2 w-2 rounded-full bg-sky-300" />
              Script synced 3m ago
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
