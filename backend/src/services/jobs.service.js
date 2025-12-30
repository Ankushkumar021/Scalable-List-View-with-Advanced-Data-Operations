import { db } from "../db/connection.js";
import { buildQuery } from "../utils/queryBuilder.js";

export const fetchJobs = async (query) => {
  const {
    dataQuery,
    countQuery,
    params,
    countParams,
    page,
    limit,
  } = buildQuery(query);

  const data = await db.all(dataQuery, params);
  const countResult = await db.get(countQuery, countParams);

  return {
    data,
    meta: {
      page,
      limit,
      total_records: countResult.total,
      total_pages: Math.ceil(countResult.total / limit),
    },
  };
};
