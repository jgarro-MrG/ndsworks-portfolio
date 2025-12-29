require('dotenv').config();
const { sequelize } = require('../lib/db.js');
const { Post } = require('../lib/models/post.model.js');
const { Resume } = require('../lib/models/resume.model.js');
const { Experience } = require('../lib/models/experience.model.js');
const { Education } = require('../lib/models/education.model.js');
const { Skill } = require('../lib/models/skill.model.js');

const posts = [
  {
    title: 'Why I Chose the PERN Stack for This Portfolio',
    content: 'The PERN stack offers a complete end-to-end JavaScript solution, which simplifies development and context-switching. React\'s component-based architecture is fantastic for building a scalable UI, while Node.js and Express make creating a robust back-end API straightforward. Finally, PostgreSQL\'s relational structure, managed with the Sequelize ORM, provides a reliable and structured foundation for content-focused applications like this one.',
    author: 'Jorge Garro'
  },
  {
    title: 'The Importance of System Architecture',
    content: 'Before writing a single line of code for ndsworks.com, I mapped out the system architecture using the MVC pattern. This separation of concerns is critical for long-term maintainability. The Model handles data, the View handles the UI, and the Controller handles the logic connecting them. This clarity prevents code from becoming a tangled mess and makes debugging significantly easier.',
    author: 'Jorge Garro'
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
            company: "Self-Employed",
            role: "Business Intelligence Developer and IT Ops",
            period: "August 2025 – Present",
            location: "Remote",
            details: [
                "Data Modernization: Orchestrated the migration of legacy spreadsheet workflows into a centralized PostgreSQL architecture, utilizing Claude and Gemini to automate data categorization and insight generation.",
                "Custom Tooling: Engineered and deployed internal React applications on Vercel, successfully replacing multiple costly third-party platforms with high-performance, in-house solutions.",
                "Communication & Marketing Automation: Built and managed advanced ManyChat and Email Marketing workflows, integrating them with core systems to automate lead engagement and customer journeys.",
                "Infrastructure & IT Ops: Administered Google Workspace and Slack environments, optimizing security and internal communications through custom integrations and automated administrative tasks.",
                "Process Efficiency: Transformed manual, fragmented reporting and administrative processes into a streamlined, automated engine, significantly reducing operational overhead and license costs."
            ]
        },
        {
            company: "Jefferson Parish Public School System",
            role: "Career & Technical Education Instructor",
            period: "January 2020 – May 2025",
            location: "Lousiana, United States",
            details: [
                "Developed and delivered a comprehensive curriculum for Career and Technical Education (CTE), preparing high school students for careers in technology.",
                "Guided over 150 students through project-based learning modules using Adobe Photoshop and Illustrator, culminating in the creation of professional-grade digital media portfolios.",
                "In partnership with Operation Spark, taught fundamentals of software development, including logical problem-solving, programming constructs, and web technologies.",
                "Mentored and coached a diverse student population, adapting teaching methods to meet various learning styles and fostering an engaging classroom environment."
            ]
        },
        {
            company: "Tek-Experts",
            role: "Software Support Engineer, L2",
            period: "July 2014 – December 2018",
            location: "Cartago, Costa Rica",
            details: [
                "Provided Tier 2 technical support for an enterprise Content Management and Information Governance software solution used by global organizations.",
                "Resolved an average of 20+ weekly Tier-2 tickets by diagnosing complex relational database issues in MS SQL and Oracle environments, ensuring data integrity for a global client base.",
                "Diagnosed and resolved issues across Windows Server administration, IT infrastructure, and network connectivity.",
                "Provided development support to the implementation and integration .NET SDK and Web API.",
                "Created and managed virtualized test environments for issue replication and solution validation."
            ]
        },
        {
            company: "Experian",
            role: "System Analyst II",
            period: "February 2014 – July 2014",
            location: "Heredia, Costa Rica",
            details: [
                "Monitored a real-time credit risk assessment platform, ensuring high availability and reliability for financial clients.",
                "Orchestrated communication between customers and an engineering team during 24/7 incident management to ensure rapid issue resolution.",
                "Authored detailed Root Cause Analysis (RCA) reports following service recovery to prevent future occurrences.",
                "Collaborated with engineering to ensure reliable connections to credit bureaus and third-partydata sources."
            ]
        },
        {
            company: "Hewlett-Packard",
            role: "Middleware Technical Support Engineer",
            period: "April 2011 – July 2013",
            location: "Heredia, Costa Rica",
            details: [
                "Administered middleware and application hosting services for enterprise clients on WebLogic, WebSphere, and IIS platforms on Solaris, AIX, and Windows.",
                "Lead a support team of 15 agents, improving response times and resolution rates through mentorship and the implementation of Standardized Operating Procedures.",
                "Developed and deployed Bash scripts to automate daily system health checks and filesystem housekeeping, reducing service tickets by 20%."
            ]
        },
        {
            company: "Hewlett-Packard",
            role: "Technical Support Specialist",
            period: "May 2008 – April 2011",
            location: "Heredia, Costa Rica",
            details: [
                "Provided expert technical support for multi-function laser printing equipment, ensuring seamless installations and configurations.",
                "Acted as a resource desk for agents, facilitating advanced troubleshooting and reducing escalations to Tier 2 support.",
                "Developed a comprehensive technical knowledge system, enhancing team efficiency and consistency in handling recurring issues.",
                "Contributed to the training of new agents, fostering a knowledgeable and capable support team"
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

const seedDatabase = async () => {
  const transaction = await sequelize.transaction();
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');

       // --- Seed Posts (non-destructive) ---
    // This will only create posts if a post with the same title doesn't exist.
    console.log('Seeding posts (if they do not exist)...');
    for (const postData of posts) {
      await Post.findOrCreate({
        where: { title: postData.title },
        defaults: postData,
        transaction,
      });
    }
    console.log('✅ Posts seeded.');

    // --- Seed Resume and its associated data (idempotent) ---
    // This will find the resume by name or create it, then ensure its
    // associated skills, experience, and education match this file.
    console.log('Seeding/updating resume data...');
    const [resume, wasCreated] = await Resume.findOrCreate({
      where: { name: resumeData.name },
      defaults: {
        title: resumeData.title,
        summary: resumeData.summary,
        contact: resumeData.contact,
      },
      transaction,
    });

    if (!wasCreated) {
      // If resume already existed, ensure its fields match the seed data
      resume.title = resumeData.title;
      resume.summary = resumeData.summary;
      resume.contact = resumeData.contact;
      await resume.save({ transaction });
    }

    // Clear and re-seed associations for THIS resume to ensure consistency
    console.log('Updating resume associations (skills, experience, education)...');
    await Experience.destroy({ where: { resumeId: resume.id }, transaction });
    await Education.destroy({ where: { resumeId: resume.id }, transaction });
    await Skill.destroy({ where: { resumeId: resume.id }, transaction });

    const resumeId = resume.id;

    const skillsData = resumeData.skills.map(s => ({ ...s, resumeId }));
    await Skill.bulkCreate(skillsData, { transaction });

    const experienceData = resumeData.experience.map(e => ({
      ...e, resumeId,
    }));
    await Experience.bulkCreate(experienceData, { transaction });

    const educationData = resumeData.education.map(e => ({ ...e, resumeId }));
    await Education.bulkCreate(educationData, { transaction });

    console.log('✅ Resume with associated data seeded.');

    await transaction.commit();
    console.log('\nDatabase seeding completed successfully!');
  } catch (error) {
    await transaction.rollback();
    console.error('❌ Failed to seed database:', error);
  } finally {
    // Close the database connection
    await sequelize.close();
    console.log('Database connection closed.');
  }
};

seedDatabase();
