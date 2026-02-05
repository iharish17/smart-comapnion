const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// --------------------
// Utility Functions
// --------------------
function maskPII(text) {
  if (!text) return "";

  return text
    .replace(/\b\d{10}\b/g, "[PHONE]")
    .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, "[EMAIL]")
    .replace(
      /\b\d{1,3}\s?[A-Za-z]+\s?(Street|St|Road|Rd|Lane|Ln|Nagar|Colony)\b/gi,
      "[ADDRESS]"
    );
}

function extractJSON(text) {
  if (!text) return "";

  let cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace !== -1 && lastBrace !== -1) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }

  return cleaned;
}

// --------------------
// Routes
// --------------------
app.get("/", (req, res) => {
  res.send("Smart Companion Backend Running (Gemini 2.5 Flash)...");
});

// --------------------
// TASK DECOMPOSE API
// --------------------
app.post("/api/decompose", async (req, res) => {
  try {
    const { task, profile } = req.body;

    if (!task) {
      return res.status(400).json({ error: "Task is required" });
    }

    const safeTask = maskPII(task);

    const prompt = `
You are The Smart Companion, a neuro-inclusive AI assistant for neurodivergent users (ADHD, Autism, Dyslexia).

Your job is to break big tasks into very small steps called "Micro-Wins".

RULES:
- Output ONLY valid JSON.
- Do NOT use markdown.
- Do NOT wrap JSON inside backticks.
- Steps must be short, simple, and actionable.
- Each step should take 1 to 5 minutes.
- Provide 8 to 15 steps depending on task difficulty.
- Avoid generic advice.
- Add motivation messages after every 3 steps.
- Add estimated_time_minutes for every step.
- Use calm and supportive language.

User Profile:
${JSON.stringify(profile, null, 2)}

Task:
"${safeTask}"

Return JSON in this exact format:

{
  "title": "string",
  "total_steps": number,
  "steps": [
    {
      "step_number": 1,
      "text": "string",
      "estimated_time_minutes": number
    }
  ],
  "motivations": [
    {
      "after_step": 3,
      "message": "string"
    }
  ]
}
`;

    // ✅ WORKING MODEL FOR YOUR KEY
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);

    const outputText = result.response.text();
    const cleaned = extractJSON(outputText);

    let jsonData;
    try {
      jsonData = JSON.parse(cleaned);
    } catch (err) {
      console.log("Gemini RAW output:", outputText);
      return res.status(500).json({
        error: "Gemini returned invalid JSON",
        raw: outputText,
      });
    }

    return res.json(jsonData);
  } catch (error) {
    console.error("Error in /api/decompose:", error);
    return res.status(500).json({ error: error.message || "Server error" });
  }
});

// --------------------
// OVERWHELM MODE API
// --------------------
app.post("/api/overwhelm", async (req, res) => {
  try {
    const { stepText, profile } = req.body;

    if (!stepText) {
      return res.status(400).json({ error: "stepText is required" });
    }

    const safeStep = maskPII(stepText);

    const prompt = `
You are The Smart Companion, a neuro-inclusive AI assistant.

Break the given step into extremely small micro-steps.

RULES:
- Output ONLY valid JSON.
- Do NOT use markdown.
- Do NOT wrap JSON inside backticks.
- Use very simple words.
- Each micro-step should take 0.5 to 2 minutes.
- Provide 5 to 10 micro-steps.
- Keep the tone calm and friendly.

User Profile:
${JSON.stringify(profile, null, 2)}

Current Step:
"${safeStep}"

Return JSON in this exact format:

{
  "micro_steps": [
    {
      "text": "string",
      "estimated_time_minutes": number
    }
  ]
}
`;

    // ✅ WORKING MODEL FOR YOUR KEY
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);

    const outputText = result.response.text();
    const cleaned = extractJSON(outputText);

    let jsonData;
    try {
      jsonData = JSON.parse(cleaned);
    } catch (err) {
      console.log("Gemini RAW output:", outputText);
      return res.status(500).json({
        error: "Gemini returned invalid JSON",
        raw: outputText,
      });
    }

    return res.json(jsonData);
  } catch (error) {
    console.error("Error in /api/overwhelm:", error);
    return res.status(500).json({ error: error.message || "Server error" });
  }
});

// --------------------
// Server Start
// --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
