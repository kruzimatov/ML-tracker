"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { COURSE_TOTAL } from "./tabs/courseData";
import { LATER_TOTAL } from "./tabs/laterData";
import LaterTab from "./tabs/LaterTab";
import ProRoadmapTab from "./tabs/ProRoadmapTab";
import { PRO_TOTAL } from "./tabs/proRoadmapData";
import { useStored } from "@/lib/useStored";
import PwaRegister from "./PwaRegister";
import TopBar from "./TopBar";
import TodayTab from "./tabs/TodayTab";
import RoadmapTab from "./tabs/RoadmapTab";
import PatternsTab from "./tabs/PatternsTab";
import ScratchTab from "./tabs/ScratchTab";
import CourseTab from "./tabs/CourseTab";
import LedgerTab from "./tabs/LedgerTab";

const TABS = [
  { id: "today", label: "Today" },
  { id: "roadmap", label: "Roadmap" },
  { id: "course", label: "ML Course" },
  { id: "patterns", label: "Patterns" },
  { id: "scratch", label: "From Scratch" },
  { id: "ledger", label: "Guide Index" },
  { id: "pro", label: "Full Roadmap" },
  { id: "later", label: "After January" },
];

const TOTAL = 26 + 85 + 68 + 169 + COURSE_TOTAL + LATER_TOTAL + PRO_TOTAL;

const scrollToEl = (id) => document.getElementById(id)?.scrollIntoView({ block: "start" });
const countDone = (obj) => Object.values(obj).filter(Boolean).length;

export default function MissionControl() {
  const [tab, setTab] = useState("today");
  const pendingRef = useRef(null);

  const [patterns, setPatterns] = useStored("mc-patterns");
  const [scratch, setScratch] = useStored("mc-scratch");
  const [ledger, setLedger] = useStored("mc-ledger");
  const [roadmap, setRoadmap] = useStored("mc-roadmap");
  const [course, setCourse] = useStored("mc-course");
  const [notes, setNotes] = useStored("mc-notes");
  const [review, setReview] = useStored("mc-review");
  const [later, setLater] = useStored("mc-later");
  const [pro, setPro] = useStored("mc-pro");

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
    const id = pendingRef.current;
    pendingRef.current = null;
    if (id) scrollToEl(id);
    else window.scrollTo(0, 0);
  }, [tab]);

  const badge = (obj, total) => `${countDone(obj)}/${total}`;
  const badges = {
    roadmap: badge(roadmap, 169),
    course: badge(course, COURSE_TOTAL),
    patterns: badge(patterns, 26),
    scratch: badge(scratch, 85),
    ledger: badge(ledger, 68),
    later: badge(later, LATER_TOTAL),
    pro: badge(pro, PRO_TOTAL),
  };
  const tabs = TABS.map((t) => ({ ...t, badge: badges[t.id] }));
  const done = countDone(patterns) + countDone(scratch) + countDone(ledger) + countDone(roadmap) + countDone(course) + countDone(later) + countDone(pro);

  return (
    <>
      <PwaRegister />
      <TopBar tabs={tabs} active={tab} onSelect={(id) => jumpTo(id, null)} done={done} total={TOTAL} />
      {tab === "today" && (
        <TodayTab roadmap={roadmap} setRoadmap={setRoadmap} patterns={patterns} scratch={scratch} course={course} later={later} notes={notes} setNotes={setNotes} review={review} setReview={setReview} jumpTo={jumpTo} />
      )}
      {tab === "roadmap" && <RoadmapTab state={roadmap} setState={setRoadmap} jumpTo={jumpTo} />}
      {tab === "course" && <CourseTab state={course} setState={setCourse} jumpTo={jumpTo} />}
      {tab === "patterns" && <PatternsTab state={patterns} setState={setPatterns} setReview={setReview} />}
      {tab === "scratch" && <ScratchTab state={scratch} setState={setScratch} setReview={setReview} />}
      {tab === "ledger" && <LedgerTab state={ledger} setState={setLedger} />}
      {tab === "pro" && <ProRoadmapTab state={pro} setState={setPro} jumpTo={jumpTo} />}
      {tab === "later" && <LaterTab state={later} setState={setLater} setReview={setReview} jumpTo={jumpTo} />}
    </>
  );
}
