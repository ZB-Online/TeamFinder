const express = require('express');

const rootRouter = express.Router();

let users = [
  { id: 'kim', pw: 'k123', nickname: '강아지' },
  { id: 'lee', pw: 'l123', nickname: '고양이' },
  { id: 'park', pw: 'p123', nickname: '두더지' },
  { id: 'yoon', pw: 'y123', nickname: '호랑이' },
];

const getUser = id => users.filter(user => user.id === id);

rootRouter.get('/users', (req, res) => {
  const sendingData = [...users];

  res.status(200).json(sendingData);
});

rootRouter.get('/users/:id', (req, res) => {
  const { id } = req.params;

  try {
    const [user] = getUser(id);
    res.send(user);
  } catch (e) {
    console.error(e);
  }
});

rootRouter.patch('/users/:id', (req, res) => {
  const {
    params: { id },
    body: { nickname },
  } = req;
  try {
    users = users.map(user => (user.id === id ? Object.assign(user, { nickname }) : user));
    res.send(users);
  } catch (e) {
    res.status(400).send(e);
  }
});

rootRouter.delete('/users/:id', (req, res) => {
  try {
    const { id } = req.params;
    users = users.filter(user => user.id !== id);
    res.send();
  } catch (e) {
    console.log(e);
  }
});

rootRouter.post('/signin', (req, res) => {
  console.log(req.body);

  res.send();
});

rootRouter.post('/signup', (req, res) => {
  console.log(req.body);

  res.send();
});

module.exports = rootRouter;
