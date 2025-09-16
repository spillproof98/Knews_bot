const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chat');
const sessionRoutes = require('./routes/session');
const newsRoutes = require('./routes/news');
const { errorHandler } = require('./utils/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

const newsRouter = require('./routes/news');

app.use('/api', newsRouter);
app.use('/api/chat', chatRoutes);
app.use('/api/session', sessionRoutes);


app.use(errorHandler);

module.exports = app;
