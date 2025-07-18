const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

const postsRouter = require('./routes/posts');
const projectsRouter = require('./routes/projects');
const resumeRouter = require('./routes/resume');

app.use('/api/posts', postsRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/resume', resumeRouter);