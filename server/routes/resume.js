const router = require('express').Router();
let Resume = require('../models/resume.model');

// GET the single resume document
router.route('/').get((req, res) => {
  Resume.findOne() // We only expect one resume document
    .then(resume => res.json(resume))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;