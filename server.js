// import express from 'express';
const express = require('express');
// import rootRouter from './src/router/root';
const rootRouter = require('./src/router/root');
// import apiRouter from './src/router/api';
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