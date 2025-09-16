const { queryVectorDB } = require('../config/vectorstore');

async function retrieveRelevantArticles(vector) {
  return queryVectorDB(vector);
}

module.exports = { retrieveRelevantArticles };
