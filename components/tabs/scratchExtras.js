// Worked numeric examples appended to the math/ML modules (trusted static HTML).
export const EXAMPLES = {
  "linear-algebra": `<p>X has 2 rows and 2 features, w has 2 weights. Each prediction is a dot product.</p>
<div class="code-block">X = [[1, 2],      w = [0.5, -1.0]
     [3, 4]]

row 0:  1×0.5 + 2×(-1.0) = 0.5 - 2.0 = -1.5
row 1:  3×0.5 + 4×(-1.0) = 1.5 - 4.0 = -2.5

y_hat = X @ w = [-1.5, -2.5]      shapes: (2,2) @ (2,) → (2,)</div>`,

  "linear-regression": `<p><strong>One full gradient descent step by hand.</strong> Data: (1,2), (2,4), (3,6). Start θ₀=0, θ₁=0, learning rate α=0.1, m=3.</p>
<div class="code-block">predictions  = 0, 0, 0
errors (ŷ-y) = -2, -4, -6

cost  J = (1/2m) Σ err² = (4+16+36)/6 = 9.333

grad θ₀ = (1/m) Σ err         = -12/3  = -4
grad θ₁ = (1/m) Σ err·x       = (-2 -8 -18)/3 = -9.333

θ₀ = 0 - 0.1×(-4)     = 0.4
θ₁ = 0 - 0.1×(-9.333) = 0.9333

new predictions: 1.333, 2.267, 3.200
new errors:     -0.667, -1.733, -2.800
new cost J = (0.444+3.004+7.840)/6 = 1.881</div>
<p>Cost fell from 9.33 to 1.88 in one step. The true line is y = 2x, so θ₁ keeps climbing toward 2 and θ₀ toward 0 over the next steps. Run your NumPy function on this data and check it prints these numbers.</p>`,

  "logistic-regression": `<p><strong>Sigmoid and log loss with real numbers.</strong></p>
<div class="code-block">σ(0)  = 1/(1+e⁰)    = 0.500
σ(2)  = 1/(1+e⁻²)   = 0.881
σ(-2) = 1/(1+e²)    = 0.119

true label y = 1:
  predict 0.88 → loss = -ln(0.88) = 0.128   (confident and right: tiny)
  predict 0.12 → loss = -ln(0.12) = 2.120   (confident and wrong: huge)</div>
<p>That asymmetry is why log loss is used: a confident wrong answer is punished far harder than a hesitant one.</p>`,

  svm: `<p><strong>Margin by hand.</strong> Weights w = (1, 1), bias b = -3.</p>
<div class="code-block">score(x) = w·x + b

point (2,2):  1×2 + 1×2 - 3 = 1    → exactly on the margin (support vector)
point (3,3):  3+3-3 = 3            → safely class +1
point (0,0):  0+0-3 = -3           → safely class -1

margin width = 2 / ||w|| = 2 / √2 = 1.414</div>
<p>Shrinking ||w|| widens the margin. That is the whole objective: smallest ||w|| that still classifies everything correctly.</p>`,

  "decision-trees": `<p><strong>Information gain for one split.</strong> 14 samples: 9 yes, 5 no. A split sends 8 left (6 yes, 2 no) and 6 right (3 yes, 3 no).</p>
<div class="code-block">H(parent) = -(9/14)log₂(9/14) - (5/14)log₂(5/14) = 0.940
H(left)   = -(6/8)log₂(6/8)  - (2/8)log₂(2/8)    = 0.811
H(right)  = -(3/6)log₂(3/6)  - (3/6)log₂(3/6)    = 1.000

weighted  = (8/14)×0.811 + (6/14)×1.000 = 0.892
gain      = 0.940 - 0.892 = 0.048</div>
<p>A small gain, so this is a weak split. The tree tries every feature and threshold and keeps the one with the largest gain.</p>`,

  ensembles: `<p><strong>Why averaging helps (bagging).</strong> Three independent models, each right 70% of the time. The majority vote is right when at least 2 of 3 are right.</p>
<div class="code-block">P(all 3 right)   = 0.7³            = 0.343
P(exactly 2 right) = 3 × 0.7² × 0.3 = 0.441
majority correct = 0.343 + 0.441   = 0.784</div>
<p>78.4% beats 70%. It only works if the models make different mistakes, which is why random forests randomize rows and features.</p>
<p><strong>Boosting, one target.</strong> True value 10, learning rate 0.5.</p>
<div class="code-block">tree 1 predicts 7        residual = 3
tree 2 predicts the residual 3 → add 0.5×3 → prediction 8.5   residual 1.5
tree 3 predicts 1.5            → add 0.5×1.5 → prediction 9.25</div>`,

  unsupervised: `<p><strong>K-means, 1D, k = 2.</strong> Points 1, 2, 10, 11. Start centroids at 1 and 10.</p>
<div class="code-block">iteration 1
  assign: {1, 2} → centroid 1     {10, 11} → centroid 10
  update: centroid A = (1+2)/2 = 1.5     centroid B = (10+11)/2 = 10.5
iteration 2
  assign: same clusters → centroids unchanged → converged</div>
<p><strong>PCA, the one number to read.</strong> If the two principal components have variances 4 and 1, the first explains 4 / (4+1) = 80% of the spread. Keeping only it drops one dimension and loses 20%.</p>`,

  "neural-net-basics": `<p><strong>One forward pass, one hidden neuron.</strong> Input x = (1, 0), target y = 1.</p>
<div class="code-block">hidden:  z1 = 1×0.5 + 0×(-0.5) + 0 = 0.5     a1 = σ(0.5)   = 0.622
output:  z2 = 2×0.622 - 1          = 0.245   a2 = σ(0.245) = 0.561

error signal at the output: dz2 = a2 - y = 0.561 - 1 = -0.439</div>
<p>Backprop pushes that -0.439 backward through the chain rule to get a gradient for every weight, then each weight steps against its gradient. Negative error means the output should go up, so the weights feeding it move to raise it.</p>`,
};
