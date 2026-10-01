// Content extracted from the original Mission Control artifact. Body fields are trusted static HTML.
export const CHAPTERS = [
  {
    id: "arrays-hashing",
    track: "dsa",
    num: "P01",
    eyebrow: "Pattern 01 / 16",
    title: "Arrays & Hashing",
    subs: [{"id":"arrays-hashing-recognize","title":"Recognize it"},{"id":"arrays-hashing-template","title":"Template"},{"id":"arrays-hashing-mistake","title":"Common mistake"},{"id":"arrays-hashing-problems","title":"Problems"}],
    body: `<p>The base layer everything else sits on. A hash map turns "have I seen this before" from an O(n) scan into an O(1) lookup. Most array problems that look like brute force O(n&sup2;) collapse to O(n) the moment you trade a nested loop for a map.</p>

<h2 id="arrays-hashing-recognize"><span class="h2-mark">01.1</span>Recognize it</h2>
<div class="callout tip">
<div class="callout-title">Signal</div>
<p>Words like "duplicate," "frequency," "have you seen," "pair that sums to," "group by," "anagram." Any time you'd otherwise write a nested loop to check membership, a hash map replaces the inner loop.</p>
</div>

<h2 id="arrays-hashing-template"><span class="h2-mark">01.2</span>Template</h2>
<div class="code-block"><span class="cm"># seen-before check, O(n)</span>
def contains_pattern(arr, target):
    seen = set()
    for x in arr:
        if target - x in seen:
            return True
        seen.add(x)
    return False

<span class="cm"># frequency count</span>
from collections import Counter
freq = Counter(arr)</div>

<h2 id="arrays-hashing-mistake"><span class="h2-mark">01.3</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Reaching for a nested loop out of habit before checking whether a map kills the inner loop entirely. If you catch yourself writing <code>for i in range(n): for j in range(n):</code> on an array problem, stop and ask what a set or map buys you.</p>
</div>

<h2 id="arrays-hashing-problems"><span class="h2-mark">01.4</span>Problems</h2>
<ul>
<li><a href="https://leetcode.com/problems/two-sum/" target="_blank">1. Two Sum</a><span class="tag">easy</span></li>
<li><a href="https://leetcode.com/problems/valid-anagram/" target="_blank">242. Valid Anagram</a><span class="tag">easy</span></li>
<li><a href="https://leetcode.com/problems/group-anagrams/" target="_blank">49. Group Anagrams</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/top-k-frequent-elements/" target="_blank">347. Top K Frequent Elements</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/product-of-array-except-self/" target="_blank">238. Product of Array Except Self</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/longest-consecutive-sequence/" target="_blank">128. Longest Consecutive Sequence</a><span class="tag">medium</span></li>
</ul>`,
  },
  {
    id: "two-pointers",
    track: "dsa",
    num: "P02",
    eyebrow: "Pattern 02 / 16",
    title: "Two Pointers",
    subs: [{"id":"two-pointers-recognize","title":"Recognize it"},{"id":"two-pointers-template","title":"Template"},{"id":"two-pointers-mistake","title":"Common mistake"},{"id":"two-pointers-problems","title":"Problems"}],
    body: `<p>Two indices moving toward or alongside each other instead of a nested loop. Works whenever the array is sorted, or whenever you're comparing an item from each end.</p>

<h2 id="two-pointers-recognize"><span class="h2-mark">02.1</span>Recognize it</h2>
<div class="callout tip">
<div class="callout-title">Signal</div>
<p>Sorted array, "pair that sums to," "palindrome check," "container with most water," "remove duplicates in place." If the array is sorted and you need a pair or a comparison from both ends, this is it.</p>
</div>

<h2 id="two-pointers-template"><span class="h2-mark">02.2</span>Template</h2>
<div class="code-block">def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        s = arr[left] + arr[right]
        if s == target:
            return [left, right]
        elif s < target:
            left += 1
        else:
            right -= 1
    return []</div>

<h2 id="two-pointers-mistake"><span class="h2-mark">02.3</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Using two pointers on an unsorted array without sorting first &mdash; the whole technique depends on knowing which side to move. If sorting changes the answer (e.g. you need original indices), sort a copy of index pairs, not the raw values.</p>
</div>

<h2 id="two-pointers-problems"><span class="h2-mark">02.4</span>Problems</h2>
<ul>
<li><a href="https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/" target="_blank">167. Two Sum II</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/valid-palindrome/" target="_blank">125. Valid Palindrome</a><span class="tag">easy</span></li>
<li><a href="https://leetcode.com/problems/3sum/" target="_blank">15. 3Sum</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/container-with-most-water/" target="_blank">11. Container With Most Water</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/trapping-rain-water/" target="_blank">42. Trapping Rain Water</a><span class="tag">hard</span></li>
</ul>`,
  },
  {
    id: "sliding-window",
    track: "dsa",
    num: "P03",
    eyebrow: "Pattern 03 / 16",
    title: "Sliding Window",
    subs: [{"id":"sliding-window-recognize","title":"Recognize it"},{"id":"sliding-window-template","title":"Template"},{"id":"sliding-window-mistake","title":"Common mistake"},{"id":"sliding-window-problems","title":"Problems"}],
    body: `<p>Keep a running window over the array and update it incrementally &mdash; drop what leaves, add what enters &mdash; instead of recomputing the whole window every step.</p>

<h2 id="sliding-window-recognize"><span class="h2-mark">03.1</span>Recognize it</h2>
<div class="callout tip">
<div class="callout-title">Signal</div>
<p>"Longest/shortest substring with," "maximum sum subarray of size k," "contiguous subarray." Anything about a contiguous run where the window size is fixed or grows/shrinks based on a condition.</p>
</div>

<h2 id="sliding-window-template"><span class="h2-mark">03.2</span>Template</h2>
<div class="code-block"><span class="cm"># variable-size window</span>
def longest_valid_window(s):
    left = 0
    best = 0
    window = set()
    for right in range(len(s)):
        while s[right] in window:
            window.remove(s[left])
            left += 1
        window.add(s[right])
        best = max(best, right - left + 1)
    return best</div>

<h2 id="sliding-window-mistake"><span class="h2-mark">03.3</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Shrinking the window with a fresh inner loop instead of a <code>while</code> that only moves <code>left</code> forward. Done right, both pointers move forward at most n times total &mdash; O(n), not O(n&sup2;).</p>
</div>

<h2 id="sliding-window-problems"><span class="h2-mark">03.4</span>Problems</h2>
<ul>
<li><a href="https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" target="_blank">121. Best Time to Buy and Sell Stock</a><span class="tag">easy</span></li>
<li><a href="https://leetcode.com/problems/longest-substring-without-repeating-characters/" target="_blank">3. Longest Substring Without Repeating Characters</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/longest-repeating-character-replacement/" target="_blank">424. Longest Repeating Character Replacement</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/permutation-in-string/" target="_blank">567. Permutation in String</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/minimum-window-substring/" target="_blank">76. Minimum Window Substring</a><span class="tag">hard</span></li>
</ul>`,
  },
  {
    id: "stack",
    track: "dsa",
    num: "P04",
    eyebrow: "Pattern 04 / 16",
    title: "Stack",
    subs: [{"id":"stack-recognize","title":"Recognize it"},{"id":"stack-template","title":"Template"},{"id":"stack-mistake","title":"Common mistake"},{"id":"stack-problems","title":"Problems"}],
    body: `<p>Last-in-first-out order for matching, undoing, or comparing an element against the most recent unresolved one. The monotonic stack variant keeps elements in sorted order to answer "next greater/smaller" in O(n) total.</p>

<h2 id="stack-recognize"><span class="h2-mark">04.1</span>Recognize it</h2>
<div class="callout tip">
<div class="callout-title">Signal</div>
<p>Matching brackets/parens, "next greater element," undo operations, evaluating expressions, histogram/skyline problems.</p>
</div>

<h2 id="stack-template"><span class="h2-mark">04.2</span>Template</h2>
<div class="code-block"><span class="cm"># monotonic stack &mdash; next greater element</span>
def next_greater(arr):
    result = [-1] * len(arr)
    stack = []  <span class="cm"># indices, values decreasing</span>
    for i, x in enumerate(arr):
        while stack and arr[stack[-1]] < x:
            result[stack.pop()] = x
        stack.append(i)
    return result</div>

<h2 id="stack-mistake"><span class="h2-mark">04.3</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Forgetting the stack holds <strong>indices</strong>, not values, when you need the distance or position of the match &mdash; not just the value itself.</p>
</div>

<h2 id="stack-problems"><span class="h2-mark">04.4</span>Problems</h2>
<ul>
<li><a href="https://leetcode.com/problems/valid-parentheses/" target="_blank">20. Valid Parentheses</a><span class="tag">easy</span></li>
<li><a href="https://leetcode.com/problems/min-stack/" target="_blank">155. Min Stack</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/daily-temperatures/" target="_blank">739. Daily Temperatures</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/evaluate-reverse-polish-notation/" target="_blank">150. Evaluate Reverse Polish Notation</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/largest-rectangle-in-histogram/" target="_blank">84. Largest Rectangle in Histogram</a><span class="tag">hard</span></li>
</ul>`,
  },
  {
    id: "binary-search",
    track: "dsa",
    num: "P05",
    eyebrow: "Pattern 05 / 16",
    title: "Binary Search",
    subs: [{"id":"binary-search-recognize","title":"Recognize it"},{"id":"binary-search-template","title":"Template"},{"id":"binary-search-mistake","title":"Common mistake"},{"id":"binary-search-problems","title":"Problems"}],
    body: `<p>Halve the search space each step. Needs a sorted array, or a sorted <em>condition</em> &mdash; a monotonic boolean function (false...false, true...true) even when the array itself is not sorted.</p>

<h2 id="binary-search-recognize"><span class="h2-mark">05.1</span>Recognize it</h2>
<div class="callout tip">
<div class="callout-title">Signal</div>
<p>Sorted array + O(log n) required. Also: "minimize the maximum," "find the smallest value such that," rotated sorted array. If you can write a yes/no check that flips exactly once as you scan, you can binary search on the answer.</p>
</div>

<h2 id="binary-search-template"><span class="h2-mark">05.2</span>Template</h2>
<div class="code-block">def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1</div>

<h2 id="binary-search-mistake"><span class="h2-mark">05.3</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p><code>mid = (lo + hi) // 2</code> overflows in other languages but not Python &mdash; the real Python bug is an infinite loop from forgetting to move <code>lo</code>/<code>hi</code> past <code>mid</code> on every branch.</p>
</div>

<h2 id="binary-search-problems"><span class="h2-mark">05.4</span>Problems</h2>
<ul>
<li><a href="https://leetcode.com/problems/binary-search/" target="_blank">704. Binary Search</a><span class="tag">easy</span></li>
<li><a href="https://leetcode.com/problems/search-in-rotated-sorted-array/" target="_blank">33. Search in Rotated Sorted Array</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" target="_blank">153. Find Minimum in Rotated Sorted Array</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/koko-eating-bananas/" target="_blank">875. Koko Eating Bananas</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/median-of-two-sorted-arrays/" target="_blank">4. Median of Two Sorted Arrays</a><span class="tag">hard</span></li>
</ul>`,
  },
  {
    id: "linked-list",
    track: "dsa",
    num: "P06",
    eyebrow: "Pattern 06 / 16",
    title: "Linked List",
    subs: [{"id":"linked-list-recognize","title":"Recognize it"},{"id":"linked-list-template","title":"Template"},{"id":"linked-list-mistake","title":"Common mistake"},{"id":"linked-list-problems","title":"Problems"}],
    body: `<p>Pointer manipulation with no random access. Most problems come down to careful reassignment of <code>.next</code> and tracking a "dummy" head so you never special-case an empty list.</p>

<h2 id="linked-list-recognize"><span class="h2-mark">06.1</span>Recognize it</h2>
<div class="callout tip">
<div class="callout-title">Signal</div>
<p>"Reverse a linked list," "merge two sorted lists," "detect a cycle," "find the middle node." The fast/slow pointer trick belongs here too &mdash; see pattern 06 companion, cycle detection.</p>
</div>

<h2 id="linked-list-template"><span class="h2-mark">06.2</span>Template</h2>
<div class="code-block"><span class="cm"># reverse a linked list, iterative</span>
def reverse_list(head):
    prev = None
    while head:
        nxt = head.next
        head.next = prev
        prev = head
        head = nxt
    return prev

<span class="cm"># fast/slow cycle detection</span>
def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False</div>

<h2 id="linked-list-mistake"><span class="h2-mark">06.3</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Losing the reference to the rest of the list by overwriting <code>.next</code> before saving it. Always save <code>nxt = head.next</code> before you touch <code>head.next</code>.</p>
</div>

<h2 id="linked-list-problems"><span class="h2-mark">06.4</span>Problems</h2>
<ul>
<li><a href="https://leetcode.com/problems/reverse-linked-list/" target="_blank">206. Reverse Linked List</a><span class="tag">easy</span></li>
<li><a href="https://leetcode.com/problems/merge-two-sorted-lists/" target="_blank">21. Merge Two Sorted Lists</a><span class="tag">easy</span></li>
<li><a href="https://leetcode.com/problems/linked-list-cycle/" target="_blank">141. Linked List Cycle</a><span class="tag">easy</span></li>
<li><a href="https://leetcode.com/problems/reorder-list/" target="_blank">143. Reorder List</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/merge-k-sorted-lists/" target="_blank">23. Merge k Sorted Lists</a><span class="tag">hard</span></li>
</ul>`,
  },
  {
    id: "trees",
    track: "dsa",
    num: "P07",
    eyebrow: "Pattern 07 / 16",
    title: "Trees",
    subs: [{"id":"trees-recognize","title":"Recognize it"},{"id":"trees-template","title":"Template"},{"id":"trees-mistake","title":"Common mistake"},{"id":"trees-problems","title":"Problems"}],
    body: `<p>Recursion is the native language of trees: solve the problem for a node assuming it's already solved for its children. Depth-first (pre/in/post-order) uses recursion or a stack; breadth-first uses a queue, level by level.</p>

<h2 id="trees-recognize"><span class="h2-mark">07.1</span>Recognize it</h2>
<div class="callout tip">
<div class="callout-title">Signal</div>
<p>"Depth of a tree," "is this a valid BST," "level order traversal," "lowest common ancestor," "serialize/deserialize." If the input has <code>.left</code> / <code>.right</code>, think recursion first.</p>
</div>

<h2 id="trees-template"><span class="h2-mark">07.2</span>Template</h2>
<div class="code-block"><span class="cm"># max depth, bottom-up recursion</span>
def max_depth(root):
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))

<span class="cm"># level order (BFS)</span>
from collections import deque
def level_order(root):
    if not root: return []
    result, queue = [], deque([root])
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result</div>

<h2 id="trees-mistake"><span class="h2-mark">07.3</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Validating a BST by only checking each node against its immediate children instead of against the running min/max bound inherited from every ancestor above it.</p>
</div>

<h2 id="trees-problems"><span class="h2-mark">07.4</span>Problems</h2>
<ul>
<li><a href="https://leetcode.com/problems/maximum-depth-of-binary-tree/" target="_blank">104. Maximum Depth of Binary Tree</a><span class="tag">easy</span></li>
<li><a href="https://leetcode.com/problems/invert-binary-tree/" target="_blank">226. Invert Binary Tree</a><span class="tag">easy</span></li>
<li><a href="https://leetcode.com/problems/validate-binary-search-tree/" target="_blank">98. Validate Binary Search Tree</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/binary-tree-level-order-traversal/" target="_blank">102. Binary Tree Level Order Traversal</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" target="_blank">235. Lowest Common Ancestor of a BST</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/binary-tree-maximum-path-sum/" target="_blank">124. Binary Tree Maximum Path Sum</a><span class="tag">hard</span></li>
</ul>`,
  },
  {
    id: "heap",
    track: "dsa",
    num: "P08",
    eyebrow: "Pattern 08 / 16",
    title: "Heap / Priority Queue",
    subs: [{"id":"heap-recognize","title":"Recognize it"},{"id":"heap-template","title":"Template"},{"id":"heap-mistake","title":"Common mistake"},{"id":"heap-problems","title":"Problems"}],
    body: `<p>Always know the smallest (or largest) element in O(log n) per insert/pop, without sorting the whole collection. The go-to for "top k," "kth largest," and merging sorted streams.</p>

<h2 id="heap-recognize"><span class="h2-mark">08.1</span>Recognize it</h2>
<div class="callout tip">
<div class="callout-title">Signal</div>
<p>"Kth largest/smallest," "top k frequent," "merge k sorted lists," "median of a stream," scheduling by priority.</p>
</div>

<h2 id="heap-template"><span class="h2-mark">08.2</span>Template</h2>
<div class="code-block">import heapq

<span class="cm"># kth largest &mdash; keep a min-heap of size k</span>
def kth_largest(nums, k):
    heap = nums[:k]
    heapq.heapify(heap)
    for x in nums[k:]:
        if x > heap[0]:
            heapq.heapreplace(heap, x)
    return heap[0]</div>

<h2 id="heap-mistake"><span class="h2-mark">08.3</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Python's <code>heapq</code> is min-heap only. For a max-heap, push negated values &mdash; and remember to negate back when you pop.</p>
</div>

<h2 id="heap-problems"><span class="h2-mark">08.4</span>Problems</h2>
<ul>
<li><a href="https://leetcode.com/problems/kth-largest-element-in-an-array/" target="_blank">215. Kth Largest Element in an Array</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/top-k-frequent-elements/" target="_blank">347. Top K Frequent Elements</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/k-closest-points-to-origin/" target="_blank">973. K Closest Points to Origin</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/task-scheduler/" target="_blank">621. Task Scheduler</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/find-median-from-data-stream/" target="_blank">295. Find Median from Data Stream</a><span class="tag">hard</span></li>
</ul>`,
  },
  {
    id: "backtracking",
    track: "dsa",
    num: "P09",
    eyebrow: "Pattern 09 / 16",
    title: "Backtracking",
    subs: [{"id":"backtracking-recognize","title":"Recognize it"},{"id":"backtracking-template","title":"Template"},{"id":"backtracking-mistake","title":"Common mistake"},{"id":"backtracking-problems","title":"Problems"}],
    body: `<p>Try a choice, recurse, and undo it if it doesn't lead anywhere &mdash; explore the full decision tree while pruning branches that can't work. The template is always: choose, explore, un-choose.</p>

<h2 id="backtracking-recognize"><span class="h2-mark">09.1</span>Recognize it</h2>
<div class="callout tip">
<div class="callout-title">Signal</div>
<p>"All possible subsets/permutations/combinations," "N-Queens," "word search on a grid," "generate valid parentheses." Anything asking for every valid arrangement, not just one.</p>
</div>

<h2 id="backtracking-template"><span class="h2-mark">09.2</span>Template</h2>
<div class="code-block">def backtrack(path, choices, result):
    if is_complete(path):
        result.append(path[:])   <span class="cm"># copy, not reference</span>
        return
    for choice in choices:
        if not valid(path, choice):
            continue
        path.append(choice)
        backtrack(path, remaining(choices, choice), result)
        path.pop()   <span class="cm"># undo</span></div>

<h2 id="backtracking-mistake"><span class="h2-mark">09.3</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Appending <code>path</code> itself instead of <code>path[:]</code> &mdash; every later mutation then silently corrupts results you already saved, since Python lists are stored by reference.</p>
</div>

<h2 id="backtracking-problems"><span class="h2-mark">09.4</span>Problems</h2>
<ul>
<li><a href="https://leetcode.com/problems/subsets/" target="_blank">78. Subsets</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/combination-sum/" target="_blank">39. Combination Sum</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/permutations/" target="_blank">46. Permutations</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/word-search/" target="_blank">79. Word Search</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/n-queens/" target="_blank">51. N-Queens</a><span class="tag">hard</span></li>
</ul>`,
  },
  {
    id: "tries",
    track: "dsa",
    num: "P10",
    eyebrow: "Pattern 10 / 16",
    title: "Tries",
    subs: [{"id":"tries-recognize","title":"Recognize it"},{"id":"tries-template","title":"Template"},{"id":"tries-mistake","title":"Common mistake"},{"id":"tries-problems","title":"Problems"}],
    body: `<p>A tree where each path from the root spells a prefix. Built for "does any word start with this prefix" in O(word length), independent of how many words are stored.</p>

<h2 id="tries-recognize"><span class="h2-mark">10.1</span>Recognize it</h2>
<div class="callout tip">
<div class="callout-title">Signal</div>
<p>Autocomplete, "prefix search," "word search II," spell-checkers, dictionaries where you repeatedly ask "does this prefix exist."</p>
</div>

<h2 id="tries-template"><span class="h2-mark">10.2</span>Template</h2>
<div class="code-block">class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for ch in word:
            node = node.children.setdefault(ch, TrieNode())
        node.is_word = True

    def search(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                return False
            node = node.children[ch]
        return node.is_word</div>

<h2 id="tries-mistake"><span class="h2-mark">10.3</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Confusing "word exists" with "prefix exists" &mdash; a prefix search should return true the moment the path exists, without checking <code>is_word</code>.</p>
</div>

<h2 id="tries-problems"><span class="h2-mark">10.4</span>Problems</h2>
<ul>
<li><a href="https://leetcode.com/problems/implement-trie-prefix-tree/" target="_blank">208. Implement Trie</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/design-add-and-search-words-data-structure/" target="_blank">211. Design Add and Search Words Data Structure</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/word-search-ii/" target="_blank">212. Word Search II</a><span class="tag">hard</span></li>
</ul>`,
  },
  {
    id: "graphs",
    track: "dsa",
    num: "P11",
    eyebrow: "Pattern 11 / 16",
    title: "Graphs",
    subs: [{"id":"graphs-recognize","title":"Recognize it"},{"id":"graphs-template","title":"Template"},{"id":"graphs-mistake","title":"Common mistake"},{"id":"graphs-problems","title":"Problems"}],
    body: `<p>BFS and DFS generalized past trees: nodes can have any number of neighbors, and cycles are possible, so you must track visited nodes explicitly. A 2D grid is just a graph where each cell's neighbors are its 4 (or 8) adjacent cells.</p>

<h2 id="graphs-recognize"><span class="h2-mark">11.1</span>Recognize it</h2>
<div class="callout tip">
<div class="callout-title">Signal</div>
<p>"Number of islands," "course schedule" (cycle detection), "clone a graph," shortest path in an unweighted graph (BFS), connected components.</p>
</div>

<h2 id="graphs-template"><span class="h2-mark">11.2</span>Template</h2>
<div class="code-block">from collections import deque

def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    while queue:
        node = queue.popleft()
        for nb in graph[node]:
            if nb not in visited:
                visited.add(nb)
                queue.append(nb)
    return visited

def dfs(graph, node, visited):
    visited.add(node)
    for nb in graph[node]:
        if nb not in visited:
            dfs(graph, nb, visited)</div>

<h2 id="graphs-mistake"><span class="h2-mark">11.3</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Marking a node visited when you <strong>pop</strong> it instead of when you <strong>push</strong> it &mdash; on BFS this lets the same node get queued multiple times before it's processed, wasting time and occasionally breaking correctness.</p>
</div>

<h2 id="graphs-problems"><span class="h2-mark">11.4</span>Problems</h2>
<ul>
<li><a href="https://leetcode.com/problems/number-of-islands/" target="_blank">200. Number of Islands</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/clone-graph/" target="_blank">133. Clone Graph</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/course-schedule/" target="_blank">207. Course Schedule</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/rotting-oranges/" target="_blank">994. Rotting Oranges</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/pacific-atlantic-water-flow/" target="_blank">417. Pacific Atlantic Water Flow</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/word-ladder/" target="_blank">127. Word Ladder</a><span class="tag">hard</span></li>
</ul>`,
  },
  {
    id: "dp-1d",
    track: "dsa",
    num: "P12",
    eyebrow: "Pattern 12 / 16",
    title: "1D Dynamic Programming",
    subs: [{"id":"dp-1d-recognize","title":"Recognize it"},{"id":"dp-1d-template","title":"Template"},{"id":"dp-1d-mistake","title":"Common mistake"},{"id":"dp-1d-problems","title":"Problems"}],
    body: `<p>Build the answer for n from answers you already computed for smaller n, stored in a table so you never redo the work. Every DP problem is really: find the recurrence, find the base case, decide the order to fill the table.</p>

<h2 id="dp-1d-recognize"><span class="h2-mark">12.1</span>Recognize it</h2>
<div class="callout tip">
<div class="callout-title">Signal</div>
<p>"Number of ways to," "minimum cost to reach," "can you partition into," where the answer for position i depends only on a few previous positions. If a greedy or brute-force recursive solution recomputes the same subproblem repeatedly, it's DP.</p>
</div>

<h2 id="dp-1d-template"><span class="h2-mark">12.2</span>Template</h2>
<div class="code-block"><span class="cm"># climbing stairs &mdash; dp[i] = dp[i-1] + dp[i-2]</span>
def climb_stairs(n):
    if n <= 2:
        return n
    dp = [0] * (n + 1)
    dp[1], dp[2] = 1, 2
    for i in range(3, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]</div>

<h2 id="dp-1d-mistake"><span class="h2-mark">12.3</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Jumping straight to code before writing the recurrence in plain words. If you can't finish the sentence "dp[i] equals ___ in terms of dp[smaller index]," you don't have the pattern yet &mdash; you have a guess.</p>
</div>

<h2 id="dp-1d-problems"><span class="h2-mark">12.4</span>Problems</h2>
<ul>
<li><a href="https://leetcode.com/problems/climbing-stairs/" target="_blank">70. Climbing Stairs</a><span class="tag">easy</span></li>
<li><a href="https://leetcode.com/problems/house-robber/" target="_blank">198. House Robber</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/coin-change/" target="_blank">322. Coin Change</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/longest-increasing-subsequence/" target="_blank">300. Longest Increasing Subsequence</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/word-break/" target="_blank">139. Word Break</a><span class="tag">medium</span></li>
</ul>`,
  },
  {
    id: "dp-2d",
    track: "dsa",
    num: "P13",
    eyebrow: "Pattern 13 / 16",
    title: "2D Dynamic Programming",
    subs: [{"id":"dp-2d-recognize","title":"Recognize it"},{"id":"dp-2d-template","title":"Template"},{"id":"dp-2d-mistake","title":"Common mistake"},{"id":"dp-2d-problems","title":"Problems"}],
    body: `<p>Same idea as 1D DP, but the state needs two indices &mdash; usually because you're comparing two sequences, or tracking a position on a grid.</p>

<h2 id="dp-2d-recognize"><span class="h2-mark">13.1</span>Recognize it</h2>
<div class="callout tip">
<div class="callout-title">Signal</div>
<p>"Longest common subsequence," "edit distance," "unique paths on a grid," anything comparing two strings/arrays index by index.</p>
</div>

<h2 id="dp-2d-template"><span class="h2-mark">13.2</span>Template</h2>
<div class="code-block"><span class="cm"># longest common subsequence</span>
def lcs(a, b):
    m, n = len(a), len(b)
    dp = [[0]*(n+1) for _ in range(m+1)]
    for i in range(1, m+1):
        for j in range(1, n+1):
            if a[i-1] == b[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]</div>

<h2 id="dp-2d-mistake"><span class="h2-mark">13.3</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Off-by-one on the padded row/column. Using a <code>(m+1) x (n+1)</code> table with row/col 0 as the empty-string base case avoids most index errors &mdash; don't try to dodge the padding to save a line.</p>
</div>

<h2 id="dp-2d-problems"><span class="h2-mark">13.4</span>Problems</h2>
<ul>
<li><a href="https://leetcode.com/problems/unique-paths/" target="_blank">62. Unique Paths</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/longest-common-subsequence/" target="_blank">1143. Longest Common Subsequence</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/edit-distance/" target="_blank">72. Edit Distance</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/coin-change-ii/" target="_blank">518. Coin Change II</a><span class="tag">medium</span></li>
</ul>`,
  },
  {
    id: "greedy",
    track: "dsa",
    num: "P14",
    eyebrow: "Pattern 14 / 16",
    title: "Greedy",
    subs: [{"id":"greedy-recognize","title":"Recognize it"},{"id":"greedy-template","title":"Template"},{"id":"greedy-mistake","title":"Common mistake"},{"id":"greedy-problems","title":"Problems"}],
    body: `<p>Make the locally best choice at each step and trust it leads to a globally optimal answer. Works only when the problem has that property &mdash; proving it (or trusting a known result) is the actual skill.</p>

<h2 id="greedy-recognize"><span class="h2-mark">14.1</span>Recognize it</h2>
<div class="callout tip">
<div class="callout-title">Signal</div>
<p>"Maximum profit," "minimum number of," "can you reach the end," interval scheduling. If sorting first and then scanning once seems to work on your examples, suspect greedy before reaching for DP.</p>
</div>

<h2 id="greedy-template"><span class="h2-mark">14.2</span>Template</h2>
<div class="code-block"><span class="cm"># jump game &mdash; can you reach the last index?</span>
def can_jump(nums):
    farthest = 0
    for i, n in enumerate(nums):
        if i > farthest:
            return False
        farthest = max(farthest, i + n)
    return True</div>

<h2 id="greedy-mistake"><span class="h2-mark">14.3</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Assuming greedy works without checking a counterexample. Try to break your own greedy rule with a small hand-built case before trusting it &mdash; greedy fails silently, it doesn't crash.</p>
</div>

<h2 id="greedy-problems"><span class="h2-mark">14.4</span>Problems</h2>
<ul>
<li><a href="https://leetcode.com/problems/maximum-subarray/" target="_blank">53. Maximum Subarray</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/jump-game/" target="_blank">55. Jump Game</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/gas-station/" target="_blank">134. Gas Station</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/task-scheduler/" target="_blank">621. Task Scheduler</a><span class="tag">medium</span></li>
</ul>`,
  },
  {
    id: "intervals",
    track: "dsa",
    num: "P15",
    eyebrow: "Pattern 15 / 16",
    title: "Intervals",
    subs: [{"id":"intervals-recognize","title":"Recognize it"},{"id":"intervals-template","title":"Template"},{"id":"intervals-mistake","title":"Common mistake"},{"id":"intervals-problems","title":"Problems"}],
    body: `<p>Sort by start (or end) time, then scan once comparing each interval to the last one you kept. Nearly every interval problem is this same shape.</p>

<h2 id="intervals-recognize"><span class="h2-mark">15.1</span>Recognize it</h2>
<div class="callout tip">
<div class="callout-title">Signal</div>
<p>"Merge overlapping intervals," "meeting rooms," "insert interval," anything with (start, end) pairs.</p>
</div>

<h2 id="intervals-template"><span class="h2-mark">15.2</span>Template</h2>
<div class="code-block">def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    result = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= result[-1][1]:
            result[-1][1] = max(result[-1][1], end)
        else:
            result.append([start, end])
    return result</div>

<h2 id="intervals-mistake"><span class="h2-mark">15.3</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Forgetting to sort first. The merge scan only works left to right because sorting guarantees you never need to look backward.</p>
</div>

<h2 id="intervals-problems"><span class="h2-mark">15.4</span>Problems</h2>
<ul>
<li><a href="https://leetcode.com/problems/merge-intervals/" target="_blank">56. Merge Intervals</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/insert-interval/" target="_blank">57. Insert Interval</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/non-overlapping-intervals/" target="_blank">435. Non-overlapping Intervals</a><span class="tag">medium</span></li>
<li><a href="https://leetcode.com/problems/meeting-rooms-ii/" target="_blank">253. Meeting Rooms II</a><span class="tag">medium</span></li>
</ul>`,
  },
  {
    id: "bit-math",
    track: "dsa",
    num: "P16",
    eyebrow: "Pattern 16 / 16",
    title: "Bit Manipulation & Math",
    subs: [{"id":"bit-math-recognize","title":"Recognize it"},{"id":"bit-math-template","title":"Template"},{"id":"bit-math-mistake","title":"Common mistake"},{"id":"bit-math-problems","title":"Problems"}],
    body: `<p>A small fixed set of tricks that show up again and again: XOR cancels duplicates, <code>n &amp; (n-1)</code> drops the lowest set bit, shifting is multiplying/dividing by 2.</p>

<h2 id="bit-math-recognize"><span class="h2-mark">16.1</span>Recognize it</h2>
<div class="callout tip">
<div class="callout-title">Signal</div>
<p>"Single number" (everything else appears twice), "count set bits," "power of two," "missing number" from 0..n.</p>
</div>

<h2 id="bit-math-template"><span class="h2-mark">16.2</span>Template</h2>
<div class="code-block"><span class="cm"># XOR: a ^ a = 0, a ^ 0 = a &mdash; duplicates cancel</span>
def single_number(nums):
    result = 0
    for n in nums:
        result ^= n
    return result

<span class="cm"># drop lowest set bit</span>
def count_set_bits(n):
    count = 0
    while n:
        n &= n - 1
        count += 1
    return count</div>

<h2 id="bit-math-mistake"><span class="h2-mark">16.3</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Reaching for a hash set to solve "single number" when XOR does it in O(1) space. If a problem says every element appears twice except one, XOR is almost always faster than it looks.</p>
</div>

<h2 id="bit-math-problems"><span class="h2-mark">16.4</span>Problems</h2>
<ul>
<li><a href="https://leetcode.com/problems/single-number/" target="_blank">136. Single Number</a><span class="tag">easy</span></li>
<li><a href="https://leetcode.com/problems/number-of-1-bits/" target="_blank">191. Number of 1 Bits</a><span class="tag">easy</span></li>
<li><a href="https://leetcode.com/problems/counting-bits/" target="_blank">338. Counting Bits</a><span class="tag">easy</span></li>
<li><a href="https://leetcode.com/problems/missing-number/" target="_blank">268. Missing Number</a><span class="tag">easy</span></li>
</ul>`,
  },
  {
    id: "scaling-fundamentals",
    track: "sd",
    num: "S01",
    eyebrow: "System 01 / 10",
    title: "Scaling Fundamentals",
    subs: [{"id":"scaling-fundamentals-mechanism","title":"Why statelessness matters"},{"id":"scaling-fundamentals-tradeoffs","title":"Trade-offs"},{"id":"scaling-fundamentals-mistake","title":"Common mistake"}],
    body: `<p>Vertical scaling means a bigger machine &mdash; simple, but hits a hardware ceiling and is a single point of failure. Horizontal scaling means more machines &mdash; needs the service to be <strong>stateless</strong>, so any instance can handle any request.</p>

<h2 id="scaling-fundamentals-mechanism"><span class="h2-mark">S1.1</span>Why statelessness matters</h2>
<div class="callout info">
<div class="callout-title">Mechanism</div>
<p>A stateless server keeps no per-user data in memory between requests &mdash; session data lives in a shared store (Redis, a database) instead of on one machine. That's what lets a load balancer route two requests from the same user to two different servers without breaking anything.</p>
</div>

<h2 id="scaling-fundamentals-tradeoffs"><span class="h2-mark">S1.2</span>Trade-offs</h2>
<table>
<tr><th></th><th>Vertical</th><th>Horizontal</th></tr>
<tr><td>Ceiling</td><td>Hardware limit</td><td>Near-unlimited</td></tr>
<tr><td>Complexity</td><td>Low &mdash; no code changes</td><td>Higher &mdash; needs statelessness, LB</td></tr>
<tr><td>Failure mode</td><td>Single point of failure</td><td>One instance dies, others absorb load</td></tr>
<tr><td>Cost curve</td><td>Exponential at the high end</td><td>Roughly linear</td></tr>
</table>

<h2 id="scaling-fundamentals-mistake"><span class="h2-mark">S1.3</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Storing session state (login, shopping cart) in server memory "for now" and finding out it breaks the moment you add a second instance. Design for statelessness from the first server, not the second.</p>
</div>`,
  },
  {
    id: "load-balancing",
    track: "sd",
    num: "S02",
    eyebrow: "System 02 / 10",
    title: "Load Balancing",
    subs: [{"id":"load-balancing-mechanism","title":"Algorithms"},{"id":"load-balancing-health","title":"Health checks"},{"id":"load-balancing-mistake","title":"Common mistake"}],
    body: `<p>One entry point distributes incoming requests across many servers, and stops sending traffic to any server that fails its health check.</p>

<h2 id="load-balancing-mechanism"><span class="h2-mark">S2.1</span>Algorithms</h2>
<table>
<tr><th>Algorithm</th><th>How it picks</th><th>Use when</th></tr>
<tr><td>Round robin</td><td>Cycles through servers in order</td><td>Servers are roughly equal capacity</td></tr>
<tr><td>Least connections</td><td>Sends to the server with fewest active requests</td><td>Requests vary a lot in duration</td></tr>
<tr><td>IP hash</td><td>Same client always hits the same server</td><td>You need sticky sessions without shared state</td></tr>
<tr><td>Weighted</td><td>Round robin, but bigger servers get more traffic</td><td>Mixed-capacity fleet</td></tr>
</table>

<h2 id="load-balancing-health"><span class="h2-mark">S2.2</span>Health checks</h2>
<div class="callout info">
<div class="callout-title">Mechanism</div>
<p>The load balancer pings a <code>/health</code> endpoint every few seconds. A deep health check verifies the database connection too, not just "process is running" &mdash; a process can be alive and still unable to serve a real request.</p>
</div>

<h2 id="load-balancing-mistake"><span class="h2-mark">S2.3</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>A shallow health check that only confirms the process responds to HTTP, not that its dependencies (database, cache) are reachable &mdash; traffic keeps getting routed to a server that can't actually do anything.</p>
</div>`,
  },
  {
    id: "caching",
    track: "sd",
    num: "S03",
    eyebrow: "System 03 / 10",
    title: "Caching",
    subs: [{"id":"caching-strategies","title":"Strategies"},{"id":"caching-mistake","title":"Common mistake"}],
    body: `<p>Store the result of expensive work so the next request for the same thing is a fast lookup instead of a recompute. The entire discipline is choosing what to cache, for how long, and how to keep it from going stale.</p>

<h2 id="caching-strategies"><span class="h2-mark">S3.1</span>Strategies</h2>
<table>
<tr><th>Strategy</th><th>How it works</th><th>Risk</th></tr>
<tr><td>Cache-aside</td><td>App checks cache, on miss reads DB and fills cache</td><td>Cache and DB can drift out of sync</td></tr>
<tr><td>Write-through</td><td>Every write goes to cache and DB together</td><td>Slower writes, simpler consistency</td></tr>
<tr><td>Write-behind</td><td>Write to cache, flush to DB async</td><td>Data loss window if cache crashes first</td></tr>
<tr><td>TTL eviction</td><td>Entry expires after a fixed time</td><td>Stale data window until expiry</td></tr>
</table>

<h2 id="caching-mistake"><span class="h2-mark">S3.2</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>No TTL at all, so a stale cache entry lives forever until someone notices the bug in production. Every cache entry needs an expiry, even a generous one.</p>
</div>

<div class="callout analogy">
<div class="callout-title">Mental model</div>
<p>A cache is a sticky note with an answer written on it, taped to your desk. Fast to read &mdash; but if the real answer changes and nobody updates the note, you keep giving the wrong one.</p>
</div>`,
  },
  {
    id: "databases",
    track: "sd",
    num: "S04",
    eyebrow: "System 04 / 10",
    title: "Databases",
    subs: [{"id":"databases-choice","title":"SQL vs NoSQL"},{"id":"databases-indexing","title":"Indexing"},{"id":"databases-mistake","title":"Common mistake"}],
    body: `<p>SQL enforces a fixed schema and strong relationships (foreign keys, joins, transactions). NoSQL trades that structure for flexibility and horizontal scale. Most real systems use both for different data.</p>

<h2 id="databases-choice"><span class="h2-mark">S4.1</span>SQL vs NoSQL</h2>
<table>
<tr><th></th><th>SQL (Postgres, MySQL)</th><th>NoSQL (MongoDB, DynamoDB)</th></tr>
<tr><td>Schema</td><td>Fixed, enforced</td><td>Flexible, per-document</td></tr>
<tr><td>Relationships</td><td>Joins, foreign keys</td><td>Denormalized, embedded</td></tr>
<tr><td>Transactions</td><td>Strong (ACID)</td><td>Often eventual consistency</td></tr>
<tr><td>Scales by</td><td>Vertically, or read replicas</td><td>Horizontally, by design</td></tr>
<tr><td>Good for</td><td>Financial data, anything relational</td><td>High write volume, unstructured data</td></tr>
</table>

<h2 id="databases-indexing"><span class="h2-mark">S4.2</span>Indexing</h2>
<div class="callout info">
<div class="callout-title">Mechanism</div>
<p>An index is a sorted side-structure (usually a B-tree) on one or more columns, so the database can binary-search instead of scanning every row. Every index speeds up reads on that column but slows down writes, since the index has to update too.</p>
</div>

<h2 id="databases-mistake"><span class="h2-mark">S4.3</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Indexing every column "to be safe." Each extra index makes every insert/update slower and takes disk space &mdash; index the columns actually used in <code>WHERE</code>, <code>JOIN</code>, and <code>ORDER BY</code>, not the ones that might be someday.</p>
</div>`,
  },
  {
    id: "cap-theorem",
    track: "sd",
    num: "S05",
    eyebrow: "System 05 / 10",
    title: "CAP Theorem & Consistency",
    subs: [{"id":"cap-theorem-spectrum","title":"The real spectrum"},{"id":"cap-theorem-mistake","title":"Common mistake"}],
    body: `<p>In a distributed system, when a network partition happens, you must choose: stay <strong>Consistent</strong> (every read gets the latest write, but the system may refuse requests) or stay <strong>Available</strong> (always respond, but maybe with stale data). You can't have both during a partition.</p>

<h2 id="cap-theorem-spectrum"><span class="h2-mark">S5.1</span>The real spectrum</h2>
<div class="callout info">
<div class="callout-title">Mechanism</div>
<p>Partitions are rare; most of the time the real trade-off is <strong>latency vs consistency</strong> on a healthy network &mdash; this is what PACELC extends CAP with. Strong consistency (every replica agrees before responding) costs latency. Eventual consistency (replicas catch up asynchronously) is faster but can serve stale reads for a short window.</p>
</div>

<h2 id="cap-theorem-mistake"><span class="h2-mark">S5.2</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Treating CAP as "pick two forever." It only applies <em>during a partition</em> &mdash; the actual design decision is which consistency model each specific piece of data needs, not a single global choice for the whole system.</p>
</div>`,
  },
  {
    id: "message-queues",
    track: "sd",
    num: "S06",
    eyebrow: "System 06 / 10",
    title: "Message Queues & Async Processing",
    subs: [{"id":"message-queues-mechanism","title":"Mechanism"},{"id":"message-queues-idempotency","title":"Idempotency"},{"id":"message-queues-mistake","title":"Common mistake"}],
    body: `<p>Move slow work (sending email, resizing images, calling a flaky third-party API) out of the request path. The request returns fast; a worker picks up the job from the queue whenever it's ready.</p>

<h2 id="message-queues-mechanism"><span class="h2-mark">S6.1</span>Mechanism</h2>
<div class="callout info">
<div class="callout-title">Producer / consumer</div>
<p>A producer pushes a job onto the queue and returns immediately. One or more consumer workers pull jobs off and process them. If a worker crashes mid-job, a <strong>visibility timeout</strong> makes the job reappear for another worker instead of vanishing.</p>
</div>

<h2 id="message-queues-idempotency"><span class="h2-mark">S6.2</span>Idempotency</h2>
<div class="callout tip">
<div class="callout-title">Why it matters</div>
<p>At-least-once delivery means a job can run twice. Design every job handler so running it twice is safe &mdash; e.g. "set status to paid" instead of "charge the card again."</p>
</div>

<h2 id="message-queues-mistake"><span class="h2-mark">S6.3</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Writing a job handler that assumes it only ever runs once. The first retry after a crash, a network blip, or a duplicate delivery will corrupt data if the handler isn't idempotent.</p>
</div>`,
  },
  {
    id: "api-design",
    track: "sd",
    num: "S07",
    eyebrow: "System 07 / 10",
    title: "API Design & Rate Limiting",
    subs: [{"id":"api-design-rest","title":"REST quick rules"},{"id":"api-design-ratelimit","title":"Rate limiting: token bucket"},{"id":"api-design-mistake","title":"Common mistake"}],
    body: `<p>REST conventions exist so clients and servers agree without coordinating: resources are nouns, HTTP methods are verbs, status codes describe outcomes. Rate limiting protects the server from any single client &mdash; malicious or just buggy &mdash; overwhelming it.</p>

<h2 id="api-design-rest"><span class="h2-mark">S7.1</span>REST quick rules</h2>
<table>
<tr><th>Situation</th><th>Rule</th></tr>
<tr><td>Naming a resource</td><td>Plural noun: <code>/users</code>, not <code>/getUsers</code></td></tr>
<tr><td>Full replace vs partial update</td><td><code>PUT</code> replaces the whole resource, <code>PATCH</code> updates part of it</td></tr>
<tr><td>Resource created</td><td><code>201 Created</code>, with a <code>Location</code> header</td></tr>
<tr><td>Client sent bad data</td><td><code>400 Bad Request</code>, not <code>500</code></td></tr>
<tr><td>Authenticated but not allowed</td><td><code>403 Forbidden</code>, not <code>401</code></td></tr>
</table>

<h2 id="api-design-ratelimit"><span class="h2-mark">S7.2</span>Rate limiting: token bucket</h2>
<div class="code-block"><span class="cm"># simplified token bucket</span>
class TokenBucket:
    def __init__(self, capacity, refill_rate):
        self.capacity = capacity
        self.tokens = capacity
        self.refill_rate = refill_rate  <span class="cm"># tokens per second</span>
        self.last_check = time.time()

    def allow(self):
        now = time.time()
        elapsed = now - self.last_check
        self.tokens = min(self.capacity, self.tokens + elapsed * self.refill_rate)
        self.last_check = now
        if self.tokens >= 1:
            self.tokens -= 1
            return True
        return False</div>

<h2 id="api-design-mistake"><span class="h2-mark">S7.3</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Returning <code>500</code> for a validation error. A <code>500</code> means "the server broke" &mdash; a client sending bad data is a <code>400</code>. Mixing these up hides real server bugs in the noise of expected client errors.</p>
</div>`,
  },
  {
    id: "cdn",
    track: "sd",
    num: "S08",
    eyebrow: "System 08 / 10",
    title: "CDN & Content Delivery",
    subs: [{"id":"cdn-mechanism","title":"Mechanism"},{"id":"cdn-mistake","title":"Common mistake"}],
    body: `<p>A CDN caches static content (images, JS, CSS, video) on servers physically close to the user, so a request to Tashkent doesn't round-trip to a data center in Virginia every time.</p>

<h2 id="cdn-mechanism"><span class="h2-mark">S8.1</span>Mechanism</h2>
<div class="callout info">
<div class="callout-title">Edge caching</div>
<p>The first request for a file in a region is a cache miss &mdash; the CDN fetches it from your origin server and stores it at the edge. Every request after that, from anyone nearby, is served straight from the edge, no trip to origin.</p>
</div>

<h2 id="cdn-mistake"><span class="h2-mark">S8.2</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Caching personalized or frequently-changing content at the CDN with a long TTL &mdash; users start seeing each other's data, or stale prices/inventory. CDN caching is for content that's the same for everyone.</p>
</div>`,
  },
  {
    id: "url-shortener",
    track: "sd",
    num: "S09",
    eyebrow: "System 09 / 10",
    title: "Case Study: URL Shortener",
    subs: [{"id":"url-shortener-core","title":"Core design"},{"id":"url-shortener-scale","title":"Where scale bites"},{"id":"url-shortener-mistake","title":"Common mistake"}],
    body: `<p>The classic first system design problem &mdash; small enough to finish in an interview, but it touches encoding, database choice, caching, and scale in one place.</p>

<h2 id="url-shortener-core"><span class="h2-mark">S9.1</span>Core design</h2>
<div class="callout info">
<div class="callout-title">Mechanism</div>
<p>Assign each long URL an auto-incrementing ID, then base62-encode the ID (0-9, a-z, A-Z) into a short string &mdash; 7 characters covers 62&sup7; &asymp; 3.5 trillion URLs. Store <code>short_code &rarr; long_url</code> in a key-value store; a redirect is a lookup and a 301/302 response.</p>
</div>

<h2 id="url-shortener-scale"><span class="h2-mark">S9.2</span>Where scale bites</h2>
<table>
<tr><th>Bottleneck</th><th>Fix</th></tr>
<tr><td>Single auto-increment counter across servers</td><td>Pre-allocate ID ranges per server, or use a distributed ID generator</td></tr>
<tr><td>Read volume (redirects &gt;&gt; writes)</td><td>Cache hot short codes in Redis in front of the database</td></tr>
<tr><td>Analytics on every click</td><td>Log clicks to a queue, process asynchronously &mdash; never block the redirect on it</td></tr>
</table>

<h2 id="url-shortener-mistake"><span class="h2-mark">S9.3</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Doing the analytics write (click count, timestamp, referrer) synchronously before redirecting. The redirect is the one part of this system that has to be fast &mdash; push analytics to a queue instead.</p>
</div>`,
  },
  {
    id: "rate-limiter-design",
    track: "sd",
    num: "S10",
    eyebrow: "System 10 / 10",
    title: "Case Study: Rate Limiter",
    subs: [{"id":"rate-limiter-design-core","title":"Core design"},{"id":"rate-limiter-design-algorithms","title":"Algorithm comparison"},{"id":"rate-limiter-design-mistake","title":"Common mistake"}],
    body: `<p>Design the rate limiter itself as a system, not just the algorithm from S07 &mdash; where does the counter live when you have many API servers behind a load balancer?</p>

<h2 id="rate-limiter-design-core"><span class="h2-mark">S10.1</span>Core design</h2>
<div class="callout info">
<div class="callout-title">Mechanism</div>
<p>Counters can't live in each server's local memory &mdash; two servers would each allow the full limit independently. Store the counter in a shared, fast store (Redis) keyed by user ID or API key, with an atomic increment-and-check so concurrent requests don't race past the limit.</p>
</div>

<h2 id="rate-limiter-design-algorithms"><span class="h2-mark">S10.2</span>Algorithm comparison</h2>
<table>
<tr><th>Algorithm</th><th>Burst handling</th><th>Memory</th></tr>
<tr><td>Fixed window</td><td>Allows 2x burst at window edges</td><td>Lowest</td></tr>
<tr><td>Sliding window log</td><td>Precise</td><td>Highest &mdash; stores every timestamp</td></tr>
<tr><td>Token bucket</td><td>Allows controlled bursts</td><td>Low</td></tr>
<tr><td>Sliding window counter</td><td>Good approximation</td><td>Low</td></tr>
</table>

<h2 id="rate-limiter-design-mistake"><span class="h2-mark">S10.3</span>Common mistake</h2>
<div class="callout gotcha">
<div class="callout-title">Trap</div>
<p>Fixed window counters reset at a clean boundary (e.g. every minute on the minute), which lets a client send the full limit at 0:59 and the full limit again at 1:00 &mdash; double the intended rate in two seconds. Sliding window avoids this edge.</p>
</div>`,
  },
];
