"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { notifyStored, useStored } from "@/lib/useStored";
import { runLaterMigration } from "@/lib/migrate";
import { startSync } from "@/lib/sync";
import PwaRegister from "./PwaRegister";
import Sidebar from "./Sidebar";
import CommandPalette from "./CommandPalette";
import TodayTab from "./tabs/TodayTab";
import RoadmapTab from "./tabs/RoadmapTab";
import CourseTab from "./tabs/CourseTab";
import PatternsTab from "./tabs/PatternsTab";
import ScratchTab from "./tabs/ScratchTab";
import LedgerTab from "./tabs/LedgerTab";
import ProRoadmapTab from "./tabs/ProRoadmapTab";
import HumblebeeTab from "./tabs/HumblebeeTab";
import ProgressTab from "./tabs/ProgressTab";
import { todayISO } from "@/lib/dates";
import { CHAPTERS } from "./tabs/patternsData";
import { MODULES } from "./tabs/scratchData";
import { LEDGER_TOTAL } from "./tabs/ledgerData";
import { ROADMAP_TOTAL } from "./tabs/roadmapData";
import { COURSE_TOTAL } from "./tabs/courseData";
import { PRO_TOTAL } from "./tabs/proRoadmapData";
import { HUMBLEBEE_TOTAL } from "./tabs/humblebeeData";
import { MILESTONES } from "./tabs/milestones";

const TOTALS = {
  roadmap: ROADMAP_TOTAL,
  pro: PRO_TOTAL,
  course: COURSE_TOTAL,
  humblebee: HUMBLEBEE_TOTAL,
  scratch: MODULES.length * MILESTONES.length,
  patterns: CHAPTERS.length,
  ledger: LEDGER_TOTAL,
};

const GROUPS = [
  { id: "today", label: "Today", tabs: [{ id: "today", label: "Today", short: "Td" }] },
  { id: "progress", label: "Progress", tabs: [{ id: "progress", label: "Progress", short: "Pr" }] },
  {
    id: "plan", label: "Plan", tabs: [
      { id: "roadmap", label: "13 Weeks", short: "13W" },
      { id: "pro", label: "Full Roadmap", short: "FR" },
    ],
  },
  {
    id: "learn", label: "Learn", tabs: [
      { id: "course", label: "ML Course", short: "ML" },
      { id: "humblebee", label: "HumbleBee", short: "HB" },
      { id: "scratch", label: "From Scratch", short: "FS", doc: true },
      { id: "patterns", label: "Patterns", short: "Pt", doc: true },
    ],
  },
  { id: "library", label: "Library", more: true, tabs: [{ id: "ledger", label: "Guide Index", short: "GI" }] },
];

const DOC_TABS = new Set(GROUPS.flatMap((g) => g.tabs.filter((t) => t.doc).map((t) => t.id)));
const scrollToEl = (id) => {
  const el = document.getElementById(id);
  el?.scrollIntoView({ block: "start" });
  if (el?.matches("input, textarea")) el.focus({ preventScroll: true });
};
const countDone = (obj) => Object.values(obj).filter(Boolean).length;
const noop = () => () => {};
const LABELS = Object.fromEntries(GROUPS.flatMap((g) => g.tabs.map((t) => [t.id, t.label])));

