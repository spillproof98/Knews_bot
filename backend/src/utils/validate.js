function validateChatInput(req, res, next) {
  const { sessionId, query } = req.body;
  if (!sessionId || typeof sessionId !== 'string') {
    return res.status(400).json({ error: 'sessionId is required' });
  }
  if (!query || typeof query !== 'string' || query.length === 0) {
    return res.status(400).json({ error: 'query is required' });
  }
  next();
}

module.exports = { validateChatInput };
