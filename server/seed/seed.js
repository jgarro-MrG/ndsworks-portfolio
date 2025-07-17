const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('../models/project.model');
const Post = require('../models/post.model');

dotenv.config({ path: '../.env' }); // Point to the .env file in the server folder

const projects = [
  {
    title: 'Automated System Health Checker',
    description: 'Developed and deployed Bash scripts to automate daily system health checks for middleware services at Hewlett-Packard, reducing manual monitoring efforts by an estimated 10 hours per week.',
    technologies: ['Bash', 'UNIX', 'Cron'],
    link: 'https://github.com/jgarro2'
  },
  {
    title: 'Internal Technical Support Tool',
    description: 'Developed an internal application to provide technical agents with handy technical information when handling customer interactions for multifunction laser printers.',
    technologies: ['PHP', 'MySQL', 'HTML', 'CSS'],
  }
];

const posts = [
  {
    title: 'Why I Chose the MERN Stack for This Portfolio',
    content: 'The MERN stack offers a complete end-to-end JavaScript solution, which simplifies development and context-switching. React\'s component-based architecture is fantastic for building a scalable UI, while Node.js and Express make creating a robust back-end API straightforward. Finally, MongoDB\'s flexible document structure is perfect for content-focused applications like this one.'
  },
  {
    title: 'The Importance of System Architecture',
    content: 'Before writing a single line of code for ndsworks.com, I mapped out the system architecture using the MVC pattern. This separation of concerns is critical for long-term maintainability. The Model handles data, the View handles the UI, and the Controller handles the logic connecting them. This clarity prevents code from becoming a tangled mess and makes debugging significantly easier.'
  }
];

const seedDB = async () => {
  await mongoose.connect(process.env.ATLAS_URI);

  await Project.deleteMany({}); // Clear existing projects
  await Project.insertMany(projects);
  console.log('Projects have been seeded!');

  await Post.deleteMany({}); // Clear existing posts
  await Post.insertMany(posts);
  console.log('Posts have been seeded!');

  mongoose.connection.close();
};

seedDB();