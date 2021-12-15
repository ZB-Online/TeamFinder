const $loginBtn = document.querySelector('.login');
const $loginWrap = document.querySelector('.login-wrap');
const $form = document.querySelector('#form');
const $signinBtn = document.querySelector('#signin-btn');
const $signupBtn = document.querySelector('#signup-btn');
const $errorMsg = document.querySelector('#error-msg');

const request = {
  post(url, payload){
    return fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    });
  }
}

const displayToggle = () => {
  [...document.querySelector('.btns').children].forEach(node => {
    node.classList.toggle('display-toggle');
  })
}

const formInit = () => {
  $form[0].value = '';
  $form[1].value = '';
}

const errVisible = () => {
  $errorMsg.style.visibility = "visible";
}

const errHidden = () => {
  $errorMsg.style.visibility = "hidden";
}

const loginHidden = () => {
  $loginWrap.style.display = "none";
  if(!document.querySelector('#signin').classList.contains('display-toggle')){
    displayToggle();
    document.querySelector('.sign-state').textContent = 'Sign In';
    $errorMsg.textContent = '로그인 정보가 올바르지 않습니다.';
  }
    
}

// 로그인 창 띄우기
$loginBtn.addEventListener('click', () => {
  $loginWrap.style.display = "block";
});

// 로그인창 외부 선택시 로그인창 닫기
$loginWrap.addEventListener('click', e => {
  if(!(e.target === e.currentTarget)) return;
  loginHidden();
  formInit();
});

// 회원가입/로그인 토글 및 아이콘 닫기
$loginWrap.addEventListener('click', e => {

  if(e.target === document.querySelector('#signup')) {
    displayToggle();
    formInit();
    errHidden();

    document.querySelector('.sign-state').textContent = 'Sign Up';
    $errorMsg.textContent = '아이디가 중복되었거나 올바르지 않습니다.';
  }

  if(e.target === document.querySelector('#signin')) {
    displayToggle();
    formInit();
    errHidden();

    document.querySelector('.sign-state').textContent = 'Sign In';
    $errorMsg.textContent = '로그인 정보가 올바르지 않습니다.';
  }
  // 닫기 아이콘
  if(e.target === document.querySelector('.close-icon')){
    loginHidden();
  }
});

// 로그인 버튼
$signinBtn.addEventListener('click', e => {
  e.preventDefault();
  if($form[0].value === '' || $form[1].value === ''){
    errVisible();
  }else{
    request.post('/signin', {
      name: $form[0].value,
      pw: $form[1].value
    }).then(res => {
      if(!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(msg => {
      if(msg) { // 로그인 성공
        document.querySelector('#login-state').textContent = 'sigin in success';
        loginHidden();
        formInit();
        errHidden();
      }
      else {
        errVisible();
        formInit();
      }
    })
    .catch(err => console.error(err));
  }
});

// 회원가입 버튼
$signupBtn.addEventListener('click', e => {
  e.preventDefault();
  
  if($form[0].value === '' || $form[1].value === '')
  $errorMsg.style.visibility = "visible";
  else{
    request.post('/signup', {
      name: $form[0].value,
      pw: $form[1].value
    }).then(res => {
      if(!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(msg => {
      if(msg){ // 가입 성공
        loginHidden();
        errHidden();
        formInit();
      }
      else {
        errVisible();
        formInit();
      }
    })
    .catch(err => console.log(err));
  }
});