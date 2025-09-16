const axios = require('axios');

const VECTOR_DB_URL = process.env.VECTOR_DB_URL;

async function queryVectorDB(queryVector) {
  const response = await axios.post(`${VECTOR_DB_URL}/search`, {
    vector: queryVector,
    top_k: 5,
  });
  return response.data;
}

module.exports = { queryVectorDB };
