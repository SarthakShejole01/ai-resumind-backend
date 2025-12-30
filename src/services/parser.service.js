import mammoth from "mammoth";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

export const extractTextFromFile = async (file) => {
  if (!file || !file.mimetype) {
    throw new Error("Invalid file object");
  }

  try {
    // ---- PDF ----
    if (file.mimetype === "application/pdf") {
      try {
        const data = await pdf(file.buffer);

        if (!data.text || data.text.trim().length < 50) {
          throw new Error("PDF contains no readable text");
        }

        return data.text;
      } catch (pdfError) {
        console.error("PDF parse failed:", pdfError.message);
        throw new Error(
          "Unable to read this PDF. It may be scanned or corrupted."
        );
      }
    }

    // ---- DOCX ----
    if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({
        buffer: file.buffer,
      });

      if (!result.value || result.value.trim().length < 50) {
        throw new Error("DOCX contains no readable text");
      }

      return result.value;
    }

    throw new Error(`Unsupported file type: ${file.mimetype}`);
  } catch (error) {
    throw error;
  }
};
