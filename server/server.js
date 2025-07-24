const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB database connection established successfully");
  })
  .catch(err => {
    console.error("MongoDB connection error. Please make sure MongoDB is running and your connection string is correct.");
    console.error(err);
    process.exit(1); // Exit the process with an error code
  });

const postsRouter = require('./routes/posts');
const projectsRouter = require('./routes/projects');
const resumeRouter = require('./routes/resume');

app.use('/api/posts', postsRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/resume', resumeRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});