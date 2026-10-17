// Run: node scripts/check-exam.mjs
// Validates every exam question and runs each `output` question's code for real
// (python3 / bash / sqlite3), asserting the marked answer equals what the code prints.
// calc questions carry hidden `verify` Python that must print the numeric answer.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { QUESTIONS, INTERVIEW, TOPICS } from "../components/tabs/exam/topics.js";
import { isRight, record, stats, weak } from "../lib/exam.js";

const norm = (s) => String(s).replace(/`/g, "").replace(/\s+/g, " ").trim();
const ids = new Set();
const fail = [];

for (const q of [...QUESTIONS, ...INTERVIEW]) {
  assert.ok(!ids.has(q.id), `duplicate id ${q.id}`);
  assert.ok(q.id.length <= 60, `id too long ${q.id}`);
  ids.add(q.id);
  assert.ok(q.q, `${q.id}: no question text`);
}

for (const q of QUESTIONS) {
  assert.ok([1, 2, 3].includes(q.level), `${q.id}: level`);
  assert.ok(["mcq", "output", "bug", "calc"].includes(q.kind), `${q.id}: kind`);
  assert.ok(q.why, `${q.id}: no explanation`);
  if (q.kind === "calc") {
    assert.equal(typeof q.answer, "number", `${q.id}: calc answer`);
    assert.ok(q.verify, `${q.id}: calc without verify code`);
    continue;
  }
  assert.ok(q.options?.length >= 2, `${q.id}: options`);
  assert.equal(new Set(q.options.map(norm)).size, q.options.length, `${q.id}: duplicate options`);
  assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length, `${q.id}: answer index`);
  if (q.kind === "output" && q.lang) assert.ok(q.code, `${q.id}: output without code`);
}

for (const q of INTERVIEW) assert.ok(q.a?.length, `${q.id}: no model answer`);

for (const t of TOPICS) {
  const qs = QUESTIONS.filter((q) => q.topic === t.id);
  for (const level of [1, 2, 3]) assert.ok(qs.some((q) => q.level === level), `${t.id}: no level ${level}`);
  assert.ok(INTERVIEW.some((q) => q.topic === t.id), `${t.id}: no interview questions`);
}

function run(q) {
  const dir = mkdtempSync(join(tmpdir(), "exam-"));
  const opts = { cwd: dir, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] };
  try {
    if (q.lang === "python") return execFileSync("python3", ["-c", q.code], opts);
    if (q.lang === "sh") return execFileSync("bash", ["-c", `${q.setup ? `${q.setup}\n` : ""}${q.code}`], opts);
    if (q.lang === "sql") return execFileSync("sqlite3", ["-batch", "-separator", " | ", "-nullvalue", "NULL", ":memory:"], { ...opts, input: `${q.setup ?? ""}\n${q.code}` });
    throw new Error(`unknown lang ${q.lang}`);
  } catch (e) {
    if (!e.stderr) throw e;
    const lastLine = e.stderr.trim().split("\n").at(-1);
    return lastLine.split(":")[0];
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

let ran = 0;
for (const q of QUESTIONS.filter((x) => x.kind === "calc")) {
  const got = parseFloat(run({ lang: "python", code: q.verify }));
  ran++;
  if (!(Math.abs(got - q.answer) <= Math.max(q.tol ?? 0, 1e-9))) fail.push(`${q.id}: answer ${q.answer} but verify computed ${got}`);
}
for (const q of QUESTIONS.filter((x) => x.kind === "output" && x.lang)) {
  const got = norm(run(q));
  ran++;
  if (got !== norm(q.options[q.answer])) fail.push(`${q.id}: marked "${norm(q.options[q.answer])}" but code printed "${got}"`);
  const clash = q.options.findIndex((o, i) => i !== q.answer && norm(o) === got);
  if (clash >= 0) fail.push(`${q.id}: wrong option ${clash} also matches output`);
}

assert.equal(isRight({ kind: "calc", answer: 2.5, tol: 0.01 }, "2,5"), true, "calc accepts comma decimals");
assert.equal(isRight({ kind: "calc", answer: 2.5, tol: 0.01 }, "2.6"), false);
assert.equal(isRight({ kind: "mcq", answer: 1 }, 1), true);
let s = {};
for (let i = 0; i < 15; i++) s = record(s, "x", i % 2, "2026-10-17");
assert.equal(s.x.length, 12, "keeps last 12 attempts");
assert.deepEqual(stats([{ id: "x" }, { id: "y" }], s), { total: 2, seen: 1, right: 0, ready: 0 });
assert.deepEqual(weak([{ id: "x" }, { id: "y" }], s).map((q) => q.id), ["x"]);

if (fail.length) {
  console.error(fail.join("\n"));
  process.exit(1);
}
const lv = (n) => QUESTIONS.filter((q) => q.level === n).length;
console.log(`ok: ${QUESTIONS.length} questions (${lv(1)} easy, ${lv(2)} medium, ${lv(3)} hard), ${INTERVIEW.length} interview, ${ran} answers verified by running code`);
