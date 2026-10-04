// Written for this tracker (not part of the copied artifact). Uzbek text written by Claude: check the wording.
const T = (en, uz) => ({ en, uz });

export const ADDED_INTRO = T(
  "<b>Your copy:</b> the first phase below, \"Foundation: where you are now\", was added for your level. Everything after it is the original roadmap, unchanged. Notes marked \"For you\" explain where the original advice does not fit a beginner.",
  "<b>Sizning nusxangiz:</b> quyidagi birinchi bosqich, \"Poydevor: hozirgi holatingiz\", sizning darajangiz uchun qo'shilgan. Undan keyingi hammasi asl yo'l xaritasi, o'zgartirilmagan. \"Siz uchun\" belgili izohlar asl maslahat yangi boshlovchiga mos kelmagan joyni tushuntiradi."
);

export const ADDED_PHASE = {
  id: "pU",
  label: T("Your level", "Sizning darajangiz"),
  title: T("Foundation: where you are now", "Poydevor: hozirgi holatingiz"),
  weeks: T("Oct–Dec · your 13-week plan", "Okt–Dek · 13 haftalik reja"),
  hi: true,
  topics: [
    {
      id: "u-py", kind: "must", side: "l", added: true,
      label: T("Python & NumPy for a PHP developer", "Python va NumPy (PHP dasturchi uchun)"),
      hint: T("venv, functions, classes, arrays", "venv, funksiya, klass, massivlar"),
      why: T("Everything after this runs on Python. You already think like a backend developer; the work is learning Python's idioms, not learning to program.",
             "Bundan keyingi hamma narsa Python'da ishlaydi. Siz allaqachon backend kabi o'ylaysiz; vazifa Python uslubini o'rganish, dasturlashni emas."),
      learn: T(["Virtual environments and pip", "Functions, classes, type hints", "NumPy arrays, shapes and X @ w", "Rewrite one PHP script in Python"],
               ["Virtual muhit (venv) va pip", "Funksiya, klass, type hint", "NumPy massivlari, shakllar va X @ w", "Bitta PHP skriptini Python'da qayta yozing"]),
      fails: T(["Skipping venv and breaking dependencies", "NumPy shape errors you cannot read"],
               ["venv'ni o'tkazib yuborib kutubxonalarni buzish", "NumPy'da shakl (shape) xatolarini o'qiy olmaslik"]),
      res: ["Python official tutorial (docs.python.org/3/tutorial)", "NumPy: absolute basics for beginners (numpy.org/doc)"],
      jump: { tab: "scratch", id: "python-for-backend", label: "Open in From Scratch" },
    },
    {
      id: "u-ng", kind: "must", side: "r", added: true,
      label: T("Andrew Ng: Machine Learning Specialization", "Andrew Ng: Machine Learning Specialization"),
      hint: T("Courses 1–2 first", "avval 1–2 kurslar"),
      why: T("This is the right level for you. It teaches linear and logistic regression, neural networks and trees from zero, with labs. The \"skip Andrew Ng\" card at the bottom was written for someone who already codes ML.",
             "Bu siz uchun to'g'ri daraja: chiziqli va logistik regressiya, neyron tarmoqlar va daraxtlarni noldan o'rgatadi, laboratoriyalar bilan. Pastdagi \"Andrew Ng'ni o'tkazing\" kartasi ML kodini allaqachon yoza oladiganlar uchun yozilgan."),
      learn: T(["Course 1: regression, gradient descent, logistic regression, regularization", "Course 2: neural networks, training, bias/variance, decision trees", "After each week, rewrite the model in NumPy from memory"],
               ["1-kurs: regressiya, gradient descent, logistik regressiya, regularizatsiya", "2-kurs: neyron tarmoqlar, o'qitish, bias/variance, qaror daraxtlari", "Har haftadan keyin modelni NumPy'da xotiradan qayta yozing"]),
      fails: T(["Watching without rewriting anything", "Spending weeks on one lecture instead of moving on"],
               ["Faqat ko'rib, hech narsani qayta yozmaslik", "Bitta ma'ruzada haftalab qolib ketish"]),
      res: ["Coursera: Machine Learning Specialization (DeepLearning.AI x Stanford)"],
      jump: { tab: "course", id: null, label: "Open the ML Course tab" },
    },
    {
      id: "u-scratch", kind: "must", side: "l", added: true,
      label: T("Models from scratch in NumPy", "Modellarni NumPy'da noldan yozish"),
      hint: T("linear, logistic, trees, k-means", "chiziqli, logistik, daraxt, k-means"),
      why: T("Writing each model once is what turns formulas into something you can debug.",
             "Har bir modelni bir marta yozish formulalarni debug qila oladigan narsaga aylantiradi."),
      learn: T(["Linear regression with gradient descent", "Logistic regression and log loss", "Decision tree split by entropy; the k-means loop"],
               ["Gradient descent bilan chiziqli regressiya", "Logistik regressiya va log loss", "Entropiya bo'yicha daraxt bo'linishi; k-means sikli"]),
      fails: T(["Copying code instead of writing it from memory", "Never checking against scikit-learn's answer"],
               ["Kodni xotiradan yozmasdan ko'chirish", "Natijani scikit-learn bilan hech tekshirmaslik"]),
      res: ["Your From Scratch tab: worked numeric examples for each model"],
      jump: { tab: "scratch", id: "linear-regression", label: "Open in From Scratch" },
    },
    {
      id: "u-classic", kind: "must", side: "r", added: true,
      label: T("Classic ML models", "Klassik ML modellari"),
      hint: T("SVM, trees, forests, boosting, KNN, Naive Bayes", "SVM, daraxtlar, o'rmon, boosting, KNN, Naive Bayes"),
      why: T("These are the models you meet in jobs and interviews. Know when each one fits, not only how it works.",
             "Ish va intervyularda aynan shu modellar uchraydi. Har biri qachon mos kelishini biling, faqat qanday ishlashini emas."),
      learn: T(["Decision trees, random forest, gradient boosting", "SVM and the kernel idea", "KNN and Naive Bayes as quick baselines"],
               ["Qaror daraxtlari, random forest, gradient boosting", "SVM va kernel g'oyasi", "KNN va Naive Bayes — tezkor baseline sifatida"]),
      fails: T(["Using a deep model when a tree would do", "Tuning blindly without a baseline"],
               ["Daraxt yetarli bo'lganda chuqur model ishlatish", "Baseline'siz ko'r-ko'rona sozlash"]),
      res: ["Your ML_GUIDE.html chapters on KNN, Naive Bayes, SVM, trees, forests, boosting"],
      jump: { tab: "ledger", id: "sec-classic", label: "Open the Guide Index" },
    },
    {
      id: "u-eval", kind: "must", side: "l", added: true,
      label: T("Overfitting, bias/variance, regularization", "Overfitting, bias/variance, regularizatsiya"),
      hint: T("your first evaluation habits", "birinchi baholash odatlari"),
      why: T("These three ideas explain most training problems and lead straight into Phase 1 (evaluation rigor).",
             "Bu uch g'oya o'qitish muammolarining ko'pini tushuntiradi va to'g'ridan-to'g'ri 1-bosqichga (baholash qat'iyligi) olib boradi."),
      learn: T(["Train / validation / test split", "Learning curves: high bias vs high variance", "L1 / L2 regularization and the strength knob"],
               ["Train / validation / test bo'linishi", "O'qitish egri chiziqlari: yuqori bias va yuqori variance", "L1 / L2 regularizatsiya va kuch parametri"]),
      fails: T(["Judging a model by its training score", "Tuning on the test set"],
               ["Modelni o'qitish ballari bilan baholash", "Test to'plamida sozlash"]),
      res: ["Andrew Ng Course 2, week 3: advice for applying machine learning"],
      jump: { tab: "course", id: null, label: "Open the ML Course tab" },
    },
    {
      id: "u-sklearn", kind: "must", side: "r", added: true,
      label: T("scikit-learn workflow", "scikit-learn ish jarayoni"),
      hint: T("fit, predict, score, pipelines", "fit, predict, score, pipeline"),
      why: T("The standard toolkit for classic ML. Pipelines keep preprocessing inside cross-validation so you do not leak data.",
             "Klassik ML uchun standart vositalar. Pipeline'lar oldindan ishlov berishni cross-validation ichida saqlaydi, shuning uchun ma'lumot sizib chiqmaydi."),
      learn: T(["fit / predict / score on a real dataset", "Pipeline and ColumnTransformer", "cross_val_score and GridSearchCV"],
               ["Haqiqiy dataset'da fit / predict / score", "Pipeline va ColumnTransformer", "cross_val_score va GridSearchCV"]),
      fails: T(["Scaling before the split", "Fitting the scaler on test data"],
               ["Bo'lishdan oldin masshtablash", "Scaler'ni test ma'lumotida fit qilish"]),
      res: ["scikit-learn user guide (scikit-learn.org/stable/user_guide.html)"],
      jump: { tab: "ledger", id: "sec-classic", label: "Open the Guide Index" },
    },
    {
      id: "u-api", kind: "must", side: "l", added: true,
      label: T("FastAPI + PostgreSQL", "FastAPI + PostgreSQL"),
      hint: T("routes, Pydantic, SQLAlchemy", "route, Pydantic, SQLAlchemy"),
      why: T("The serving layer: a model is only useful behind a reliable API. This is also where your PHP experience transfers best.",
             "Xizmat qatlami: model faqat ishonchli API ortida foydali. Bu yerda PHP tajribangiz eng yaxshi ko'chadi."),
      learn: T(["Routes and Pydantic validation", "SQLAlchemy and PostgreSQL", "Clean error responses (404, 422)"],
               ["Route'lar va Pydantic validatsiyasi", "SQLAlchemy va PostgreSQL", "Toza xato javoblari (404, 422)"]),
      fails: T(["Business logic inside route handlers", "Raw 500 errors in a demo"],
               ["Biznes mantiqni route ichida yozish", "Demoda xom 500 xatolar"]),
      res: ["FastAPI tutorial (fastapi.tiangolo.com/tutorial)"],
      jump: { tab: "scratch", id: "fastapi-basics", label: "Open in From Scratch" },
    },
    {
      id: "u-llm", kind: "must", side: "r", added: true,
      label: T("LLM API and your first RAG app", "LLM API va birinchi RAG ilova"),
      hint: T("structured output, embeddings, pgvector", "structured output, embedding, pgvector"),
      why: T("The fastest route to a backend-plus-AI job, and the first piece of the serving skills this roadmap values.",
             "Backend + AI ishiga eng tez yo'l va bu yo'l xaritasi qadrlaydigan xizmat ko'nikmalarining birinchi qismi."),
      learn: T(["Call an LLM API with structured JSON output", "Embeddings and pgvector search", "Chunk, retrieve, answer, then evaluate with 20 real questions"],
               ["LLM API'ni structured JSON chiqish bilan chaqirish", "Embedding va pgvector qidiruvi", "Bo'laklash, qidirish, javob berish, so'ng 20 ta haqiqiy savol bilan baholash"]),
      fails: T(["Trusting model output without validation", "Judging the pipeline on three examples"],
               ["Model javobini tekshirmasdan ishonish", "Pipeline'ni uchta misolga qarab baholash"]),
      res: ["Anthropic API docs (docs.anthropic.com)", "pgvector (github.com/pgvector/pgvector)"],
      jump: { tab: "scratch", id: "rag-pipeline", label: "Open in From Scratch" },
    },
    {
      id: "u-dsa", kind: "deep", side: "l", added: true,
      label: T("DSA patterns for backend interviews", "Backend intervyulari uchun DSA patternlar"),
      hint: T("a separate track, kept small", "alohida yo'nalish, kichik hajmda"),
      why: T("This roadmap skips LeetCode for ML roles, but backend job interviews still test it. A little every week is enough.",
             "Bu yo'l xaritasi ML rollari uchun LeetCode'ni o'tkazib yuboradi, lekin backend intervyulari baribir sinaydi. Har hafta ozgina yetarli."),
      learn: T(["One pattern at a time from Pattern Manual", "Write the template from memory", "Review each pattern again after 3, 7 and 21 days"],
               ["Pattern Manual'dan bir vaqtda bitta pattern", "Shablonni xotiradan yozing", "Har bir patternni 3, 7 va 21 kundan keyin takrorlang"]),
      fails: T(["Grinding hundreds of problems without learning patterns"], ["Patternlarni o'rganmay yuzlab masala yechish"]),
      res: ["NeetCode roadmap (neetcode.io/roadmap)"],
      jump: { tab: "patterns", id: "arrays-hashing", label: "Open Pattern Manual" },
    },
    {
      id: "u-goal", kind: "goal", side: "r", added: true,
      label: T("DELIVERABLE: two live projects", "NATIJA: ikkita jonli loyiha"),
      hint: T("CRUD API + Kitobon RAG, with links", "CRUD API + Kitobon RAG, havolalar bilan"),
      why: T("A job search needs proof. Two deployed projects with a README and live links beat any certificate.",
             "Ish qidirish dalil talab qiladi. README va jonli havolali ikkita deploy qilingan loyiha har qanday sertifikatdan kuchli."),
      learn: T(["CRUD API on GitHub with a real README", "Kitobon AI feature or RAG app, live", "CV and khayrullo.uz updated with live links"],
               ["GitHub'da haqiqiy README'li CRUD API", "Kitobon AI funksiyasi yoki RAG ilova, jonli", "CV va khayrullo.uz jonli havolalar bilan yangilangan"]),
      fails: T(["Projects that only run on your laptop"], ["Faqat noutbukda ishlaydigan loyihalar"]),
      res: [],
      jump: { tab: "roadmap", id: null, label: "Open the Roadmap tab" },
    },
  ],
};

