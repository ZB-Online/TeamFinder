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
let posts = [
  {
    id: 0,
    title: `title ${0}`,
    writer: `writer ${0}`,
    city: 1,
    sportsTypes: [3],
    content: 'hello',
    date: '2021-12-13',
    recruit: true,
    likeCount: 2,
    owner: { id: 0, nickname: '으르렁' },
    comments: [
      {
        id: 1,
        content: '첫 번째 댓글',
        date: '2021-12-13',
        owner: { id: 1, nickname: '호랑이' },
      },
      {
        id: 2,
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
    sportsTypes: [5],
    content: 'hello\nasdf\n\n\nasdasdg',
    date: '2021-12-13',
    recruit: true,
    likeCount: 3,
    owner: { id: 3, nickname: '토끼' },
    comments: [
      {
        id: 1,
        content: '첫 번째 댓글',
        date: '2021-12-13',
        owner: { id: 0, nickname: '으르렁' },
      },
      {
        id: 2,
        content: '두 번째 댓글\nasdg\n\nasdf',
        date: '2021-12-14',
        owner: { id: 1, nickname: '호랑이' },
      },
      {
        id: 3,
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
    sportsTypes: [4],
    content: 'hello',
    date: '2021-12-14',
    recruit: true,
    likeCount: 1,
    owner: { id: 2, nickname: '원숭이' },
    comments: [
      {
        id: 1,
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
    sportsTypes: [1],
    content: 'hello',
    date: '2021-12-14',
    recruit: false,
    likeCount: 0,
    owner: { id: 0, nickname: '으르렁' }, // user id
    comments: [],
  },
];

// Functions
const getPost = id => posts.filter(posting => posting.id === +id);

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
  const { title, city, sportsTypes, content, date } = req.body;

  const maxId = (() => Math.max(...posts.map(({ id }) => id)))();

  try {
    const newPost = {
      id: maxId + 1,
      title,
      writer: 'writer 1',
      city,
      sportsTypes,
      content,
      date,
      recruit: true,
    };

    posts = [...posts, newPost];

    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send(error);
  }
});

const getMaxId = comments => Math.max(...comments.map(({ id }) => id));

const changePost = newPost => {
  posts = posts.map(post => (post.id === newPost.id ? newPost : post));
};

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
  const { id } = req.params;

  try {
    const [post] = getPost(id);
    const newPost = { ...post, recruit: !post.recruit };

    changePost(newPost);

    res.send(newPost);
  } catch (e) {
    console.error(e);
  }
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

    res.send();
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
