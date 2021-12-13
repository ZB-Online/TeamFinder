import express from 'express';

// Mock Data
let postings = Array.from({ length: 3 }, (_, idx) => ({
  id: idx,
  title: `title ${idx}`,
  writer: `writer ${idx}`,
  city: [1],
  type: [3, 4],
  content: 'hello',
  date: '2021-12-13',
  recruit: idx % 2 === 0,
}));

// Route
const apiRouter = express.Router();

// GET
apiRouter.get('/postings', (req, res) => res.send(postings));

// POST
apiRouter.post('/postings', (req, res) => {
  // body is not null
  const { title, city, type, content, date } = req.body;

  const maxId = (() => Math.max(...postings.map(({ id }) => id)))();

  try {
    const newPosting = {
      id: maxId + 1,
      title,
      writer: 'writer 1',
      city,
      type,
      content,
      date,
      recruit: true,
    };

    postings = [...postings, newPosting];

    res.send(postings);
  } catch (error) {
    res.status(400).send(error);
  }
});

// PATCH
apiRouter.patch('/postings/:id', (req, res) => {
  const {
    params: { id },
    // body is not null
    body: { title, city, type, content, recruit },
  } = req;

  try {
    postings = postings.map(post =>
      post.id === +id ? Object.assign(post, { title, city, type, content, recruit }) : post
    );

    res.send(postings);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE
apiRouter.delete('/postings/:id', (req, res) => {
  const { id } = req.params;

  postings = postings.filter(post => post.id !== +id);

  res.send(postings);
});

export default apiRouter;
