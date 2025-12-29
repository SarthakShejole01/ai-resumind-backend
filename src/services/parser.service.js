import fs from "fs-extra";
import mammoth from "mammoth";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdf = require("pdf-parse"); // ✅ pdf IS a function in v1.1.1

export const extractTextFromFile = async (filePath, mimeType) => {
  try {
    if (mimeType === "application/pdf") {
      const dataBuffer = await fs.readFile(filePath);
      const pdfData = await pdf(dataBuffer);
      return pdfData.text;
    }

    if (
      mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({ path: filePath });
      return result.value;
    }

    throw new Error("Unsupported file type for extraction");
  } catch (error) {
    console.error("Text extraction failed:", error);
    throw error;
  }
};
