// Verbatim copy of the data from the public artifact "ML Roadmap — Backend → Applied ML" (author unknown), both languages.
// Do not edit; put your own additions in proRoadmapAdditions.js.
export const UI = {
 "subtitle": {
  "uz": "Backend muhandis → Applied ML / LLM Systems · ~7 oy",
  "en": "Backend engineer → Applied ML / LLM Systems · ~7 months"
 },
 "reset": {
  "uz": "Tozalash",
  "en": "Reset"
 },
 "resetConfirm": {
  "uz": "Barcha progress o'chirilsinmi?",
  "en": "Clear all progress?"
 },
 "lgMust": {
  "uz": "Asosiy — bajarish shart",
  "en": "Core — do it"
 },
 "lgDeep": {
  "uz": "Chuqurlik — ikkinchi navbatda",
  "en": "Depth — do it second"
 },
 "lgGoal": {
  "uz": "Natija — bosqichni isbotlaydi",
  "en": "Deliverable — proves the phase"
 },
 "lgSkip": {
  "uz": "O'tkazib yuborish — ataylab",
  "en": "Skip — deliberately"
 },
 "lgDone": {
  "uz": "Bajarildi",
  "en": "Done"
 },
 "intro": {
  "uz": "Allaqachon backend tizim quradigan va ML'ga tegib ko'rgan odam uchun (LightGBM/Prophet forecasting, RAG, Claude API). Muammo ML bilimida emas — <b>evaluation qat'iyligida</b> va <b>serving qatlamida</b>. Har bir tugmani bosing: nimani o'rganish, nima qurish va production'da nima buzilishi yozilgan.",
  "en": "Built for someone who already ships backend systems and has touched ML (LightGBM/Prophet forecasting, RAG, Claude API). The gap isn't ML knowledge, it's <b>evaluation rigor</b> plus the <b>serving layer</b>. Tap any node for what to learn, what to build, and what breaks in production."
 },
 "skipHeadTop": {
  "uz": "Ataylab o'tkazib yuboring",
  "en": "Deliberately skip"
 },
 "skipHeadTitle": {
  "uz": "Bularni O'RGANMANG",
  "en": "Do NOT learn these"
 },
 "skipHeadSub": {
  "uz": "Har biri oylab vaqt oladi, sizning darajangizda foydasi kam",
  "en": "Each one costs months and returns little at your level"
 },
 "secLearn": {
  "uz": "Nimani o'rganish kerak",
  "en": "What to learn"
 },
 "secFails": {
  "uz": "Qayerda buziladi",
  "en": "Failure modes"
 },
 "secRes": {
  "uz": "Manbalar",
  "en": "Resources"
 },
 "markDone": {
  "uz": "Bajarildi deb belgilash",
  "en": "Mark as done"
 },
 "undone": {
  "uz": "✓ Bajarildi — bekor qilish",
  "en": "✓ Done — tap to undo"
 },
 "saveLocal": {
  "uz": "Progress shu brauzerda saqlanadi.",
  "en": "Progress saved in this browser."
 },
 "saveSync": {
  "uz": "Progress qurilmalaringiz o'rtasida sinxronlanadi.",
  "en": "Progress synced across your devices."
 },
 "kMust": {
  "uz": "Asosiy",
  "en": "Core"
 },
 "kDeep": {
  "uz": "Chuqurlik",
  "en": "Depth"
 },
 "kGoal": {
  "uz": "Natija",
  "en": "Deliverable"
 },
 "kSkip": {
  "uz": "O'tkazish",
  "en": "Skip"
 }
};

