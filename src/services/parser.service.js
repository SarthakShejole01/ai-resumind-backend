import mammoth from "mammoth";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdf = require("pdf-parse"); // pinned version

export const extractTextFromFile = async (file) => {
  try {
    if (file.mimetype === "application/pdf") {
      const pdfData = await pdf(file.buffer);
      return pdfData.text;
    }

    if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({
        buffer: file.buffer,
      });
      return result.value;
    }

    throw new Error("Unsupported file type");
  } catch (error) {
    console.error("Text extraction failed:", error);
    throw error;
  }
};
