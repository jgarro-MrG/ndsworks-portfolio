const router = require('express').Router();
let Project = require('../models/project.model');

// GET all projects
router.route('/').get((req, res) => {
  Project.find().sort({ date: -1 }) // Sort by most recent
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;