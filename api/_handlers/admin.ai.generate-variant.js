const { verifyToken } = require('../../lib/auth.js');
const { Resume } = require('../../lib/models/resume.model.js');
const { GoogleGenerativeAI } = require('@google/generative-ai');

module.exports = async function handler(req, res) {
  try { verifyToken(req); } catch { return res.status(401).json({ error: 'Unauthorized' }); }
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end();
  }

  const { jobDescription } = req.body || {};
  if (!jobDescription?.trim()) return res.status(400).json({ error: 'jobDescription is required' });

  const resume = await Resume.findOne({
    include: [
      { association: 'experience' },
      { association: 'skills' },
    ],
  });
  if (!resume) return res.status(404).json({ error: 'Resume not found' });

  const data = resume.toJSON();
  const skillCategories = data.skills.map(s => s.category);
  const experienceSummary = data.experience.map(e => `${e.role} at ${e.company}`).join(', ');

  const prompt = `You are a professional bilingual (English/Spanish) resume writer.
Given the candidate's resume data and a job description, generate a tailored resume variant.

## Candidate
Name: ${data.name}
Current summary: ${data.summary}
Skill categories: ${skillCategories.join(', ')}
Experience: ${experienceSummary}

## Job Description
${jobDescription}

## Instructions
- Write a 2-3 sentence Professional Summary in English tailored to this job
- Translate that summary to Spanish
- Reorder the skill categories from most to least relevant for this job

Respond ONLY with valid JSON, no markdown, no extra text:
{
  "customSummary": "...",
  "customSummary_es": "...",
  "skillCategoryOrder": [...]
}`;

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  const json = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  const parsed = JSON.parse(json);

  return res.status(200).json(parsed);
};
