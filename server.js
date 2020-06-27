const express = require('express');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3001;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const REDIRECT_URL = 'http://localhost:3001/callback';
const apiURL = 'https://accounts.spotify.com/authorize?';
const request_access_uri = 'https://accounts.spotify.com/api/token';

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.sendFile(`${__dirname}/public/index.html`);
});

app.get('/login', (req, res) => {
  res.redirect(
    `${apiURL}response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=user-read-private%20user-read-email%20playlist-read-private%20playlist-read-collaborative&state=34fFs29kd09`
  );
});

app.get('/callback', (req, res) => {
  const { code, state } = req.query;
  if (code === 'access_denied') {
    return res.status(403).json({
      status: 'access_denied',
    });
  }
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Its working ${PORT} 🚀`);
  console.log(`http://localhost:${PORT} 🚀🤘🏻`);
});
