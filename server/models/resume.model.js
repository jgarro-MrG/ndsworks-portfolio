const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SkillSchema = new Schema({
    category: String,
    details: String,
});

const ExperienceSchema = new Schema({
    company: String,
    role: String,
    period: String,
    location: String,
    description: String,
    details: [String]
});

const EducationSchema = new Schema({
    institution: String,
    degree: String,
    period: String,
    notes: String
});

const resumeSchema = new Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    contact: {
        email: String,
        linkedin: String,
        github: String
    },
    skills: [SkillSchema],
    experience: [ExperienceSchema],
    education: [EducationSchema]
});

const Resume = mongoose.model('Resume', resumeSchema);
module.exports = Resume;