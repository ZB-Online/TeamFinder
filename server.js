const express = require('express');
const rootRouter = require('./src/router/root');
const apiRouter = require('./src/router/api');

const app = express();
const PORT = 5500;

app.use(express.static('public'));
app.use(express.json());

app.use('/', rootRouter);
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`✔ Listening on : http://localhost:${PORT}`);
});
