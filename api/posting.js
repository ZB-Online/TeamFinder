import express from 'express';

// Data
const position = ['top', 'jg', 'mid', 'adc', 'sup'];

let postings = Array.from({ length: 10 }, (_, idx) => ({
  id: idx + 1,
  title: `title ${idx + 1}`,
  writer: `writer ${idx + 1}`,
  date: '2021-12-10',
  position: position[Math.floor(Math.random() * 5)],
  content: 'Hello',
  recruit: true,
}));

// Route
const posting = express.Router();

// GET
posting.get('/postings', (req, res) => res.send(postings));

// POST
posting.post('/postings', (req, res) => {
  const newPosting = req.body;
  postings = [...postings, newPosting];

  res.send(postings);
});

// PATCH
posting.patch('/postings/:id', (req, res) => {
  const { id } = req.params;
  const modifiedPosting = req.body;

  postings = postings.map(post => (post.id === +id ? { ...post, ...modifiedPosting } : post));

  res.send(postings);
});

// DELETE
posting.delete('/postings/:id', (req, res) => {
  const { id } = req.params;

  postings = postings.filter(post => post.id !== +id);

  res.send(postings);
});

export default posting;
