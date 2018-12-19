const elasticsearch = require("elasticsearch");
var fs = require('fs');


const newClient = (host = "localhost:9200") => new elasticsearch.Client({
  host,
  log: false && 'trace',
});

// Operators to test for requests
const listSearchOperators = ["match", "fuzzy"];

const testElasticsearch = (
  elasticsearch,
  index,
  field,
  terms,
  file
) => new Promise((resolve, reject) => {
  // Test connexion to Elasticsearch
  const client = newClient( elasticsearch, false );

  // Retrieve the list of terms to search on
  const listTerms = terms.split(",");

  Promise.all( listSearchOperators.map( operator =>
    Promise.all( listTerms.map( term =>
      // GET /my_index/_search?...
      client.search({
        index: index,
        body: {
        query: {
        [operator]: {
          [field]: term
        }}}
      })
      .then( res => ({
        query : operator,
        term : term,
        took : res.took,
        total_hits : res.hits.total,
        timed_out : res.timed_out
      }))
      // POST /my_index/_cache/clear
      .then( res => client.indices.clearCache({ index: index })
      .then( () => res ))
    ))
  )).then( responses => (file ? fs.writeFile(file, JSON.stringify(responses)) : null) || console.log(responses))
});

module.exports = testElasticsearch;
