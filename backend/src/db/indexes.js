import { db } from "./connection.js";

console.log("Creating indexes on jobs table...");

await db.exec(`
  CREATE INDEX IF NOT EXISTS idx_job_title ON jobs(job_title);
  CREATE INDEX IF NOT EXISTS idx_company ON jobs(company);
  CREATE INDEX IF NOT EXISTS idx_job_type ON jobs(job_type);
  CREATE INDEX IF NOT EXISTS idx_country ON jobs(country);
  CREATE INDEX IF NOT EXISTS idx_min_salary ON jobs(min_salary);
  CREATE INDEX IF NOT EXISTS idx_max_salary ON jobs(max_salary);
  CREATE INDEX IF NOT EXISTS idx_posting_date ON jobs(job_posting_date);
`);

console.log("All indexes created successfully");
process.exit(0);
