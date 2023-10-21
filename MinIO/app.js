const express = require('express');
const Minio = require('minio');
const dotenv = require('dotenv');

dotenv.config(); 

const app = express();
const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
  port: 9000,
  useSSL: false
});

app.get('/search/posters', (req, res) => {
  const hero = req.query.hero;
  const posters = [];

  minioClient.listObjects('movies/posters', '', true).on('data', (obj) => {

    minioClient.getObject('movies/posters', obj.name, (err, stream) => {
      if (!err) {
        const metadata = stream.metadata;
        if (metadata && metadata.hero === hero) {
          posters.push(obj.name);
        }
      }
    });
  }).on('end', () => {
    res.json(posters);
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
