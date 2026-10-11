const BASE = "https://roadmap.humblebee.ai/docs/engineering-fundamentals";

const KROHN = { label: "Jon Krohn: Linear Algebra for ML", url: "https://www.jonkrohn.com/posts/2021/5/9/linear-algebra-for-machine-learning-complete-math-course-on-youtube" };
const KROHN_NB = { label: "ML-foundations notebooks", url: "https://github.com/jonkrohn/ML-foundations" };
const KHAN = { label: "Khan Academy Statistics and Probability", url: "https://www.khanacademy.org/math/statistics-probability" };
const HR_KIT = "https://www.hackerrank.com/interview/preparation-kits/one-month-preparation-kit";

export const HUMBLEBEE = {
  title: "Engineering Fundamentals",
  by: "HumbleBeeAI Open Curriculum",
  url: BASE,
  synced: "2026-10-11",
  deadline: "1 week",
  modules: [
    {
      name: "Module 1 — Terminal & Algorithmic Basics",
      url: `${BASE}/terminal-algorithmic-basics`,
      sections: [
        {
          heading: "Terminal and Filesystem",
          anchor: "terminal",
          links: [{ label: "Linux Journey: Command Line", url: "https://labex.io/linuxjourney/courses/command-line" }],
          items: [
            "Navigation (the shell, pwd, cd, ls, touch, file)",
            "File ops (cp, mv, mkdir, rm, find)",
            "Reading and help (cat, less, history, help, man, whatis, alias)",
            "Linux Journey interactive exercises done",
          ],
        },
        {
          heading: "Python Environment Setup",
          anchor: "environment-setup",
          links: [
            { label: "Python venv tutorial", url: "https://docs.python.org/3/tutorial/venv.html" },
            { label: "JupyterLab install guide", url: "https://jupyterlab.readthedocs.io/en/stable/getting_started/installation.html" },
          ],
          items: [
            "Create and activate .venv",
            "python -m pip install NumPy, Pandas, JupyterLab",
            "Run NumPy script, then same computation in a notebook",
            "requirements.txt + .venv/ in .gitignore",
            "Recreate env from file; explain missing-NumPy import error",
          ],
        },
        {
          heading: "Git and GitHub",
          anchor: "git-github",
          links: [
            { label: "GitHub Skills", url: "https://skills.github.com/" },
            { label: "Introduction to Git", url: "https://github.com/skills/introduction-to-git" },
            { label: "Introduction to GitHub", url: "https://github.com/skills/introduction-to-github" },
            { label: "Resolve Merge Conflicts", url: "https://github.com/skills/resolve-merge-conflicts" },
            { label: "Learn Git Branching", url: "https://learngitbranching.js.org/" },
          ],
          items: [
            "Status, diff, add, commit, log, meaningful messages",
            "Branches, merging, basic conflict resolution",
            "Clone, remotes, fetch, pull, push, .gitignore",
            "Pull requests and basic code review",
            "Assessment: branch, commits, PR, resolve conflict, merge",
          ],
        },
        {
          heading: "Debugging Fundamentals",
          anchor: "debugging",
          links: [
            { label: "LabEx: Code Debugging Techniques", url: "https://labex.io/tutorials/code-debugging-techniques-132737" },
            { label: "VS Code Python debugger", url: "https://code.visualstudio.com/docs/python/python-tutorial#_configure-and-run-the-debugger" },
          ],
          items: [
            "Syntax, runtime, logic errors",
            "Read tracebacks, reproduce and isolate failures",
            "Print inspection, breakpoints, stepping, variables",
            "Verify fixes with normal and edge-case inputs",
            "Assessment: fix runtime, logic, edge-case bugs",
          ],
        },
        {
          heading: "Algorithms — HackerRank One Month Kit",
          anchor: "algorithms",
          links: ["one", "two", "three", "four"].map((w, i) => ({
            label: `Week ${i + 1} challenges`,
            url: `${HR_KIT}/one-month-week-${w}/challenges`,
          })),
          items: [
            "Week 1: Basic problem-solving patterns",
            "Week 2: Algorithmic reasoning",
            "Week 3: Core data structures",
            "Week 4: Intermediate and advanced",
            "Explain solutions: edge cases, time/space complexity",
          ],
        },
      ],
    },
    {
      name: "Module 2 — Math for AI",
      url: `${BASE}/math-for-ai`,
      sections: [
        {
          heading: "Linear Algebra: Vectors & Tensors",
          anchor: "linear-algebra",
          links: [KROHN, KROHN_NB],
          items: [
            "Shapes, addition, scaling",
            "Norms and dot products",
            "Distance and cosine similarity",
            "Notebook 1: vectors, norms, similarity",
          ],
        },
        {
          heading: "Linear Algebra: Matrices",
          anchor: "linear-algebra",
          links: [KROHN, KROHN_NB],
          items: [
            "Operations and multiplication",
            "Transpose, identity, diagonal, symmetric",
            "Transformations and compatible shapes",
            "Notebook 2: matrix transformations, shape compatibility",
          ],
        },
        {
          heading: "Linear Algebra: Linear Systems",
          anchor: "linear-algebra",
          links: [KROHN, KROHN_NB],
          items: [
            "Ax = b solving",
            "Inverse, rank, independence",
            "Pseudoinverse",
            "Exact vs least-squares solutions",
            "Notebook 3: linear systems and least squares",
          ],
        },
        {
          heading: "Linear Algebra: SVD & PCA",
          anchor: "linear-algebra",
          links: [KROHN, KROHN_NB],
          items: [
            "Eigenvectors and eigenvalues",
            "Eigendecomposition",
            "SVD and low-rank approximation",
            "Principal Component Analysis",
            "Notebook 4: SVD, low-rank approximation, PCA",
          ],
        },
        {
          heading: "Linear Algebra: AI Computations",
          anchor: "linear-algebra",
          links: [KROHN, KROHN_NB],
          items: [
            "Samples/features and batches",
            "Weight matrices and embeddings",
            "Attention shapes",
            "Broadcasting and dimension errors",
            "Tensor-shape exercise: repair a dimension error",
          ],
        },
        {
          heading: "Probability & Stats: Units 1-5 (skip Unit 6)",
          anchor: "probability-statistics",
          links: [KHAN],
          items: [
            "Categorical data and charts",
            "Summary statistics",
            "Normal distributions",
            "Correlation and regression",
            "Unit tests passed (80%+ each)",
          ],
        },
        {
          heading: "Probability & Stats: Units 7-9",
          anchor: "probability-statistics",
          links: [KHAN],
          items: [
            "Probability rules",
            "Counting, permutations, combinations",
            "Random variables",
            "Unit tests passed (80%+ each)",
          ],
        },
        {
          heading: "Probability & Stats: Units 10-12",
          anchor: "probability-statistics",
          links: [KHAN],
          items: [
            "Sampling distributions",
            "Confidence intervals",
            "One-sample significance tests",
            "Interpretation exercise complete",
            "Academy verification passed (Units 1-5, 7-12)",
          ],
        },
      ],
    },
    {
      name: "Module 3 — Data Foundations",
      url: `${BASE}/data-manipulation`,
      sections: [
        {
          heading: "NumPy Foundations",
          anchor: "numpy",
          links: [
            { label: "NumPy: Absolute Basics", url: "https://numpy.org/doc/stable/user/absolute_beginners.html" },
            { label: "CodeSignal: NumPy Basics", url: "https://codesignal.com/learn/courses/numpy-basics" },
          ],
          items: [
            "Create and inspect arrays: shapes, sizes, dtypes",
            "Indexing, slicing, boolean masks",
            "Reshape, transpose, broadcasting, vectorized ops, axis aggregations",
            "Practice: transform data without Python loops",
          ],
        },
        {
          heading: "Pandas and Data Cleaning",
          anchor: "pandas-cleaning",
          links: [
            { label: "Kaggle Learn: Pandas", url: "https://www.kaggle.com/learn/pandas" },
            { label: "Kaggle Learn: Data Cleaning", url: "https://www.kaggle.com/learn/data-cleaning" },
          ],
          items: [
            "Series, DataFrames, load/export, inspect dtypes",
            "Select, filter, sort, group, aggregate",
            "Clean: missing, duplicates, bad types, categories; merge/concat",
            "Practice: analysis-ready dataset, cleaning decisions explained",
          ],
        },
        {
          heading: "SQL",
          anchor: "sql",
          links: [
            { label: "SQLTutorial.org", url: "https://www.sqltutorial.org/" },
            { label: "HackerRank SQL", url: "https://www.hackerrank.com/domains/sql" },
          ],
          items: [
            "Keys, SELECT, aliases, WHERE, ORDER BY",
            "Aggregates, GROUP BY, HAVING, inner/outer joins",
            "Subqueries, CTEs, CASE, NULL handling",
            "Basic window functions, indexing intuition",
            "Practice: analytical questions answered",
          ],
        },
        {
          heading: "Exploratory Analysis and Visualization",
          anchor: "exploratory-analysis",
          links: [{ label: "Kaggle Learn: Data Visualization", url: "https://www.kaggle.com/learn/data-visualization" }],
          items: [
            "Dataset structure, quality, descriptive statistics",
            "Distributions, outliers, relationships, group comparisons",
            "Chart choice (histogram, bar, line, scatter), labels, legends",
            "Practice: short EDA with findings and limitations",
          ],
        },
      ],
    },
    {
      name: "Electives (pick 2 of 6)",
      url: `${BASE}/electives`,
      sections: [
        {
          heading: "Data Visualization with Seaborn and Plotly",
          anchor: "data-visualization",
          links: [
            { label: "DataCamp: Intermediate Seaborn", url: "https://www.datacamp.com/courses/intermediate-data-visualization-with-seaborn" },
            { label: "DataCamp: Intro to Plotly", url: "https://www.datacamp.com/courses/introduction-to-data-visualization-with-plotly-in-python" },
          ],
          items: [
            "Static plots with Seaborn",
            "Interactive plots with Plotly",
            "Practice: visualize cleaned dataset, explain chart choices",
          ],
        },
        {
          heading: "GitHub Actions and CI",
          anchor: "github-actions",
          links: [
            { label: "Hello GitHub Actions", url: "https://github.com/skills/hello-github-actions" },
            { label: "Test with Actions", url: "https://github.com/skills/test-with-actions" },
          ],
          items: [
            "Hello GitHub Actions course",
            "Test with Actions course",
            "Practice: Python repo CI, failed check then fix",
          ],
        },
        {
          heading: "Advanced SQL",
          anchor: "advanced-sql",
          links: [{ label: "Kaggle Learn: Advanced SQL", url: "https://www.kaggle.com/learn/advanced-sql" }],
          items: [
            "Kaggle Advanced SQL course",
            "Analytic functions across related rows",
            "Practice: explain query-efficiency choices",
          ],
        },
        {
          heading: "Bash Scripting and Automation",
          anchor: "bash-automation",
          links: [
            { label: "LearnShell", url: "https://www.learnshell.org/" },
            { label: "Carpentry: Pipes and Filters", url: "https://swcarpentry.github.io/shell-novice/04-pipefilter.html" },
            { label: "Carpentry: Loops", url: "https://swcarpentry.github.io/shell-novice/05-loop.html" },
            { label: "Carpentry: Shell Scripts", url: "https://swcarpentry.github.io/shell-novice/06-script.html" },
          ],
          items: [
            "LearnShell interactive tutorial",
            "Pipes, filters, loops, shell scripts",
            "Practice: script with args, multiple files, runs a Python program",
          ],
        },
        {
          heading: "Algorithms and Problem Solving",
          anchor: "algorithms",
          links: [
            { label: "Grokking Algorithms, 2nd ed.", url: "https://www.manning.com/books/grokking-algorithms-second-edition" },
            { label: "HackerRank Algorithms", url: "https://www.hackerrank.com/domains/algorithms" },
          ],
          items: [
            "Grokking Algorithms",
            "HackerRank Algorithms practice",
            "Practice: explain correctness, complexity, compare approaches",
          ],
        },
        {
          heading: "Advanced Statistical Inference",
          anchor: "advanced-statistical-inference",
          links: [KHAN],
          items: [
            "Unit 13: Two-sample inference",
            "Unit 14: Inference for categorical data (chi-square)",
            "Unit 15: Advanced regression",
            "Unit 16: Analysis of variance (ANOVA)",
            "Unit tests 80%+ and elective verification passed",
          ],
        },
      ],
    },
  ],
};

export const HUMBLEBEE_TOTAL = HUMBLEBEE.modules.reduce(
  (n, m) => n + m.sections.reduce((s, sec) => s + sec.items.length, 0),
  0
);
