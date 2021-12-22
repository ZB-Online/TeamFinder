const express = require('express');
// MOCK
let users = [
  {id: "eastflow1", pw: "e1234567", nickname:"강아지"},
  {id: "eastflow2", pw: "e1234567", nickname:"고양이"},
  {id: "eastflow3", pw: "e1234567", nickname:"두더지"},
  {id: "eastflow4", pw: "e1234567", nickname:"호랑이"},
];

const rootRouter = express.Router();

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
    res.send(users);
  } catch (e) {
    console.log(e);
  }
});

rootRouter.post('/signin', (req, res) => {
  let state = false;
  let userData = {};
  users.forEach(user => {
    if(user.id === req.body.id && user.pw ===req.body.pw) {
      state = true;
      userData = user;
    }
  });
  if(state) {
    // 로그인 성공
    res.send([userData.id, userData.nickname]);
  }else{
    // 로그인 실패
    res.send(false);
  }
});

// 회원가입
rootRouter.post('/signup', (req, res) => {
  if(users.some(user => user.id === req.body.id)){
    res.send('0'); // id 중복: 0
  }else if(users.some(user => user.nickname === req.body.nickname)){
    res.send('1'); // 닉네임 중복: 1
  }else{
    users.push(req.body);
    res.send([req.body.id, req.body.nickname]);
  }
});

module.exports = rootRouter;
