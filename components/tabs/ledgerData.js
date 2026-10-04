export const SECTIONS = [
  {
    key: "classic",
    id: "sec-classic",
    title: "Classical ML & Deep Learning",
    source: "ML_GUIDE.html · also in AI_ENGINEERING.html (EN + UZ)",
    accent: "gold",
    items: [
      "ML Foundations", "Preparing Data", "Math Foundations", "Linear Regression",
      "Normal Equation vs Gradient Descent", "Logistic Regression", "Regularization",
      "K-Nearest Neighbors (KNN)", "Naive Bayes", "Support Vector Machines (SVM)",
      "Decision Trees (CART)", "Bagging & Random Forest", "Boosting (XGBoost/LightGBM/CatBoost)",
      "Model Evaluation & Metrics", "Hyperparameter Tuning", "Unsupervised Learning (PCA & Clustering)",
      "Neural Networks & Deep Learning", "Feature Engineering & Selection", "Linear Discriminant Analysis (LDA)",
      "SHAP — Model Explainability", "Stacking & Blending", "End-to-End Project + ML Checklist",
      "Model Deployment (Gradio & joblib)", "Training Deep Neural Networks", "TensorFlow & Keras",
      "PyTorch (vs TensorFlow)", "CNNs — Computer Vision", "RNNs, LSTMs & Transformers",
      "Generative Models & LLMs", "Confusion-Busters", "Interview Appendix", "Quick-Reference Cheat Sheet",
    ].map((t, i) => [String(i + 1), t]),
  },
  {
    key: "ragtheory",
    id: "sec-ragtheory",
    title: "RAG Theory",
    source: "AI_ENGINEERING.html · Uzbek",
    accent: "gold",
    items: [
      "Muammo va Yechim", "RAG Turlari", "Embedding Chuqur", "Chunking Strategiyalari",
      "Ma'lumot Yig'ish (Data Ingestion)", "Vector Database", "Retrieval (Qidirish)",
      "Reranking (Qayta Tartiblash)", "Generation (Javob Yaratish)", "RAG Evaluation — RAGAS",
      "Production Patterns", "Hands-On Project — RAG Chatbot", "LangGraph — State Machine RAG",
      "Advanced RAG Patterns", "Qo'shimcha Mavzular",
    ].map((t, i) => [String(i + 1), t]),
  },
  {
    key: "ragbuild",
    id: "sec-ragbuild",
    title: "RAG Hands-On Build",
    source: "AI_ENGINEERING.html · Uzbek · file-by-file RAG chatbot (PostgreSQL + pgvector)",
    accent: "teal",
    items: [
      ["0", "Tayyorgarlik: PostgreSQL va pgvector"], ["1", "Papka tuzilishi"], ["2", "config.py — sozlamalar"],
      ["3", "database.py — bazaga ulanish"], ["4", "tables.py — jadvallar"], ["5", "bootstrap.py — birinchi g'alaba"],
      ["6", "SQL fayllar — bazani qo'lda qurish"], ["7", "Ma'lumot yig'ish: PDF va sayt"], ["8", "chunker.py — matnni bo'laklash"],
      ["9", "embedder.py — matndan vektorga"], ["10", "LOCAL va CLOUD rejimlar"], ["11", "search.py — vektor qidiruv"],
      ["12", "reranker.py — qayta tartiblash"], ["13", "generator.py — javob yozish"], ["15", "main.py va routes"],
      ["16", "Admin panel"], ["17", "Shablonlar tuzilishi — base.html"], ["18", "templates — foydalanuvchi interfeysi"],
      ["19", "Suhbat tarixi"], ["20", "Baholash — taxmin qilmang, o'lchang"], ["21", "run.py va yakun"],
    ],
  },
];

export const LEDGER_TOTAL = SECTIONS.reduce((n, s) => n + s.items.length, 0);