export const ADDED_NOTES = {
  "x-ng": T("For you: this warning was written for someone who already codes ML. You are at the level this course is for, so keep going. See the ML Course tab.",
            "Siz uchun: bu ogohlantirish ML kodini allaqachon yoza oladigan odam uchun yozilgan. Siz bu kurs mo'ljallangan darajadasiz, davom eting. ML Course tabiga qarang."),
  "x-dsa": T("For you: ML roles can skip it, backend job interviews cannot. Keep Pattern Manual as a small separate track.",
             "Siz uchun: ML rollari buni o'tkazib yuborishi mumkin, backend intervyulari esa yo'q. Pattern Manual'ni kichik alohida yo'nalish sifatida saqlang."),
  "x-scratch": T("For you: while you are learning classic ML, write each model once from scratch. Do not do it twice.",
                 "Siz uchun: klassik ML'ni o'rganayotganingizda har bir modelni noldan bir marta yozing. Ikki marta qilmang."),
};

export const FOOTER = T(
  "Source: a public artifact, \"ML Roadmap — Backend → Applied ML\" (author unknown), copied here for personal study. The \"Your level\" phase and the \"For you\" notes are additions.",
  "Manba: ommaviy artifact, \"ML Roadmap — Backend → Applied ML\" (muallif noma'lum), shaxsiy o'qish uchun ko'chirilgan. \"Sizning darajangiz\" bosqichi va \"Siz uchun\" izohlari qo'shimchalar."
);

