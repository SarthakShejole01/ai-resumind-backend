export const mockJDMatch = (resumeText, jobDescription) => {
  const resumeLower = resumeText.toLowerCase();
  const jdLower = jobDescription.toLowerCase();

  const skillPool = [
    "react",
    "javascript",
    "typescript",
    "node",
    "express",
    "aws",
    "docker",
    "sql",
    "mongodb"
  ];

  const matchedSkills = [];
  const missingSkills = [];

  skillPool.forEach((skill) => {
    if (jdLower.includes(skill)) {
      if (resumeLower.includes(skill)) {
        matchedSkills.push(skill);
      } else {
        missingSkills.push(skill);
      }
    }
  });

  const matchScore = Math.min(
    90,
    40 + matchedSkills.length * 10 - missingSkills.length * 5
  );

  return {
    matchScore: Math.max(matchScore, 30),
    summary:
      matchScore > 75
        ? "Your resume aligns well with the job requirements."
        : "Your resume partially matches the job requirements.",
    matchedSkills,
    missingSkills,
    improvements: missingSkills.map(
      (skill) => `Consider adding experience with ${skill}`
    )
  };
};
