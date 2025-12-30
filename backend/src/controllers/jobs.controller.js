import { fetchJobs } from "../services/jobs.service.js";

export const getJobs = async (req, res) => {
  try {
    const result = await fetchJobs(req.query);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
