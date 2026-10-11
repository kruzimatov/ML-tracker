"use client";

import { useEffect, useRef, useState } from "react";
import { toggleTheme } from "@/lib/theme";
import { WEEKS } from "./tabs/roadmapData";
import { MODULES } from "./tabs/scratchData";
import { CHAPTERS } from "./tabs/patternsData";
import { SECTIONS } from "./tabs/ledgerData";
import { HUMBLEBEE } from "./tabs/humblebeeData";
import styles from "./CommandPalette.module.css";

const SECTION_INDEX = [
  ...WEEKS.map((w, i) => ({ label: `Week ${i + 1}: ${w.deliverable}`, hint: "13 Weeks", tab: "roadmap", el: `week-${i}` })),
  ...HUMBLEBEE.modules.flatMap((m, mi) =>
    m.sections.map((s, si) => ({ label: s.heading, hint: `HumbleBee · ${m.name.split(" — ")[0]}`, tab: "humblebee", el: `hb-${mi}-${si}` }))
  ),
  ...MODULES.map((m) => ({ label: m.title, hint: "From Scratch", tab: "scratch", el: m.id })),
  ...CHAPTERS.map((c) => ({ label: c.title, hint: "Patterns", tab: "patterns", el: c.id })),
  ...SECTIONS.map((s) => ({ label: s.title, hint: "Guide Index", tab: "ledger", el: s.id })),
];

export default function CommandPalette({ groups, onClose, jumpTo }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const listRef = useRef(null);

  const items = [
    ...groups.flatMap((g) => g.tabs.map((t) => ({ label: t.label, hint: t.badge || g.label, tab: t.id }))),
    { label: "Log hours", hint: "Action", tab: "today", el: "log-hours" },
    { label: "Toggle theme", hint: "Action", run: toggleTheme },
    ...SECTION_INDEX,
  ];
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const hits = items.filter((it) => words.every((w) => `${it.label} ${it.hint}`.toLowerCase().includes(w))).slice(0, 30);
  const cur = Math.min(sel, Math.max(hits.length - 1, 0));

  useEffect(() => {
    listRef.current?.children[cur]?.scrollIntoView({ block: "nearest" });
  }, [cur]);

  const choose = (it) => {
    onClose();
    if (it.run) it.run();
    else jumpTo(it.tab, it.el);
  };

  const onKey = (e) => {
    if (e.key === "ArrowDown") setSel(Math.min(cur + 1, hits.length - 1));
    else if (e.key === "ArrowUp") setSel(Math.max(cur - 1, 0));
    else if (e.key === "Enter" && hits[cur]) choose(hits[cur]);
    else if (e.key === "Escape") onClose();
    else return;
    e.preventDefault();
  };

  return (
    <div className={styles.scrim} onMouseDown={onClose}>
      <div className={styles.box} role="dialog" aria-modal="true" aria-label="Jump to" onMouseDown={(e) => e.stopPropagation()}>
        <input
          className={styles.input}
          autoFocus
          value={q}
          onChange={(e) => { setQ(e.target.value); setSel(0); }}
          onKeyDown={onKey}
          placeholder="Search tabs, weeks, sections, chapters…"
          aria-label="Search"
          role="combobox"
          aria-expanded="true"
          aria-controls="mc-palette-list"
          aria-activedescendant={hits.length ? `mc-pal-${cur}` : undefined}
        />
        <ul ref={listRef} id="mc-palette-list" className={styles.list} role="listbox">
          {hits.map((it, i) => (
            <li key={`${it.tab}-${it.el}-${it.label}`} id={`mc-pal-${i}`} role="option" aria-selected={i === cur}
              className={i === cur ? styles.sel : ""} onMouseMove={() => setSel(i)} onClick={() => choose(it)}>
              <span>{it.label}</span><small>{it.hint}</small>
            </li>
          ))}
          {!hits.length && <li className={styles.empty}>No matches for “{q}”</li>}
        </ul>
        <div className={styles.foot}>↑↓ move · Enter open · Esc close</div>
      </div>
    </div>
  );
}
