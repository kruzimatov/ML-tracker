"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { notifyStored, useStored } from "@/lib/useStored";
import { runLaterMigration } from "@/lib/migrate";
import PwaRegister from "./PwaRegister";
import TopBar from "./TopBar";
import TodayTab from "./tabs/TodayTab";
import RoadmapTab from "./tabs/RoadmapTab";
import CourseTab from "./tabs/CourseTab";
import PatternsTab from "./tabs/PatternsTab";
import ScratchTab from "./tabs/ScratchTab";
import LedgerTab from "./tabs/LedgerTab";
import ProRoadmapTab from "./tabs/ProRoadmapTab";
import { CHAPTERS } from "./tabs/patternsData";
import { MODULES } from "./tabs/scratchData";
import { LEDGER_TOTAL } from "./tabs/ledgerData";
import { ROADMAP_TOTAL } from "./tabs/roadmapData";
import { COURSE_TOTAL } from "./tabs/courseData";
import { PRO_TOTAL } from "./tabs/proRoadmapData";
import { MILESTONES } from "./tabs/milestones";

const TOTALS = {
  roadmap: ROADMAP_TOTAL,
  pro: PRO_TOTAL,
  course: COURSE_TOTAL,
  scratch: MODULES.length * MILESTONES.length,
  patterns: CHAPTERS.length,
  ledger: LEDGER_TOTAL,
};

const GROUPS = [
  { id: "today", label: "Today", desc: "Check in, review what is due, see what is next", tabs: [{ id: "today", label: "Today" }] },
  {
    id: "plan", label: "Plan", tabs: [
      { id: "roadmap", label: "13 Weeks" },
      { id: "pro", label: "Full Roadmap" },
    ],
  },
  {
    id: "learn", label: "Learn", tabs: [
      { id: "course", label: "ML Course" },
      { id: "scratch", label: "From Scratch" },
      { id: "patterns", label: "Patterns" },
    ],
  },
  { id: "library", label: "Library", desc: "Index of your two long study guides", tabs: [{ id: "ledger", label: "Guide Index" }] },
];

const groupOf = (tabId) => GROUPS.find((g) => g.tabs.some((t) => t.id === tabId));
const scrollToEl = (id) => document.getElementById(id)?.scrollIntoView({ block: "start" });
const countDone = (obj) => Object.values(obj).filter(Boolean).length;

export default function MissionControl() {
  const [tab, setTab] = useState("today");
  const pendingRef = useRef(null);
  const lastInGroup = useRef({});

  const [patterns, setPatterns] = useStored("mc-patterns");
  const [scratch, setScratch] = useStored("mc-scratch");
  const [ledger, setLedger] = useStored("mc-ledger");
  const [roadmap, setRoadmap] = useStored("mc-roadmap");
  const [course, setCourse] = useStored("mc-course");
  const [pro, setPro] = useStored("mc-pro");
  const [notes, setNotes] = useStored("mc-notes");
  const [review, setReview] = useStored("mc-review");
  const [hours, setHours] = useStored("mc-hours");

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
  }, []);

  useEffect(() => {
    lastInGroup.current[groupOf(tab).id] = tab;
    const id = pendingRef.current;
    pendingRef.current = null;
    if (id) scrollToEl(id);
    else window.scrollTo(0, 0);
  }, [tab]);

  const stores = { roadmap, pro, course, scratch, patterns, ledger };
  const done = Object.values(stores).reduce((n, s) => n + countDone(s), 0);
  const total = Object.values(TOTALS).reduce((n, x) => n + x, 0);
  const groups = GROUPS.map((g) => ({
    ...g,
    tabs: g.tabs.map((t) => ({ ...t, badge: TOTALS[t.id] ? `${countDone(stores[t.id])}/${TOTALS[t.id]}` : null })),
  }));
  const activeGroup = groupOf(tab).id;
  const selectGroup = (gid) => jumpTo(lastInGroup.current[gid] || GROUPS.find((g) => g.id === gid).tabs[0].id, null);

  return (
    <>
      <PwaRegister />
      <TopBar groups={groups} activeGroup={activeGroup} activeTab={tab} onGroup={selectGroup} onTab={(id) => jumpTo(id, null)} done={done} total={total} />
      {tab === "today" && (
        <TodayTab roadmap={roadmap} setRoadmap={setRoadmap} patterns={patterns} scratch={scratch} course={course} pro={pro} notes={notes} setNotes={setNotes} review={review} setReview={setReview} hours={hours} setHours={setHours} totalDone={done} jumpTo={jumpTo} />
      )}
      {tab === "roadmap" && <RoadmapTab state={roadmap} setState={setRoadmap} jumpTo={jumpTo} />}
      {tab === "pro" && <ProRoadmapTab state={pro} setState={setPro} setReview={setReview} jumpTo={jumpTo} />}
      {tab === "course" && <CourseTab state={course} setState={setCourse} jumpTo={jumpTo} />}
      {tab === "scratch" && <ScratchTab state={scratch} setState={setScratch} setReview={setReview} />}
      {tab === "patterns" && <PatternsTab state={patterns} setState={setPatterns} setReview={setReview} />}
      {tab === "ledger" && <LedgerTab state={ledger} setState={setLedger} />}
    </>
  );
}
