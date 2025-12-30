import express from "express";
import { upload } from "../utils/file-upload.js";
import { matchResumeWithJD } from "../controllers/jd.controller.js";

const router = express.Router();

router.post(
  "/match",
  upload.single("resume"),
  matchResumeWithJD
);

export default router;
