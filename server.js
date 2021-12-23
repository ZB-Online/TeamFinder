const express = require('express');
const rootRouter = require('./src/router/root');
const apiRouter = require('./src/router/api');
const path = require('path');

const app = express();
const PORT = 5500;

app.use(express.static('public'));
app.use(express.json());

app.get(['/', '/posts', '/writing', '/setting'], (req, res) => {
  res.format({
    'text/html': () => {
      res.sendFile(path.join(__dirname, '/public/index.html'));
    },
    default: () => {
      res.status(406).send('Not Acceptable');
    },
  });
});

app.use('/', rootRouter);
app.use('/api', apiRouter);

app.get('*', (req, res) => {
  res.format({
    'text/html': () => {
      res.sendFile(path.join(__dirname, '/public/error.html'));
    },
    default: () => {
      res.status(406).send('Not Acceptable');
    },
  });
});

app.listen(PORT, () => {
  console.log(`✔ Listening on : http://localhost:${PORT}`);
});
