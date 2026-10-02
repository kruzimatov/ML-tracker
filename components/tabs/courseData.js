export const COURSE = {
  title: "Machine Learning Specialization",
  by: "Andrew Ng · DeepLearning.AI × Stanford · Coursera",
  url: "https://www.coursera.org/specializations/machine-learning-introduction",
  courses: [
    {
      name: "Course 1 · Supervised ML: Regression and Classification",
      weeks: [
        { t: "Intro, linear regression, cost function, gradient descent", jump: { tab: "scratch", id: "linear-regression", label: "Linear Regression" } },
        { t: "Multiple features, vectorization, feature scaling, polynomial regression", jump: { tab: "scratch", id: "linear-algebra", label: "Linear Algebra" } },
        { t: "Classification, logistic regression, overfitting, regularization", jump: { tab: "scratch", id: "logistic-regression", label: "Logistic Regression" } },
      ],
    },
    {
      name: "Course 2 · Advanced Learning Algorithms",
      weeks: [
        { t: "Neural networks: intuition, inference, TensorFlow and NumPy implementation", jump: { tab: "scratch", id: "neural-net-basics", label: "Neural Network Basics" } },
        { t: "Training neural networks, activation functions, softmax, Adam", jump: { tab: "scratch", id: "neural-net-basics", label: "Neural Network Basics" } },
        { t: "Advice for applying ML: bias/variance, evaluation, error analysis", jump: { tab: "ledger", id: "sec-classic", label: "Model Evaluation (Guide Index)" } },
        { t: "Decision trees, random forests, XGBoost", jump: { tab: "scratch", id: "decision-trees", label: "Decision Trees" } },
      ],
    },
    {
      name: "Course 3 · Unsupervised Learning, Recommenders, Reinforcement Learning",
      weeks: [
        { t: "Clustering (k-means) and anomaly detection", jump: { tab: "scratch", id: "unsupervised", label: "Unsupervised Learning" } },
        { t: "Recommender systems: collaborative and content-based filtering", jump: null },
        { t: "Reinforcement learning", jump: null },
      ],
    },
  ],
};

export const SQUARES = [
  { key: "videos", label: "Videos", hint: "Watched all lectures" },
  { key: "labs", label: "Labs", hint: "Ran the practice labs" },
  { key: "quiz", label: "Quiz", hint: "Passed the graded quiz" },
  { key: "rewrite", label: "NumPy rewrite", hint: "Rewrote the week's model from memory" },
];

export const COURSE_TOTAL = COURSE.courses.reduce((n, c) => n + c.weeks.length, 0) * SQUARES.length;
