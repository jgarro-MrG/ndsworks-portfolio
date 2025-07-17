const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('../models/project.model');
const Post = require('../models/post.model');
const Resume = require('../models/resume.model');

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

const resumeData = {
    name: "Jorge Garro",
    title: "Information Systems Engineer",
    summary: "Results-oriented Information Systems Engineer with a unique background combining over 8 years of hands-on technical support with 5 years of educational instruction. Proven expertise in diagnosing complex issues across Windows and Unix/Linux environments, managing relational databases, and mentoring in software development fundamentals. Seeking to leverage this diverse skill set to drive system reliability and user satisfaction in a challenging IT support, systems analysis, or infrastructure management role.",
    contact: {
        email: "jorgegarro@protonmail.com",
        linkedin: "linkedin.com/in/jorgegarro",
        github: "jgarro2.github.io"
    },
    skills: [
        { category: "Operating Systems", details: "Windows Server, Linux (Red Hat, Ubuntu), UNIX (Solaris, AIX)" },
        { category: "Databases", details: "MS SQL Server, Oracle, MySQL" },
        { category: "Programming & Scripting", details: "Bash, Python, PowerShell, Java, C#, JavaScript, HTML5, CSS" },
        { category: "Developer Tools", details: "Git, .NET Framework, Visual Studio" },
        { category: "Virtualization", details: "VMware, VirtualBox" },
        { category: "Methodologies", details: "Agile/SCRUM, ITIL, Incident Management, Root Cause Analysis (RCA)" }
    ],
    experience: [
        {
            company: "Jefferson Parish Public School System",
            role: "CTE Instructor (Digital Media & Software Development)",
            period: "January 2020 – May 2025",
            location: "Metairie, LA",
            description: "Developed and delivered a comprehensive curriculum for Career and Technical Education (CTE), preparing high school students for careers in technology.",
            details: [
                "Guided over 150 students through project-based learning modules using Adobe Photoshop and Illustrator, culminating in the creation of professional-grade digital media portfolios.",
                "In partnership with Operation Spark, taught fundamentals of software development, including logical problem-solving, programming constructs, and web technologies.",
                "Mentored and coached a diverse student population, adapting teaching methods to meet various learning styles and fostering an engaging classroom environment."
            ]
        },
        {
            company: "Tek-Experts",
            role: "Software Support Engineer, L2",
            period: "July 2014 – December 2018",
            location: "San José, Costa Rica",
            description: "Provided Tier 2 technical support for an enterprise Content Management and Information Governance software solution used by global organizations.",
            details: [
                "Resolved an average of 20+ weekly Tier-2 tickets by diagnosing complex relational database issues in MS SQL and Oracle environments, ensuring data integrity for a global client base.",
                "Troubleshot and resolved issues related to Windows Server administration, IT infrastructure, and network connectivity."
            ]
        },
        {
            company: "Hewlett-Packard Enterprise",
            role: "Middleware Specialist",
            period: "April 2011 – July 2013",
            location: "San José, Costa Rica",
            description: "Administered middleware and application hosting services for enterprise clients on WebLogic, WebSphere, and IIS platforms on Solaris, AIX, and Windows.",
            details: [
                "Promoted to lead the L1 support team of 15 agents, improving team response time by 20% through strategic scheduling and mentorship.",
                "Developed and deployed Bash scripts to automate daily system health checks, reducing manual monitoring efforts by an estimated 10 hours per week."
            ]
        }
    ],
    education: [
        {
            institution: "Universidad Latina de Costa Rica",
            degree: "Bachelor of Science in Information Systems Engineering",
            period: "2010 – 2018",
            notes: "(Completed additional coursework in Electronics Engineering, 2005-2009)"
        }
    ]
};

const seedDB = async () => {
  await mongoose.connect(process.env.ATLAS_URI);

  await Project.deleteMany({}); // Clear existing projects
  await Project.insertMany(projects);
  console.log('Projects have been seeded!');

  await Post.deleteMany({}); // Clear existing posts
  await Post.insertMany(posts);
  console.log('Posts have been seeded!');

  await Resume.deleteMany({});
  await Resume.create(resumeData);
  console.log('Resume has been seeded!');

  mongoose.connection.close();
};

seedDB();