// Extra material per chapter: worked example (html), "go deeper" links, and system-design follow-up questions (html).
const NEET = { label: "NeetCode roadmap", url: "https://neetcode.io/roadmap" };
const VISUALGO = { label: "VisuAlgo animations", url: "https://visualgo.net/en" };
const PYDOC = (label, path) => ({ label, url: `https://docs.python.org/3/library/${path}` });
const SDP = { label: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" };
const BBG = "Your ByteByteGo archive PDF (Desktop) has a diagram for this topic.";

const fu = (items) =>
  `<ol>${items.map(([q, a]) => `<li><strong>${q}</strong><br />${a}</li>`).join("")}</ol>`;

export const EXTRAS = {
  "arrays-hashing": {
    example: `<p><strong>Two Sum</strong>, <code>nums = [2, 7, 11, 15]</code>, <code>target = 9</code>. Store value → index as you go.</p>
<div class="code-block">i=0  x=2   need 9-2=7   seen={}          miss  → seen={2:0}
i=1  x=7   need 9-7=2   seen={2:0}       HIT   → return [0, 1]</div>
<p>One pass, O(n). The brute force checks every pair, O(n²).</p>`,
    links: [NEET, PYDOC("collections.Counter", "collections.html#collections.Counter")],
  },
  "two-pointers": {
    example: `<p><code>arr = [1, 3, 4, 6, 9]</code>, <code>target = 7</code>. Start at both ends.</p>
<div class="code-block">L=0 R=4   1+9=10 &gt; 7   → too big, move R left
L=0 R=3   1+6=7  == 7   → return [0, 3]</div>
<p>Each step discards one end for good, so at most n steps.</p>`,
    links: [NEET, VISUALGO],
  },
  "sliding-window": {
    example: `<p>Longest substring without repeats, <code>s = "abcabcbb"</code>.</p>
<div class="code-block">right=0 'a'  window={a}      best=1
right=1 'b'  window={a,b}    best=2
right=2 'c'  window={a,b,c}  best=3
right=3 'a'  in window → drop 'a' (left=1), window={b,c,a}  best=3
right=4 'b'  in window → drop 'b' (left=2), window={c,a,b}  best=3
...answer 3 ("abc")</div>`,
    links: [NEET, PYDOC("collections.deque", "collections.html#collections.deque")],
  },
  stack: {
    example: `<p>Next greater element for <code>arr = [2, 1, 5, 3]</code>. Stack holds indices.</p>
<div class="code-block">i=0 x=2  stack=[]      push 0            stack=[0]
i=1 x=1  arr[0]=2 &lt; 1? no  push 1     stack=[0,1]
i=2 x=5  arr[1]=1 &lt; 5 → result[1]=5, arr[0]=2 &lt; 5 → result[0]=5, push 2
i=3 x=3  arr[2]=5 &lt; 3? no  push 3     stack=[2,3]
result = [5, 5, -1, -1]</div>`,
    links: [NEET, VISUALGO],
  },
  "binary-search": {
    example: `<p><code>arr = [1, 3, 5, 7, 9, 11]</code>, <code>target = 9</code>.</p>
<div class="code-block">lo=0 hi=5  mid=2  arr[2]=5  &lt; 9 → lo=3
lo=3 hi=5  mid=4  arr[4]=9 == 9 → return 4</div>
<p>6 items took 2 looks. A million items need about 20.</p>`,
    links: [NEET, PYDOC("bisect module", "bisect.html")],
  },
  "linked-list": {
    example: `<p>Reverse <code>1 → 2 → 3</code>.</p>
<div class="code-block">head=1  nxt=2  1.next=None  prev=1  head=2
head=2  nxt=3  2.next=1     prev=2  head=3
head=3  nxt=None 3.next=2   prev=3  head=None
return prev → 3 → 2 → 1</div>
<p>Always save <code>nxt</code> first, otherwise you lose the rest of the list.</p>`,
    links: [NEET, VISUALGO],
  },
  trees: {
    example: `<p>Max depth of this tree: <code>1</code> has children <code>2</code> and <code>3</code>; <code>2</code> has child <code>4</code>.</p>
<div class="code-block">depth(4) = 1 + max(0, 0) = 1
depth(2) = 1 + max(depth(4)=1, 0) = 2
depth(3) = 1
depth(1) = 1 + max(2, 1) = 3</div>
<p>Children first, parent last: the answer builds bottom-up.</p>`,
    links: [NEET, VISUALGO],
  },
  heap: {
    example: `<p>2nd largest of <code>[3, 2, 1, 5, 6, 4]</code>, <code>k = 2</code>. Keep a min-heap of size 2.</p>
<div class="code-block">start      heap=[2,3]
x=1  1 &gt; 2? no
x=5  5 &gt; 2 → replace → heap=[3,5]
x=6  6 &gt; 3 → replace → heap=[5,6]
x=4  4 &gt; 5? no
heap[0] = 5   ← 2nd largest</div>`,
    links: [NEET, PYDOC("heapq module", "heapq.html")],
  },
  backtracking: {
    example: `<p>All subsets of <code>[1, 2]</code>: choose, explore, un-choose.</p>
<div class="code-block">path=[]        record []
 choose 1 → [1]  record [1]
  choose 2 → [1,2]  record [1,2]
  un-choose 2 → [1]
 un-choose 1 → []
 choose 2 → [2]  record [2]
 un-choose 2 → []
result = [[], [1], [1,2], [2]]</div>`,
    links: [NEET, PYDOC("itertools (permutations, combinations)", "itertools.html")],
  },
  tries: {
    example: `<p>Insert <code>car</code> and <code>cat</code>. They share the path <code>c → a</code>.</p>
<div class="code-block">root → c → a → r (word)
              └→ t (word)
search("ca")      → path exists, is_word False → False
starts_with("ca") → path exists               → True</div>`,
    links: [NEET, VISUALGO],
  },
  graphs: {
    example: `<p>Graph: <code>A:[B,C]  B:[D]  C:[D]  D:[]</code>. BFS from A.</p>
<div class="code-block">queue=[A]   visited={A}
pop A → add B, C        queue=[B,C]
pop B → add D           queue=[C,D]
pop C → D already seen  queue=[D]
pop D                   queue=[]
order: A, B, C, D</div>`,
    links: [NEET, VISUALGO],
  },
  "dp-1d": {
    example: `<p>Climbing stairs, n = 5. Each answer is the sum of the two before it.</p>
<div class="code-block">dp[1]=1  dp[2]=2
dp[3]=dp[2]+dp[1]=3
dp[4]=dp[3]+dp[2]=5
dp[5]=dp[4]+dp[3]=8</div>`,
    links: [NEET],
  },
  "dp-2d": {
    example: `<p>LCS of <code>"abc"</code> and <code>"ac"</code>. Row = prefix of the first string, column = prefix of the second.</p>
<div class="code-block">       ""  a  c
  ""    0  0  0
  a     0  1  1
  b     0  1  1
  c     0  1  2     ← answer 2 ("ac")</div>
<p>Match → diagonal + 1. No match → max(up, left).</p>`,
    links: [NEET],
  },
  greedy: {
    example: `<p>Jump game. Track the farthest index you can reach.</p>
<div class="code-block">[2,3,1,1,4]: far=2 → i=1 far=4 ≥ last index → True
[3,2,1,0,4]: far=3,3,3,3 → i=4 &gt; far=3 → False</div>`,
    links: [NEET],
  },
  intervals: {
    example: `<p>Merge <code>[[1,3],[2,6],[8,10]]</code> (already sorted by start).</p>
<div class="code-block">result=[[1,3]]
[2,6]: 2 &lt;= 3 overlap → [1,6]
[8,10]: 8 &gt; 6 no overlap → append
result=[[1,6],[8,10]]</div>`,
    links: [NEET],
  },
  "bit-math": {
    example: `<p>Single number in <code>[4, 1, 2, 1, 2]</code> with XOR.</p>
<div class="code-block">0 ^ 4 = 4
4 ^ 1 = 5
5 ^ 2 = 7
7 ^ 1 = 6
6 ^ 2 = 4   ← pairs cancel, 4 remains</div>`,
    links: [NEET, { label: "Python bitwise operators", url: "https://wiki.python.org/moin/BitwiseOperators" }],
  },

  "scaling-fundamentals": {
    links: [SDP],
    note: BBG,
    followups: fu([
      ["Your service keeps user sessions in memory. What breaks when you add a second server?", "A user's next request can hit a server that has no session. Fix: shared store (Redis) or signed tokens, so any instance can serve any request."],
      ["When is vertical scaling the right call?", "Early on, or for a single stateful database. It is simpler and needs no code change, until you hit the hardware ceiling."],
    ]),
  },
  "load-balancing": {
    links: [SDP, { label: "nginx load balancing docs", url: "https://nginx.org/en/docs/http/load_balancing.html" }],
    note: BBG,
    followups: fu([
      ["Round robin or least connections for long-running uploads?", "Least connections: durations vary a lot, so equal request counts do not mean equal load."],
      ["The load balancer itself is a single point of failure. What now?", "Run two behind a floating IP or DNS failover, or use a managed LB."],
    ]),
  },
  caching: {
    example: `<p><strong>Why a 95% hit rate matters.</strong> Cache read 1 ms, database read 20 ms.</p>
<div class="code-block">avg = 1 ms + miss_rate × 20 ms
hit 95%:  1 + 0.05 × 20 = 2.0 ms
hit 80%:  1 + 0.20 × 20 = 5.0 ms
no cache: 20 ms</div>
<p>Going from 95% to 80% makes the average 2.5× slower. Hit rate is the number to watch.</p>`,
    links: [{ label: "Redis docs", url: "https://redis.io/docs/latest/" }, { label: "MDN: HTTP caching", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching" }],
    note: BBG,
    followups: fu([
      ["How do you stop a cache stampede when a hot key expires?", "Lock so only one request rebuilds it, serve stale while refreshing, or add jitter to TTLs."],
      ["Cache-aside or write-through for a product page?", "Cache-aside: reads dominate, a brief stale window is fine. Write-through if staleness is unacceptable."],
    ]),
  },
  databases: {
    links: [{ label: "PostgreSQL: indexes", url: "https://www.postgresql.org/docs/current/indexes.html" }, SDP],
    note: BBG,
    followups: fu([
      ["A query got slow as the table grew. First three things you check?", "EXPLAIN the query, check there is an index on the WHERE/JOIN columns, look for N+1 patterns in the app."],
      ["Read replicas: what is the catch?", "Replication lag. A read right after a write can return old data, so route those reads to the primary."],
      ["When do you shard?", "Last. After indexing, caching and replicas, when one machine can no longer hold the writes or data."],
    ]),
  },
  "cap-theorem": {
    links: [SDP],
    note: BBG,
    followups: fu([
      ["A shopping cart or a bank balance. Which side of CAP?", "Cart: availability, stale reads are tolerable. Balance: consistency, refuse rather than show a wrong number."],
      ["What does PACELC add?", "Even with no partition there is a latency vs consistency trade-off."],
    ]),
  },
  "message-queues": {
    links: [{ label: "RabbitMQ tutorials", url: "https://www.rabbitmq.com/tutorials" }, SDP],
    note: BBG,
    followups: fu([
      ["A worker crashes halfway through a job. What happens?", "The visibility timeout expires and the job reappears for another worker. So handlers must be idempotent."],
      ["How do you handle a poison message that always fails?", "Retry with backoff a few times, then move it to a dead-letter queue and alert."],
    ]),
  },
  "api-design": {
    example: `<p><strong>Token bucket in action.</strong> Capacity 3, refill 1 token per second.</p>
<div class="code-block">t=0.0  tokens=3  req1 OK (2)  req2 OK (1)  req3 OK (0)
t=0.0  req4 → rejected (429)
t=1.0  tokens refilled to 1  → req5 OK (0)
t=1.1  req6 → rejected</div>
<p>Bursts up to the capacity are allowed, the long-run rate is capped at the refill rate.</p>`,
    links: [{ label: "MDN: HTTP status codes", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status" }, SDP],
    note: BBG,
    followups: fu([
      ["PUT or PATCH to change one field?", "PATCH. PUT replaces the whole resource and is idempotent."],
      ["What status code for a rate-limited request, and what header helps the client?", "429 Too Many Requests with a Retry-After header."],
    ]),
  },
  cdn: {
    links: [{ label: "Cloudflare: what is a CDN", url: "https://www.cloudflare.com/learning/cdn/what-is-a-cdn/" }, SDP],
    note: BBG,
    followups: fu([
      ["You deployed a new logo but users still see the old one. Why, and how do you fix it?", "The CDN edge cached it. Purge the cache, or version file names (logo.v2.png / content hash) so the URL changes."],
      ["Can you put an authenticated API behind a CDN?", "Only content that is the same for everyone. Never cache per-user responses with a shared key."],
    ]),
  },
  "url-shortener": {
    example: `<p><strong>Back-of-envelope.</strong> 100M new URLs per month, reads 100× writes, keep 5 years.</p>
<div class="code-block">writes/s  ≈ 100M / (30 × 86,400)  ≈ 40
reads/s   ≈ 40 × 100              ≈ 4,000
URLs      ≈ 100M × 12 × 5         = 6 billion
storage   ≈ 6B × 500 bytes        ≈ 3 TB
code len  : 62^7 ≈ 3.5 trillion → 7 chars is plenty</div>
<p>4,000 reads/s is easy for a cache plus one database. The design is about the shape of the traffic, not raw volume.</p>`,
    links: [SDP],
    note: BBG,
    followups: fu([
      ["301 or 302 redirect?", "302 if you want every click to hit you (analytics); 301 is cached by browsers, which hides clicks but saves load."],
      ["Two people shorten the same long URL. Same code or different?", "Your call. Same code saves storage but makes per-user analytics harder."],
    ]),
  },
  "rate-limiter-design": {
    links: [SDP],
    note: BBG,
    followups: fu([
      ["Why can't each server keep its own counter?", "With N servers a client gets N× the limit. Use a shared store (Redis) with an atomic increment."],
      ["Redis is down. Fail open or fail closed?", "Usually fail open for public APIs so you do not take yourself down; fail closed for security-critical limits like login attempts."],
    ]),
  },
};
