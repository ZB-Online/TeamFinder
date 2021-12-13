import express from 'express';

// Mock Data
let postings = Array.from({ length: 2 }, (_, idx) => ({
  id: idx,
  title: `title ${idx}`,
  writer: `writer ${idx}`,
  location: [1],
  type: [3, 4],
  date: '2021-12-13',
  recruit: idx % 2 === 0,
}));

// Route
const apiRouter = express.Router();

// GET
apiRouter.get('/postings', (req, res) => res.send(postings));

// POST
apiRouter.post('/postings', (req, res) => {
  const newPosting = req.body;
  postings = [...postings, newPosting];

  res.send(postings);
});

// PATCH
apiRouter.patch('/postings/:id', (req, res) => {
  const { id } = req.params;
  const modifiedPosting = req.body;

  postings = postings.map(post => (post.id === +id ? { ...post, ...modifiedPosting } : post));

  res.send(postings);
});

// DELETE
apiRouter.delete('/postings/:id', (req, res) => {
  const { id } = req.params;

  postings = postings.filter(post => post.id !== +id);

  res.send(postings);
});

export default apiRouter;
