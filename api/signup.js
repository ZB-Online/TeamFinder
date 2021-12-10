import express from 'express';

// Route
const signUp = express.Router();

// POST
signUp.post('/', (req, res) => {
  console.log(req.body);

  res.send();
});

export default signUp;