export default function MissionControl() {
  const [tab, setTab] = useState("today");
  const [search, setSearch] = useState(false);
  const [railPick, setRailPick] = useState({});
  const pendingRef = useRef(null);

  const [patterns, setPatterns] = useStored("mc-patterns");
  const [scratch, setScratch] = useStored("mc-scratch");
  const [ledger, setLedger] = useStored("mc-ledger");
  const [roadmap, setRoadmap] = useStored("mc-roadmap");
  const [course, setCourse] = useStored("mc-course");
  const [pro, setPro] = useStored("mc-pro");
  const [humblebee, setHumblebee] = useStored("mc-humblebee");
  const [notes, setNotes] = useStored("mc-notes");
  const [review, setReview] = useStored("mc-review");
  const [hours, setHours] = useStored("mc-hours");
  const [log, setLog] = useStored("mc-log");
  const [goal, setGoal] = useStored("mc-goal");
  const hydrated = useSyncExternalStore(noop, () => true, () => false);

  const jumpTo = useCallback(
    (nextTab, elId) => {
      if (nextTab === tab) {
        if (elId) scrollToEl(elId);
        else window.scrollTo(0, 0);
        return;
      }
      pendingRef.current = elId || null;
      setTab(nextTab);
    },
    [tab]
  );

  useEffect(() => {
    runLaterMigration();
    notifyStored();
    startSync();
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch((s) => !s);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const rail = railPick[tab] ?? DOC_TABS.has(tab);
  useEffect(() => {
    document.documentElement.toggleAttribute("data-rail", rail);
  }, [rail]);

  useEffect(() => {
    const id = pendingRef.current;
    pendingRef.current = null;
    if (id) scrollToEl(id);
    else window.scrollTo(0, 0);
  }, [tab]);

  const stores = { roadmap, pro, course, humblebee, scratch, patterns, ledger };
  const done = Object.values(stores).reduce((n, s) => n + countDone(s), 0);
  const total = Object.values(TOTALS).reduce((n, x) => n + x, 0);
  const tracks = Object.keys(TOTALS).map((id) => ({ label: LABELS[id], done: countDone(stores[id]), total: TOTALS[id] }));

  useEffect(() => {
    if (!hydrated) return;
    const iso = todayISO();
    setLog((l) => (l[iso] === done ? l : { ...l, [iso]: done }));
  }, [hydrated, done, setLog]);

  const groups = GROUPS.map((g) => ({
    ...g,
    tabs: g.tabs.map((t) => ({ ...t, badge: TOTALS[t.id] ? `${countDone(stores[t.id])}/${TOTALS[t.id]}` : null })),
  }));

  return (
    <>
      <PwaRegister />
      <Sidebar groups={groups} activeTab={tab} onTab={(id) => jumpTo(id, null)} done={done} total={total}
        onSearch={() => setSearch(true)} rail={rail} onRail={() => setRailPick((p) => ({ ...p, [tab]: !rail }))} />
      {search && <CommandPalette groups={groups} onClose={() => setSearch(false)} jumpTo={jumpTo} />}
      <main className="mc-main">
      {tab === "today" && (
        <TodayTab roadmap={roadmap} setRoadmap={setRoadmap} patterns={patterns} scratch={scratch} course={course} pro={pro} notes={notes} setNotes={setNotes} review={review} setReview={setReview} hours={hours} setHours={setHours} log={log} totalDone={done} jumpTo={jumpTo} />
      )}
      {tab === "progress" && (
        <ProgressTab hours={hours} notes={notes} roadmap={roadmap} log={log} review={review} patterns={patterns} scratch={scratch} pro={pro} goal={goal} setGoal={setGoal} tracks={tracks} done={done} />
      )}
      {tab === "roadmap" && <RoadmapTab state={roadmap} setState={setRoadmap} jumpTo={jumpTo} />}
      {tab === "pro" && <ProRoadmapTab state={pro} setState={setPro} setReview={setReview} jumpTo={jumpTo} />}
      {tab === "course" && <CourseTab state={course} setState={setCourse} jumpTo={jumpTo} />}
      {tab === "humblebee" && <HumblebeeTab state={humblebee} setState={setHumblebee} />}
      {tab === "scratch" && <ScratchTab state={scratch} setState={setScratch} setReview={setReview} />}
      {tab === "patterns" && <PatternsTab state={patterns} setState={setPatterns} setReview={setReview} />}
      {tab === "ledger" && <LedgerTab state={ledger} setState={setLedger} />}
      </main>
    </>
  );
}
