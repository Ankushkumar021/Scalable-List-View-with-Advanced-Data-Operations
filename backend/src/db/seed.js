import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { fileURLToPath } from "url";
import { db } from "./connection.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CSV_PATH = path.join(__dirname, "../../jobs.csv");

const parseSalary = (salaryRange) => {
  if (!salaryRange) return [null, null];
  const nums = salaryRange.match(/\d+/g);
  if (!nums || nums.length < 2) return [null, null];
  return [Number(nums[0]) * 1000, Number(nums[1]) * 1000];
};

console.log("Seeding database from:", CSV_PATH);

let processed = 0;

await db.exec("BEGIN TRANSACTION");

fs.createReadStream(CSV_PATH)
  .pipe(csv())
  .on("data", (row) => {
    const [minSalary, maxSalary] = parseSalary(row["Salary Range"]);

    db.run(
      `
      INSERT OR IGNORE INTO jobs (
        id,
        job_title,
        company,
        location,
        country,
        job_type,
        min_salary,
        max_salary,
        experience,
        job_posting_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        row["Job Id"],
        row["Job Title"],
        row["Company"],
        row["location"],
        row["Country"],
        row["Work Type"],
        minSalary,
        maxSalary,
        row["Experience"],
        row["Job Posting Date"],
      ]
    );

    processed++;
  })
  .on("end", async () => {
    await db.exec("COMMIT");

    const count = await db.get("SELECT COUNT(*) AS total FROM jobs");

    console.log("CSV rows processed:", processed);
    console.log("Rows inserted into DB:", count.total);

    process.exit(0);
  })
  .on("error", async (err) => {
    await db.exec("ROLLBACK");
    console.error("Seeding failed:", err.message);
    process.exit(1);
  });
