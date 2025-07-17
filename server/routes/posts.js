const router = require('express').Router();
let Post = require('../models/post.model');

// GET all projects
router.route('/').get((req, res) => {
  Post.find().sort({ date: -1 }) // Sort by most recent
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;