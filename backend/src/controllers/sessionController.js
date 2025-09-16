const redis = require('../config/redis');

async function getSessionHistory(req, res, next) {
  try {
    const { sessionId } = req.query;
    const chatHistoryKey = `session:${sessionId}:history`;

    const history = await redis.lrange(chatHistoryKey, 0, -1);
    const parsedHistory = history.map((item) => JSON.parse(item));

    res.json({ history: parsedHistory });
  } catch (err) {
    next(err);
  }
}

async function resetSession(req, res, next) {
  try {
    const { sessionId } = req.body;
    const chatHistoryKey = `session:${sessionId}:history`;
    await redis.del(chatHistoryKey);
    res.json({ message: 'Session reset' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getSessionHistory, resetSession };
