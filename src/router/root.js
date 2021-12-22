const express = require('express');
// MOCK
const users = [
  {id: "eastflow1", pw: "e1234567", nickname:"강아지"},
  {id: "eastflow2", pw: "e1234567", nickname:"고양이"},
  {id: "eastflow3", pw: "e1234567", nickname:"두더지"},
  {id: "eastflow4", pw: "e1234567", nickname:"호랑이"},
];

const rootRouter = express.Router();

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
    res.send('2');
  }
});

module.exports = rootRouter;
