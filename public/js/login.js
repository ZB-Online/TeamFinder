const $loginBtn = document.querySelector('.login');
const $loginWrap = document.querySelector('.login-wrap');
// const $signinBtn = document.querySelector('#signin-btn');
// const $form = document.querySelector('#form');


// const request = {
//   get(url){
//     return fetch(url);
//   },
//   post(url, payload){
//     return fetch(url, {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify(payload)
//     });
//   },
//   patch(url, payload) {
//     return fetch(url, {
//       method: 'PATCH',
//       headers: {"Content-Type": 'application/json'},
//       body: JSON.stringify(payload)
//     });
//   }
// }


// const promised = fetch().then(res => console.log(res));

// 로그인 창 띄우기
$loginBtn.addEventListener('click', () => {
  $loginWrap.style.display = "block";
});


// 로그인창 외부 선택시 로그인창 닫기
$loginWrap.addEventListener('click', e => {
  if(!(e.target === e.currentTarget)) return;
  $loginWrap.style.display = "none";
});

// 회원가입 클릭시 내용 전환
$loginWrap.addEventListener('click', e => {
  if(e.target === document.querySelector('#signup')) {
    $loginWrap.innerHTML = `
    <div class="login-box">
    <div class="login-banner">
      <!-- 로고 대체 이미지 아무거나 집어넣음 -->
      <img src="img/favicon-32x32.png" alt="">
      <span class="material-icons">close</span>
    </div>
    <div class="login-body">
      <form id="form">
        <label for="" class="input-label">
          <span>ID</span>
          <input type="text" class="input" placeholder="아이디를 입력하세요">
        </label>
        <label for="" class="input-label">
          <span>PW</span>
           <input type="password" class="input" placeholder="비밀번호를 입력하세요">
        </label>
        <button type="submit" id="signup-btn">sign up</button>
      </form>
      <a href="javascript:void(0)" id="signin">로그인</a>
    </div>
  </div>`
  }

  if(e.target === document.querySelector('#signin')) {
    $loginWrap.innerHTML = `
    <div class="login-box">
    <div class="login-banner">
      <!-- 로고 대체 이미지 아무거나 집어넣음 -->
      <img src="img/favicon-32x32.png" alt="">
      <span class="material-icons">close</span>
    </div>
    <div class="login-body">
      <form id="form">
        <label for="" class="input-label">
          <span>ID</span>
          <input type="text" class="input" placeholder="아이디를 입력하세요">
        </label>
        <label for="" class="input-label">
          <span>PW</span>
           <input type="password" class="input" placeholder="비밀번호를 입력하세요">
        </label>
        <button type="submit" id="signin-btn">sign in</button>
      </form>
      <a href="javascript:void(0)" id="signup">회원가입</a>
    </div>
  </div>
    `
  }
});


// 로그인 버튼 (현재 post데이터 통신을 위해 테스트중)
// $signinBtn.addEventListener('click', e => {
//   e.preventDefault();
//   // console.log($form[0].value);
//   // console.log($form[1].value);

//   request.post('/todos', {
//     id: 1,
//     name: $form[0].value,
//     pw: $form[1].value
//   }).then(res => {
//     if(!res.ok) throw new Error(res.statusText);
//     return res.json();
//   })
//   .then(todos => console.log(todos))
//   .catch(err => console.log(err));

//   // request.get('/todos')
//   // .then(res => res.json())
//   // .then(todos => console.log(todos))
//   // .catch(err => console.log(err));
// })