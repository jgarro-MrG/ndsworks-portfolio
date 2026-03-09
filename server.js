require('dotenv').config({ path: require('path').resolve(__dirname, '.env.local') });
const express = require('express');
const path = require('path');
const apiApp = require('./api/index.js');

const PORT = process.env.PORT || 5000;
const buildPath = path.join(__dirname, 'client/build');

apiApp.use(express.static(buildPath));
apiApp.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

apiApp.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
