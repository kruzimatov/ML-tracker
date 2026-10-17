import * as terminal from "./q/terminal.js";
import * as pyenv from "./q/pyenv.js";
import * as git from "./q/git.js";
import * as debug from "./q/debug.js";
import * as algo from "./q/algo.js";

export const LEVELS = ["", "Easy", "Medium", "Hard"];

export const TOPICS = [
  { id: "terminal", mod: "Module 1", name: "Terminal & filesystem", src: terminal },
  { id: "pyenv", mod: "Module 1", name: "Python environment", src: pyenv },
  { id: "git", mod: "Module 1", name: "Git & GitHub", src: git },
  { id: "debug", mod: "Module 1", name: "Debugging", src: debug },
  { id: "algo", mod: "Module 1", name: "Algorithms", src: algo },
];

export const QUESTIONS = TOPICS.flatMap((t) => t.src.QUESTIONS.map((q) => ({ ...q, topic: t.id })));
export const INTERVIEW = TOPICS.flatMap((t) => t.src.INTERVIEW.map((q) => ({ ...q, topic: t.id, kind: "open" })));
export const TOPIC = Object.fromEntries(TOPICS.map((t) => [t.id, t]));
