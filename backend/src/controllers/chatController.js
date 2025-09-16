const { embedText } = require('../services/embeddingService');
const { queryVectorDB } = require('../config/vectorstore');
const geminiService = require('../services/geminiService');
const redis = require('../config/redis');

async function chat(req, res, next) {
  try {
    const { sessionId, query } = req.body;

    const queryVector = await embedText(query);

    const results = await queryVectorDB(queryVector);

    const contextTexts = results.matches.map((m) => m.metadata.text).join('\n');

    const geminiResponse = await geminiService.generateAnswer(query, contextTexts);

    const chatHistoryKey = `session:${sessionId}:history`;
    await redis.rpush(chatHistoryKey, JSON.stringify({ sender: 'user', text: query }));
    await redis.rpush(chatHistoryKey, JSON.stringify({ sender: 'bot', text: geminiResponse }));

    res.json({ reply: geminiResponse });
  } catch (err) {
    next(err);
  }
}

module.exports = { chat };
