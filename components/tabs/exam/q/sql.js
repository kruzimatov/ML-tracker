// Every SQL question runs against these two tables. DATA is what the learner sees; SETUP is what the checker loads.
const DATA = `emp
id | name    | dept  | salary | manager_id
1  | Ali     | Eng   | 5000   | NULL
2  | Bek     | Eng   | 4000   | 1
3  | Dilnoza | Sales | 3000   | 1
4  | Eldor   | Sales | 3500   | 3
5  | Farida  | HR    | NULL   | 1

dept
name  | city
Eng   | Tashkent
Sales | Samarkand
Ops   | Bukhara`;

const SETUP = `CREATE TABLE emp (id INTEGER PRIMARY KEY, name TEXT, dept TEXT, salary INTEGER, manager_id INTEGER);
INSERT INTO emp VALUES (1,'Ali','Eng',5000,NULL),(2,'Bek','Eng',4000,1),(3,'Dilnoza','Sales',3000,1),(4,'Eldor','Sales',3500,3),(5,'Farida','HR',NULL,1);
CREATE TABLE dept (name TEXT PRIMARY KEY, city TEXT);
INSERT INTO dept VALUES ('Eng','Tashkent'),('Sales','Samarkand'),('Ops','Bukhara');`;

const sql = (id, level, code, options, why) => ({ id, level, kind: "output", lang: "sql", data: DATA, setup: SETUP, q: "What does this query return? (columns separated by |)", code, options, answer: 0, why });

