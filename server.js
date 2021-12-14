const express = require('express');

// MOCK
const users = [
  {name: "kim", pw: "k123"},
  {name: "lee", pw: "l123"},
  {name: "park", pw: "p123"},
  {name: "yoon", pw: "y123"},
]



const app = express();
const PORT = 5500;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

app.use(express.static('./public'));
app.get('/todos', (req, res) => {
  res.send(users);
})
app.use(express.json());
// 로그인
app.post('/signin', (req, res) => {
  let state = false;
  users.forEach(user => {
    if(user.name === req.body.name && user.pw ===req.body.pw) {
      state = true;
    }
  });
  if(state) {
    // 로그인 성공
    console.log('signIn success')
    res.send(true);
  }else{
    // 로그인 실패
    // res.send('msg send')
    console.log('signIn fail')
    res.send(false);
  }
});

// 회원가입
// 아이디 중복을 검사하여 제대로 생성되었는지 확인
app.post('/signup', (req, res) => {
  // 중복이 있으면 false를 반환함
  if(users.every(user => user.name !== req.body.name)) {
    // true
    users.push(req.body);
    res.send(true);
  }else{
    // false
    res.send(false)
  }
  // res.send(users);
});

// 회원 확인용 코드
app.post('/check', (req,res) => res.send(users));