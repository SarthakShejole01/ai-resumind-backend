import { extractTextFromFile } from "../services/parser.service.js";
import { mockJDMatch } from "../services/jdMatch.service.js";

export const matchResumeWithJD = async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!req.files || !req.files.resume) {
      return res.status(400).json({ error: "Resume file is required" });
    }

    if (!jobDescription || jobDescription.trim().length < 20) {
      return res.status(400).json({
        error: "Job description is required and must be meaningful"
      });
    }

    const resumeFile = req.files.resume[0];

    const resumeText = await extractTextFromFile(resumeFile);

    const result = mockJDMatch(resumeText, jobDescription);

    res.status(200).json({
      message: "Resume matched with job description successfully",
      ...result
    });
  } catch (error) {
    console.error("JD match failed:", error);
    res.status(500).json({
      error: "Resume vs JD matching failed",
      details: error.message
    });
  }
};
