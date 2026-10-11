export const HUMBLEBEE = {
  title: "Engineering Fundamentals",
  by: "HumbleBeeAI Open Curriculum",
  url: "https://roadmap.humblebee.ai/docs/engineering-fundamentals",
  deadline: "1 week",
  modules: [
    {
      name: "Module 1 — Terminal & Algorithmic Basics",
      sections: [
        {
          heading: "Terminal and Filesystem",
          items: [
            "Shell navigation (pwd, cd, ls)",
            "File ops (cp, mv, mkdir, rm, find)",
            "Tools (cat, less, history, man, alias)",
            "Complete interactive exercises",
          ],
        },
        {
          heading: "Python Environment Setup",
          items: [
            "Create and activate virtual environment",
            "pip install + requirements.txt",
            "JupyterLab install and kernel setup",
            ".gitignore for environments",
            "Recreate env from dependency file",
          ],
        },
        {
          heading: "Git and GitHub",
          items: [
            "Clone, status, diff, add, commit, log",
            "Branch creation and switching",
            "Merge and conflict resolution",
            "Push + open pull request",
            "Resolve intentional merge conflict",
          ],
        },
        {
          heading: "Debugging Fundamentals",
          items: [
            "Syntax, runtime, logic error ID",
            "Read Python tracebacks",
            "Print-based inspection",
            "IDE breakpoints and stepping",
            "Fix program with 3 planted bugs",
          ],
        },
        {
          heading: "Algorithms — HackerRank Kit",
          items: [
            "Week 1: Basic problem-solving",
            "Week 2: Algorithmic reasoning",
            "Week 3: Core data structures",
            "Week 4: Intermediate/advanced",
          ],
        },
      ],
    },
    {
      name: "Module 2 — Math for AI",
      sections: [
        {
          heading: "Linear Algebra: Vectors & Tensors",
          items: [
            "Shapes, addition, scaling",
            "Norms and dot products",
            "Distance and cosine similarity",
            "NumPy notebook: vectors/norms/similarity",
          ],
        },
        {
          heading: "Linear Algebra: Matrices",
          items: [
            "Operations and multiplication",
            "Transpose, identity, diagonal, symmetric",
            "Transformations and compatible shapes",
            "NumPy notebook: matrix transformations",
          ],
        },
        {
          heading: "Linear Algebra: Linear Systems",
          items: [
            "Ax = b solving",
            "Inverse, rank, independence",
            "Pseudoinverse",
            "Exact vs least-squares solutions",
            "NumPy notebook: linear systems",
          ],
        },
        {
          heading: "Linear Algebra: SVD & PCA",
          items: [
            "Eigenvectors and eigenvalues",
            "Eigendecomposition",
            "SVD and low-rank approximation",
            "Principal Component Analysis",
            "NumPy notebook: SVD/PCA + tensor shapes",
          ],
        },
        {
          heading: "Linear Algebra: AI Computations",
          items: [
            "Samples/features and batches",
            "Weight matrices and embeddings",
            "Attention shapes",
            "Broadcasting and dimension errors",
          ],
        },
        {
          heading: "Probability & Stats: Units 1-5",
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
          items: [
            "Probability rules",
            "Counting, permutations, combinations",
            "Random variables",
            "Unit tests passed (80%+ each)",
          ],
        },
        {
          heading: "Probability & Stats: Units 10-12",
          items: [
            "Sampling distributions",
            "Confidence intervals",
            "One-sample significance tests",
            "Interpretation exercise complete",
          ],
        },
      ],
    },
    {
      name: "Module 3 — Data Foundations",
      sections: [
        {
          heading: "NumPy",
          items: [
            "Array creation, shapes, dimensions",
            "Indexing and slicing",
            "Basic operations and broadcasting",
            "Practice notebook complete",
          ],
        },
        {
          heading: "Pandas",
          items: [
            "DataFrames and Series",
            "Loading, filtering, grouping",
            "Cleaning and transforming",
            "Practice notebook complete",
          ],
        },
        {
          heading: "SQL",
          items: [
            "SELECT, WHERE, JOIN, ORDER BY",
            "Aggregations and GROUP BY",
            "Subqueries",
            "Practice exercises complete",
          ],
        },
        {
          heading: "Data Visualization",
          items: [
            "Chart type selection",
            "Matplotlib/Seaborn basics",
            "Explain findings with clear visuals",
            "Visualization notebook complete",
          ],
        },
      ],
    },
    {
      name: "Electives (pick 2 of 6)",
      sections: [
        {
          heading: "Visualization: Seaborn & Plotly",
          items: [
            "Static plots with Seaborn",
            "Interactive plots with Plotly",
            "Chart design decisions explained",
          ],
        },
        {
          heading: "GitHub Actions & CI",
          items: [
            "Configure CI workflow",
            "Automated testing pipeline",
            "Debug failed workflow runs",
          ],
        },
        {
          heading: "Advanced SQL",
          items: [
            "Window functions",
            "Query performance tuning",
            "Analytic functions for multi-row questions",
          ],
        },
        {
          heading: "Bash Scripting & Automation",
          items: [
            "Variables, conditionals, loops",
            "Piping and file processing",
            "Reusable automation scripts",
          ],
        },
        {
          heading: "Algorithms & Problem Solving (extended)",
          items: [
            "Deliberate algorithm selection",
            "Compare solution approaches",
            "Complexity analysis + explanations",
          ],
        },
        {
          heading: "Advanced Statistical Inference",
          items: [
            "Unit 13: Two-sample comparisons",
            "Unit 14: Chi-square testing",
            "Unit 15: Regression inference",
            "Unit 16: ANOVA",
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
