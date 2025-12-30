import express from "express";
import { upload } from "../utils/file-upload.js";
import { scoreResume } from "../controllers/resume.controller.js";


const router = express.Router();

router.post(
  "/upload",
  upload.single("resume"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    res.status(200).json({
      message: "Resume uploaded successfully",
      fileName: req.file.filename,
      originalName: req.file.originalname,
      fileType: req.file.mimetype
    });
  }
);

router.post(
  "/score",
  upload.single("resume"),
  scoreResume
);

export default router;
