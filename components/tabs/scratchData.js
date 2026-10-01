// Content extracted from the original Mission Control artifact. Body fields are trusted static HTML.
export const MODULES = [
  {
    id: "linear-algebra",
    track: "a",
    mod: 1,
    name: "Linear Algebra for ML",
    eyebrow: "Module 01 / 08 · Math & Classic ML",
    title: "Linear Algebra for ML",
    subs: [{"id":"linear-algebra-why","title":"Why this exists"},{"id":"linear-algebra-math","title":"The math"},{"id":"linear-algebra-build","title":"Build it"},{"id":"linear-algebra-mistake","title":"Common mistake"},{"id":"linear-algebra-apply","title":"Apply it"}],
    body: `<h2 id="linear-algebra-why"><span class="h2-mark">1.1</span>Why this exists</h2>
<p>Every model you'll touch &mdash; linear regression, a neural net, an LLM's attention layer &mdash; is matrix multiplication underneath. You don't need a linear algebra degree. You need to be fluent enough that <code>X @ w</code> reads as obviously as a for-loop does to you now as a backend dev.</p>

<h2 id="linear-algebra-math"><span class="h2-mark">1.2</span>The math</h2>
<p>A dataset of m rows and n features is a matrix X with shape (m, n). A weight vector w has shape (n,). The prediction for every row at once is one matrix multiply:</p>
<div class="math">ŷ = X · w&nbsp;&nbsp;&nbsp;&nbsp;shape: (m, n) &middot; (n,) &rarr; (m,)</div>
<p>Dot product of two vectors is <code>sum(a[i] * b[i] for i in range(n))</code> &mdash; that's it, that's the operation every "AI does math I don't understand" fear collapses into. Matrix multiplication is just many dot products (one per output row) done at once.</p>

<h2 id="linear-algebra-build"><span class="h2-mark">1.3</span>Build it</h2>
<div class="code-block"><span class="cm"># dot product, from scratch, no numpy</span>
def dot(a, b):
    return sum(ai * bi for ai, bi in zip(a, b))

<span class="cm"># matrix-vector multiply, from scratch</span>
def matvec(X, w):
    return [dot(row, w) for row in X]

<span class="cm"># now the numpy version &mdash; same operation, vectorized</span>
import numpy as np
X = np.array([[1, 2], [3, 4], [5, 6]])
w = np.array([0.5, -1.0])
y_hat = X @ w   <span class="cm"># or X.dot(w)</span></div>

<h2 id="linear-algebra-mistake"><span class="h2-mark">1.4</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Shape mismatches are the #1 numpy error you'll hit for months. Before every matrix operation, say the shapes out loud: "X is (m, n), w is (n,), so X @ w is (m,)." If you can't say the shapes, you can't debug the error.</p>
</div>

<h2 id="linear-algebra-apply"><span class="h2-mark">1.5</span>Apply it</h2>
<p>Take any small dataset (even 5 rows, 2 columns by hand). Compute predictions two ways: a Python for-loop, and <code>X @ w</code>. Confirm they give identical numbers. This single exercise is what makes matrix notation stop looking like magic.</p>`,
  },
  {
    id: "linear-regression",
    track: "a",
    mod: 2,
    name: "Linear Regression",
    eyebrow: "Module 02 / 08 · Math & Classic ML",
    title: "Linear Regression",
    subs: [{"id":"linear-regression-why","title":"Why this exists"},{"id":"linear-regression-math","title":"The math"},{"id":"linear-regression-build","title":"Build it"},{"id":"linear-regression-mistake","title":"Common mistake"},{"id":"linear-regression-apply","title":"Apply it"}],
    body: `<h2 id="linear-regression-why"><span class="h2-mark">2.1</span>Why this exists</h2>
<p>The simplest possible model: draw the best straight line through the data. Every idea you need for every model after this &mdash; a cost function, gradient descent, overfitting &mdash; shows up here first in its cleanest form. If linear regression doesn't click, nothing after it will either. This is the one to slow down on.</p>

<h2 id="linear-regression-math"><span class="h2-mark">2.2</span>The math</h2>
<p>The model predicts <code>ŷ = θ&#8320; + θ&#8321;x</code> (or <code>ŷ = Xθ</code> with many features). The cost function measures how wrong the line is &mdash; mean squared error:</p>
<div class="math">J(θ) = (1/2m) &Sigma;(ŷ&#7522; &minus; y&#7522;)&sup2;</div>
<p>Gradient descent finds the θ that minimizes J by repeatedly stepping downhill:</p>
<div class="math">θ := θ &minus; α &middot; &part;J/&part;θ</div>
<p>where α is the learning rate &mdash; too big and you overshoot and diverge, too small and training crawls.</p>

<h2 id="linear-regression-build"><span class="h2-mark">2.3</span>Build it</h2>
<div class="code-block">import numpy as np

def fit_linear_regression(X, y, lr=0.01, epochs=1000):
    m, n = X.shape
    theta = np.zeros(n)
    for _ in range(epochs):
        y_hat = X @ theta
        error = y_hat - y
        grad = (1/m) * (X.T @ error)
        theta -= lr * grad
    return theta</div>

<h2 id="linear-regression-mistake"><span class="h2-mark">2.4</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Forgetting to <strong>feature scale</strong> before gradient descent. If one feature ranges 0&ndash;1 and another ranges 0&ndash;100,000, the cost surface is a long thin valley and gradient descent zigzags instead of converging. Standardize every feature (subtract mean, divide by std) before training.</p>
</div>

<div class="callout tip">
<div class="callout-title">Debug trick</div>
<p>Plot J(θ) against epoch number. It should fall smoothly and monotonically. If it oscillates or explodes, your learning rate is too high. If it barely moves, it's too low or your gradient math has a bug &mdash; check the shapes first.</p>
</div>

<h2 id="linear-regression-apply"><span class="h2-mark">2.5</span>Apply it</h2>
<p>Use sklearn's <code>load_diabetes</code> dataset. Fit it with your from-scratch function, then with <code>sklearn.linear_model.LinearRegression</code>. Compare the learned coefficients &mdash; they should be close. If they're wildly different, your gradient descent hasn't converged (raise epochs or lower the learning rate).</p>`,
  },
  {
    id: "logistic-regression",
    track: "a",
    mod: 3,
    name: "Logistic Regression",
    eyebrow: "Module 03 / 08 · Math & Classic ML",
    title: "Logistic Regression",
    subs: [{"id":"logistic-regression-why","title":"Why this exists"},{"id":"logistic-regression-math","title":"The math"},{"id":"logistic-regression-build","title":"Build it"},{"id":"logistic-regression-mistake","title":"Common mistake"},{"id":"logistic-regression-apply","title":"Apply it"}],
    body: `<h2 id="logistic-regression-why"><span class="h2-mark">3.1</span>Why this exists</h2>
<p>Linear regression predicts a number. Logistic regression predicts a probability, for classification: spam or not, churn or not, approve or reject. It's linear regression's output squeezed through a function that guarantees the result lands between 0 and 1.</p>

<h2 id="logistic-regression-math"><span class="h2-mark">3.2</span>The math</h2>
<p>The sigmoid function does the squeezing:</p>
<div class="math">&sigma;(z) = 1 / (1 + e&#8315;&#7457;)&nbsp;&nbsp;&nbsp;&nbsp;where z = Xθ</div>
<p>The cost function changes too &mdash; mean squared error isn't convex here, so you use log loss (cross-entropy) instead:</p>
<div class="math">J(θ) = &minus;(1/m) &Sigma; [y&#7522; log(ŷ&#7522;) + (1&minus;y&#7522;) log(1&minus;ŷ&#7522;)]</div>
<p>The decision boundary is just <code>ŷ &ge; 0.5</code> &mdash; the line (or curve, with more features) where the model is exactly 50/50.</p>

<h2 id="logistic-regression-build"><span class="h2-mark">3.3</span>Build it</h2>
<div class="code-block">import numpy as np

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

def fit_logistic_regression(X, y, lr=0.1, epochs=1000):
    m, n = X.shape
    theta = np.zeros(n)
    for _ in range(epochs):
        y_hat = sigmoid(X @ theta)
        error = y_hat - y
        grad = (1/m) * (X.T @ error)
        theta -= lr * grad
    return theta</div>

<h2 id="logistic-regression-mistake"><span class="h2-mark">3.4</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>The gradient formula for logistic regression looks <strong>identical</strong> to linear regression's &mdash; <code>(1/m) X.T @ (y_hat - y)</code>. That's not a coincidence you can ignore, but it also means it's easy to copy-paste the whole function and forget to swap in <code>sigmoid()</code> for the prediction step. If your "probabilities" are outside [0,1], that's the bug.</p>
</div>

<h2 id="logistic-regression-apply"><span class="h2-mark">3.5</span>Apply it</h2>
<p>Use sklearn's <code>load_breast_cancer</code> dataset (binary classification, built in). Train from scratch, then check accuracy against <code>sklearn.linear_model.LogisticRegression</code>. Then plot the decision boundary on just 2 features to see it as an actual line.</p>`,
  },
  {
    id: "svm",
    track: "a",
    mod: 4,
    name: "Support Vector Machines",
    eyebrow: "Module 04 / 08 · Math & Classic ML",
    title: "Support Vector Machines",
    subs: [{"id":"svm-why","title":"Why this exists"},{"id":"svm-math","title":"The math"},{"id":"svm-kernel","title":"The kernel trick"},{"id":"svm-build","title":"Build it"},{"id":"svm-mistake","title":"Common mistake"}],
    body: `<h2 id="svm-why"><span class="h2-mark">4.1</span>Why this exists</h2>
<p>Logistic regression finds <em>a</em> line that separates classes. SVM finds the line that leaves the <strong>widest possible margin</strong> on both sides &mdash; the most confident possible separator. For linearly separable data it tends to generalize better than plain logistic regression, and the kernel trick lets it handle data that isn't linearly separable at all.</p>

<h2 id="svm-math"><span class="h2-mark">4.2</span>The math</h2>
<p>SVM maximizes the margin, which is equivalent to minimizing <code>||w||</code> subject to every point being correctly classified with margin &ge; 1:</p>
<div class="math">minimize (1/2)||w||&sup2;&nbsp;&nbsp;subject to&nbsp;&nbsp;y&#7522;(w&middot;x&#7522; + b) &ge; 1</div>
<p>The points that sit exactly on the margin are the <strong>support vectors</strong> &mdash; the only points that actually determine where the boundary sits. Every other point could move around freely without changing the line at all.</p>

<h2 id="svm-kernel"><span class="h2-mark">4.3</span>The kernel trick</h2>
<div class="callout info">
<div class="callout-title">Mechanism</div>
<p>When data isn't linearly separable in its original space, a kernel function computes what the dot product <em>would be</em> if you projected the data into a higher dimension &mdash; without ever actually computing that projection. The RBF kernel is the default choice when you don't know the right transformation in advance.</p>
</div>

<h2 id="svm-build"><span class="h2-mark">4.4</span>Build it</h2>
<p>Writing the full SVM optimizer (quadratic programming) from scratch is not worth your time this month &mdash; that's the one exception to the rewrite-everything rule. Instead, know exactly what sklearn is doing:</p>
<div class="code-block">from sklearn.svm import SVC
model = SVC(kernel='linear', C=1.0)   <span class="cm"># C: how much margin violation is tolerated</span>
model.fit(X_train, y_train)
support_vectors = model.support_vectors_   <span class="cm"># the points that define the boundary</span></div>

<h2 id="svm-mistake"><span class="h2-mark">4.5</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Treating <code>C</code> as a knob you tune blindly. Low C = wider margin, tolerates more misclassified points, less overfitting. High C = narrower margin, tries to classify every point correctly, more overfitting. Say which direction you're moving and why before you touch it.</p>
</div>`,
  },
  {
    id: "decision-trees",
    track: "a",
    mod: 5,
    name: "Decision Trees",
    eyebrow: "Module 05 / 08 · Math & Classic ML",
    title: "Decision Trees",
    subs: [{"id":"decision-trees-why","title":"Why this exists"},{"id":"decision-trees-math","title":"The math"},{"id":"decision-trees-build","title":"Build it"},{"id":"decision-trees-mistake","title":"Common mistake"},{"id":"decision-trees-apply","title":"Apply it"}],
    body: `<h2 id="decision-trees-why"><span class="h2-mark">5.1</span>Why this exists</h2>
<p>A tree of yes/no questions on features, ending in a prediction. The appeal: you can print it out and a non-technical person can follow the reasoning &mdash; no other model in this list is that interpretable. The cost: a single deep tree overfits badly, which is exactly why ensembles (next module) exist.</p>

<h2 id="decision-trees-math"><span class="h2-mark">5.2</span>The math</h2>
<p>At each split, the tree picks the feature and threshold that most reduces <strong>entropy</strong> (impurity) in the resulting groups:</p>
<div class="math">Entropy(S) = &minus;&Sigma; p&#7522; log&#8322;(p&#7522;)</div>
<p>Information gain is the entropy before the split minus the weighted entropy after. The tree greedily picks the split with the highest gain, at every node, recursively.</p>

<h2 id="decision-trees-build"><span class="h2-mark">5.3</span>Build it</h2>
<div class="code-block">import numpy as np

def entropy(y):
    _, counts = np.unique(y, return_counts=True)
    p = counts / len(y)
    return -np.sum(p * np.log2(p))

def information_gain(y, y_left, y_right):
    n = len(y)
    weighted = (len(y_left)/n) * entropy(y_left) + (len(y_right)/n) * entropy(y_right)
    return entropy(y) - weighted</div>

<h2 id="decision-trees-mistake"><span class="h2-mark">5.4</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Letting a tree grow until every leaf is pure. That's memorizing the training set, not learning a pattern &mdash; it will look perfect on training data and fall apart on anything new. Always set <code>max_depth</code> or <code>min_samples_leaf</code>.</p>
</div>

<h2 id="decision-trees-apply"><span class="h2-mark">5.5</span>Apply it</h2>
<p>Train a tree with no depth limit and one with <code>max_depth=3</code> on the same data. Compare train accuracy vs test accuracy on both. The unlimited tree should show a big gap (overfitting); the limited one should show train and test much closer together.</p>`,
  },
  {
    id: "ensembles",
    track: "a",
    mod: 6,
    name: "Ensemble Methods",
    eyebrow: "Module 06 / 08 · Math & Classic ML",
    title: "Ensemble Methods",
    subs: [{"id":"ensembles-why","title":"Why this exists"},{"id":"ensembles-approaches","title":"Two approaches"},{"id":"ensembles-math","title":"The math, in words"},{"id":"ensembles-build","title":"Use it"},{"id":"ensembles-mistake","title":"Common mistake"}],
    body: `<h2 id="ensembles-why"><span class="h2-mark">6.1</span>Why this exists</h2>
<p>One tree overfits. A hundred trees, each trained slightly differently and averaged together, don't &mdash; their individual mistakes cancel out. This is the most practically useful classic-ML idea on this whole list: ensembles routinely beat single models with almost no extra thought.</p>

<h2 id="ensembles-approaches"><span class="h2-mark">6.2</span>Two approaches</h2>
<table>
<tr><th>Method</th><th>Idea</th><th>Fixes</th></tr>
<tr><td><strong>Bagging</strong> (Random Forest)</td><td>Train many trees on random subsets of data and features, average their votes</td><td>Overfitting &mdash; variance</td></tr>
<tr><td><strong>Boosting</strong> (Gradient Boosting, XGBoost)</td><td>Train trees sequentially, each one correcting the previous one's errors</td><td>Underfitting &mdash; bias</td></tr>
</table>

<h2 id="ensembles-math"><span class="h2-mark">6.3</span>The math, in words</h2>
<p>Random Forest: bootstrap-sample the training set (sample with replacement) for each tree, and at each split only consider a random subset of features. Both randomizations decorrelate the trees, so averaging their predictions actually reduces variance instead of just repeating the same mistake 100 times.</p>
<p>Gradient boosting: tree 1 predicts, compute the residual (actual &minus; predicted), tree 2 is trained to predict <em>that residual</em>, add its prediction (scaled by a learning rate) to tree 1's, repeat. Each tree is a small correction, not a full model on its own.</p>

<h2 id="ensembles-build"><span class="h2-mark">6.4</span>Use it</h2>
<div class="code-block">from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier

rf = RandomForestClassifier(n_estimators=100, max_depth=8)
rf.fit(X_train, y_train)

<span class="cm"># feature importance &mdash; which columns actually mattered</span>
importances = rf.feature_importances_</div>

<h2 id="ensembles-mistake"><span class="h2-mark">6.5</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Treating <code>feature_importances_</code> as ground truth about causation. It tells you what the model <em>used</em> to make predictions, which is not the same as what actually <em>causes</em> the outcome &mdash; correlated features split importance between them arbitrarily.</p>
</div>`,
  },
  {
    id: "unsupervised",
    track: "a",
    mod: 7,
    name: "Unsupervised Learning",
    eyebrow: "Module 07 / 08 · Math & Classic ML",
    title: "Unsupervised Learning",
    subs: [{"id":"unsupervised-why","title":"Why this exists"},{"id":"unsupervised-kmeans","title":"K-Means, the math"},{"id":"unsupervised-pca","title":"PCA, the intuition"},{"id":"unsupervised-mistake","title":"Common mistake"}],
    body: `<h2 id="unsupervised-why"><span class="h2-mark">7.1</span>Why this exists</h2>
<p>Everything so far had labels &mdash; y was given. Real data often doesn't: you have users, or documents, or transactions, and no ground truth about which "group" each belongs to. Clustering finds structure without labels; dimensionality reduction compresses features without losing the signal.</p>

<h2 id="unsupervised-kmeans"><span class="h2-mark">7.2</span>K-Means, the math</h2>
<p>Pick k random points as initial centroids. Repeat: assign every point to its nearest centroid, then move each centroid to the mean of its assigned points. Stop when assignments stop changing.</p>
<div class="code-block">import numpy as np

def kmeans(X, k, iters=100):
    centroids = X[np.random.choice(len(X), k, replace=False)]
    for _ in range(iters):
        dists = np.linalg.norm(X[:, None] - centroids[None, :], axis=2)
        labels = dists.argmin(axis=1)
        for i in range(k):
            if (labels == i).any():
                centroids[i] = X[labels == i].mean(axis=0)
    return labels, centroids</div>

<h2 id="unsupervised-pca"><span class="h2-mark">7.3</span>PCA, the intuition</h2>
<div class="callout info">
<div class="callout-title">Mechanism</div>
<p>PCA finds the directions (principal components) along which your data varies the most, and lets you project onto just the top few &mdash; keeping most of the information while dropping dimensions. It's what makes 100-feature data visualizable in 2D, and what speeds up training when you have more features than you need.</p>
</div>

<h2 id="unsupervised-mistake"><span class="h2-mark">7.4</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Running K-Means without scaling features first &mdash; a feature ranging 0&ndash;1000 dominates the distance calculation over one ranging 0&ndash;1, so clusters form around the big-scale feature alone, not the real structure.</p>
</div>`,
  },
  {
    id: "neural-net-basics",
    track: "a",
    mod: 8,
    name: "Neural Network Basics",
    eyebrow: "Module 08 / 08 · Math & Classic ML",
    title: "Neural Network Basics",
    subs: [{"id":"neural-net-basics-why","title":"Why this exists"},{"id":"neural-net-basics-math","title":"The math"},{"id":"neural-net-basics-build","title":"Build it"},{"id":"neural-net-basics-mistake","title":"Common mistake"}],
    body: `<h2 id="neural-net-basics-why"><span class="h2-mark">8.1</span>Why this exists</h2>
<p>The bridge module. Everything from logistic regression carries over &mdash; a single neuron with a sigmoid <strong>is</strong> logistic regression. Stack neurons in layers, and you get a network that can learn non-linear patterns a straight line never could. This is also your on-ramp to understanding what an LLM actually is underneath the API call.</p>

<h2 id="neural-net-basics-math"><span class="h2-mark">8.2</span>The math</h2>
<p>Forward pass through one hidden layer:</p>
<div class="math">h = &sigma;(X·W&#8321; + b&#8321;)&nbsp;&nbsp;&nbsp;&nbsp;ŷ = &sigma;(h·W&#8322; + b&#8322;)</div>
<p>Backpropagation is the chain rule, applied layer by layer, computing how much each weight contributed to the final error &mdash; then gradient descent updates every weight the same way it did in module 2, just with more layers of chain rule between the cost and the weight.</p>

<h2 id="neural-net-basics-build"><span class="h2-mark">8.3</span>Build it</h2>
<div class="code-block">import numpy as np

def sigmoid(z): return 1 / (1 + np.exp(-z))
def sigmoid_deriv(z): return sigmoid(z) * (1 - sigmoid(z))

<span class="cm"># one hidden layer, forward + backward, from scratch</span>
def forward(X, W1, b1, W2, b2):
    z1 = X @ W1 + b1
    a1 = sigmoid(z1)
    z2 = a1 @ W2 + b2
    a2 = sigmoid(z2)
    return z1, a1, z2, a2

def backward(X, y, z1, a1, a2, W2):
    m = X.shape[0]
    dz2 = a2 - y.reshape(-1, 1)
    dW2 = a1.T @ dz2 / m
    da1 = dz2 @ W2.T
    dz1 = da1 * sigmoid_deriv(z1)
    dW1 = X.T @ dz1 / m
    return dW1, dW2</div>

<h2 id="neural-net-basics-mistake"><span class="h2-mark">8.4</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Initializing all weights to zero. Every neuron in a layer then computes the exact same gradient and stays identical forever &mdash; the network can never break the symmetry. Initialize with small random values instead.</p>
</div>

<div class="callout analogy">
<div class="callout-title">Where this leads</div>
<p>An LLM is this same forward/backward loop, at a scale of billions of parameters, with attention layers instead of plain dense layers. You don't need to rebuild GPT from scratch &mdash; but once you've traced gradients through two layers by hand, "the model learns by adjusting weights" stops being a black box and becomes a mechanism you actually understand.</p>
</div>`,
  },
  {
    id: "python-for-backend",
    track: "b",
    mod: 9,
    name: "Python for a PHP Dev",
    eyebrow: "Build 01 / 09 · FastAPI + RAG · October, Week 1",
    title: "Python for a PHP Dev",
    subs: [{"id":"python-for-backend-why","title":"Why this exists"},{"id":"python-for-backend-map","title":"PHP → Python map"},{"id":"python-for-backend-mistake","title":"Common mistake"},{"id":"python-for-backend-apply","title":"Apply it"}],
    body: `<h2 id="python-for-backend-why"><span class="h2-mark">9.1</span>Why this exists</h2>
<p>You already think like a backend developer &mdash; routes, requests, databases, auth. This module is not "learn programming," it's "learn where Python's syntax and idioms differ from PHP's," so the translation is fast instead of starting from zero.</p>

<h2 id="python-for-backend-map"><span class="h2-mark">9.2</span>PHP &rarr; Python map</h2>
<table>
<tr><th>PHP</th><th>Python</th></tr>
<tr><td><code>$arr['key']</code></td><td><code>d['key']</code> (dict)</td></tr>
<tr><td><code>composer.json</code>, <code>vendor/</code></td><td><code>requirements.txt</code> or <code>pyproject.toml</code>, a <code>venv</code></td></tr>
<tr><td><code>function foo($x) { ... }</code></td><td><code>def foo(x): ...</code> (indentation is the block)</td></tr>
<tr><td><code>class Foo { public $x; }</code></td><td><code>class Foo: def __init__(self, x): self.x = x</code></td></tr>
<tr><td><code>=&gt;</code> in match/switch</td><td><code>match x: case ...:</code> (3.10+)</td></tr>
</table>

<h2 id="python-for-backend-mistake"><span class="h2-mark">9.3</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Skipping the virtual environment because "it's just a script." Every project gets its own <code>venv</code> from day one &mdash; otherwise two projects' dependency versions collide and you'll waste a day debugging an environment issue that isn't a code bug at all.</p>
</div>

<h2 id="python-for-backend-apply"><span class="h2-mark">9.4</span>Apply it</h2>
<p>Rewrite one small Laravel command or job you already have (any CLI script, not a whole app) in plain Python. Not a framework yet &mdash; just enough to get comfortable with venv, pip, classes, and type hints.</p>`,
  },
  {
    id: "fastapi-basics",
    track: "b",
    mod: 10,
    name: "FastAPI Fundamentals",
    eyebrow: "Build 02 / 09 · FastAPI + RAG · October, Week 2",
    title: "FastAPI Fundamentals",
    subs: [{"id":"fastapi-basics-why","title":"Why this exists"},{"id":"fastapi-basics-core","title":"Core pieces"},{"id":"fastapi-basics-mistake","title":"Common mistake"},{"id":"fastapi-basics-apply","title":"Apply it"}],
    body: `<h2 id="fastapi-basics-why"><span class="h2-mark">10.1</span>Why this exists</h2>
<p>FastAPI is the standard Python framework for exactly the kind of backend-plus-AI role you're targeting for January. It's closer to Laravel than Django is &mdash; explicit routing, no heavy conventions, and it generates OpenAPI docs for free.</p>

<h2 id="fastapi-basics-core"><span class="h2-mark">10.2</span>Core pieces</h2>
<div class="code-block">from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class BookIn(BaseModel):
    title: str
    author: str
    pages: int

@app.post("/books")
def create_book(book: BookIn):
    return {"id": 1, **book.model_dump()}

@app.get("/books/{book_id}")
def get_book(book_id: int):
    return {"id": book_id, "title": "..."}</div>
<p>Pydantic models are your Form Requests: they validate incoming JSON automatically and reject anything that doesn't match the schema, before your handler even runs.</p>

<h2 id="fastapi-basics-mistake"><span class="h2-mark">10.3</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Putting business logic directly in the route handler, the way a quick Laravel controller sometimes does. Keep handlers thin &mdash; call a service function, return its result. It matters more in Python than PHP because FastAPI has no built-in service-layer convention forcing you into it.</p>
</div>

<h2 id="fastapi-basics-apply"><span class="h2-mark">10.4</span>Apply it</h2>
<p>Connect FastAPI to PostgreSQL with SQLAlchemy. Build one real model (not "books" as filler &mdash; use something from Kitobon's actual schema) with a GET and POST route, validated with Pydantic.</p>`,
  },
  {
    id: "crud-project",
    track: "b",
    mod: 11,
    name: "CRUD API Project",
    eyebrow: "Build 03 / 09 · FastAPI + RAG · October, Week 3",
    title: "CRUD API Project",
    subs: [{"id":"crud-project-why","title":"Why this exists"},{"id":"crud-project-scope","title":"Scope"},{"id":"crud-project-mistake","title":"Common mistake"},{"id":"crud-project-apply","title":"Apply it"}],
    body: `<h2 id="crud-project-why"><span class="h2-mark">11.1</span>Why this exists</h2>
<p>The first shippable artifact. Not a tutorial-along exercise &mdash; a small but complete API, pushed to GitHub with a real README, that proves you can build in this stack unsupervised.</p>

<h2 id="crud-project-scope"><span class="h2-mark">11.2</span>Scope</h2>
<ul>
<li>Full CRUD (Create, Read, Update, Delete) on one real resource</li>
<li>Request validation via Pydantic, proper HTTP status codes (see System Design &rarr; API Design in the Pattern Manual for the exact rules)</li>
<li>Environment config via <code>.env</code>, never hardcoded credentials</li>
<li>A README with setup steps someone else could actually follow</li>
</ul>

<h2 id="crud-project-mistake"><span class="h2-mark">11.3</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Shipping a project with no error handling &mdash; a request for a nonexistent ID returns a raw 500 stack trace instead of a clean 404. Interviewers who click around your live demo notice this in the first minute.</p>
</div>

<h2 id="crud-project-apply"><span class="h2-mark">11.4</span>Apply it</h2>
<p>Push to GitHub. Add the live link (even a free-tier deploy) to your CV and khayrullo.uz. This is portfolio piece #1 of 2 &mdash; done means done, not "still polishing."</p>`,
  },
  {
    id: "llm-apis",
    track: "b",
    mod: 12,
    name: "Calling LLM APIs",
    eyebrow: "Build 04 / 09 · FastAPI + RAG · October, Week 4",
    title: "Calling LLM APIs",
    subs: [{"id":"llm-apis-why","title":"Why this exists"},{"id":"llm-apis-core","title":"Structured output"},{"id":"llm-apis-streaming","title":"Streaming"},{"id":"llm-apis-mistake","title":"Common mistake"}],
    body: `<h2 id="llm-apis-why"><span class="h2-mark">12.1</span>Why this exists</h2>
<p>This is the module that turns "backend developer" into "backend developer who ships AI features" &mdash; the exact positioning your January target depends on. An LLM API call is just an HTTP request with a prompt in the body; the skill is in prompt structure, not magic.</p>

<h2 id="llm-apis-core"><span class="h2-mark">12.2</span>Structured output</h2>
<p>Never parse free-text from a model when you can ask for JSON directly. Define the shape you want, and validate what comes back the same way you validate any external API response.</p>
<div class="code-block">from anthropic import Anthropic
client = Anthropic()

response = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=500,
    messages=[{
        "role": "user",
        "content": "Summarize this book in JSON: {title, summary, tags[]}\\n\\n" + book_text
    }]
)
<span class="cm"># parse response.content, validate against a Pydantic model before trusting it</span></div>

<h2 id="llm-apis-streaming"><span class="h2-mark">12.3</span>Streaming</h2>
<div class="callout info">
<div class="callout-title">Mechanism</div>
<p>Instead of waiting for the full response then sending it, stream tokens to the client as they're generated &mdash; same idea as chunked HTTP responses. FastAPI supports this with <code>StreamingResponse</code>. Matters for UX: a 10-second wait feels broken, a stream starting in 200ms feels instant even if total time is the same.</p>
</div>

<h2 id="llm-apis-mistake"><span class="h2-mark">12.4</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Trusting model output as if it were your own validated data. Always validate structured output against a schema before using it &mdash; a model can return malformed JSON, and code that assumes it never will breaks in production on the first edge case.</p>
</div>`,
  },
  {
    id: "embeddings",
    track: "b",
    mod: 13,
    name: "Embeddings & Vector Search",
    eyebrow: "Build 05 / 09 · FastAPI + RAG · November, Week 1",
    title: "Embeddings & Vector Search",
    subs: [{"id":"embeddings-why","title":"Why this exists"},{"id":"embeddings-mechanism","title":"Mechanism"},{"id":"embeddings-build","title":"Build it"},{"id":"embeddings-mistake","title":"Common mistake"}],
    body: `<h2 id="embeddings-why"><span class="h2-mark">13.1</span>Why this exists</h2>
<p>An embedding turns text into a vector of numbers such that similar meanings end up as nearby points in that vector space. This is what lets you ask "find documents similar to this one" as a math operation (distance between vectors) instead of a keyword match.</p>

<h2 id="embeddings-mechanism"><span class="h2-mark">13.2</span>Mechanism</h2>
<div class="callout info">
<div class="callout-title">Cosine similarity</div>
<p>Two vectors pointing the same direction are "similar" regardless of magnitude &mdash; measured by the cosine of the angle between them, from -1 (opposite) to 1 (identical direction). This is the core operation every vector database runs, at scale, over millions of stored embeddings.</p>
</div>

<h2 id="embeddings-build"><span class="h2-mark">13.3</span>Build it</h2>
<p>Since you already know PostgreSQL from your PHP work, <strong>pgvector</strong> is the natural choice &mdash; a Postgres extension that adds a vector column type and similarity search, no new database to learn.</p>
<div class="code-block"><span class="cm">-- pgvector: add a vector column, then query by similarity</span>
CREATE EXTENSION IF NOT EXISTS vector;
ALTER TABLE books ADD COLUMN embedding vector(1536);

SELECT title FROM books
ORDER BY embedding <=> '[0.1, 0.2, ...]'::vector
LIMIT 5;</div>

<h2 id="embeddings-mistake"><span class="h2-mark">13.4</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Re-embedding text that hasn't changed, on every request. Embeddings are deterministic for a given model version &mdash; compute once when the source text is created or updated, store the vector, and only recompute on edit.</p>
</div>`,
  },
  {
    id: "rag-pipeline",
    track: "b",
    mod: 14,
    name: "RAG Pipeline",
    eyebrow: "Build 06 / 09 · FastAPI + RAG · November, Weeks 2–3",
    title: "RAG Pipeline",
    subs: [{"id":"rag-pipeline-why","title":"Why this exists"},{"id":"rag-pipeline-mechanism","title":"The pipeline"},{"id":"rag-pipeline-build","title":"Build it"},{"id":"rag-pipeline-mistake","title":"Common mistake"}],
    body: `<h2 id="rag-pipeline-why"><span class="h2-mark">14.1</span>Why this exists</h2>
<p>Retrieval-Augmented Generation is the pattern behind almost every real production LLM feature: instead of hoping the model already knows something, you fetch the relevant real documents and hand them to the model as context before it answers.</p>

<h2 id="rag-pipeline-mechanism"><span class="h2-mark">14.2</span>The pipeline</h2>
<div class="callout info">
<div class="callout-title">Mechanism</div>
<p><strong>Chunk</strong> the source documents into passages small enough to embed meaningfully (a whole book is too big; one paragraph is often right). <strong>Embed</strong> each chunk and store it with pgvector. On a query, <strong>embed the question</strong>, find the nearest chunks, and <strong>assemble a prompt</strong> that includes those chunks as context before asking the model to answer.</p>
</div>

<h2 id="rag-pipeline-build"><span class="h2-mark">14.3</span>Build it</h2>
<div class="code-block">def answer_question(question, top_k=5):
    q_embedding = embed(question)
    chunks = db.query(
        "SELECT text FROM chunks ORDER BY embedding <=> %s LIMIT %s",
        [q_embedding, top_k]
    )
    context = "\\n\\n".join(c.text for c in chunks)
    prompt = f"Answer using only this context:\\n{context}\\n\\nQuestion: {question}"
    return call_llm(prompt)</div>

<h2 id="rag-pipeline-mistake"><span class="h2-mark">14.4</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Chunking on a fixed character count with no overlap. A sentence gets sliced in half across two chunks, and neither chunk alone makes sense to the retriever. Chunk on paragraph or sentence boundaries, and overlap chunks slightly so context isn't lost at the seams.</p>
</div>`,
  },
  {
    id: "rag-project",
    track: "b",
    mod: 15,
    name: "RAG Project — Kitobon AI Feature",
    eyebrow: "Build 07 / 09 · FastAPI + RAG · November, Week 4",
    title: "RAG Project — Kitobon AI Feature",
    subs: [{"id":"rag-project-why","title":"Why this exists"},{"id":"rag-project-scope","title":"Scope"},{"id":"rag-project-eval","title":"Evaluate it before calling it done"},{"id":"rag-project-mistake","title":"Common mistake"}],
    body: `<h2 id="rag-project-why"><span class="h2-mark">15.1</span>Why this exists</h2>
<p>Portfolio piece #2, and the one that matters most: a RAG feature shipped into a real, already-running product instead of a toy demo. "I added AI-powered book summaries to a live app with real users" is a materially stronger interview line than "I followed a RAG tutorial."</p>

<h2 id="rag-project-scope"><span class="h2-mark">15.2</span>Scope</h2>
<ul>
<li>Pick one feature: book summaries, "find books similar to this one," or a Q&amp;A over a book's content</li>
<li>Real Kitobon data as the source &mdash; not a toy dataset</li>
<li>Served through a FastAPI endpoint, called from the actual app</li>
</ul>

<h2 id="rag-project-eval"><span class="h2-mark">15.3</span>Evaluate it before calling it done</h2>
<div class="callout tip">
<div class="callout-title">Method</div>
<p>Write 20 real questions a user might ask. Run them through your pipeline. For each, mark pass or fail and note why a fail happened (bad chunk retrieved, model ignored context, question was ambiguous). Fix the pattern behind the failures, not just the individual case.</p>
</div>

<h2 id="rag-project-mistake"><span class="h2-mark">15.4</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Calling it done after it works on the 3 examples you tried while building it. Those 3 examples are the ones you unconsciously designed the pipeline around. The 20-question eval set is what catches what you missed.</p>
</div>`,
  },
  {
    id: "deployment",
    track: "b",
    mod: 16,
    name: "Docker & Deployment",
    eyebrow: "Build 08 / 09 · FastAPI + RAG · December, Week 1",
    title: "Docker & Deployment",
    subs: [{"id":"deployment-why","title":"Why this exists"},{"id":"deployment-core","title":"Minimum viable Dockerfile"},{"id":"deployment-mistake","title":"Common mistake"},{"id":"deployment-apply","title":"Apply it"}],
    body: `<h2 id="deployment-why"><span class="h2-mark">16.1</span>Why this exists</h2>
<p>A project that only runs on your laptop isn't a portfolio piece &mdash; it's a claim nobody can verify. Docker makes "runs on my machine" into "runs anywhere," and a live URL is what an interviewer actually clicks.</p>

<h2 id="deployment-core"><span class="h2-mark">16.2</span>Minimum viable Dockerfile</h2>
<div class="code-block">FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]</div>

<h2 id="deployment-mistake"><span class="h2-mark">16.3</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Committing API keys into the repo "just to get it deployed, I'll fix it later." Rotate any key that ever touched a public commit, even briefly &mdash; assume it's already compromised the moment it's pushed, not when someone notices.</p>
</div>

<h2 id="deployment-apply"><span class="h2-mark">16.4</span>Apply it</h2>
<p>Deploy the CRUD project and the Kitobon RAG feature so both have live URLs. Any free tier is fine (Render, Railway, Fly.io) &mdash; the point is a link that works when clicked cold, not the hosting bill.</p>`,
  },
  {
    id: "interview-prep",
    track: "b",
    mod: 17,
    name: "Portfolio & Interview Prep",
    eyebrow: "Build 09 / 09 · FastAPI + RAG · December, Weeks 2–4",
    title: "Portfolio & Interview Prep",
    subs: [{"id":"interview-prep-why","title":"Why this exists"},{"id":"interview-prep-checklist","title":"Readiness checklist"},{"id":"interview-prep-mistake","title":"Common mistake"}],
    body: `<h2 id="interview-prep-why"><span class="h2-mark">17.1</span>Why this exists</h2>
<p>Two strong projects mean nothing if you can't explain them under pressure. This module is about being able to walk through your own RAG pipeline's design decisions out loud, as fluently as you'd walk through a Laravel controller today.</p>

<h2 id="interview-prep-checklist"><span class="h2-mark">17.2</span>Readiness checklist</h2>
<ul>
<li>CV updated: Laravel/PHP experience first, then the Python + FastAPI + LLM/RAG projects with live links</li>
<li>khayrullo.uz has both projects, described in outcomes ("what it does for a user"), not just tech stack</li>
<li>Can explain, without notes: why pgvector over a dedicated vector DB, why you chunked the way you did, what the eval set caught</li>
<li>Can explain the classic-ML basics from Track A: gradient descent in one sentence, what overfitting is and how you'd detect it</li>
</ul>

<h2 id="interview-prep-mistake"><span class="h2-mark">17.3</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Preparing only for questions about the finished project, not the decisions that didn't work. "What did you try that failed, and why did you change approach" is one of the most common follow-ups &mdash; have a real answer ready, from your actual eval failures.</p>
</div>`,
  },
];
