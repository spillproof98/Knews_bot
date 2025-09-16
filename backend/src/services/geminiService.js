const axios = require('axios');

async function generateAnswer(query, context) {
  const prompt = `Context: ${context}\n\nQuestion: ${query}\nAnswer:`;

  const response = await axios.post(
    'https://generativelanguage.googleapis.com/v1beta2/models/gemini-2.0:generateText',
    {
      prompt: { text: prompt },
      temperature: 0.7,
      maxOutputTokens: 256,
    },
    {
      headers: {
        'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.candidates[0].output || 'Sorry, no answer found.';
}

module.exports = { generateAnswer };
