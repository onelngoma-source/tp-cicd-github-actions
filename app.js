const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello World from CI/CD Pipeline!');
});

module.exports = app;