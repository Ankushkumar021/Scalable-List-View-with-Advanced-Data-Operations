import { db } from "./connection.js";

await db.exec(`
  CREATE TABLE IF NOT EXISTS jobs (
    id TEXT PRIMARY KEY,
    job_title TEXT,
    company TEXT,
    location TEXT,
    country TEXT,
    job_type TEXT,
    min_salary INTEGER,
    max_salary INTEGER,
    experience TEXT,
    job_posting_date TEXT
  )
`);

console.log("Jobs table created");
