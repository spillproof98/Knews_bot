const pool = require('../config/postgres');

async function saveTranscript(sessionId, userMsg, botReply) {
  const query = `
    INSERT INTO transcripts (session_id, user_msg, bot_reply, created_at)
    VALUES ($1, $2, $3, NOW())
  `;

  await pool.query(query, [sessionId, userMsg, botReply]);
}

module.exports = { saveTranscript };