export const JUMPS = {
  "m-linalg": { tab: "scratch", id: "linear-algebra", label: "Linear Algebra, From Scratch" },
  "c-cv": { tab: "course", id: null, label: "Andrew Ng, Course 2 week 3" },
  "c-gbm": { tab: "scratch", id: "ensembles", label: "Ensemble Methods, From Scratch" },
  "l-embed": { tab: "ledger", id: "sec-ragtheory", label: "RAG Theory: Embedding Chuqur" },
  "l-rageval": { tab: "ledger", id: "sec-ragtheory", label: "RAG Evaluation (RAGAS)" },
  "l-chunk": { tab: "ledger", id: "sec-ragtheory", label: "Chunking Strategiyalari" },
  "o-serve": { tab: "scratch", id: "fastapi-basics", label: "FastAPI Fundamentals" },
};

export const GATE = {
  title: T("Phases 1–5 come after your foundation", "1–5-bosqichlar poydevordan keyin"),
  items: [
    T("Both portfolio projects (CRUD API and Kitobon RAG) are live with links on your CV.", "Ikkala portfolio loyihasi (CRUD API va Kitobon RAG) jonli va CV'da havolalari bor."),
    T("Andrew Ng's Courses 1 and 2 are finished, with the NumPy rewrites done.", "Andrew Ng'ning 1 va 2-kurslari tugagan, NumPy'da qayta yozish bajarilgan."),
    T("Your job search is running (5 applications a week). This is for the job you land, not a reason to stop applying.", "Ish qidiruvingiz ketmoqda (haftasiga 5 ariza). Bu topgan ishingiz uchun, ariza berishni to'xtatish sababi emas."),
  ],
};

// topics that enter spaced review once ticked (no deliverables, rules, or the Specialize phase)
export const REVIEW_EXCLUDE_PHASES = ["pU", "p6"];
export const REVIEW_EXCLUDE_TOPICS = ["m-timebox"];
