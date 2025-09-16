const axios = require('axios');

async function embedText(text) {
  const response = await axios.post(
    'https://api.jina.ai/embeddings', 
    { text },
    {
      headers: { Authorization: `Bearer ${process.env.JINA_API_KEY}` }
    }
  );
  return response.data.embedding;
}

module.exports = { embedText };
