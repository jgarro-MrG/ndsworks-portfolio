const PDFDocument = require('pdfkit');
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

const MARGIN = 50;
const PAGE_WIDTH = 612; // US Letter
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

function normalizeUrl(url) {
  if (!url) return url;
  return url.startsWith('http') ? url : `https://${url}`;
}

function buildPDF(doc, data) {
  const c = data.contact || {};

  // ── Name ──────────────────────────────────────────────────────────────────
  doc.font('Helvetica-Bold')
     .fontSize(18)
     .text(data.name.toUpperCase(), MARGIN, MARGIN, { width: CONTENT_WIDTH, align: 'center' });

  // ── Location | Phone ──────────────────────────────────────────────────────
  const locationPhone = [c.location, c.phone].filter(Boolean);
  if (locationPhone.length) {
    doc.font('Helvetica')
       .fontSize(10)
       .text(locationPhone.join('  |  '), MARGIN, doc.y, { width: CONTENT_WIDTH, align: 'center' });
  }

  // ── Email | LinkedIn | GitHub ─────────────────────────────────────────────
  const contactParts = [];
  if (c.email)    contactParts.push(c.email);
  if (c.linkedin) contactParts.push(normalizeUrl(c.linkedin));
  if (c.github)   contactParts.push(normalizeUrl(c.github));
  if (contactParts.length) {
    doc.font('Helvetica')
       .fontSize(10)
       .text(contactParts.join('  |  '), MARGIN, doc.y, { width: CONTENT_WIDTH, align: 'center' });
  }

  // ── Section header helper ─────────────────────────────────────────────────
  const PAGE_HEIGHT = 792; // US Letter
  const MIN_SPACE_AFTER_HEADER = 40; // header + at least one line of content

  function sectionHeader(title) {
    doc.moveDown(0.8);
    const spaceLeft = PAGE_HEIGHT - MARGIN - doc.y;
    if (spaceLeft < MIN_SPACE_AFTER_HEADER) {
      doc.addPage();
    }
    doc.font('Helvetica-Bold').fontSize(11).text(title, MARGIN, doc.y, { width: CONTENT_WIDTH });
    doc.moveTo(MARGIN, doc.y).lineTo(MARGIN + CONTENT_WIDTH, doc.y).lineWidth(0.5).stroke();
    doc.moveDown(0.3);
  }

  // ── Professional Summary ──────────────────────────────────────────────────
  sectionHeader('PROFESSIONAL SUMMARY');
  doc.font('Helvetica')
     .fontSize(10)
     .text(data.summary, MARGIN, doc.y, { width: CONTENT_WIDTH, align: 'left', lineGap: 1.5 });

  // ── Technical Skills ──────────────────────────────────────────────────────
  sectionHeader('TECHNICAL SKILLS');
  for (const skill of (data.skills || [])) {
    doc.font('Helvetica-Bold').fontSize(10)
       .text(`${skill.category}: `, MARGIN, doc.y, { continued: true, width: CONTENT_WIDTH });
    doc.font('Helvetica').fontSize(10).text(skill.details, { lineGap: 1 });
  }

  // ── Professional Experience ───────────────────────────────────────────────
  sectionHeader('PROFESSIONAL EXPERIENCE');
  for (const job of (data.experience || [])) {
    doc.font('Helvetica-Bold').fontSize(10).text(job.company, MARGIN, doc.y, { width: CONTENT_WIDTH });
    doc.font('Helvetica').fontSize(10)
       .text(`${job.role}  |  ${job.location}  |  ${job.period}`, MARGIN, doc.y, { width: CONTENT_WIDTH });
    for (const detail of (job.details || [])) {
      doc.font('Helvetica').fontSize(10)
         .text(`\u2022  ${detail}`, MARGIN + 8, doc.y, { width: CONTENT_WIDTH - 8, lineGap: 1 });
    }
    doc.moveDown(0.5);
  }

  // ── Education ─────────────────────────────────────────────────────────────
  sectionHeader('EDUCATION');
  for (const edu of (data.education || [])) {
    doc.font('Helvetica-Bold').fontSize(10).text(edu.institution, MARGIN, doc.y, { width: CONTENT_WIDTH });
    doc.font('Helvetica').fontSize(10)
       .text(`${edu.degree}  |  ${edu.period}`, MARGIN, doc.y, { width: CONTENT_WIDTH });
    if (edu.notes) {
      doc.font('Helvetica-Oblique').fontSize(9)
         .text(edu.notes, MARGIN, doc.y, { width: CONTENT_WIDTH });
    }
    doc.moveDown(0.5);
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const lang = req.query.lang === 'es' ? 'es' : 'en';

    const resumeInfo = await Resume.findOne({
      include: [
        { model: Experience, as: 'experience' },
        { model: Education, as: 'education' },
        { model: Skill, as: 'skills' },
      ]
    });

    if (!resumeInfo) return res.status(404).json({ error: 'Resume not found' });

    const data = resumeInfo.toJSON();
    data.experience = sortExperienceDesc(data.experience);
    if (lang === 'es') {
      if (data.title_es) data.title = data.title_es;
      if (data.summary_es) data.summary = data.summary_es;
      data.experience = data.experience.map(e => ({ ...e, details: e.details_es || e.details }));
      data.education  = data.education.map(e => ({ ...e, degree: e.degree_es || e.degree, notes: e.notes_es || e.notes }));
      data.skills     = data.skills.map(s => ({ ...s, details: s.details_es || s.details }));
    }

    if (req.query.variant) {
      const variant = await ResumeVariant.findByPk(req.query.variant);
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

    const doc = new PDFDocument({
      size: 'LETTER',
      margins: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
      info: { Title: `${data.name} - Resume`, Author: data.name },
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Jorge_Garro_Resume.pdf"');
    doc.pipe(res);

    buildPDF(doc, data);
    doc.end();
  } catch (err) {
    console.error('Error generating PDF resume:', err);
    if (!res.headersSent) res.status(500).json({ error: 'Failed to generate PDF resume' });
  }
};
