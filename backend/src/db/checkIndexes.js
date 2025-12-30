import { db } from "./connection.js";

const indexes = await db.all(`
  SELECT name, tbl_name, sql
  FROM sqlite_master
  WHERE type = 'index'
    AND tbl_name = 'jobs';
`);

console.log(indexes);
process.exit(0);
