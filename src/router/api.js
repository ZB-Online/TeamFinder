const data = require('./data.js');
const express = require('express');

const FILTER = {
  SPORTS: ['배드민턴', '야구', '농구', '당구', '볼링', '축구', '런닝'],
  CITIES: [
    '서울시',
    '부산시',
    '대구시',
    '광주시',
    '울산시',
    '대전시',
    '경기도',
    '강원도',
    '충청남도',
    '충청북도',
    '경상북도',
    '경상남도',
    '전라북도',
    '전라남도',
    '제주도',
  ],
};

// Mock Data
let posts = [...data];
// Functions
const getPost = id => posts.filter(post => post.id === +id);

const getMaxId = items => Math.max(...items.map(({ id }) => id), 0);

const changePost = newPost => {
  posts = posts.map(post => (post.id === newPost.id ? newPost : post));
};

const getPostOwner = id => posts.filter(post => post.owner.id === id);

// Route
const apiRouter = express.Router();

// GET
apiRouter.get('/posts', (req, res) => {
  let sendingData = [...posts];
  if (req.query.cities && req.query.sports) {
    const currentCities = req.query.cities.split(',');
    const currentSports = req.query.sports.split(',');
    sendingData = sendingData.filter(
      post =>
        currentCities.includes(FILTER.CITIES[post.city]) &&
        post.sportsTypes.some(sports => currentSports.includes(FILTER.SPORTS[sports])),
    );
  }
  res.status(200).json(sendingData);
});

apiRouter.get('/posts/:id', (req, res) => {
  const { id } = req.params;

  try {
    const [post] = getPost(id);

    res.send(post);
  } catch (e) {
    console.error(e);
  }
});

// POST
apiRouter.post('/posts', (req, res) => {
  // body is not null
  const { title, city, sportsTypes, content, date, owner } = req.body;

  try {
    const newPost = {
      id: getMaxId(posts) + 1,
      title,
      writer: 'writer 1',
      city,
      sportsTypes,
      content,
      date,
      recruit: true,
      comments: [],
      likeCount: 0,
      owner,
    };

    posts = [...posts, newPost];

    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send(error);
  }
});

apiRouter.post('/posts/:id/comments', (req, res) => {
  const {
    params: { id },
    body: { content, date, owner },
  } = req;

  try {
    const [post] = getPost(id);
    const newComment = { id: getMaxId(post.comments) + 1, content, date, owner };
    const newPost = { ...post, comments: [...post.comments, newComment] };

    changePost(newPost);

    res.send(newPost);
  } catch (e) {
    console.error(e);
  }
});

apiRouter.patch('/posts/:id', (req, res) => {
  const {
    params: { id },
    body,
  } = req;

  try {
    const [post] = getPost(id);

    let newPost = {};
    if (Object.keys(body).length === 0) newPost = { ...post, recruit: !post.recruit };
    else {
      const { title, city, sportsTypes, content } = body;
      newPost = { ...post, title, city, sportsTypes, content };
    }

    changePost(newPost);

    res.send(newPost);
  } catch (e) {
    console.error(e);
  }
});

apiRouter.patch('/posts/setting/:ownerId', (req, res) => {
  const {
    params: { ownerId },
    body: { nickname },
  } = req;

  posts = posts.map(post =>
    post.owner.id === ownerId
      ? {
          ...post,
          owner: { ...post.owner, nickname },
        }
      : post,
  );

  res.send(getPostOwner(posts));
});

apiRouter.patch('/posts/:id/like', (req, res) => {
  const {
    params: { id },
    body: { likeActive },
  } = req;

  try {
    const [post] = getPost(id);
    const newPost = { ...post, likeCount: likeActive ? post.likeCount - 1 : post.likeCount + 1 };

    changePost(newPost);

    res.send(newPost);
  } catch (e) {
    console.error(e);
  }
});

apiRouter.patch('/posts/:postId/comments/:commentId', (req, res) => {
  const {
    params: { postId, commentId },
    body: { content },
  } = req;

  try {
    const [post] = getPost(postId);
    const newPost = {
      ...post,
      comments: post.comments.map(comment => (comment.id === +commentId ? { ...comment, content } : comment)),
    };

    changePost(newPost);

    res.send(newPost);
  } catch (e) {
    console.error(e);
  }
});

apiRouter.delete('/posts/:id', (req, res) => {
  try {
    const { id } = req.params;

    posts = posts.filter(post => post.id !== +id);

    res.status(200).send();
  } catch (e) {
    console.error(e);
  }
});

apiRouter.delete('/posts/:postId/comments/:commentId', (req, res) => {
  const { postId, commentId } = req.params;

  try {
    const [post] = getPost(postId);
    const newPost = { ...post, comments: post.comments.filter(comment => comment.id !== +commentId) };

    changePost(newPost);

    res.send(newPost);
  } catch (e) {
    console.error(e);
  }
});

module.exports = apiRouter;