export const PHASES = [
 {
  "id": "p0",
  "label": {
   "uz": "0-bosqich",
   "en": "Phase 0"
  },
  "title": {
   "uz": "Matematik poydevor",
   "en": "Math Floor"
  },
  "weeks": {
   "uz": "2–3 hafta · parallel ketadi",
   "en": "2–3 weeks · run in parallel"
  },
  "topics": [
   {
    "id": "m-linalg",
    "kind": "must",
    "side": "l",
    "label": {
     "uz": "Chiziqli algebra",
     "en": "Linear Algebra"
    },
    "hint": {
     "uz": "vektor, matmul, dot product, SVD",
     "en": "vectors, matmul, dot product, SVD"
    },
    "why": {
     "uz": "Sizga modelni debug qilish uchun yetarli daraja kerak, teorema isbotlash uchun emas. Siz yozgan har bir embedding qidiruvi — bu chiziqli algebra, siz uni o'qimasdan ishlatgansiz.",
     "en": "You need enough to debug models, not to derive proofs. Every embedding search you have already written is linear algebra you ran without reading."
    },
    "learn": {
     "uz": [
      "Vektorlar, norma, va normalizatsiya aslida nima qiladi",
      "Matritsa ko'paytmasi — bu chiziqli akslantirish, sikl emas",
      "Dot product = o'xshashlik. Bu sizning RAG cosine qidiruvingizning O'ZI",
      "Rank, va past rankli matritsa nega siqadi (LoRA'dagi 'Low-Rank' shu)",
      "SVD / eigenvector intuitsiyasi (PCA, embedding siqish)"
     ],
     "en": [
      "Vectors, norms, and what normalization actually does",
      "Matrix multiplication as a linear map, not as a loop",
      "Dot product as similarity — this IS your RAG cosine search",
      "Rank, and why a low-rank matrix compresses (this is the LoRA in LoRA)",
      "SVD / eigenvector intuition (PCA, embedding compression)"
     ]
    },
    "fails": {
     "uz": [
      "Embedding'ni shunchaki massiv deb qarash → retrieval nega xato qilayotganini tushuntira olmaysiz",
      "Vektorlarni normalizatsiya qilmay, cosine ballari ma'nosiz bo'lib qolishi"
     ],
     "en": [
      "Treating embeddings as opaque arrays, so you cannot reason about why retrieval misses",
      "Not normalizing vectors and wondering why cosine scores are meaningless"
     ]
    },
    "res": [
     "3Blue1Brown — Essence of Linear Algebra (~4 soat)"
    ]
   },
   {
    "id": "m-prob",
    "kind": "must",
    "side": "r",
    "label": {
     "uz": "Ehtimollik va statistika",
     "en": "Probability & Statistics"
    },
    "hint": {
     "uz": "Bayes, taqsimotlar, dispersiya",
     "en": "Bayes, distributions, variance"
    },
    "why": {
     "uz": "ML nosozliklarining aksariyati statistik, algoritmik emas. Dispersiya haqida fikr yurita olmasangiz, haqiqiy yaxshilanishni shovqindan ajrata olmaysiz.",
     "en": "Most ML failures are statistical, not algorithmic. If you cannot reason about variance, you cannot tell a real improvement from noise."
    },
    "learn": {
     "uz": [
      "Taqsimotlar: normal, Bernoulli, Puasson, uzun dum (long-tail)",
      "Shartli ehtimollik va Bayes",
      "Kutilma va dispersiya; bias-variance tradeoff",
      "Ishonch intervallari — 200 ta namunada 2% o'sish hech narsani anglatmaydi",
      "Gipoteza tekshirish asoslari (A/B va drift detection uchun kerak bo'ladi)"
     ],
     "en": [
      "Distributions: normal, Bernoulli, Poisson, long-tail",
      "Conditional probability and Bayes",
      "Expectation vs variance; bias-variance tradeoff",
      "Confidence intervals and why a 2% metric gain on 200 samples means nothing",
      "Hypothesis testing basics (you will need this for A/B and drift detection)"
     ]
    },
    "fails": {
     "uz": [
      "Bitta splitda 0.87 vs 0.85 ko'rib modelni deploy qilish — bu shovqin, g'alaba emas",
      "Rahbariyatga dispersiyasiz bitta raqam ko'rsatish"
     ],
     "en": [
      "Shipping a model because it scored 0.87 vs 0.85 on one split — that is noise, not a win",
      "Reporting a single number with no variance estimate to stakeholders"
     ]
    },
    "res": [
     "StatQuest (YouTube) — ketma-ket emas, kerak bo'lganda"
    ]
   },
   {
    "id": "m-calc",
    "kind": "must",
    "side": "l",
    "label": {
     "uz": "Backprop uchun analiz",
     "en": "Calculus for Backprop"
    },
    "hint": {
     "uz": "gradient, zanjir qoidasi",
     "en": "gradient, chain rule"
    },
    "why": {
     "uz": "Training curve'ni o'qib, muammo loss'dami, LR'dami yoki data'damikan — shuni ayta olish uchun yetarli daraja kerak, ko'p emas.",
     "en": "You need exactly enough to read a training curve and know whether the problem is the loss, the LR, or the data."
    },
    "learn": {
     "uz": [
      "Hosila = qiyalik, gradient = eng tik ko'tarilish yo'nalishi",
      "Zanjir qoidasi — backprop bu shunchaki shu",
      "Gradient nega yo'qoladi yoki portlaydi",
      "Optimizer (SGD, Adam) aslida og'irliklarga nima qilyapti"
     ],
     "en": [
      "Derivative as slope, gradient as direction of steepest ascent",
      "Chain rule — this is literally all backprop is",
      "Why gradients vanish or explode",
      "What an optimizer (SGD, Adam) is actually doing to weights"
     ]
    },
    "fails": {
     "uz": [
      "Loss NaN bo'ldi va sizda uni debug qiladigan mental model yo'q",
      "Learning rate'ni xurofot bilan sozlash, curve'ni o'qish o'rniga"
     ],
     "en": [
      "Loss goes NaN and you have no mental model to debug it",
      "Tuning learning rate by superstition instead of by reading the curve"
     ]
    },
    "res": [
     "3Blue1Brown — Neural Networks, 3–4 qism"
    ]
   },
   {
    "id": "m-timebox",
    "kind": "deep",
    "side": "r",
    "label": {
     "uz": "3 haftalik qattiq chegara",
     "en": "The Timebox Rule"
    },
    "hint": {
     "uz": "matematikada qolib ketmaslik",
     "en": "3 weeks hard limit"
    },
    "why": {
     "uz": "Backend muhandislar ML'da muvaffaqiyatsizlikka uchraydigan eng keng tarqalgan yo'l — 4 oy matematikaga sarflab, hech qachon model o'rgatmaslik. Matematika — kerak bo'lganda ochiladigan lug'at, kirish darvozasi emas.",
     "en": "The most common way backend engineers fail at ML is spending 4 months on math and never training a model. Math is a lookup table you fill in on demand, not a prerequisite gate."
    },
    "learn": {
     "uz": [
      "0-bosqichni 3 hafta bilan cheklang — qanchalik tugallanmagan tuyulsa ham",
      "Matematikaga faqat aniq bir bug talab qilganda qayting",
      "SVD'ni birinchi o'qishda to'liq tushunmasligingizni qabul qiling va oldinga yuring"
     ],
     "en": [
      "Cap Phase 0 at 3 weeks regardless of how complete it feels",
      "Return to math only when a specific bug demands it",
      "Accept that you will not fully understand SVD on the first pass, and move on"
     ]
    },
    "fails": {
     "uz": [
      "Gilbert Strang'ning to'liq MIT kursi. Ajoyib material, siz uchun noto'g'ri tartib.",
      "'Hali tayyor emasman' hissi bilan matematikani ikki marta qaytadan boshlash"
     ],
     "en": [
      "Gilbert Strang's full MIT course. Excellent material, wrong order for you.",
      "Feeling 'not ready' and restarting the math track twice"
     ]
    },
    "res": []
   }
  ]
 },
 {
  "id": "p1",
  "label": {
   "uz": "1-bosqich",
   "en": "Phase 1"
  },
  "title": {
   "uz": "Klassik ML — qat'iylik",
   "en": "Classical ML Rigor"
  },
  "weeks": {
   "uz": "6–8 hafta",
   "en": "6–8 weeks"
  },
  "hi": true,
  "topics": [
   {
    "id": "c-cv",
    "kind": "must",
    "side": "l",
    "label": {
     "uz": "Validatsiya va Time-Series CV",
     "en": "Validation & Time-Series CV"
    },
    "hint": {
     "uz": "expanding window, purged split",
     "en": "expanding window, purged splits"
    },
    "why": {
     "uz": "Siz Prophet va LightGBM'ni allaqachon ishlatgansiz. Ochiq savol — ularni ma'noli tarzda validate qilganmisiz. Backend muhandislarning ko'pi qilmaydi, va model production'gacha ajoyib ko'rinadi.",
     "en": "You have already used Prophet and LightGBM. The open question is whether you validated them in a way that means anything. Most backend engineers do not, and the model looks great until production."
    },
    "learn": {
     "uz": [
      "Train / validation / test, va test set'ga nega faqat bir marta tegiladi",
      "K-fold cross-validation va u qachon noto'g'ri",
      "Time-series CV: expanding window va rolling origin",
      "Purged / embargoed split (trading tomonga ketsangiz — majburiy)",
      "Nested CV — hyperparameter ham sozlayotgan bo'lsangiz"
     ],
     "en": [
      "Train / validation / test, and why the test set is touched once",
      "K-fold cross-validation and when it is wrong",
      "Time-series CV: expanding window and rolling origin",
      "Purged / embargoed splits (mandatory if you go toward trading)",
      "Nested CV when you are also tuning hyperparameters"
     ]
    },
    "fails": {
     "uz": [
      "Time-series data'da random K-fold — model kelajakni ko'radi va hech narsada ajoyib ball oladi",
      "40 ta eksperiment davomida test set'da tuning qilish — u endi shunchaki yana bitta training set",
      "Offline zo'r, live'da foydasiz model — split deployment'ni aks ettirmagani uchun"
     ],
     "en": [
      "Random K-fold on time-series data — the model sees the future and scores beautifully on nothing",
      "Tuning on the test set across 40 experiments until it is just another training set",
      "A model that is great offline and useless live, because the split did not mirror deployment"
     ]
    },
    "res": []
   },
   {
    "id": "c-leak",
    "kind": "must",
    "side": "r",
    "label": {
     "uz": "Data Leakage",
     "en": "Data Leakage"
    },
    "hint": {
     "uz": "#1 jimgina qotil",
     "en": "the #1 silent killer"
    },
    "why": {
     "uz": "Leakage — ML loyihasi launch'dan keyin o'lishining eng keng tarqalgan sababi. Bu data-pipeline bug'i, ya'ni qanday shakllarda kelishini bilsangiz, backend intuitsiyangiz to'g'ridan-to'g'ri ishlaydi.",
     "en": "Leakage is the single most common reason an ML project dies after launch. It is a data-pipeline bug, which means your backend instincts transfer directly once you know the shapes it takes."
    },
    "learn": {
     "uz": [
      "Target leakage: javobni ichiga olgan feature (masalan, 'invoice_paid_date' to'lovni bashorat qilyapti)",
      "Temporal leakage: split'dan OLDIN rolling statistika hisoblash",
      "Group leakage: bir xil mijoz/dala/qurilma train'da ham, test'da ham",
      "Preprocessing leakage: scaler yoki encoder'ni butun datasetda fit qilish",
      "Yechim: har bir transform'ni faqat training fold ichida fit qiling — sklearn Pipeline ishlating"
     ],
     "en": [
      "Target leakage: a feature that encodes the answer (e.g. 'invoice_paid_date' predicting payment)",
      "Temporal leakage: computing rolling stats before splitting",
      "Group leakage: same customer/field/device in both train and test",
      "Preprocessing leakage: fitting the scaler or encoder on the full dataset",
      "Fix: fit every transform inside the training fold only — use sklearn Pipeline"
     ]
    },
    "fails": {
     "uz": [
      "AUC 0.99. Bu hech qachon haqiqiy emas. Borib leak'ni toping.",
      "Target encoding butun datasetda hisoblangan — klassik jim variant"
     ],
     "en": [
      "AUC of 0.99. It is never real. Go find the leak.",
      "Target encoding computed on the full dataset — the classic quiet one"
     ]
    },
    "res": []
   },
   {
    "id": "c-metric",
    "kind": "must",
    "side": "l",
    "label": {
     "uz": "Qarorga mos metrika",
     "en": "Metrics That Match the Decision"
    },
    "hint": {
     "uz": "accuracy yolg'on gapiradi",
     "en": "accuracy lies"
    },
    "why": {
     "uz": "Metrika — biznes qarorining siqilgan shakli. Noto'g'ri tanlasangiz, noto'g'ri yo'nalishda kuchli optimizatsiya qilasiz.",
     "en": "A metric is a compression of a business decision. Pick the wrong one and you optimize hard in the wrong direction."
    },
    "learn": {
     "uz": [
      "Nomutanosib datada accuracy nega befoyda (99% manfiy → hech narsa qilmay 99% accuracy)",
      "Precision vs recall, va har bir xato turining narxiga qarab tanlash",
      "PR-AUC vs ROC-AUC — musbatlar kam bo'lsa PR-AUC",
      "Forecasting: MAE, RMSE, MAPE vs WAPE (MAPE nolga yaqin qiymatlarda portlaydi)",
      "Pinball loss — kvantil forecast uchun. Odatda sizga nuqta emas, oraliq kerak."
     ],
     "en": [
      "Why accuracy is useless on imbalanced data (99% negatives → 99% accuracy doing nothing)",
      "Precision vs recall, and picking based on cost of each error type",
      "PR-AUC vs ROC-AUC — use PR-AUC when positives are rare",
      "Forecasting: MAE, RMSE, MAPE vs WAPE (MAPE explodes near zero demand)",
      "Pinball loss for quantile forecasts — you usually want a range, not a point"
     ]
    },
    "fails": {
     "uz": [
      "Kuniga 0–3 dona sotiladigan taomda MAPE optimizatsiya qilish → cheksiz xato",
      "Biznes faqat top-10 pozitsiyaga qiziqqanda global metrika ko'rsatish"
     ],
     "en": [
      "Optimizing MAPE on a restaurant dish that sells 0–3 units, giving infinite error",
      "Reporting one global metric when the business only cares about the top 10 items"
     ]
    },
    "res": []
   },
   {
    "id": "c-feat",
    "kind": "must",
    "side": "r",
    "label": {
     "uz": "Feature Engineering",
     "en": "Feature Engineering"
    },
    "hint": {
     "uz": "lag, rolling, encoding",
     "en": "lags, rollings, encodings"
    },
    "why": {
     "uz": "Tabular datada feature'lar modeldan ustun keladi. Yaxshi feature'li o'rtamiyona model — xom ustunlar ustidagi sozlangan modeldan deyarli har doim yutadi.",
     "en": "On tabular data, features beat models. A mediocre model with good features wins against a tuned model on raw columns, almost every time."
    },
    "learn": {
     "uz": [
      "Lag feature'lar va rolling oyna (7/14/28 kunlik mean, std, min/max)",
      "Kalendar feature'lar: hafta kuni, bayramlar, Ramazon/Hayit, oylik sanasi — O'zbekiston talab datasi uchun kritik",
      "Kategorial encoding: one-hot, ordinal, target encoding (out-of-fold hisoblash bilan)",
      "Yo'q qiymatlarni signal sifatida ko'rish, faqat impute qilish emas",
      "Feature importance (permutation importance — built-in gain'dan yaxshiroq)"
     ],
     "en": [
      "Lag features and rolling windows (mean, std, min/max over 7/14/28 days)",
      "Calendar features: day of week, holidays, Ramadan/Eid, paydays — critical for Uzbek demand data",
      "Categorical encoding: one-hot, ordinal, target encoding (with out-of-fold computation)",
      "Handling missing values as signal, not just as something to impute",
      "Feature importance (permutation importance beats built-in gain importance)"
     ]
    },
    "fails": {
     "uz": [
      "Out-of-fold hisoblashsiz target encoding → darhol leakage",
      "400 ta feature qurib, overfit qilib, modelni hech kimga tushuntira olmay qolish"
     ],
     "en": [
      "Target encoding without out-of-fold computation → instant leakage",
      "Building 400 features, overfitting, and losing the ability to explain the model to anyone"
     ]
    },
    "res": []
   },
   {
    "id": "c-gbm",
    "kind": "must",
    "side": "l",
    "label": {
     "uz": "Decision Tree → LightGBM",
     "en": "Decision Trees → LightGBM"
    },
    "hint": {
     "uz": "noldan, qora quti sifatida emas",
     "en": "from scratch, not as a black box"
    },
    "why": {
     "uz": "Tabular datada eng ko'p ishlatadigan quroliningiz shu bo'ladi. Uni qora quti sifatida ishlatish — qaysi tugma muhim va qaysi biri shovqin ekanini bilmaslik demak. Mexanizmni bilsangiz, tuning 12 ta parametrdan 3 taga qisqaradi.",
     "en": "This will be your most-used tool on tabular data. Using it as a black box means not knowing which knob matters and which is noise. Understand the mechanism and tuning drops from 12 parameters to 3."
    },
    "learn": {
     "uz": [
      "Decision tree: split mezonlari (gini, entropy, variance reduction), chuqurlik, pruning",
      "Bagging (Random Forest) vs Boosting — birinchisi variance'ni, ikkinchisi bias'ni kamaytiradi",
      "Gradient boosting: har bir daraxt oldingi ansamblning gradientiga (residual) moslashadi",
      "LightGBM ichki tuzilishi: leaf-wise (best-first) o'sish vs level-wise, histogram binning, GOSS, EFB",
      "Kategorial ishlov: LightGBM native categorical vs one-hot — qachon qaysi biri",
      "Tugmalar muhimlik tartibi: learning_rate + n_estimators (early stopping bilan) → num_leaves → min_data_in_leaf → feature_fraction → lambda_l1/l2",
      "Early stopping validation set bilan — n_estimators'ni hech qachon qo'lda tanlamang",
      "XGBoost vs LightGBM vs CatBoost: kichik data va ko'p kategorial → CatBoost; katta data va tezlik → LightGBM"
     ],
     "en": [
      "Decision tree: split criteria (gini, entropy, variance reduction), depth, pruning",
      "Bagging (Random Forest) vs boosting — the first reduces variance, the second reduces bias",
      "Gradient boosting: each tree fits the gradient (residual) of the previous ensemble",
      "LightGBM internals: leaf-wise (best-first) growth vs level-wise, histogram binning, GOSS, EFB",
      "Categorical handling: LightGBM native categorical vs one-hot, and when each wins",
      "Knobs in order of importance: learning_rate + n_estimators (with early stopping) → num_leaves → min_data_in_leaf → feature_fraction → lambda_l1/l2",
      "Early stopping on a validation set — never pick n_estimators by hand",
      "XGBoost vs LightGBM vs CatBoost: small data with many categoricals → CatBoost; large data and speed → LightGBM"
     ]
    },
    "fails": {
     "uz": [
      "Leaf-wise o'sish chuqur, nomutanosib daraxt yasaydi → kichik datada agressiv overfit. num_leaves va min_data_in_leaf — asosiy tormoz.",
      "learning_rate'ni pasaytirib n_estimators'ni oshirmaslik — ular bog'liq, birga o'zgaradi",
      "Built-in gain importance chalg'ituvchi: yuqori kardinallikli feature'larni afzal ko'radi. Permutation importance yoki SHAP ishlating.",
      "Kategorial feature'ni oddiy integer sifatida berish → model uni tartibli deb o'ylaydi",
      "Early stopping'ni test setda qilish → leakage, test set endi validation set"
     ],
     "en": [
      "Leaf-wise growth builds deep, unbalanced trees → aggressive overfit on small data. num_leaves and min_data_in_leaf are the brakes.",
      "Lowering learning_rate without raising n_estimators — they move together",
      "Built-in gain importance is misleading: it favors high-cardinality features. Use permutation importance or SHAP.",
      "Passing a categorical as a plain integer → the model assumes an ordering",
      "Early stopping on the test set → leakage, the test set is now a validation set"
     ]
    },
    "res": [
     "StatQuest — Gradient Boost, 1–4 qism",
     "LightGBM docs — Parameters Tuning sahifasi"
    ]
   },
   {
    "id": "c-prophet",
    "kind": "must",
    "side": "r",
    "label": {
     "uz": "Klassik forecasting stek",
     "en": "Classical Forecasting Stack"
    },
    "hint": {
     "uz": "baseline → ETS → ARIMA → Prophet",
     "en": "baseline → ETS → ARIMA → Prophet"
    },
    "why": {
     "uz": "Prophet ichida nima borligini bilmasangiz, u qachon jimgina yiqilishini ham bilmaysiz. Va ko'p real holatda to'g'ri javob Prophet emas — undan oddiyroq yoki LightGBM.",
     "en": "If you do not know what is inside Prophet, you cannot know when it quietly fails. And in many real cases the right answer is not Prophet — it is something simpler, or LightGBM."
    },
    "learn": {
     "uz": [
      "Baseline ierarxiyasi: naive → seasonal naive → moving average. Har doim shundan boshlang va raqamini yozib qo'ying.",
      "Dekompozitsiya: trend + seasonality + residual; additive vs multiplicative qachon",
      "ETS / Holt-Winters — eksponensial tekislash. Prophet'dan oddiy va ko'pincha aniqroq.",
      "ARIMA/SARIMA: differencing, statsionarlik, ACF/PACF — nima uchun va qachon kerak",
      "Prophet ichki: additive model, piecewise linear trend + changepoint, Fourier seriyali seasonality, holidays regressor",
      "Prophet tugmalari: changepoint_prior_scale (asosiysi), seasonality_prior_scale, seasonality_mode, cap/floor",
      "Global model (barcha SKU bitta LightGBM'da, lag feature bilan) vs lokal model (har SKU uchun alohida Prophet) — masshtab va aniqlik farqi",
      "Prophet qachon noto'g'ri tanlov: qisqa tarix, nolga yaqin talab, ko'p tashqi regressor, yuzlab SKU"
     ],
     "en": [
      "Baseline hierarchy: naive → seasonal naive → moving average. Always start here and log the number.",
      "Decomposition: trend + seasonality + residual; additive vs multiplicative and when each applies",
      "ETS / Holt-Winters — exponential smoothing. Simpler than Prophet and often more accurate.",
      "ARIMA/SARIMA: differencing, stationarity, ACF/PACF — why and when they are needed",
      "Prophet internals: additive model, piecewise linear trend + changepoints, Fourier-series seasonality, holidays regressor",
      "Prophet knobs: changepoint_prior_scale (the main one), seasonality_prior_scale, seasonality_mode, cap/floor",
      "Global model (all SKUs in one LightGBM with lag features) vs local model (a separate Prophet per SKU) — scale and accuracy tradeoff",
      "When Prophet is the wrong choice: short history, near-zero demand, many external regressors, hundreds of SKUs"
     ]
    },
    "fails": {
     "uz": [
      "Prophet default'lari deyarli har doim juda moslashuvchan trend beradi → changepoint_prior_scale'ni pasaytiring, aks holda shovqinni trend deb o'qiydi",
      "Nolga yaqin talabda Prophet manfiy bashorat chiqaradi — floor qo'ying yoki log transform qiling",
      "500 ta SKU uchun 500 ta Prophet model = soatlab training va qayta o'qitish do'zaxi. Global LightGBM bu yerda yutadi.",
      "Prophet'ning avtomatik seasonality'si O'zbekiston bayramlarini bilmaydi — Ramazon, Hayit, Navro'zni qo'lda bering",
      "Prophet'ning ishonch intervali odatda juda tor — uni real qoplash darajasiga tekshiring"
     ],
     "en": [
      "Prophet defaults almost always give too flexible a trend → lower changepoint_prior_scale, or it reads noise as trend",
      "With near-zero demand Prophet predicts negatives — set a floor or use a log transform",
      "500 Prophet models for 500 SKUs = hours of training and retraining hell. A global LightGBM wins here.",
      "Prophet's automatic seasonality does not know Uzbek holidays — supply Ramadan, Eid and Navruz manually",
      "Prophet's confidence intervals are usually too narrow — check actual coverage"
     ]
    },
    "res": [
     "Hyndman — Forecasting: Principles and Practice (3, 7, 8-boblar, bepul onlayn)",
     "Nixtla statsforecast — tez klassik baseline'lar"
    ]
   },
   {
    "id": "c-calib",
    "kind": "deep",
    "side": "l",
    "label": {
     "uz": "Ehtimollik kalibratsiyasi",
     "en": "Probability Calibration"
    },
    "hint": {
     "uz": "chiqish threshold'ga ulanganda",
     "en": "when output feeds a threshold"
    },
    "why": {
     "uz": "Boosted tree'lar ball chiqaradi, ehtimollik emas. Agar biznes qoidasi 'risk > 0.8 bo'lsa ogohlantir' desa, kalibrlanmagan chiqish bu threshold'ni ma'nosiz qiladi.",
     "en": "Boosted trees output scores, not probabilities. If a business rule says 'alert when risk > 0.8', uncalibrated output makes that threshold meaningless."
    },
    "learn": {
     "uz": [
      "Reliability diagram — bashorat qilingan vs kuzatilgan chastota",
      "Platt scaling va isotonic regression",
      "Kalibratsiya qachon muhim (threshold, kutilayotgan qiymat qarorlari) va qachon yo'q (faqat ranking)"
     ],
     "en": [
      "Reliability diagrams — plot predicted vs observed frequency",
      "Platt scaling and isotonic regression",
      "When calibration matters (thresholds, expected-value decisions) and when it does not (pure ranking)"
     ]
    },
    "fails": {
     "uz": [
      "Oziq-ovqat xavfsizligi risk balida 0.9 real chastota ma'nosida hech narsani anglatmasligi",
      "Test set'da qayta kalibrlash"
     ],
     "en": [
      "A food-safety risk score where 0.9 means nothing in real-world frequency terms",
      "Recalibrating on the test set"
     ]
    },
    "res": []
   },
   {
    "id": "c-deliver",
    "kind": "goal",
    "side": "r",
    "label": {
     "uz": "NATIJA: Forecast Backtest Harness",
     "en": "DELIVERABLE: Forecast Backtest Harness"
    },
    "hint": {
     "uz": "restaurant-ai, halol qayta qurilgan",
     "en": "restaurant-ai, rebuilt honestly"
    },
    "why": {
     "uz": "Restoran talab forecasting'ini haqiqiy backtest harness va seasonal-naive baseline bilan qayta quring. Bu bosqichning imtihoni.",
     "en": "Rebuild the restaurant demand forecasting with a real backtest harness and a seasonal-naive baseline. This is the phase test."
    },
    "learn": {
     "uz": [
      "Kamida 12 ta fold bo'ylab expanding-window backtest",
      "Baseline: seasonal naive (o'tgan haftaning shu kuni). Avval shuni yozib qo'ying.",
      "Har bir pozitsiya va umumiy WAPE, fold'lar bo'ylab dispersiya bilan",
      "Taqqoslang: naive vs Prophet vs LightGBM vs lag feature'li LightGBM"
     ],
     "en": [
      "Expanding-window backtest across at least 12 folds",
      "Baseline: seasonal naive (same weekday last week). Log it first.",
      "Report WAPE per item and in aggregate, with variance across folds",
      "Compare: naive vs Prophet vs LightGBM vs LightGBM with lag features"
     ]
    },
    "fails": {
     "uz": [
      "Agar LightGBM seasonal naive'ni yenga olmasa — sizda model yo'q, sizda overfitting bor. Bu natija harness'ning muvaffaqiyati, bosqichning muvaffaqiyatsizligi emas."
     ],
     "en": [
      "If LightGBM does not beat seasonal naive, you do not have a model — you have overfitting with extra steps. That result is a success of the harness, not a failure of the phase."
     ]
    },
    "res": []
   }
  ]
 },
 {
  "id": "p2",
  "label": {
   "uz": "2-bosqich",
   "en": "Phase 2"
  },
  "title": {
   "uz": "Deep Learning poydevori",
   "en": "Deep Learning Foundations"
  },
  "weeks": {
   "uz": "5–6 hafta",
   "en": "5–6 weeks"
  },
  "topics": [
   {
    "id": "d-torch",
    "kind": "must",
    "side": "r",
    "label": {
     "uz": "PyTorch va Autograd",
     "en": "PyTorch & Autograd"
    },
    "hint": {
     "uz": "tensor, graf, device",
     "en": "tensors, graphs, devices"
    },
    "why": {
     "uz": "Hozir vaqtingizga arziydigan yagona framework — PyTorch. Uning mental modeli oddiy Python yozishga Keras'dan ancha yaqin.",
     "en": "PyTorch is the only framework worth your time now. The mental model is closer to writing normal Python than Keras ever was."
    },
    "learn": {
     "uz": [
      "Tensorlar, shape, broadcasting, device joylashtirish",
      "Autograd: hisoblash grafi, .backward(), detach",
      "nn.Module, parametrlar, optimizer, loss funksiyalar",
      "Dataset / DataLoader, num_workers, va GPU nega 20% da turibdi"
     ],
     "en": [
      "Tensors, shapes, broadcasting, and device placement",
      "Autograd: the computation graph, .backward(), and detaching",
      "nn.Module, parameters, optimizers, loss functions",
      "Dataset / DataLoader, num_workers, and why your GPU sits idle at 20%"
     ]
    },
    "fails": {
     "uz": [
      "CUDA out of memory — uni o'qishni o'rganing (batch size, aktivatsiya xotirasi, kesh fragmentatsiyasi)",
      "optimizer.zero_grad() ni unutib, gradientlarni jimgina to'plash",
      "Data loading bottleneck bo'lgan holda modelni ayblash"
     ],
     "en": [
      "CUDA out of memory — learn to read it (batch size, activation memory, cached fragments)",
      "Forgetting optimizer.zero_grad() and silently accumulating gradients",
      "Data loading being the bottleneck while you blame the model"
     ]
    },
    "res": [
     "PyTorch 60-minute blitz, keyin docs o'qishni to'xtating va quring"
    ]
   },
   {
    "id": "d-loop",
    "kind": "must",
    "side": "l",
    "label": {
     "uz": "Bitta training loop'ni qo'lda yozing",
     "en": "Write One Training Loop by Hand"
    },
    "hint": {
     "uz": "Lightning'siz, bir marta",
     "en": "no Lightning, once"
    },
    "why": {
     "uz": "Buni aynan bir marta qiling. Keyin framework ishlating. Lekin o'sha bir marta keyinchalik hamma narsani debug qilishga imkon beradigan mental modelni quradi.",
     "en": "Do this exactly once. After that, use a framework like an adult. But the one time builds the mental model that lets you debug everything later."
    },
    "learn": {
     "uz": [
      "Forward → loss → backward → step, qo'lda yozilgan",
      "Train/eval rejimi, va dropout hamda batchnorm nega boshqacha ishlaydi",
      "Gradient clipping, LR scheduler, early stopping",
      "Loss curve'larni loglash va ularni haqiqatan o'qish"
     ],
     "en": [
      "Forward → loss → backward → step, written manually",
      "Train/eval mode, and why dropout and batchnorm behave differently",
      "Gradient clipping, LR schedulers, early stopping",
      "Logging loss curves and actually reading them"
     ]
    },
    "fails": {
     "uz": [
      "Validation loss training loss'dan past — odatda dropout yoki oqib ketgan split",
      "Tekis loss curve — LR juda past, yoki label'lar input'ga nisbatan aralashib ketgan"
     ],
     "en": [
      "Validation loss lower than training loss — usually dropout or a leaking split",
      "Flat loss curve — LR too low, or the labels are shuffled relative to inputs"
     ]
    },
    "res": [
     "Karpathy — Neural Networks: Zero to Hero. Build-first, sizning uslubingizga mos."
    ]
   },
   {
    "id": "d-cnn",
    "kind": "must",
    "side": "r",
    "label": {
     "uz": "CNN va Transfer Learning",
     "en": "CNNs & Transfer Learning"
    },
    "hint": {
     "uz": "noldan o'rgatmang",
     "en": "do not train from scratch"
    },
    "why": {
     "uz": "Dala Daftari'ning yer sathidagi kasallik klassifikatori uchun oldindan o'rgatilgan backbone'ni fine-tune qilish kichik datada noldan o'rgatishdan ancha ustun.",
     "en": "For the Dala Daftari ground-level disease classifier, fine-tuning a pretrained backbone beats training from scratch by a wide margin on small data."
    },
    "learn": {
     "uz": [
      "Convolution, pooling, receptive field",
      "Pretrained backbone'lar: ResNet, EfficientNet, ConvNeXt, va ViT alternativalari",
      "Freeze-keyin-unfreeze fine-tuning, discriminative learning rate",
      "Augmentation: flip, crop, color jitter — va u nega datani almashtiradi",
      "Class imbalance: weighted loss, focal loss, oversampling"
     ],
     "en": [
      "Convolution, pooling, receptive field",
      "Pretrained backbones: ResNet, EfficientNet, ConvNeXt, and ViT alternatives",
      "Freeze-then-unfreeze fine-tuning, discriminative learning rates",
      "Augmentation: flips, crops, color jitter, and why it substitutes for data",
      "Class imbalance: weighted loss, focal loss, oversampling"
     ]
    },
    "fails": {
     "uz": [
      "Pretrained backbone uchun noto'g'ri mean/std bilan normalizatsiya — jimgina aniqlik yo'qotish",
      "Validation setni ham augment qilish (metrikani endi ma'nosiz qildingiz)"
     ],
     "en": [
      "Normalizing with the wrong mean/std for the pretrained backbone — silent accuracy loss",
      "Augmenting the validation set (you just made the metric meaningless)"
     ]
    },
    "res": [
     "fast.ai Practical Deep Learning, Part 1"
    ]
   },
   {
    "id": "d-attn",
    "kind": "must",
    "side": "l",
    "label": {
     "uz": "Attention va Transformer",
     "en": "Attention & the Transformer"
    },
    "hint": {
     "uz": "bir marta noldan quring",
     "en": "build it once from scratch"
    },
    "why": {
     "uz": "LLM bilan qiladigan hamma professional ishingiz shu ustida turadi. Kichik GPT'ni bir marta quring, keyin boshqa hech qachon.",
     "en": "Everything you are going to do professionally with LLMs sits on this. Build a tiny GPT once, then never again."
    },
    "learn": {
     "uz": [
      "Self-attention: Q, K, V — bu yumshoq lug'at qidiruvi",
      "Multi-head attention, positional encoding (absolute, RoPE)",
      "Encoder vs decoder vs encoder-decoder, va sizning vazifangizga qaysi biri kerak",
      "KV cache — inference'ni tez va xotiraga och qiladigan narsa",
      "Kontekst uzunligi nega kvadratik attention turadi va uni nima yumshatadi"
     ],
     "en": [
      "Self-attention: Q, K, V and why it is a soft dictionary lookup",
      "Multi-head attention, positional encodings (absolute, RoPE)",
      "Encoder vs decoder vs encoder-decoder, and which one your task needs",
      "KV cache — the thing that makes inference fast and memory-hungry",
      "Why context length costs quadratic attention and what mitigations exist"
     ]
    },
    "fails": {
     "uz": [
      "Kontekst oynasini bepul deb hisoblash. Bu sizning working RAM byudjetingiz, va uning narx egri chizig'i bor.",
      "Retrieval buzilgan bo'lsa-yu, kattaroq model yechim deb o'ylash"
     ],
     "en": [
      "Treating context window as free. It is your working RAM budget, and it has a cost curve.",
      "Assuming a bigger model is the fix when the retrieval step is what is broken"
     ]
    },
    "res": [
     "Karpathy — Let's build GPT (2 soat, bir oylik o'qishdan qimmatroq)"
    ]
   },
   {
    "id": "d-practice",
    "kind": "deep",
    "side": "r",
    "label": {
     "uz": "Training amaliyoti",
     "en": "Training Practicalities"
    },
    "hint": {
     "uz": "AMP, schedule, accumulation",
     "en": "AMP, schedules, accumulation"
    },
    "why": {
     "uz": "Bu 'o'rgandi' bilan 'bir xil GPU'da 14 soat o'rniga 2 soatda o'rgandi' orasidagi farq. Qo'mita AI serveriga to'g'ridan-to'g'ri aloqador.",
     "en": "This is what separates 'it trained' from 'it trained in 2 hours instead of 14 on the same GPU'. Directly relevant to the committee AI server."
    },
    "learn": {
     "uz": [
      "Mixed precision (AMP / bf16) va u qachon sonli jihatdan buziladi",
      "LR schedule: warmup, cosine decay, one-cycle",
      "Gradient accumulation — cheklangan VRAM'da katta batch simulyatsiyasi",
      "Batch size ↔ learning rate masshtablash munosabati",
      "Checkpointing, resume, va takrorlanadigan seed'lar"
     ],
     "en": [
      "Mixed precision (AMP / bf16) and when it breaks numerically",
      "LR schedules: warmup, cosine decay, one-cycle",
      "Gradient accumulation to simulate large batches on limited VRAM",
      "Batch size ↔ learning rate scaling relationship",
      "Checkpointing, resuming, and reproducible seeds"
     ]
    },
    "fails": {
     "uz": [
      "Takrorlanmaydigan run'lar — o'zgartirishingiz foyda berdimi, ayta olmaysiz",
      "Checkpointing yo'qligidan 9 soatlik training'ni yo'qotish"
     ],
     "en": [
      "Non-reproducible runs, so you cannot tell whether your change helped",
      "Losing a 9-hour training run to no checkpointing"
     ]
    },
    "res": []
   },
   {
    "id": "d-shift",
    "kind": "must",
    "side": "l",
    "label": {
     "uz": "Distribution Shift",
     "en": "Distribution Shift"
    },
    "hint": {
     "uz": "notebookda 97%, dalada 60%",
     "en": "97% in notebook, 60% in the field"
    },
    "why": {
     "uz": "Bu dalada ishlatiladigan CV loyihalarini o'ldiradigan nosozlik. Sizning training rasmlaringiz toza dataset rasmlari. Inspektor telefonidagi haqiqiy rasm — xira, yomon yoritilgan va g'alati burchakdan.",
     "en": "This is the failure that kills field-deployed CV projects. Your training photos are clean dataset images. Real photos from an inspector's phone are blurry, badly lit, and shot at strange angles."
    },
    "learn": {
     "uz": [
      "Covariate shift, label shift, concept drift — har xil muammo, har xil yechim",
      "Validation setni deployment sharoitiga o'xshatib qurish, training manbasiga emas",
      "Test-time augmentation va uning chegaralari",
      "Biror raqamga ishonishdan oldin kichik real holdout to'plash"
     ],
     "en": [
      "Covariate shift, label shift, concept drift — different problems, different fixes",
      "Building a validation set that mirrors deployment conditions, not the training source",
      "Test-time augmentation and its limits",
      "Collecting a small real-world holdout set before you trust any number"
     ]
    },
    "fails": {
     "uz": [
      "PlantVillage'da benchmark qilib, uni O'zbekiston paxta dalasiga o'tadi deb o'ylash. O'tmaydi.",
      "Deploy qilingan model yomonlashganini aniqlash mexanizmi yo'qligi"
     ],
     "en": [
      "Benchmarking on PlantVillage and assuming it transfers to Uzbek cotton fields. It does not.",
      "No mechanism to detect that the deployed model has degraded"
     ]
    },
    "res": []
   },
   {
    "id": "d-deliver",
    "kind": "goal",
    "side": "r",
    "label": {
     "uz": "NATIJA: Dala kasallik klassifikatori",
     "en": "DELIVERABLE: Field Disease Classifier"
    },
    "hint": {
     "uz": "Dala Daftari yer sathi qatlami",
     "en": "Dala Daftari ground layer"
    },
    "why": {
     "uz": "Yer sathidagi o'simlik kasalligi klassifikatorini o'rgating. Haqiqiy data, haqiqiy class imbalance, haqiqiy deployment sharoiti.",
     "en": "Train the ground-level plant disease classifier. Real data, real class imbalance, real deployment conditions."
    },
    "learn": {
     "uz": [
      "Haqiqiy ekin kasalligi datasetida pretrained backbone'ni fine-tune qiling",
      "Dataset rasmlari emas, haqiqiy dala rasmlaridan kichik holdout quring",
      "Per-class recall ko'rsating, faqat accuracy emas — kam uchraydigan kasalliklar maqsad",
      "ONNX'ga eksport qiling va CPU'dagi inference latency'ni o'lchang"
     ],
     "en": [
      "Fine-tune a pretrained backbone on a real crop disease dataset",
      "Build a small holdout set of actual field photos, not dataset photos",
      "Report per-class recall, not just accuracy — rare diseases are the point",
      "Export to ONNX and measure inference latency on CPU"
     ]
    },
    "fails": {
     "uz": [
      "Notebook va dala aniqligi orasidagi farqni halol yozing. O'sha raqam — asl topilma."
     ],
     "en": [
      "Report the notebook-vs-field accuracy gap honestly. That number is the actual finding."
     ]
    },
    "res": []
   }
  ]
 },
 {
  "id": "p3",
  "label": {
   "uz": "3-bosqich",
   "en": "Phase 3"
  },
  "title": {
   "uz": "Retrieval va RAG",
   "en": "Retrieval & RAG"
  },
  "weeks": {
   "uz": "4–5 hafta · eng yuqori leverage",
   "en": "4–5 weeks · highest leverage"
  },
  "hi": true,
  "topics": [
   {
    "id": "l-embed",
    "kind": "must",
    "side": "l",
    "label": {
     "uz": "Tokenizatsiya va Embedding",
     "en": "Tokenization & Embeddings"
    },
    "hint": {
     "uz": "RAG'ingiz aslida nimani indekslaydi",
     "en": "what your RAG actually indexes"
    },
    "why": {
     "uz": "Siz allaqachon RAG ishlatasiz. Bu — siz tekshirmasdan foydalanib kelgan qatlam, va retrieval sifatining katta qismi aynan shu yerda yutiladi yoki yo'qoladi.",
     "en": "You already run RAG. This is the layer you have been using without inspecting, and it is where most retrieval quality is won or lost."
    },
    "learn": {
     "uz": [
      "BPE / SentencePiece tokenizatsiya va token soni tillar bo'yicha nega keskin farq qiladi",
      "Embedding modellar vs generativ modellar — boshqa maqsad, boshqa qo'llanish",
      "Cosine similarity, normalizatsiya, o'lchamlilik tradeoff'lari",
      "Vector index turlari: HNSW vs IVF-PQ — recall/latency/xotira",
      "pgvector vs Qdrant vs Milvus — va Postgres qachon haqiqatan yetarli"
     ],
     "en": [
      "BPE / SentencePiece tokenization and why token counts differ wildly across languages",
      "Embedding models vs generative models — different objectives, different uses",
      "Cosine similarity, normalization, and dimensionality tradeoffs",
      "Vector index types: HNSW vs IVF-PQ, recall/latency/memory tradeoffs",
      "pgvector vs Qdrant vs Milvus — and when Postgres is genuinely enough"
     ]
    },
    "fails": {
     "uz": [
      "O'zbek matni ingliz tilidan 3–4 baravar ko'p tokenga bo'linadi — xarajat va kontekst byudjetingiz siz o'ylagandek emas",
      "HNSW default'larini ishlatib, recall'ni exact search'ga qarshi hech qachon o'lchamaslik"
     ],
     "en": [
      "Uzbek text tokenizing at 3–4× the token count of English — your costs and context budget are not what you assumed",
      "Using HNSW defaults and never measuring recall against exact search"
     ]
    },
    "res": []
   },
   {
    "id": "l-uz",
    "kind": "must",
    "side": "r",
    "label": {
     "uz": "O'zbek embedding benchmark",
     "en": "Uzbek Embedding Benchmark"
    },
    "hint": {
     "uz": "real bo'shliq va real ustunlik",
     "en": "a real gap, and a real edge"
    },
    "why": {
     "uz": "Embedding modellarning aksariyati o'zbek tilida kuchsiz, va hech kim yaxshi raqamlar chiqarmagan. Buni o'z dataingizda benchmark qilish loyihalaringiz uchun ham zarur, ham nashr qilsa bo'ladigan ish.",
     "en": "Most embedding models are weak on Uzbek, and nobody has published good numbers. Benchmarking this on your own data is both necessary for your projects and genuinely publishable work."
    },
    "learn": {
     "uz": [
      "Kichik o'zbekcha retrieval eval to'plami quring (so'rov → ma'lum mos hujjat), 200–500 juftlik",
      "BGE-m3, multilingual-E5, LaBSE va OpenAI/Cohere multilingual'ni shunda benchmark qiling",
      "Recall@k va MRR o'lchang, taassurot emas",
      "Lotin va kirill o'zbekchani ikkalasini ham sinang — ular butunlay boshqacha embed bo'lishi mumkin",
      "Ballar past bo'lsa, o'zbekcha juftliklarda embedding modelni fine-tune qilishni ko'rib chiqing"
     ],
     "en": [
      "Build a small Uzbek retrieval eval set (query → known relevant docs), 200–500 pairs",
      "Benchmark BGE-m3, multilingual-E5, LaBSE, and OpenAI/Cohere multilingual on it",
      "Measure recall@k and MRR, not vibes",
      "Test both Latin and Cyrillic Uzbek script — they may embed very differently",
      "Consider fine-tuning an embedding model on Uzbek pairs if scores are poor"
     ]
    },
    "fails": {
     "uz": [
      "Model kartasida 'multilingual' yozilgani uchun o'zbekchada yaxshi deb o'ylash (ko'pincha 100+ til, aksariyati yomon)",
      "Aralash yozuvli korpus semantik fazoni jimgina ikkiga bo'lib yuborishi"
     ],
     "en": [
      "Assuming a model is good at Uzbek because its card says 'multilingual' (often 100+ languages, most of them badly)",
      "Mixed-script corpora silently splitting your semantic space in two"
     ]
    },
    "res": [
     "MTEB leaderboard — boshlang'ich nuqta, lekin o'z eval to'plamingiz hokim"
    ]
   },
   {
    "id": "l-rageval",
    "kind": "must",
    "side": "l",
    "label": {
     "uz": "RAG Evaluation",
     "en": "RAG Evaluation"
    },
    "hint": {
     "uz": "ko'pchilik buni butunlay tashlab ketadi",
     "en": "most teams skip this entirely"
    },
    "why": {
     "uz": "Bu bosqichdagi eng qimmatli ko'nikma. Deyarli hamma RAG quradi; juda kamchilik o'zinikisi ishlayotganini ayta oladi. Buni o'lchay olish sizni buzilgan tizimlarni tuzatadigan odamga aylantiradi.",
     "en": "This is the single most valuable skill in the phase. Almost everyone builds RAG; very few can tell you whether theirs works. Being able to measure it makes you the person who fixes broken systems."
    },
    "learn": {
     "uz": [
      "Retrieval metrikasini generation metrikasidan ajrating — ular boshqa sabablarga ko'ra buziladi",
      "Retrieval: belgilangan eval setga qarshi recall@k, MRR, nDCG",
      "Generation: faithfulness (asoslanganmi?), javob relevantligi, kontekst aniqligi",
      "LLM-as-judge va uning bias'lari: pozitsiya bias, uzunlik bias, o'z-o'zini afzal ko'rish",
      "Regression eval to'plami quring — o'zgarishlar taxmin emas, o'lchov bo'lsin"
     ],
     "en": [
      "Separate retrieval metrics from generation metrics — they fail for different reasons",
      "Retrieval: recall@k, MRR, nDCG against a labeled eval set",
      "Generation: faithfulness (is it grounded?), answer relevance, context precision",
      "LLM-as-judge and its biases: position bias, verbosity bias, self-preference",
      "Build a regression eval set so changes can be measured, not guessed"
     ]
    },
    "fails": {
     "uz": [
      "'Javob yaxshi ko'rindi' — bu evaluation emas",
      "Buzilgan yarmi retrieval bo'lgani holda generation prompt'ini tuzatish",
      "Inson tomonidan belgilangan kalibratsiya namunasisiz LLM-as-judge"
     ],
     "en": [
      "'The answer looked good' is not evaluation",
      "Fixing the generation prompt when retrieval was the broken half",
      "LLM-as-judge with no human-labeled calibration sample"
     ]
    },
    "res": [
     "RAGAS — namuna sifatida; tushungandan keyin o'zingiznikini yozing"
    ]
   },
   {
    "id": "l-hybrid",
    "kind": "must",
    "side": "r",
    "label": {
     "uz": "Hybrid Retrieval va Reranking",
     "en": "Hybrid Retrieval & Reranking"
    },
    "hint": {
     "uz": "BM25 + dense + cross-encoder",
     "en": "BM25 + dense + cross-encoder"
    },
    "why": {
     "uz": "Sof dense retrieval aniq terminlarda yutqazadi: mahsulot kodlari, reglament raqamlari, ismlar. Hybrid + reranker — standart production javobi va odatda eng katta sifat sakrashi.",
     "en": "Pure dense retrieval loses on exact terms: product codes, regulation numbers, names. Hybrid plus a reranker is the standard production answer and usually the largest single quality jump."
    },
    "learn": {
     "uz": [
      "BM25 / leksik qidiruv va u embedding o'tkazib yuborgan nimani tutadi",
      "Ranking'larni birlashtirish: reciprocal rank fusion (RRF) — oddiy va kuchli",
      "Cross-encoder reranking: 50 ta oling, 5 taga rerank qiling",
      "Latency byudjeti: reranking vaqt oladi, uni qayerga qo'yishni hal qiling",
      "Vector qidiruvidan oldin metadata filtrlash"
     ],
     "en": [
      "BM25 / lexical search and what it catches that embeddings miss",
      "Fusing rankings: reciprocal rank fusion (RRF) — simple and strong",
      "Cross-encoder reranking: retrieve 50, rerank to 5",
      "Latency budget: reranking costs time, so decide where it belongs",
      "Metadata filtering before vector search"
     ]
    },
    "fails": {
     "uz": [
      "Dense-only retrieval BM25 darhol topadigan aniq reglament kodida yiqilishi",
      "500 ta nomzodni rerank qilib latency SLA'ni portlatish"
     ],
     "en": [
      "Dense-only retrieval failing on an exact regulation code that BM25 would have found instantly",
      "Reranking 500 candidates and blowing the latency SLA"
     ]
    },
    "res": []
   },
   {
    "id": "l-chunk",
    "kind": "deep",
    "side": "l",
    "label": {
     "uz": "Chunking strategiyasi",
     "en": "Chunking Strategy"
    },
    "hint": {
     "uz": "sodda bo'lish recall'ni o'ldiradi",
     "en": "naive splitting destroys recall"
    },
    "why": {
     "uz": "Qat'iy o'lchamli chunking gaplarni o'rtasidan kesadi va da'voni kontekstidan ajratadi. Bu RAG'dagi eng jim sifat qotili.",
     "en": "Fixed-size chunking cuts sentences in half and separates a claim from its context. It is the quietest quality killer in RAG."
    },
    "learn": {
     "uz": [
      "Semantik / strukturaviy chunking (sarlavha, bo'lim, band bo'yicha)",
      "Overlap va parent-document patterni: kichik oling, katta qaytaring",
      "Contextual retrieval: har bir chunk oldiga hujjat darajasidagi qisqa xulosa qo'shish",
      "Jadval va PDF bilan ishlash — haqiqiy korpuslarning ko'pi shu yerda buziladi"
     ],
     "en": [
      "Semantic / structural chunking (by heading, section, clause)",
      "Overlap, and the parent-document pattern: retrieve small, return large",
      "Contextual retrieval: prepend a short document-level summary to each chunk",
      "Table and PDF handling — where most real corpora fall apart"
     ]
    },
    "fails": {
     "uz": [
      "Huquqiy yoki reglament hujjatlari band o'rtasidan kesilib, ishonchli noto'g'ri javob berishi",
      "Jadvallar matn bo'tqasiga aylanishi"
     ],
     "en": [
      "Legal or regulatory documents chunked mid-clause, producing confidently wrong answers",
      "Tables flattened to text soup"
     ]
    },
    "res": []
   },
   {
    "id": "l-rag-deliver",
    "kind": "goal",
    "side": "r",
    "label": {
     "uz": "NATIJA: RAG eval harness",
     "en": "DELIVERABLE: RAG Eval Harness"
    },
    "hint": {
     "uz": "raqamsiz hech narsa yaxshilanmaydi",
     "en": "nothing improves without a number"
    },
    "why": {
     "uz": "Qo'mita RAG'i uchun belgilangan eval to'plami quring va hybrid + rerank'dan oldin/keyin recall@k ni o'lchang. Bu bosqichning imtihoni va keyingi barcha ishning asbobi.",
     "en": "Build a labeled eval set for the committee RAG and measure recall@k before and after hybrid + rerank. This is the phase test and the instrument for everything that follows."
    },
    "learn": {
     "uz": [
      "150–300 ta (savol → mos hujjat) juftligi — real foydalanuvchi savollaridan, o'zingiz o'ylab topganlardan emas",
      "Baseline: dense-only retrieval, recall@5 va MRR",
      "Keyin bosqichma-bosqich: + BM25 (RRF), + cross-encoder rerank. Har bir qadamning hissasini alohida o'lchang.",
      "Generation tomonini alohida baholang: faithfulness va kontekst haqiqatan ishlatilganmi",
      "Harness'ni CI'ga regression test sifatida ulang"
     ],
     "en": [
      "150–300 (question → relevant doc) pairs — from real user questions, not invented ones",
      "Baseline: dense-only retrieval, recall@5 and MRR",
      "Then step by step: + BM25 (RRF), + cross-encoder rerank. Measure each step's contribution separately.",
      "Evaluate the generation side separately: faithfulness and whether the context was actually used",
      "Wire the harness into CI as a regression test"
     ]
    },
    "fails": {
     "uz": [
      "Eval savollarini o'zingiz yozsangiz, ular real savollarga o'xshamaydi va harness yolg'on xotirjamlik beradi. Log'lardan oling."
     ],
     "en": [
      "If you write the eval questions yourself they will not resemble real ones, and the harness gives false comfort. Pull them from logs."
     ]
    },
    "res": []
   }
  ]
 },
 {
  "id": "p4",
  "label": {
   "uz": "4-bosqich",
   "en": "Phase 4"
  },
  "title": {
   "uz": "Fine-tuning va Serving",
   "en": "Fine-tuning & Serving"
  },
  "weeks": {
   "uz": "5–6 hafta · eng yuqori leverage",
   "en": "5–6 weeks · highest leverage"
  },
  "hi": true,
  "topics": [
   {
    "id": "l-ft-enc",
    "kind": "must",
    "side": "l",
    "label": {
     "uz": "Encoder fine-tuning",
     "en": "Encoder Fine-tuning"
    },
    "hint": {
     "uz": "klassifikatsiya uchun to'g'ri javob",
     "en": "the right answer for classification"
    },
    "why": {
     "uz": "Sizning oziq-ovqat monitoringi vazifangiz — matn klassifikatsiyasi. Buning uchun 7B LLM emas, fine-tune qilingan XLM-R kerak: ~100× arzon, ~50× tez va ko'pincha aniqroq. Bu eng ko'p o'tkazib yuboriladigan qaror.",
     "en": "Your food safety monitoring task is text classification. That calls for a fine-tuned XLM-R, not a 7B LLM: ~100× cheaper, ~50× faster, and often more accurate. This is the most commonly skipped decision."
    },
    "learn": {
     "uz": [
      "XLM-RoBERTa, mBERT, LaBSE — o'zbekcha uchun qaysi biri, o'z eval setingizda sinang",
      "Klassifikatsiya head qo'shish; to'liq fine-tune vs faqat head o'rgatish",
      "Amaliy hyperparametrlar: LR 2e-5..5e-5, 3–5 epoch, warmup, weight decay",
      "Nomutanosib sinflar: weighted loss, threshold tuning, per-class recall",
      "Distillation / pseudo-labeling: Claude'dan label oling, kichik modelni o'rgating",
      "ONNX eksport + kvantizatsiya → CPU'da millisekundlar"
     ],
     "en": [
      "XLM-RoBERTa, mBERT, LaBSE — which one for Uzbek; test on your own eval set",
      "Adding a classification head; full fine-tune vs head-only training",
      "Practical hyperparameters: LR 2e-5..5e-5, 3–5 epochs, warmup, weight decay",
      "Imbalanced classes: weighted loss, threshold tuning, per-class recall",
      "Distillation / pseudo-labeling: get labels from Claude, train the small model",
      "ONNX export + quantization → milliseconds on CPU"
     ]
    },
    "fails": {
     "uz": [
      "Klassifikatsiya uchun 7B LLM fine-tune qilish — 100× qimmat, sababsiz",
      "max_length 512 ekanini unutib, uzun xabarlarni jimgina kesib tashlash",
      "O'zbekcha tokenizer yomon bo'lsa, 512 token ≈ 150 so'z. Real kontekstni o'lchang, taxmin qilmang."
     ],
     "en": [
      "Fine-tuning a 7B LLM for classification — 100× the cost, no reason",
      "Forgetting max_length is 512 and silently truncating long messages",
      "If the tokenizer is poor on Uzbek, 512 tokens ≈ 150 words. Measure the real context, do not assume."
     ]
    },
    "res": [
     "HuggingFace — Text Classification fine-tuning guide"
    ]
   },
   {
    "id": "l-ft-data",
    "kind": "must",
    "side": "r",
    "label": {
     "uz": "SFT dataset qurish",
     "en": "SFT Dataset Construction"
    },
    "hint": {
     "uz": "ishning 80% i shu yerda",
     "en": "80% of the work is here"
    },
    "why": {
     "uz": "Fine-tune sifatining tepa chegarasini dataset belgilaydi, LoRA rank emas. Yomon dataset bilan hech qanday hyperparameter sizni qutqarmaydi.",
     "en": "The dataset sets the ceiling on fine-tune quality, not the LoRA rank. No hyperparameter rescues a bad dataset."
    },
    "learn": {
     "uz": [
      "Instruction format va chat template — model o'z template'ida o'rgatilishi SHART",
      "Miqdor vs sifat: 1000 ta toza misol 50k ta shovqinlidan yaxshi",
      "Manbalar: mavjud log'lar, kuchliroq modeldan distillation, qo'lda yozish — uchalasining aralashmasi",
      "Deduplication, uzunlik taqsimoti, xilma-xillikni o'lchash",
      "Loss masking: faqat javob qismida loss hisoblang, prompt tokenlarida emas",
      "Train/val bo'lish va kontaminatsiyani tekshirish"
     ],
     "en": [
      "Instruction format and chat template — the model MUST be trained in its own template",
      "Quantity vs quality: 1000 clean examples beat 50k noisy ones",
      "Sources: existing logs, distillation from a stronger model, hand-written — a mix of all three",
      "Deduplication, length distribution, measuring diversity",
      "Loss masking: compute loss only on the response, not on prompt tokens",
      "Train/val split and contamination checks"
     ]
    },
    "fails": {
     "uz": [
      "Noto'g'ri chat template → model o'rganadi, lekin inference'da boshqa format ko'radi va buziladi. Eng keng tarqalgan jim xato.",
      "Prompt tokenlarida ham loss hisoblash → model javob berishni emas, prompt yozishni o'rganadi",
      "Kuchli modeldan distillation qilib, uning xatolarini ham ko'chirish — namunani qo'lda tekshiring"
     ],
     "en": [
      "Wrong chat template → the model learns, then sees a different format at inference and breaks. The most common silent error.",
      "Computing loss on prompt tokens too → the model learns to write prompts, not answers",
      "Distilling from a strong model and copying its errors too — hand-check a sample"
     ]
    },
    "res": []
   },
   {
    "id": "l-ft",
    "kind": "must",
    "side": "l",
    "label": {
     "uz": "LoRA / QLoRA mexanikasi",
     "en": "LoRA / QLoRA Mechanics"
    },
    "hint": {
     "uz": "rank, alpha, target modules",
     "en": "rank, alpha, target modules"
    },
    "why": {
     "uz": "Fine-tuning haddan tashqari ko'p tavsiya qilinadi. U RAG'dan qachon ustun kelishini aniq bilish — uni qanday ishga tushirishdan qimmatroq. Lekin ishga tushirganda mexanikani bilish kerak, aks holda tasodifiy natija olasiz.",
     "en": "Fine-tuning is over-recommended. Knowing precisely when it beats RAG is worth more than knowing how to run it. But when you do run it, you need the mechanics, or the result is random."
    },
    "learn": {
     "uz": [
      "LoRA matematikasi: W + BA, rank r, alpha; effektiv masshtab = alpha / r",
      "Qaysi modullarni nishonga olish: q, k, v, o + MLP (gate/up/down). Faqat attention — kuchsiz natija.",
      "Rank tanlash: 8–16 uslub va format uchun, 32–64 yangi qobiliyat uchun. Rank oshirish ko'pincha yordam bermaydi.",
      "QLoRA: NF4 kvantizatsiya, double quantization, paged optimizer",
      "Adapter'ni merge qilish vs alohida yuklash (bitta bazada bir nechta adapter)",
      "Gradient checkpointing va VRAM hisobi: og'irlik + optimizer state + aktivatsiya",
      "Fine-tuning qachon yutadi: chiqish formati, domen uslubi, task-specific klassifikatsiya, o'zbekcha ravonlik",
      "Nimaga yordam bera olmaydi: yangi faktlar, har kuni o'zgaradigan narsa → bu RAG"
     ],
     "en": [
      "LoRA math: W + BA, rank r, alpha; effective scale = alpha / r",
      "Which modules to target: q, k, v, o + MLP (gate/up/down). Attention-only gives weak results.",
      "Choosing rank: 8–16 for style and format, 32–64 for new capability. Raising rank often does not help.",
      "QLoRA: NF4 quantization, double quantization, paged optimizer",
      "Merging the adapter vs loading it separately (several adapters on one base)",
      "Gradient checkpointing and VRAM math: weights + optimizer state + activations",
      "When fine-tuning wins: output format, domain style, task-specific classification, Uzbek fluency",
      "When it cannot help: fresh facts, anything that changes daily → that is RAG"
     ]
    },
    "fails": {
     "uz": [
      "Faktlarni o'rgatish uchun fine-tune qilish. Model ularni ishonch bilan hallucinate qiladi.",
      "alpha/r nisbatini tushunmay rank o'zgartirish → effektiv learning rate jimgina o'zgaradi",
      "Faqat q va v modullarini nishonga olish (eski default) → sezilarli kuchsiz natija",
      "Juda yuqori LR yoki juda ko'p epoch → catastrophic forgetting",
      "Merge qilib keyin kvantizatsiya qilish — tartib teskari bo'lishi kerak, aks holda sifat tushadi",
      "Sifati bir xil bo'lmagan 500 ta misol → bir xil bo'lmagan model"
     ],
     "en": [
      "Fine-tuning to teach facts. The model will hallucinate them confidently instead.",
      "Changing rank without understanding the alpha/r ratio → the effective learning rate silently changes",
      "Targeting only q and v (the old default) → noticeably weaker results",
      "Too-high LR or too many epochs → catastrophic forgetting",
      "Merging and then quantizing — the order should be reversed, or quality drops",
      "500 examples of inconsistent quality producing an inconsistent model"
     ]
    },
    "res": [
     "HuggingFace PEFT + TRL docs",
     "Unsloth — bitta GPU'da tez iteratsiya"
    ]
   },
   {
    "id": "l-ft-dpo",
    "kind": "deep",
    "side": "r",
    "label": {
     "uz": "Preference tuning: DPO / ORPO",
     "en": "Preference Tuning: DPO / ORPO"
    },
    "hint": {
     "uz": "RLHF'ning amaliy versiyasi",
     "en": "the practical version of RLHF"
    },
    "why": {
     "uz": "SFT modelga formatni o'rgatadi. Preference tuning unga qaysi javob yaxshiroq ekanini o'rgatadi. Bu RLHF'ning arzon va amaliy shakli.",
     "en": "SFT teaches the model the format. Preference tuning teaches it which answer is better. This is the cheap, practical form of RLHF."
    },
    "learn": {
     "uz": [
      "SFT → DPO ketma-ketligi va nega tartib muhim",
      "DPO: (prompt, chosen, rejected) juftliklari, reference model, beta parametri",
      "ORPO: SFT va preference'ni bitta bosqichda — arzonroq va soddaroq",
      "Preference data qayerdan: foydalanuvchi feedback'i, kuchliroq model hakam sifatida, qo'lda annotatsiya",
      "Qachon umuman kerak emas: aniq to'g'ri javobi bor vazifalarda (klassifikatsiya, extraction)"
     ],
     "en": [
      "The SFT → DPO sequence and why the order matters",
      "DPO: (prompt, chosen, rejected) pairs, reference model, the beta parameter",
      "ORPO: SFT and preference in one stage — cheaper and simpler",
      "Where preference data comes from: user feedback, a stronger model as judge, manual annotation",
      "When it is not needed at all: tasks with one objectively correct answer (classification, extraction)"
     ]
    },
    "fails": {
     "uz": [
      "Beta juda past → model reference'dan uzoqlashib buziladi (reward hacking)",
      "SFT'siz to'g'ridan-to'g'ri DPO → zaif va beqaror natija",
      "Preference juftliklari bir xil modeldan olingan → model o'z bias'ini kuchaytiradi"
     ],
     "en": [
      "Beta too low → the model drifts from the reference and degrades (reward hacking)",
      "Going straight to DPO without SFT → weak and unstable results",
      "Preference pairs sourced from one model → the model amplifies its own bias"
     ]
    },
    "res": [
     "TRL docs — DPOTrainer, ORPOTrainer"
    ]
   },
   {
    "id": "l-ft-eval",
    "kind": "must",
    "side": "l",
    "label": {
     "uz": "Fine-tune evaluation",
     "en": "Fine-tune Evaluation"
    },
    "hint": {
     "uz": "baza + prompt'dan ustunmi?",
     "en": "does it beat base + prompt?"
    },
    "why": {
     "uz": "Eng muhim savol bitta: fine-tune qilingan model baza model + yaxshi prompt'dan ustunmi? Ko'p loyihalarda javob ‘yo'q’, lekin buni hech kim o'lchamaydi va oylar isrof bo'ladi.",
     "en": "There is one question that matters: does the fine-tuned model beat the base model with a good prompt? In many projects the answer is no, but nobody measures it and months are wasted."
    },
    "learn": {
     "uz": [
      "Majburiy uch tomonlama taqqoslash: baza + prompt vs few-shot vs fine-tuned, bitta eval setda",
      "Held-out eval set fine-tuning BOSHLANGUNGA qadar qotirilishi kerak",
      "Catastrophic forgetting tekshiruvi: umumiy qobiliyat benchmark'ida oldin/keyin",
      "Regressiya to'plami: ilgari ishlagan holatlar hali ham ishlaydimi",
      "Xarajat hisobi: fine-tuning + hosting vs API narxi, break-even hajmi bilan"
     ],
     "en": [
      "A mandatory three-way comparison: base + prompt vs few-shot vs fine-tuned, on one eval set",
      "The held-out eval set must be frozen BEFORE fine-tuning starts",
      "Catastrophic forgetting check: a general-capability benchmark before and after",
      "Regression set: do the cases that used to work still work",
      "Cost math: fine-tuning + hosting vs API pricing, with the break-even volume"
     ]
    },
    "fails": {
     "uz": [
      "Training loss pasaydi deb muvaffaqiyat deb hisoblash — bu hech narsani anglatmaydi",
      "Eval setni fine-tuning datasidan keyin qurish → kontaminatsiya",
      "Baza modelni yaxshi prompt bilan umuman sinab ko'rmaslik. Bu eng keng tarqalgan isrof."
     ],
     "en": [
      "Treating a falling training loss as success — it means nothing",
      "Building the eval set after the fine-tuning data → contamination",
      "Never testing the base model with a good prompt. This is the most common waste."
     ]
    },
    "res": []
   },
   {
    "id": "l-serve",
    "kind": "must",
    "side": "l",
    "label": {
     "uz": "vLLM, Kvantizatsiya, Serving",
     "en": "vLLM, Quantization & Serving"
    },
    "hint": {
     "uz": "server spetsifikatsiyangizni asoslaydi",
     "en": "justifies your AI server spec"
    },
    "why": {
     "uz": "Bu mavzu qo'mita server spetsifikatsiyangizni taxmindan muhandislik qaroriga aylantiradi, va hozirda LLM stack'ining eng yuqori maosh to'lanadigan qismi.",
     "en": "This is the topic that turns your committee server specification from a guess into an engineering decision, and it is the highest-paid part of the LLM stack right now."
    },
    "learn": {
     "uz": [
      "vLLM: PagedAttention, continuous batching, va u sodda HF generate'dan nega 10×+ tez",
      "Kvantizatsiya: AWQ, GPTQ, GGUF, FP8 — sifat vs xotira vs tezlik",
      "KV cache o'lchami: bir vaqtdagi foydalanuvchilar sig'imining asosiy omili",
      "Throughput vs latency: TTFT (birinchi tokengacha vaqt) vs token/sek",
      "VRAM matematikasi: model og'irliklari + KV cache + aktivatsiya → bitta karta nechta parallel foydalanuvchini ko'taradi",
      "Speculative decoding, prefix caching"
     ],
     "en": [
      "vLLM: PagedAttention, continuous batching, and why it beats naive HF generate by 10×+",
      "Quantization: AWQ, GPTQ, GGUF, FP8 — quality vs memory vs speed",
      "KV cache sizing: the real driver of concurrent-user capacity",
      "Throughput vs latency: TTFT (time to first token) vs tokens/sec",
      "VRAM math: model weights + KV cache + activation overhead → how many concurrent users a card actually supports",
      "Speculative decoding, prefix caching"
     ]
    },
    "fails": {
     "uz": [
      "Serverni faqat model parametrlari soniga qarab o'lchash va KV cache'ning concurrency bilan o'sishini e'tiborsiz qoldirish",
      "Agressiv kvantizatsiya qilib eval'ni qayta yugurtirmaslik — sifat jimgina tushadi",
      "Batch size 1 da benchmark qilib, production'da hayratga tushish"
     ],
     "en": [
      "Sizing a server by model parameter count alone and ignoring KV cache growth with concurrency",
      "Quantizing aggressively and not re-running evals — quality drops silently",
      "Benchmarking at batch size 1 and being shocked in production"
     ]
    },
    "res": [
     "vLLM docs; keyin o'z hardware'ingizda benchmark — chop etilgan raqamlar hech qachon ko'chmaydi"
    ]
   },
   {
    "id": "l-deliver",
    "kind": "goal",
    "side": "r",
    "label": {
     "uz": "NATIJA: Local vs API xarajat hisoboti",
     "en": "DELIVERABLE: Local vs API Cost Report"
    },
    "hint": {
     "uz": "va qo'mitada ichki g'alaba",
     "en": "and an internal win at the committee"
    },
    "why": {
     "uz": "Oziq-ovqat monitoringi loyihasi uchun o'zbekcha matn klassifikatsiyasini ikki xil yo'l bilan quring va to'g'ri taqqoslang. Bir ishda ham o'quv natijasi, ham ichki obro'.",
     "en": "For the food safety monitoring project, build Uzbek text classification two ways and compare them properly. Learning artifact and internal credibility in one piece of work."
    },
    "learn": {
     "uz": [
      "A yo'li: Telegram korpusingizda fine-tune qilingan kichik lokal model (7B yoki kichikroq encoder)",
      "B yo'li: yaxshi ishlangan prompt bilan Claude API",
      "Bir xil belgilangan eval setda taqqoslang: aniqlik, p95 latency, 1M xabarga xarajat, data residency",
      "Self-hosting API narxidan ustun keladigan break-even hajmni kiriting"
     ],
     "en": [
      "Path A: fine-tuned small local model (e.g. a 7B or a smaller encoder) on your Telegram corpus",
      "Path B: Claude API with a well-engineered prompt",
      "Compare on the same labeled eval set: accuracy, p95 latency, cost per 1M messages, data residency",
      "Include the break-even volume where self-hosting beats API pricing"
     ]
    },
    "fails": {
     "uz": [
      "Buni break-even nuqtasi belgilangan jadval sifatida taqdim eting. Aynan o'sha bitta grafik rahbariyat harakat qiladigan narsa."
     ],
     "en": [
      "Present it as a table with the break-even point marked. That single chart is what leadership will actually act on."
     ]
    },
    "res": []
   }
  ]
 },
 {
  "id": "p5",
  "label": {
   "uz": "5-bosqich",
   "en": "Phase 5"
  },
  "title": {
   "uz": "ML Systems / MLOps",
   "en": "ML Systems & MLOps"
  },
  "weeks": {
   "uz": "4–6 hafta · sizning ustunligingiz",
   "en": "4–6 weeks · your moat"
  },
  "topics": [
   {
    "id": "o-track",
    "kind": "must",
    "side": "l",
    "label": {
     "uz": "Eksperiment va data versiyalash",
     "en": "Experiment Tracking & Data Versioning"
    },
    "hint": {
     "uz": "MLflow / W&B / DVC",
     "en": "MLflow / W&B / DVC"
    },
    "why": {
     "uz": "Busiz 'qaysi o'zgarish yaxshilanishga sabab bo'ldi' degan savolga javob bera olmaysiz — bu esa siz muhandislik emas, GPU bilan qimor o'ynayotganingizni anglatadi.",
     "en": "Without this you cannot answer 'which change caused the improvement', which means you are not doing engineering, you are gambling with a GPU."
    },
    "learn": {
     "uz": [
      "MLflow yoki W&B: parametr, metrika, artifact va modelning o'zini loglash",
      "Model registry: staging vs production versiyalari",
      "DVC yoki muqobil — dataset versiyalash. Model o'z datasi versiyasisiz ma'nosiz.",
      "Takrorlanuvchanlik: qotirilgan seed, qotirilgan dependency, konteynerlashtirilgan training"
     ],
     "en": [
      "MLflow or W&B: log params, metrics, artifacts, and the model itself",
      "Model registry: staging vs production versions",
      "DVC or equivalent for dataset versioning — a model is meaningless without its data version",
      "Reproducibility: pinned seeds, pinned dependencies, containerized training"
     ]
    },
    "fails": {
     "uz": [
      "Kimningdir noutbukidagi model fayli — qaysi data va kod uni yaratganini hech kim bilmaydi",
      "O'tgan oydagi eng yaxshi natijani takrorlay olmaslik"
     ],
     "en": [
      "A model file on someone's laptop with no record of what data or code produced it",
      "Being unable to reproduce last month's best result"
     ]
    },
    "res": []
   },
   {
    "id": "o-serve",
    "kind": "must",
    "side": "r",
    "label": {
     "uz": "Model Serving",
     "en": "Model Serving"
    },
    "hint": {
     "uz": "FastAPI + ONNX / vLLM",
     "en": "FastAPI + ONNX / TorchServe / vLLM"
    },
    "why": {
     "uz": "Bu yerda 5 yillik backend tajribangiz eng kuchli ishlaydi. ML odamlarining ko'pi modelni yomon serve qiladi; siz yiqilmaydigan API qurishni allaqachon bilasiz.",
     "en": "This is where your 5 years of backend compounds hardest. Most ML people serve models badly; you already know how to build an API that does not fall over."
    },
    "learn": {
     "uz": [
      "Klassik va CV modellar uchun FastAPI + ONNX Runtime (CPU'da katta tezlanish)",
      "Dynamic batching: bir necha ms latency evaziga katta throughput",
      "Async chegaralari: GPU inference'da event loop'ni hech qachon bloklamang — worker pool yoki navbat",
      "Redis inference navbati / natija keshi sifatida — bu patternni bilasiz",
      "GPU utilization monitoringi; bo'sh turgan GPU — sarflangan byudjet",
      "Timeout, circuit breaker va soddaroq modelga graceful degradation"
     ],
     "en": [
      "FastAPI + ONNX Runtime for classical and CV models (big CPU speedups)",
      "Dynamic batching: trade a few ms of latency for large throughput gains",
      "Async boundaries: never block the event loop on GPU inference — use a worker pool or a queue",
      "Redis as an inference queue / result cache — you already know this pattern",
      "GPU utilization monitoring; an idle GPU is a budget you wasted",
      "Timeouts, circuit breakers, and graceful degradation to a simpler model"
     ]
    },
    "fails": {
     "uz": [
      "Modelni startup'da emas, har bir so'rovda yuklash",
      "Async handler ichida sinxron inference — butun trafik ketma-ketlashadi",
      "GPU node o'lganda fallback yo'li yo'qligi"
     ],
     "en": [
      "Loading the model per request instead of at startup",
      "Synchronous inference inside an async handler, serializing all traffic",
      "No fallback path when the GPU node dies"
     ]
    },
    "res": []
   },
   {
    "id": "o-skew",
    "kind": "must",
    "side": "l",
    "label": {
     "uz": "Training/Serving Skew",
     "en": "Training/Serving Skew"
    },
    "hint": {
     "uz": "klassik production nosozligi",
     "en": "the classic production failure"
    },
    "why": {
     "uz": "Feature notebookda bir xil, API'da boshqacha hisoblanadi. Offline metrikalar a'lo qoladi; production jimgina yomonlashadi. Hech qanday xato chiqmaydi.",
     "en": "The feature is computed one way in the notebook and another way in the API. Offline metrics stay excellent; production quietly degrades. Nothing errors."
    },
    "learn": {
     "uz": [
      "Training va serving o'rtasida bitta feature-hisoblash kod yo'lini baham ko'ring",
      "Timezone, null ishlovi va kategoriya tartibi farqlaridan ehtiyot bo'ling",
      "Serving inputlarini loglang va vaqti-vaqti bilan offline qayta baholang",
      "Feature store nimani hal qilishini tushuning, keyin kerakligini hal qiling (hozircha kerak emas)"
     ],
     "en": [
      "Share one feature-computation code path between training and serving",
      "Beware timezone handling, null handling, and category ordering differences",
      "Log serving inputs and periodically re-score them offline to detect divergence",
      "Understand what a feature store solves before deciding you need one (you probably do not yet)"
     ]
    },
    "fails": {
     "uz": [
      "UTC timestamp'da training, Asia/Tashkent mahalliy vaqtda serving",
      "Pickle qilingan encoder va API o'rtasida kategoriya tartibi farqi",
      "Faqat serving paytida jimgina NaN → 0 aylantirish"
     ],
     "en": [
      "Training on UTC timestamps, serving on Asia/Tashkent local time",
      "Category encoding order differing between the pickled encoder and the API",
      "Silent NaN → 0 coercion at serving time only"
     ]
    },
    "res": []
   },
   {
    "id": "o-drift",
    "kind": "must",
    "side": "r",
    "label": {
     "uz": "Drift va Monitoring",
     "en": "Drift & Monitoring"
    },
    "hint": {
     "uz": "PSI, KS test, shadow deploy",
     "en": "PSI, KS test, shadow deploys"
    },
    "why": {
     "uz": "Modellar yemiriladi. Monitoringsiz buni olti hafta kechikib, jahli chiqqan stakeholder'dan bilib olasiz.",
     "en": "Models decay. Without monitoring you find out from an angry stakeholder, six weeks late."
    },
    "learn": {
     "uz": [
      "Data drift: input feature'lar bo'yicha PSI, KS test, population stability",
      "Prediction drift vs haqiqiy performance pasayishi (ground truth kech keladi yoki umuman kelmaydi)",
      "Label'lar kechikkanda proxy metrikalar",
      "Modellar uchun shadow deployment va canary rollout",
      "Har dushanba sizni uyg'otmaydigan alert threshold'lari"
     ],
     "en": [
      "Data drift: PSI, KS test, population stability on input features",
      "Prediction drift vs actual performance decay (ground truth arrives late, or never)",
      "Proxy metrics when labels are delayed",
      "Shadow deployment and canary rollout for models",
      "Alerting thresholds that do not page you every Monday"
     ]
    },
    "fails": {
     "uz": [
      "Faqat latency va error rate monitoring qilish — axlat bashorat qilayotgan model mukammal sog'lom ko'rinadi",
      "Ground-truth yig'ish siklining yo'qligi — launch'dan keyin performance o'lchab bo'lmaydi"
     ],
     "en": [
      "Monitoring only latency and error rate, so a model predicting garbage looks perfectly healthy",
      "No ground-truth collection loop, so performance is unmeasurable after launch"
     ]
    },
    "res": []
   },
   {
    "id": "o-retrain",
    "kind": "deep",
    "side": "l",
    "label": {
     "uz": "Retraining pipeline'lari",
     "en": "Retraining Pipelines"
    },
    "hint": {
     "uz": "oxirida avtomatlashtiring, boshida emas",
     "en": "automate last, not first"
    },
    "why": {
     "uz": "Retraining'ni faqat ishonchli eval'ga ega bo'lgandan keyin avtomatlashtiring. Buzilgan metrikada avtomatik retraining shunchaki yomonlashishni avtomatlashtiradi.",
     "en": "Automate retraining only after you have a trustworthy eval. Automated retraining on a broken metric just automates the degradation."
    },
    "learn": {
     "uz": [
      "Rejalashtirilgan vs trigger bilan retraining (drift chegarasi, performance pasayishi)",
      "Avtomatik gating: yangi model faqat qotirilgan eval setda amaldagini yengsa deploy bo'ladi",
      "Rollback yo'li",
      "Airflow / Prefect / Dagster — yoki cron + Docker, ko'pincha shu yetarli"
     ],
     "en": [
      "Scheduled vs triggered retraining (drift threshold, performance drop)",
      "Automatic gating: a new model ships only if it beats the incumbent on a frozen eval set",
      "Rollback path",
      "Airflow / Prefect / Dagster — or a cron job plus Docker, which is often enough"
     ]
    },
    "fails": {
     "uz": [
      "3 ta model uchun Kubeflow qurish. Bu yerdagi asosiy nosozlik — ortiqcha muhandislik.",
      "Leak bo'lgan eval setda yenggan modelni avtomatik promote qilish"
     ],
     "en": [
      "Building Kubeflow for three models. Over-engineering is the default failure mode here.",
      "Auto-promoting a model that beat the incumbent on a leaked eval set"
     ]
    },
    "res": []
   }
  ]
 },
 {
  "id": "p6",
  "label": {
   "uz": "6-bosqich",
   "en": "Phase 6"
  },
  "title": {
   "uz": "Ixtisoslashuv",
   "en": "Specialize"
  },
  "weeks": {
   "uz": "davomiy",
   "en": "ongoing"
  },
  "topics": [
   {
    "id": "s-llm",
    "kind": "must",
    "side": "r",
    "label": {
     "uz": "→ LLM Infra va Serving",
     "en": "→ LLM Infra & Serving"
    },
    "hint": {
     "uz": "TAVSIYA ETILADI — asosiy",
     "en": "RECOMMENDED primary"
    },
    "why": {
     "uz": "International remote lavozimlar uchun eng yuqori bozor qiymati, qo'mitada to'g'ridan-to'g'ri qayta ishlatiladi, va ML PhD'lar bilan ularning maydonida raqobatlashish o'rniga sizda allaqachon bor backend chuqurligiga quriladi.",
     "en": "Highest market value for international remote roles, directly reusable at the committee, and it builds on the backend depth you already have instead of competing with ML PhDs on their turf."
    },
    "learn": {
     "uz": [
      "Chuqur vLLM / TensorRT-LLM / SGLang serving",
      "Multi-GPU: tensor parallelism vs pipeline parallelism",
      "Xarajat muhandisligi: batching siyosati, keshlash, model darajalari orasida routing",
      "Agent infratuzilmasi: tool calling, holat va masshtabda nosozliklarni boshqarish",
      "Pozitsiyalash: 'Senior Backend + LLM Systems Engineer' — 'ML Engineer'dan kamyobroq va yaxshiroq to'lanadi"
     ],
     "en": [
      "Deep vLLM / TensorRT-LLM / SGLang serving",
      "Multi-GPU: tensor parallelism vs pipeline parallelism",
      "Cost engineering: batching policy, caching, routing between model tiers",
      "Agent infrastructure: tool calling, state, and failure handling at scale",
      "Positioning: 'Senior Backend + LLM Systems Engineer' is rarer and better paid than 'ML Engineer'"
     ]
    },
    "fails": {
     "uz": [
      "Tadqiqotchi ML muhandisi sifatida raqobatlashishga urinish. Noto'g'ri o'yin, ikki yil orqada, yomonroq shanslar."
     ],
     "en": [
      "Trying to compete as a research ML engineer. Wrong game, two years behind, worse odds."
     ]
    },
    "res": []
   },
   {
    "id": "s-ts",
    "kind": "deep",
    "side": "l",
    "label": {
     "uz": "→ Time-Series va Forecasting",
     "en": "→ Time-Series & Forecasting"
    },
    "hint": {
     "uz": "ikkilamchi; tradingga oziq beradi",
     "en": "secondary; feeds trading"
    },
    "why": {
     "uz": "Ikkinchi trek. Restoran loyihasiga to'g'ridan-to'g'ri xizmat qiladi va trading qiziqishingiz ostidagi halol poydevor.",
     "en": "Second track. Directly serves the restaurant project and is the honest foundation under your trading interest."
    },
    "learn": {
     "uz": [
      "Ehtimollik forecasting: kvantillar va bashorat intervallari, nuqta baho emas",
      "Ierarxik forecasting va rekonsiliatsiya",
      "Statsionarlik, kointegratsiya, rejim o'zgarishlari",
      "Purging va embargo bilan walk-forward validation — moliyaviy narsa uchun majburiy",
      "Backtest overfitting: deflated Sharpe ratio, multiple-testing tuzatish"
     ],
     "en": [
      "Probabilistic forecasting: quantiles and prediction intervals, not point estimates",
      "Hierarchical forecasting and reconciliation",
      "Stationarity, cointegration, regime changes",
      "Walk-forward validation with purging and embargo — mandatory for anything financial",
      "Backtest overfitting: deflated Sharpe ratio, multiple-testing correction"
     ]
    },
    "fails": {
     "uz": [
      "300 ta strategiya sinab, eng omadlisini saqlaganingiz uchun foydali ko'rinadigan backtest",
      "Tranzaksiya xarajatlari va slippage'ni e'tiborsiz qoldirish — qog'ozdagi strategiyalarning ko'pi shu yerda o'ladi"
     ],
     "en": [
      "A backtest that looks profitable because you tried 300 strategies and kept the luckiest one",
      "Ignoring transaction costs and slippage, which is where most paper strategies die"
     ]
    },
    "res": [
     "Marcos López de Prado — Advances in Financial ML (validation boblari uchun)"
    ]
   },
   {
    "id": "s-cv",
    "kind": "skip",
    "side": "r",
    "label": {
     "uz": "→ Geospatial / CV",
     "en": "→ Geospatial / CV"
    },
    "hint": {
     "uz": "tor bozor; loyiha sifatida qoldiring",
     "en": "narrow market; keep as a project"
    },
    "why": {
     "uz": "Dala Daftari buni siz uchun qiziqarli qiladi, lekin geospatial ML uchun global ish bozori kichik. Buni karyera treki emas, mahsulot yo'nalishi sifatida saqlang.",
     "en": "Dala Daftari makes this interesting to you, but the global job market for geospatial ML is small. Keep it as a product play, not a career track."
    },
    "learn": {
     "uz": [
      "Sentinel-2 / Landsat pipeline'lari, NDVI va o'xshashlari",
      "Dala chegaralari uchun segmentatsiya modellari (U-Net, SAM)",
      "Sun'iy yo'ldosh triage → yer sathidagi CNN diagnostika — siz allaqachon chizgan arxitektura"
     ],
     "en": [
      "Sentinel-2 / Landsat pipelines, NDVI and friends",
      "Segmentation models (U-Net, SAM) for field boundaries",
      "Satellite triage → ground-level CNN diagnosis, the architecture you already sketched"
     ]
    },
    "fails": {
     "uz": [
      "Bulut qoplami vaqt qatorining yarmini yo'q qilishi",
      "Ground truth'ni masshtabda yig'ish deyarli imkonsizligi"
     ],
     "en": [
      "Cloud cover destroying half your time series",
      "Ground truth being nearly impossible to collect at scale"
     ]
    },
    "res": []
   },
   {
    "id": "s-en",
    "kind": "must",
    "side": "l",
    "label": {
     "uz": "Ingliz tili — parallel trek",
     "en": "English as a Parallel Track"
    },
    "hint": {
     "uz": "sizning qiyinroq to'siqingiz",
     "en": "your harder bottleneck"
    },
    "why": {
     "uz": "To'g'ridan aytaman: ML bo'shlig'ingiz taxminan 6 oylik izchil ish. Ingliz tilingiz A2 darajada — bu international remote maqsad uchun kattaroq to'siq. Deyarli barcha ML materiali, hujjatlar va intervyular ingliz tilida. Buni keyinga qoldiriladigan narsa emas, teng prioritet sifatida ko'ring.",
     "en": "Direct version: your ML gap is about 6 months of focused work. Your English at A2 is the bigger obstacle to the international remote role. Nearly all ML material, documentation, and interviews are in English. Treat this as equal priority, not as something to fix later."
    },
    "learn": {
     "uz": [
      "ML docs va maqolalarni faqat ingliz tilida o'qing — qo'shimcha soat kerak emas, ikki foyda",
      "Loyiha hisobotlari va eksperiment loglarini ingliz tilida yozing",
      "Texnik gapirish mashqi: arxitekturani 5 daqiqa ovoz chiqarib tushuntiring, yozib oling",
      "Shu 6 oy ichida B2 maqsad — his bilan emas, real test bilan o'lchangan"
     ],
     "en": [
      "Read ML docs and papers in English only — double duty, no extra hours needed",
      "Write your project reports and experiment logs in English",
      "Technical speaking practice: explain an architecture out loud for 5 minutes, recorded",
      "Target B2 within the same 6 months, measured by a real test, not by feel"
     ]
    },
    "fails": {
     "uz": [
      "Ingliz tilini 'ML'dan keyin' ga qoldirish. Bu ketma-ketlik jadvalga bir yil qo'shadi.",
      "Faqat passiv iste'mol. Darajani ko'taradigan narsa — chiqish (output)."
     ],
     "en": [
      "Postponing English until 'after ML'. That sequence adds a year to the timeline.",
      "Passive consumption only. Output is what moves the level."
     ]
    },
    "res": []
   }
  ]
 }
];

