const { Resume } = require('../../lib/models/resume.model.js');
const { Experience } = require('../../lib/models/experience.model.js');
const { Education } = require('../../lib/models/education.model.js');
const { Skill } = require('../../lib/models/skill.model.js');
const { ResumeVariant } = require('../../lib/models/resumeVariant.model.js');
const { sortExperienceDesc } = require('../../lib/sortExperience.js');

function reorderSkills(skills, categoryOrder) {
  const ordered = [];
  for (const cat of categoryOrder) {
    const match = skills.find(s => s.category === cat);
    if (match) ordered.push(match);
  }
  for (const s of skills) {
    if (!categoryOrder.includes(s.category)) ordered.push(s);
  }
  return ordered;
}

function normalizeUrl(url) {
  if (!url) return url;
  return url.startsWith('http') ? url : `https://${url}`;
}

function normalizePeriod(period) {
  if (!period) return period;
  return period.replace(/\u2013/g, '-');
}

function formatATS(resume) {
  const c = resume.contact || {};
  const lines = [];

  lines.push(resume.name.toUpperCase());

  const locationPhone = [];
  if (c.location) locationPhone.push(c.location);
  if (c.phone) locationPhone.push(c.phone);
  if (locationPhone.length) lines.push(locationPhone.join(' | '));

  const contactParts = [];
  if (c.email) contactParts.push(`Email: ${c.email}`);
  if (c.linkedin) contactParts.push(`LinkedIn: ${normalizeUrl(c.linkedin)}`);
  if (c.github) contactParts.push(`GitHub: ${normalizeUrl(c.github)}`);
  if (contactParts.length) lines.push(contactParts.join(' | '));
  lines.push('');

  lines.push('PROFESSIONAL SUMMARY');
  lines.push(resume.summary);
  lines.push('');

  lines.push('TECHNICAL SKILLS');
  lines.push('');
  for (const skill of (resume.skills || [])) {
    lines.push(`${skill.category}: ${skill.details}`);
  }
  lines.push('');

  lines.push('PROFESSIONAL EXPERIENCE');
  lines.push('');
  for (const job of (resume.experience || [])) {
    lines.push(job.company);
    lines.push(`${job.role} | ${job.location} | ${normalizePeriod(job.period)}`);
    for (const detail of (job.details || [])) {
      lines.push(`- ${detail}`);
    }
    lines.push('');
  }

  lines.push('EDUCATION');
  lines.push('');
  for (const edu of (resume.education || [])) {
    lines.push(edu.institution);
    lines.push(`${edu.degree} | ${normalizePeriod(edu.period)}`);
    if (edu.notes) lines.push(edu.notes);
    lines.push('');
  }

  return lines.join('\n');
}

module.exports = async function handler(request, response) {
  if (request.method === 'GET') {
    try {
      const lang = request.query.lang === 'es' ? 'es' : 'en';
      const resumeInfo = await Resume.findOne({
        include: [
          { model: Experience, as: 'experience' },
          { model: Education, as: 'education' },
          { model: Skill, as: 'skills' }
        ]
      });
      if (!resumeInfo) {
        return response.status(404).json({ error: 'Resume not found' });
      }
      const data = resumeInfo.toJSON();
      data.experience = sortExperienceDesc(data.experience);
      if (lang === 'es') {
        if (data.title_es) data.title = data.title_es;
        if (data.summary_es) data.summary = data.summary_es;
        data.experience = data.experience.map(e => ({ ...e, details: e.details_es || e.details }));
        data.education = data.education.map(e => ({ ...e, degree: e.degree_es || e.degree, notes: e.notes_es || e.notes }));
        data.skills = data.skills.map(s => ({ ...s, details: s.details_es || s.details }));
      }

      if (request.query.variant) {
        const variant = await ResumeVariant.findByPk(request.query.variant);
        if (variant) {
          const summaryField = lang === 'es' ? 'customSummary_es' : 'customSummary';
          if (variant[summaryField]) data.summary = variant[summaryField];
          if (variant.config?.skillCategoryOrder?.length) {
            data.skills = reorderSkills(data.skills, variant.config.skillCategoryOrder);
          }
          if (variant.config?.hiddenExperienceIds?.length) {
            data.experience = data.experience.filter(e => !variant.config.hiddenExperienceIds.includes(e.id));
          }
        }
      }

      const text = formatATS(data);
      response.setHeader('Content-Type', 'text/plain; charset=utf-8');
      response.status(200).send(text);
    } catch (error) {
      console.error('Error generating ATS resume:', error);
      response.status(500).json({ error: 'Failed to generate ATS resume' });
    }
  } else {
    response.setHeader('Allow', ['GET']);
    response.status(405).end(`Method ${request.method} Not Allowed`);
  }
};
