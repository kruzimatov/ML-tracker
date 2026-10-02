"use client";

import styles from "./LedgerTab.module.css";

const SECTIONS = [
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

export default function LedgerTab({ state, setState }) {
  const toggle = (k) => setState((s) => ({ ...s, [k]: !s[k] }));

  return (
    <div className={`${styles.wrap} mc-fade`}>
      <div className={styles.masthead}>
        <div className={styles.kicker}>Index · not a replacement</div>
        <h1 className={styles.title}>The Ledger</h1>
        <p className={styles.lede}>
          A tracking layer over two guides that already exist and already have the depth — worked numeric traces,
          from-scratch derivations, interview questions, a full hands-on build. This page adds nothing to their
          content. It only tracks which of the 68 chapters across both are actually done.
        </p>
        <div className={styles.sourcePaths}>
          <b>ML_GUIDE.html</b>~/MachineLearning/ML PPTS/ML_GUIDE.html — 32 chapters, classic ML &amp; deep learning
          <b className={styles.second}>AI_ENGINEERING.html</b>~/Downloads/AI_ENGINEERING.html — same 32 + RAG theory (15) + hands-on RAG build (21)
        </div>
        <p className={styles.note}>
          This page can&apos;t open local files for you — open them yourself in your editor or browser. Checking a
          square here only tracks progress; it doesn&apos;t jump into the file.
        </p>
        <div className={styles.controls}><button onClick={() => setState({})}>Reset all</button></div>
      </div>

      {SECTIONS.map((sec) => {
        const done = sec.items.filter(([n]) => state[`${sec.key}:${n}`]).length;
        const pct = (done / sec.items.length) * 100;
        return (
          <div key={sec.key} id={sec.id} className={styles.section}>
            <div className={styles.sectionHead}>
              <div className={styles.sectionTitle}>
                <span className={`${styles.dot} ${styles[sec.accent]}`} />{sec.title}
              </div>
              <div className={styles.frac}><b>{done}</b>/{sec.items.length}</div>
            </div>
            <div className={styles.source}>{sec.source}</div>
            <div className={styles.pbar}><div className={`${styles.pbarFill} ${styles[sec.accent]}`} style={{ width: `${pct}%` }} /></div>
            <div className={styles.grid}>
              {sec.items.map(([num, title]) => {
                const k = `${sec.key}:${num}`;
                return (
                  <button key={k} title={title} onClick={() => toggle(k)}
                    className={`${styles.card} ${state[k] ? `${styles.done} ${styles[`done_${sec.accent}`]}` : ""}`}>
                    <div className={styles.num}><span>{num}</span><span className={styles.check} /></div>
                    <div className={styles.cardTitle}>{title}</div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className={styles.footnote}>
        Chapter numbers and titles are read directly from both files&apos; own headings — nothing here is guessed. The
        RAG build guide&apos;s own numbering skips from 13-BOB to 15-BOB in the source file; that gap is preserved here
        rather than renumbered.
      </div>
    </div>
  );
}
