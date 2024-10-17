require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const URL = require('url').URL;
const cors = require('cors');
const dns = require('dns');
const app = express();

const shortUrls = [];

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.use(bodyParser.urlencoded({extended: false}));

app.post('/api/shorturl', (req, res) => {
  const url = new URL(req.body.url);

  dns.lookup(url.hostname, (err) => {
    if (err) {
      res.json({error: 'invalid url'});
    } else if (shortUrls.includes(req.body.url)) {
      res.json({original_url: req.body.url, short_url: shortUrls.indexOf(req.body.url) + 1});
    } else {
      shortUrls.push(req.body.url);

      res.json({original_url: req.body.url, short_url: shortUrls.length});
    }
  });
});

app.get('/api/shorturl/:shortUrl?', (req, res) => {
  res.redirect(shortUrls[req.params.shortUrl - 1]);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
