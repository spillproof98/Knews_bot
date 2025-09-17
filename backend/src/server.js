const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'https://spillproof98.github.io',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());
app.use('/api/news', require('./routes/news'));

module.exports = app;
