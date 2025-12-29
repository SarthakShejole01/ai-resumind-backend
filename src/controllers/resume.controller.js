import { extractTextFromFile } from "../services/parser.service.js";
import { mockResumeScore } from "../services/score.service.js";

export const scoreResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No resume file provided" });
    }

    const extractedText = await extractTextFromFile(
      req.file.path,
      req.file.mimetype
    );

    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(422).json({
        error: "Could not extract text from resume"
      });
    }

    const scoreResult = mockResumeScore(extractedText);

    res.status(200).json({
      message: "Resume scored successfully",
      ...scoreResult
    });
  } catch (error) {
    res.status(500).json({
      error: "Resume scoring failed",
      details: error.message
    });
  }
};
