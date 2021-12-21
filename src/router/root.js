const express = require('express');

const rootRouter = express.Router();

rootRouter.post('/signin', (req, res) => {
  console.log(req.body);

  res.send();
});

rootRouter.post('/signup', (req, res) => {
  console.log(req.body);

  res.send();
});

module.exports = rootRouter;