export const QUESTIONS = [
  sql("sql-e1", 1, "SELECT name FROM emp WHERE dept = 'Sales' ORDER BY name;", ["Dilnoza\nEldor", "Eldor\nDilnoza", "Dilnoza", "Sales"],
    "WHERE keeps matching rows, ORDER BY sorts them (ascending by default)."),
  { id: "sql-e2", level: 1, kind: "mcq", q: "What is true about a primary key column?",
    options: ["Every value is unique and not NULL, so it identifies one row", "It must be the first column", "It must be text", "It can repeat if rows are similar"], answer: 0,
    why: "Foreign keys in other tables (like manager_id) point at primary keys to link rows." },
  sql("sql-e3", 1, "SELECT COUNT(*) FROM emp;", ["5", "4", "2", "NULL"],
    "COUNT(*) counts rows, including rows with NULLs in them."),
  { id: "sql-e4", level: 1, kind: "mcq", q: "What does `AS yearly` do in `SELECT salary * 12 AS yearly FROM emp`?",
    options: ["Names the computed column yearly in the result", "Creates a new column in the table", "Filters to yearly salaries", "Renames the table"], answer: 0,
    why: "An alias only labels the output. The table itself is not changed." },
  sql("sql-m1", 2, "SELECT dept, COUNT(*) FROM emp GROUP BY dept ORDER BY dept;", ["Eng | 2\nHR | 1\nSales | 2", "Eng | 2\nSales | 2", "5", "Eng | 2\nHR | 0\nSales | 2"],
    "GROUP BY makes one result row per distinct dept; COUNT(*) counts rows in each group."),
  sql("sql-m2", 2, "SELECT COUNT(*), COUNT(salary) FROM emp;", ["5 | 4", "5 | 5", "4 | 4", "5 | NULL"],
    "COUNT(column) skips NULLs. Farida's salary is NULL, so 4."),
  sql("sql-m3", 2, "SELECT AVG(salary) FROM emp;", ["3875.0", "3100.0", "15500", "NULL"],
    "Aggregates ignore NULLs: 15500 / 4 = 3875, not 15500 / 5 = 3100. Decide on purpose whether NULL should count as 0."),
  sql("sql-m4", 2, "SELECT dept FROM emp GROUP BY dept HAVING SUM(salary) > 6000 ORDER BY dept;", ["Eng\nSales", "Eng", "Eng\nHR\nSales", "Sales"],
    "HAVING filters groups after aggregation: Eng 9000, Sales 6500, HR NULL (not > 6000). WHERE cannot use SUM."),
  sql("sql-m5", 2, "SELECT name FROM emp\nWHERE salary > (SELECT AVG(salary) FROM emp)\nORDER BY name;", ["Ali\nBek", "Ali", "Ali\nBek\nEldor", "Ali\nBek\nFarida"],
    "The subquery returns one value, 3875. Only 5000 and 4000 are above it. NULL > 3875 is not true, so Farida is out."),
  sql("sql-h1", 3, "SELECT d.name, COUNT(e.id)\nFROM dept d LEFT JOIN emp e ON e.dept = d.name\nGROUP BY d.name ORDER BY d.name;", ["Eng | 2\nOps | 0\nSales | 2", "Eng | 2\nSales | 2", "Eng | 2\nHR | 1\nOps | 0\nSales | 2", "Eng | 2\nOps | 1\nSales | 2"],
    "LEFT JOIN keeps every dept, even Ops with no employees. COUNT(e.id) gives 0 there; COUNT(*) would wrongly give 1. HR is not in dept, so it never appears."),
  sql("sql-h2", 3, "SELECT COUNT(*) FROM emp WHERE salary = NULL;", ["0", "1", "5", "NULL"],
    "Any comparison with NULL is unknown, never true. Use `WHERE salary IS NULL` to find Farida."),
  sql("sql-h3", 3, "SELECT name, RANK() OVER (ORDER BY salary DESC)\nFROM emp WHERE salary IS NOT NULL\nORDER BY salary DESC LIMIT 2;", ["Ali | 1\nBek | 2", "Ali | 5000\nBek | 4000", "Ali | 1", "Bek | 1\nAli | 2"],
    "A window function computes per row without collapsing rows like GROUP BY does. RANK leaves gaps on ties; ROW_NUMBER never ties."),
  sql("sql-h4", 3, "SELECT e.name, m.name\nFROM emp e JOIN emp m ON e.manager_id = m.id\nWHERE e.dept = 'Sales' ORDER BY e.name;", ["Dilnoza | Ali\nEldor | Dilnoza", "Dilnoza | 1\nEldor | 3", "Ali | Dilnoza\nDilnoza | Eldor", "Dilnoza | Ali"],
    "A self-join: the same table twice under two aliases, matching each employee's manager_id to the manager's id."),
  sql("sql-h5", 3, "SELECT name, CASE WHEN salary >= 4000 THEN 'high'\n                 WHEN salary IS NULL THEN 'unknown'\n                 ELSE 'low' END\nFROM emp WHERE dept != 'Eng' ORDER BY id;", ["Dilnoza | low\nEldor | low\nFarida | unknown", "Dilnoza | low\nEldor | low\nFarida | low", "Dilnoza | low\nEldor | high\nFarida | unknown", "Dilnoza | low\nEldor | low"],
    "CASE checks branches in order. NULL >= 4000 is not true, so Farida falls through to the IS NULL branch, not to ELSE."),
  { id: "sql-h6", level: 3, kind: "mcq", q: "A query `SELECT * FROM orders WHERE customer_id = 42` is slow on 10 million rows. What usually helps most?",
    options: ["An index on customer_id, so the database can look up matching rows instead of scanning all of them", "Adding ORDER BY", "Using SELECT DISTINCT", "Splitting the table into one table per customer"], answer: 0,
    why: "An index is like a book index: O(log n) lookup instead of a full scan. The cost: extra storage and slower writes. Use EXPLAIN to confirm." },
];

export const INTERVIEW = [
  { id: "iv-sql-1", q: "What is the difference between WHERE and HAVING?",
    a: ["WHERE filters rows before grouping; it cannot use aggregates.", "HAVING filters groups after GROUP BY, using aggregates like SUM or COUNT.", "Logical order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT."] },
  { id: "iv-sql-2", q: "Explain INNER JOIN versus LEFT JOIN with an example.",
    a: ["INNER keeps only rows that match on both sides.", "LEFT keeps every row of the left table; unmatched right columns are NULL, e.g. departments with no employees.", "Classic trap: a WHERE condition on the right table after a LEFT JOIN turns it back into an inner join; put it in the ON clause."] },
  { id: "iv-sql-3", q: "How would you find duplicate emails in a users table?",
    a: ["`SELECT email, COUNT(*) FROM users GROUP BY email HAVING COUNT(*) > 1;`", "To see the full rows, join back or use `COUNT(*) OVER (PARTITION BY email)`.", "Normalize first (lower-case, trim) or near-duplicates slip through."] },
  { id: "iv-sql-4", q: "A query is slow. How do you investigate?",
    a: ["Run EXPLAIN (ANALYZE) to see whether it scans the full table and where time goes.", "Add indexes on columns in WHERE, JOIN and ORDER BY; select only the needed columns.", "Check for N+1 query patterns in the app and for functions on indexed columns that prevent index use."] },
];
