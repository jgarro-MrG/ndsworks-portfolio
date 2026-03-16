const { Resume } = require('../../lib/models/resume.model.js');
const { Experience } = require('../../lib/models/experience.model.js');
const { Education } = require('../../lib/models/education.model.js');
const { Skill } = require('../../lib/models/skill.model.js');
const { sortExperienceDesc } = require('../../lib/sortExperience.js');

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
      if (resumeInfo) {
        const data = resumeInfo.toJSON();
        data.experience = sortExperienceDesc(data.experience);
        if (lang === 'es') {
          if (data.title_es) data.title = data.title_es;
          if (data.summary_es) data.summary = data.summary_es;
          data.experience = data.experience.map(e => ({
            ...e,
            role: e.role_es || e.role,
            details: e.details_es || e.details,
          }));
          data.education = data.education.map(e => ({
            ...e,
            degree: e.degree_es || e.degree,
            notes: e.notes_es || e.notes,
          }));
          data.skills = data.skills.map(s => ({
            ...s,
            details: s.details_es || s.details,
          }));
        }
        response.status(200).json(data);
      } else {
        response.status(404).json({ error: 'Resume information not found' });
      }
    } catch (error) {
      console.error('Error fetching resume:', error);
      response.status(500).json({ error: 'Failed to fetch resume info', details: error.message });
    }
  } else {
    response.setHeader('Allow', ['GET']);
    response.status(405).end(`Method ${request.method} Not Allowed`);
  }
};
