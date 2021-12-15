import express from 'express';

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
apiRouter.get('/posts', (req, res) => {
  let sendingData = [...posts];
  if (req.query.cities && req.query.sports) {
    const currentCities = req.query.cities.split(',');
    const currentSports = req.query.sports.split(',');
    sendingData = sendingData.filter(
      post =>
        currentCities.includes(FILTER.CITIES[post.city]) &&
        post.sportsType.some(sports => currentSports.includes(FILTER.SPORTS[sports])),
    );
  }
  res.status(200).json(sendingData);
});

apiRouter.get('/posts/:id', (req, res) => {
  const { id } = req.params;

  const post = posts.filter(post => post.id === +id);

  res.send(post);
});

// POST
apiRouter.post('/posts', (req, res) => {
  // body is not null
  const { title, city, sportsType, content, date } = req.body;

  const maxId = (() => Math.max(...posts.map(({ id }) => id)))();

  try {
    const newPost = {
      id: maxId + 1,
      title,
      writer: 'writer 1',
      city,
      sportsType,
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

// PATCH
apiRouter.patch('/posts/:id', (req, res) => {
  const {
    params: { id },
    // body is not null
    body: { title, city, sportsType, content, recruit },
  } = req;

  try {
    posts = posts.map(post =>
      post.id === +id ? Object.assign(post, { title, city, sportsType, content, recruit }) : post,
    );

    res.send(posts);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE
apiRouter.delete('/posts/:id', (req, res) => {
  const { id } = req.params;

  posts = posts.filter(post => post.id !== +id);

  res.send(posts);
});

export default apiRouter;
