import express from 'express';

// MOCK
const users = [
  {name: "kim", pw: "k123"},
  {name: "lee", pw: "l123"},
  {name: "park", pw: "p123"},
  {name: "yoon", pw: "y123"},
]

const rootRouter = express.Router();

rootRouter.post('/signin', (req, res) => {
  let state = false;
  users.forEach(user => {
    if(user.name === req.body.name && user.pw ===req.body.pw) {
      state = true;
    }
  });
  if(state) {
    // 로그인 성공
    console.log('signIn success');
    res.send(true);
  }else{
    // 로그인 실패
    console.log('signIn fail');
    res.send(false);
  }
});

// 회원가입
rootRouter.post('/signup', (req, res) => {
  // 중복이 있으면 false를 반환함
  if(users.every(user => user.name !== req.body.name)) {
    // true
    users.push(req.body);
    res.send(true);
  }else{
    // false
    res.send(false);
  }
});

export default rootRouter;