export const SKIPS = [
 {
  "id": "x-ng",
  "kind": "skip",
  "nocheck": true,
  "label": {
   "uz": "Andrew Ng ML kursi",
   "en": "Andrew Ng's ML Course"
  },
  "hint": {
   "uz": "to'g'ri kurs, noto'g'ri daraja",
   "en": "right course, wrong level"
  },
  "why": {
   "uz": "Chinakam ajoyib material, lekin hali kod yoza olmaydiganlar uchun. Siz 2 haftada o'zlashtiradigan kontentga 8 hafta sarflaysiz.",
   "en": "Genuinely excellent material, aimed at people who cannot yet code. You would spend 8 weeks on content you can absorb in 2."
  },
  "learn": {
   "uz": [
    "Strukturali takror kerak bo'lsa, konspektni bir dam olish kunida ko'rib chiqing",
    "Keyin to'g'ridan-to'g'ri 1-bosqich qat'iylik mavzulariga o'ting"
   ],
   "en": [
    "If you want a structured refresher, skim the notes in a weekend",
    "Then go straight to Phase 1 rigor topics"
   ]
  },
  "fails": {
   "uz": [],
   "en": []
  },
  "res": []
 },
 {
  "id": "x-kaggle",
  "kind": "skip",
  "nocheck": true,
  "label": {
   "uz": "Kaggle grind",
   "en": "Kaggle Grinding"
  },
  "hint": {
   "uz": "leaderboard overfitting o'rgatadi",
   "en": "teaches leaderboard overfitting"
  },
  "why": {
   "uz": "Kaggle toza, statik, oldindan belgilangan datasetda 0.0003 AUC olish uchun 40 ta modelni ensemble qilishni mukofotlaydi. Production ML esa asosan data yig'ish, labeling, latency va monitoring — bularning hech biri Kaggle'da yo'q.",
   "en": "Kaggle rewards ensembling 40 models to gain 0.0003 AUC on a clean, static, pre-labeled dataset. Production ML is mostly data collection, labeling, latency, and monitoring — none of which Kaggle contains."
  },
  "learn": {
   "uz": [
    "Feature engineering mashqi uchun 2–3 ta musobaqa qiling, keyin to'xtating",
    "Raqobatlashish o'rniga g'olib yechim tahlillarini o'qing — soatiga foyda nisbati yaxshiroq"
   ],
   "en": [
    "Do 2–3 competitions for feature engineering practice, then stop",
    "Read winning solution write-ups instead of competing — better ratio of insight to hours"
   ]
  },
  "fails": {
   "uz": [],
   "en": []
  },
  "res": []
 },
 {
  "id": "x-dsa",
  "kind": "skip",
  "nocheck": true,
  "label": {
   "uz": "ML uchun DSA / LeetCode",
   "en": "DSA / LeetCode for ML"
  },
  "hint": {
   "uz": "butunlay alohida trek",
   "en": "separate track entirely"
  },
  "why": {
   "uz": "Algoritmlar va ma'lumot tuzilmalari amaliy ML ishiga deyarli aloqasiz. Ular faqat FAANG uslubidagi intervyu uchun kerak. Agar o'sha kompaniyalarni nishonga olsangiz, buni alohida, aniq belgilangan trek sifatida saqlang — ML roadmap ichiga yashirmang.",
   "en": "Algorithms and data structures are nearly irrelevant to applied ML work. They matter only for FAANG-style interview loops. Keep that as a separate, clearly-labeled track if you decide to target those companies — do not smuggle it into the ML roadmap."
  },
  "learn": {
   "uz": [
    "Agar qilsangiz: 60–80 masala, haftasiga 3–4 soat, parallel",
    "Complexity analysis, hash map, binary search, BFS/DFS, heap — shu yetarli",
    "Segment tree, advanced DP, suffix automaton — kerak emas"
   ],
   "en": [
    "If you do it: 60–80 problems, 3–4 hours a week, parallel",
    "Complexity analysis, hash maps, binary search, BFS/DFS, heaps — that is enough",
    "Segment trees, advanced DP, suffix automata — not needed"
   ]
  },
  "fails": {
   "uz": [
    "LeetCode o'lchanadigan va qulay, ML natijalari esa noaniq va qiyin. Stress ostida siz LeetCode'ga siljiysiz, chunki u mahsuldor his qildiradi. Qoida: haftasiga 4 soatdan oshmasin va hech qachon ML natijasini kechiktirmasin."
   ],
   "en": [
    "LeetCode is measurable and comfortable; ML deliverables are ambiguous and hard. Under stress you will drift to LeetCode because it feels productive. Rule: never more than 4 hours a week, and never at the cost of an ML deliverable."
   ]
  },
  "res": []
 },
 {
  "id": "x-arxiv",
  "kind": "skip",
  "nocheck": true,
  "label": {
   "uz": "Har kuni arXiv o'qish",
   "en": "Daily arXiv Reading"
  },
  "hint": {
   "uz": "xalat kiygan prokrastinatsiya",
   "en": "procrastination in a lab coat"
  },
  "why": {
   "uz": "Bir nechta ML tizimini deploy qilmagunicha, maqola o'qish progress hissini beradi, lekin mohiyatsiz. Maqolalarning 95% i sizning ishingizga hech qachon ta'sir qilmaydi.",
   "en": "Before you have shipped several ML systems, paper-reading gives the feeling of progress without the substance. 95% of papers will never affect your work."
  },
  "learn": {
   "uz": [
    "Maqolani aniq bir muammo sizni unga yuborganda o'qing",
    "Oqim o'rniga 2–3 ta amaliyotchi newsletter'ini kuzating"
   ],
   "en": [
    "Read a paper when a specific problem sends you to it",
    "Follow 2–3 practitioner newsletters instead of the firehose"
   ]
  },
  "fails": {
   "uz": [],
   "en": []
  },
  "res": []
 },
 {
  "id": "x-scratch",
  "kind": "skip",
  "nocheck": true,
  "label": {
   "uz": "Hamma narsani noldan qayta yozish",
   "en": "Reimplementing Everything From Scratch"
  },
  "hint": {
   "uz": "bir marta — ta'lim, ikki marta — hobbi",
   "en": "once is education, twice is a hobby"
  },
  "why": {
   "uz": "Transformer'ni noldan aynan bir marta quring — tushunish uchun. Keyin HuggingFace, vLLM va sklearn ishlating. Kutubxona ichini qayta yozish ustunlik emas va oylab vaqt yeydi.",
   "en": "Build a transformer from scratch exactly once, for understanding. After that, use HuggingFace, vLLM, and sklearn. Rewriting library internals is not a differentiator and consumes months."
  },
  "learn": {
   "uz": [],
   "en": []
  },
  "fails": {
   "uz": [],
   "en": []
  },
  "res": []
 }
];
