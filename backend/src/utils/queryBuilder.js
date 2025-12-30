export const buildQuery = ({
  page = 1,
  limit = 10,
  search,
  job_type,
  country,
  min_salary,
  max_salary,
  sort,
}) => {
  const conditions = [];
  const params = [];

  if (search) {
    conditions.push("(job_title LIKE ? OR company LIKE ?)");
    params.push(`%${search}%`, `%${search}%`);
  }

  if (job_type) {
    conditions.push("job_type = ?");
    params.push(job_type);
  }

  if (country) {
    conditions.push("country = ?");
    params.push(country);
  }

  if (min_salary) {
    conditions.push("min_salary >= ?");
    params.push(min_salary);
  }

  if (max_salary) {
    conditions.push("max_salary <= ?");
    params.push(max_salary);
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

  let orderBy = "";
  if (sort) {
    const [field, direction] = sort.split(":");
    orderBy = `ORDER BY ${field} ${direction?.toUpperCase() === "DESC" ? "DESC" : "ASC"}`;
  }

  const offset = (page - 1) * limit;

  return {
    dataQuery: `
      SELECT * FROM jobs
      ${whereClause}
      ${orderBy}
      LIMIT ? OFFSET ?
    `,
    countQuery: `
      SELECT COUNT(*) as total FROM jobs
      ${whereClause}
    `,
    params: [...params, Number(limit), Number(offset)],
    countParams: params,
    page: Number(page),
    limit: Number(limit),
  };
};
