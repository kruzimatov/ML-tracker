import * as terminal from "./q/terminal.js";
import * as pyenv from "./q/pyenv.js";
import * as git from "./q/git.js";
import * as debug from "./q/debug.js";
import * as algo from "./q/algo.js";
import * as vectors from "./q/vectors.js";
import * as matrices from "./q/matrices.js";
import * as systems from "./q/systems.js";
import * as svd from "./q/svd.js";
import * as tensors from "./q/tensors.js";
import * as describe from "./q/describe.js";
import * as probability from "./q/probability.js";
import * as inference from "./q/inference.js";
import * as numpy from "./q/numpy.js";
import * as pandas from "./q/pandas.js";
import * as sql from "./q/sql.js";
import * as eda from "./q/eda.js";

export const LEVELS = ["", "Easy", "Medium", "Hard"];

export const TOPICS = [
  { id: "terminal", mod: "Module 1", name: "Terminal & filesystem", src: terminal },
  { id: "pyenv", mod: "Module 1", name: "Python environment", src: pyenv },
  { id: "git", mod: "Module 1", name: "Git & GitHub", src: git },
  { id: "debug", mod: "Module 1", name: "Debugging", src: debug },
  { id: "algo", mod: "Module 1", name: "Algorithms", src: algo },
  { id: "vectors", mod: "Module 2", name: "Vectors & similarity", src: vectors },
  { id: "matrices", mod: "Module 2", name: "Matrices", src: matrices },
  { id: "systems", mod: "Module 2", name: "Linear systems", src: systems },
  { id: "svd", mod: "Module 2", name: "Eigen, SVD & PCA", src: svd },
  { id: "tensors", mod: "Module 2", name: "Shapes in AI code", src: tensors },
  { id: "describe", mod: "Module 2", name: "Stats: describing data", src: describe },
  { id: "probability", mod: "Module 2", name: "Probability & counting", src: probability },
  { id: "inference", mod: "Module 2", name: "Stats: inference", src: inference },
  { id: "numpy", mod: "Module 3", name: "NumPy", src: numpy },
  { id: "pandas", mod: "Module 3", name: "Pandas & cleaning", src: pandas },
  { id: "sql", mod: "Module 3", name: "SQL", src: sql },
  { id: "eda", mod: "Module 3", name: "EDA & visualization", src: eda },
];

export const QUESTIONS = TOPICS.flatMap((t) => t.src.QUESTIONS.map((q) => ({ ...q, topic: t.id })));
export const INTERVIEW = TOPICS.flatMap((t) => t.src.INTERVIEW.map((q) => ({ ...q, topic: t.id, kind: "open" })));
export const TOPIC = Object.fromEntries(TOPICS.map((t) => [t.id, t]));
