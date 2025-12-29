export const mockResumeScore = (resumeText) => {
  const textLength = resumeText.length;

  // Simple heuristics (fake AI logic)
  let score = 50;

  if (textLength > 1500) score += 10;
  if (resumeText.toLowerCase().includes("react")) score += 5;
  if (resumeText.toLowerCase().includes("node")) score += 5;
  if (resumeText.toLowerCase().includes("aws")) score += 5;
  if (resumeText.match(/\d+%|\d+\s?(years|yrs)/i)) score += 10;

  score = Math.min(score, 95);

  return {
    score,
    summary:
      score > 80
        ? "Strong resume with good industry alignment."
        : score > 60
        ? "Decent resume but needs improvements."
        : "Resume needs significant improvement to meet industry standards.",

    strengths: [
      "Relevant technical experience",
      "Clear skills section",
      "Good use of industry keywords"
    ],

    weaknesses: [
      "Lack of quantified achievements",
      "Formatting can be improved",
      "Missing project impact details"
    ],

    suggestions: [
      "Add measurable achievements (numbers, percentages)",
      "Group skills by category",
      "Highlight key projects with outcomes"
    ]
  };
};
