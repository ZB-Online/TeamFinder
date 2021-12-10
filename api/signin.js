import express from 'express';

// Route
const signIn = express.Router();

// POST
signIn.post('/', (req, res) => {
  console.log(req.body);

  res.send();
});

export default signIn;
