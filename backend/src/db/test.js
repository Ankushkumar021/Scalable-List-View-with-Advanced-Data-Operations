import { db } from "./connection.js";

const rows = await db.all(
  "SELECT job_title, company, min_salary, max_salary FROM jobs LIMIT 5"
);

console.log(rows);
process.exit(0);
