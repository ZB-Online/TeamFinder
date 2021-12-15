import express from 'express';

// Mock Data
let postings = [
  {
    id: 0,
    title: `title ${0}`,
    writer: `writer ${0}`,
    city: 1,
    sportsType: [3],
    content: 'hello',
    date: '2021-12-13',
    recruit: true,
    owner: { id: 0, nickname: '으르렁' },
    comments: [
      {
        content: '첫 번째 댓글',
        date: '2021-12-13',
        owner: { id: 1, nickname: '호랑이' },
      },
      {
        content: '두 번째 댓글',
        date: '2021-12-14',
        owner: { id: 2, nickname: '원숭이' },
      },
    ],
  },
  {
    id: 1,
    title: `title ${2}`,
    writer: `writer ${2}`,
    city: 5,
    sportsType: [5],
    content: 'hello',
    date: '2021-12-13',
    recruit: true,
    owner: { id: 3, nickname: '토끼' },
    comments: [
      {
        content: '첫 번째 댓글',
        date: '2021-12-13',
        owner: { id: 0, nickname: '으르렁' },
      },
      {
        content: '두 번째 댓글',
        date: '2021-12-14',
        owner: { id: 1, nickname: '호랑이' },
      },
      {
        content: '세 번째 댓글',
        date: '2021-12-14',
        owner: { id: 2, nickname: '원숭이' },
      },
    ],
  },
  {
    id: 2,
    title: `title ${3}`,
    writer: `writer ${3}`,
    city: 2,
    sportsType: [4],
    content: 'hello',
    date: '2021-12-14',
    recruit: true,
    owner: { id: 2, nickname: '원숭이' },
    comments: [
      {
        content: '첫 번째 댓글',
        date: '2021-12-14',
        owner: { id: 2, nickname: '원숭이' },
      },
    ],
  },
  {
    id: 3,
    title: `title ${1}`,
    writer: `writer ${1}`,
    city: 2,
    sportsType: [1],
    content: 'hello',
    date: '2021-12-14',
    recruit: false,
    owner: { id: 0, nickname: '으르렁' }, // user id
    comments: [],
  },
];

// Route
const apiRouter = express.Router();

// GET
apiRouter.get('/postings', (req, res) => res.send(postings));

apiRouter.get('/postings/:id', (req, res) => {
  const { id } = req.params;

  const posting = postings.filter(posting => posting.id === +id);

  res.send(posting);
});

// POST
apiRouter.post('/postings', (req, res) => {
  // body is not null
  const { title, city, sportsType, content, date } = req.body;

  const maxId = (() => Math.max(...postings.map(({ id }) => id)))();

  try {
    const newPosting = {
      id: maxId + 1,
      title,
      writer: 'writer 1',
      city,
      sportsType,
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
    body: { title, city, sportsType, content, recruit },
  } = req;

  try {
    postings = postings.map(post =>
      post.id === +id ? Object.assign(post, { title, city, sportsType, content, recruit }) : post
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

apiRouter.delete('/postings/:postingId/comments/:commentId', (req, res) => {
  const { postingId, commentId } = req.params;

  postings = postings.map(posting =>
    posting.id === +postingId
      ? { ...posting, comments: posting.comments.filter((_, idx) => idx !== +commentId) }
      : posting
  );

  const posting = postings.filter(posting => posting.id === +postingId);

  res.send(posting);
});

export default apiRouter;
