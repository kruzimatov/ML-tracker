"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useStored } from "@/lib/useStored";
import TopBar from "./TopBar";
import RoadmapTab from "./tabs/RoadmapTab";
import PatternsTab from "./tabs/PatternsTab";
import ScratchTab from "./tabs/ScratchTab";
import LedgerTab from "./tabs/LedgerTab";

const TABS = [
  { id: "roadmap", label: "Roadmap" },
  { id: "patterns", label: "Patterns" },
  { id: "scratch", label: "From Scratch" },
  { id: "ledger", label: "Guide Index" },
];

const TOTAL = 26 + 85 + 68 + 169;

const scrollToEl = (id) => document.getElementById(id)?.scrollIntoView({ block: "start" });
const countDone = (obj) => Object.values(obj).filter(Boolean).length;

export default function MissionControl() {
  const [tab, setTab] = useState("roadmap");
  const pendingRef = useRef(null);

  const [patterns, setPatterns] = useStored("mc-patterns");
  const [scratch, setScratch] = useStored("mc-scratch");
  const [ledger, setLedger] = useStored("mc-ledger");
  const [roadmap, setRoadmap] = useStored("mc-roadmap");

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

  const done = countDone(patterns) + countDone(scratch) + countDone(ledger) + countDone(roadmap);

  return (
    <>
      <TopBar tabs={TABS} active={tab} onSelect={(id) => jumpTo(id, null)} done={done} total={TOTAL} />
      {tab === "roadmap" && <RoadmapTab state={roadmap} setState={setRoadmap} jumpTo={jumpTo} />}
      {tab === "patterns" && <PatternsTab state={patterns} setState={setPatterns} />}
      {tab === "scratch" && <ScratchTab state={scratch} setState={setScratch} />}
      {tab === "ledger" && <LedgerTab state={ledger} setState={setLedger} />}
    </>
  );
}
