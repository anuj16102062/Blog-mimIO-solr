const express = require('express');
const solr = require('solr-client');
const cors = require('cors')
const client = solr.createClient({
  host: 'localhost',
  port: 8983,
  core: 'iiit',
  protocol: 'http',
});
const app = express();
app.use(cors());


app.get('/search', (req, res) => {
    console.log(req.query.q,'---------------req.query.q')
    const userQuery = {
        Name: req.query.name, 
        Country: req.query.country, 
        Industry: req.query.industry,
      };
      
      const queryParts = [];
      
      for (const field in userQuery) {
        if (userQuery[field]) {
          queryParts.push(`${field}:${userQuery[field]}`);
        }
      }
      
      const queryString = queryParts.join(' OR ');
  const solrQuery = client.createQuery().q(queryString).sort({ score: 'desc' }).fl(['Id', 'Name']);

  client.search(solrQuery, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'An error occurred while searching.' });
    }

    const searchResults = result.response.docs;
    res.json(searchResults);
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});