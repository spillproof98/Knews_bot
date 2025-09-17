const axios = require('axios');

const VECTOR_DB_URL = process.env.VECTOR_DB_URL;
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;

async function queryVectorDB(queryVector) {
  try {
    const response = await axios.post(
      `${VECTOR_DB_URL}/query`,
      {
        vector: queryVector,
        top_k: 5,
        include_metadata: true,
      },
      {
        headers: {
          'Api-Key': PINECONE_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error querying vector DB:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = { queryVectorDB };
