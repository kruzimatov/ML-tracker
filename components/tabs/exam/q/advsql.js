const DATA = `sales
day        | region | amount
2026-01-01 | North  | 100
2026-01-02 | North  | 150
2026-01-03 | North  | 120
2026-01-01 | South  | 200
2026-01-02 | South  | 180
2026-01-03 | South  | 250`;

const SETUP = `CREATE TABLE sales (day TEXT, region TEXT, amount INTEGER);
INSERT INTO sales VALUES ('2026-01-01','North',100),('2026-01-02','North',150),('2026-01-03','North',120),
('2026-01-01','South',200),('2026-01-02','South',180),('2026-01-03','South',250);`;

const sql = (id, level, code, options, why) => ({ id, level, kind: "output", lang: "sql", data: DATA, setup: SETUP, q: "What does this query return? (columns separated by |)", code, options, answer: 0, why });

export const QUESTIONS = [
  { id: "asql-e1", level: 1, kind: "mcq", q: "What is the key difference between GROUP BY and a window function like `SUM(...) OVER (...)`?",
    options: ["GROUP BY collapses rows into one per group; a window function keeps every row and adds a computed value", "They are the same", "Window functions only work on dates", "GROUP BY is slower in every case"], answer: 0,
    why: "Windows let you show each row next to its group total, rank, running sum or previous value." },
  sql("asql-e2", 1, "SELECT day, amount, ROW_NUMBER() OVER (ORDER BY amount DESC)\nFROM sales WHERE region = 'North' ORDER BY day;",
    ["2026-01-01 | 100 | 3\n2026-01-02 | 150 | 1\n2026-01-03 | 120 | 2", "2026-01-01 | 100 | 1\n2026-01-02 | 150 | 2\n2026-01-03 | 120 | 3", "2026-01-02 | 150 | 1\n2026-01-03 | 120 | 2\n2026-01-01 | 100 | 3", "2026-01-01 | 100 | 1\n2026-01-02 | 150 | 3\n2026-01-03 | 120 | 2"],
    "The window's ORDER BY decides the numbering (highest amount = 1); the final ORDER BY only decides display order."),
  { id: "asql-e3", level: 1, kind: "mcq", q: "What does `PARTITION BY region` do inside OVER (...)?",
    options: ["Restarts the window calculation separately for each region", "Deletes other regions", "Sorts by region", "Creates a new table per region"], answer: 0,
    why: "Like GROUP BY for windows, but without collapsing rows." },
  sql("asql-e4", 1, "SELECT region, MAX(amount) FROM sales GROUP BY region ORDER BY region;",
    ["North | 150\nSouth | 250", "North | 120\nSouth | 250", "South | 250", "North | 370\nSouth | 630"],
    "One row per region with its largest amount. The last option shows SUM, not MAX."),
  sql("asql-m1", 2, "SELECT day, SUM(amount) OVER (ORDER BY day)\nFROM sales WHERE region = 'North' ORDER BY day;",
    ["2026-01-01 | 100\n2026-01-02 | 250\n2026-01-03 | 370", "2026-01-01 | 370\n2026-01-02 | 370\n2026-01-03 | 370", "2026-01-01 | 100\n2026-01-02 | 150\n2026-01-03 | 120", "2026-01-03 | 370"],
    "An aggregate window with ORDER BY becomes a running total. Without ORDER BY each row would get the full total, 370."),
  sql("asql-m2", 2, "SELECT day, amount - LAG(amount) OVER (ORDER BY day)\nFROM sales WHERE region = 'South' ORDER BY day;",
    ["2026-01-01 | NULL\n2026-01-02 | -20\n2026-01-03 | 70", "2026-01-01 | 0\n2026-01-02 | -20\n2026-01-03 | 70", "2026-01-01 | 200\n2026-01-02 | -20\n2026-01-03 | 70", "2026-01-02 | 20\n2026-01-03 | -70"],
    "LAG reads the previous row's value; the first row has none, so the difference is NULL. `LAG(amount, 1, 0)` sets a default."),
  sql("asql-m3", 2, "WITH r AS (\n  SELECT region, day, amount,\n         RANK() OVER (PARTITION BY region ORDER BY amount DESC) AS rk\n  FROM sales\n)\nSELECT region, day FROM r WHERE rk = 1 ORDER BY region;",
    ["North | 2026-01-02\nSouth | 2026-01-03", "North | 2026-01-01\nSouth | 2026-01-01", "South | 2026-01-03", "North | 2026-01-03\nSouth | 2026-01-02"],
    "Classic top-N per group: rank inside each partition in a CTE, then filter the rank outside."),
  { id: "asql-m4", level: 2, kind: "mcq", q: "Why does `SELECT ... WHERE RANK() OVER (ORDER BY amount DESC) = 1` fail?",
    options: ["Window functions are computed after WHERE, so filter on them in an outer query or CTE", "RANK needs PARTITION BY", "WHERE cannot compare numbers", "SQLite does not support RANK"], answer: 0,
    why: "Logical order: FROM → WHERE → GROUP BY → HAVING → window functions → SELECT → ORDER BY." },
  sql("asql-h1", 3, "WITH t(x) AS (VALUES (10), (20), (20), (30))\nSELECT x, RANK() OVER (ORDER BY x DESC), DENSE_RANK() OVER (ORDER BY x DESC)\nFROM t ORDER BY x DESC;",
    ["30 | 1 | 1\n20 | 2 | 2\n20 | 2 | 2\n10 | 4 | 3", "30 | 1 | 1\n20 | 2 | 2\n20 | 3 | 3\n10 | 4 | 4", "30 | 1 | 1\n20 | 2 | 2\n20 | 2 | 2\n10 | 3 | 3", "30 | 1 | 1\n20 | 2 | 2\n20 | 2 | 2\n10 | 3 | 4"],
    "Both give ties the same rank. RANK then skips (2, 2, 4); DENSE_RANK does not (2, 2, 3). ROW_NUMBER would break the tie arbitrarily."),
  sql("asql-h2", 3, "SELECT day, AVG(amount) OVER (ORDER BY day ROWS BETWEEN 1 PRECEDING AND CURRENT ROW)\nFROM sales WHERE region = 'North' ORDER BY day;",
    ["2026-01-01 | 100.0\n2026-01-02 | 125.0\n2026-01-03 | 135.0", "2026-01-01 | 100.0\n2026-01-02 | 125.0\n2026-01-03 | 123.333333333333", "2026-01-01 | 123.333333333333\n2026-01-02 | 123.333333333333\n2026-01-03 | 123.333333333333", "2026-01-01 | NULL\n2026-01-02 | 125.0\n2026-01-03 | 135.0"],
    "A two-row moving average. The first row only has itself in its frame, so it averages one value, not NULL."),
  sql("asql-h3", 3, "SELECT region,\n       ROUND(100.0 * SUM(amount) / SUM(SUM(amount)) OVER (), 1)\nFROM sales GROUP BY region ORDER BY region;",
    ["North | 37.0\nSouth | 63.0", "North | 370\nSouth | 630", "North | 100.0\nSouth | 100.0", "North | 0\nSouth | 0"],
    "The window runs after GROUP BY, so SUM(SUM(amount)) OVER () is the grand total 1000. Using 100.0 avoids integer division (which would give 0)."),
  sql("asql-h4", 3, "WITH a(x) AS (VALUES (1), (2)),\n     b(y) AS (VALUES (1), (NULL))\nSELECT COUNT(*) FROM a WHERE x NOT IN (SELECT y FROM b);",
    ["0", "1", "2", "NULL"],
    "x = 2: is 2 ≠ 1 AND 2 ≠ NULL? The NULL comparison is unknown, so NOT IN is never true. Use NOT EXISTS, which handles NULLs as expected."),
  { id: "asql-h5", level: 3, kind: "mcq", q: "Which filter lets the database use an index on created_at?",
    options: ["`WHERE created_at >= '2026-01-01' AND created_at < '2027-01-01'`", "`WHERE strftime('%Y', created_at) = '2026'`", "`WHERE created_at LIKE '%2026%'`", "`WHERE CAST(created_at AS TEXT) = '2026'`"], answer: 0,
    why: "Wrapping the column in a function or a leading wildcard forces a scan of every row. A plain range on the raw column is index-friendly (sargable)." },
];

export const INTERVIEW = [
  { id: "iv-asql-1", q: "When would you use a window function instead of GROUP BY?",
    a: ["When you need per-row detail alongside group-level numbers: share of total, rank within group, running totals.", "Comparisons with neighbouring rows: LAG/LEAD for day-over-day change.", "Top-N per group: ROW_NUMBER or RANK with PARTITION BY, filtered in a CTE."] },
  { id: "iv-asql-2", q: "How do you get the top 3 products by revenue in each category?",
    a: ["CTE: `ROW_NUMBER() OVER (PARTITION BY category ORDER BY revenue DESC) AS rn`.", "Outer query: `WHERE rn <= 3`.", "Choose RANK or DENSE_RANK instead if ties should all be included."] },
  { id: "iv-asql-3", q: "Explain choices you make for query efficiency.",
    a: ["Index columns used in WHERE, JOIN and ORDER BY; keep filters sargable (no functions on indexed columns).", "Select only needed columns, filter early, prefer EXISTS over IN for big subqueries.", "Measure with EXPLAIN / EXPLAIN ANALYZE before and after; do not guess."] },
];
