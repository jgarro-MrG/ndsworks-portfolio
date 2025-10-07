const { Resume } = require('../lib/models/resume.model.js');
const { Experience } = require('../lib/models/experience.model.js');
const { Education } = require('../lib/models/education.model.js');
const { Skill } = require('../lib/models/skill.model.js');

// The exported function is the handler
module.exports = async function handler(request, response) {
  // You can check the HTTP method to handle different request types
  if (request.method === 'GET') {
    try {
      // Use findOne() to get the single resume entry as an object, not an array
      // We use an explicit `include` to eagerly load associated models.
      // This is more reliable than `include: { all: true }` if associations
      // are not perfectly defined in the models.
      const resumeInfo = await Resume.findOne({
        include: [
          { model: Experience, as: 'experience' },
          { model: Education, as: 'education' },
          { model: Skill, as: 'skills' }
        ]
      });
      if (resumeInfo) {
        // Send a 200 OK response with the resume info
        response.status(200).json(resumeInfo);
      } else {
        response.status(404).json({ error: 'Resume information not found' });
      }
    } catch (error) {
      // Handle any errors
      console.error('Error fetching resume:', error);
      response.status(500).json({ error: 'Failed to fetch resume info', details: error.message });
    }
  } else {
    // If any other HTTP method is used, return a 405 Method Not Allowed error
    response.setHeader('Allow', ['GET']);
    response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}