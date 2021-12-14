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

// 로그인 창 띄우기
$loginBtn.addEventListener('click', () => {
  $loginWrap.style.display = "block";
});


// 로그인창 외부 선택시 로그인창 닫기
$loginWrap.addEventListener('click', e => {
  if(!(e.target === e.currentTarget)) return;
  $loginWrap.style.display = "none";
  $form[0].value = '';
  $form[1].value = '';
});

// 회원가입 클릭시 내용 전환 및 아이콘 닫기
$loginWrap.addEventListener('click', e => {

  if(e.target === document.querySelector('#signup')) {
    // 클래스 리스트 토글링으로 정리 가능할지도
    document.querySelector('#signin-btn').style.display = "none";
    document.querySelector('#signup-btn').style.display = "inline";
    document.querySelector('#signup').style.display = "none";
    document.querySelector('#signin').style.display = "inline";
    document.querySelector('.sign-state').textContent = 'Sign Up';
    $errorMsg.textContent = '아이디가 중복되었거나 올바르지 않습니다.';
    $errorMsg.style.visibility = "hidden";
    $form[0].value = '';
    $form[1].value = '';
  }

  if(e.target === document.querySelector('#signin')) {
    document.querySelector('#signin-btn').style.display = "inline";
    document.querySelector('#signup-btn').style.display = "none ";
    document.querySelector('#signup').style.display = "inline";
    document.querySelector('#signin').style.display = "none";
    document.querySelector('.sign-state').textContent = 'Sign In';
    $errorMsg.textContent = '로그인 정보가 올바르지 않습니다.';
    $errorMsg.style.visibility = "hidden";
    $form[0].value = '';
    $form[1].value = '';
  }
  // 닫기 아이콘
  if(e.target === document.querySelector('.close-icon')){
    $loginWrap.style.display = "none";
  }
});


// async await은 어디서 사용?

// 로그인 버튼 (현재 post데이터 통신을 위해 테스트중)
// 기본동작 막아둠, 회원가입의 로그인 버튼은 막지 못함
$signinBtn.addEventListener('click', e => {
  e.preventDefault();
  if($form[0].value === '' || $form[1].value === ''){
    $errorMsg.style.visibility = 'visible';
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
        $loginWrap.style.display = "none";
      }
      else {
        $errorMsg.style.visibility = 'visible';
        $form[0].value = '';
        $form[1].value = '';
      }
    })
    .catch(err => console.error(err));
  }
});


// 회원가입 버튼
$signupBtn.addEventListener('click', e => {
  e.preventDefault();
  
  // 두 input이 비어있지 않다면 통과 중복검사는?
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
        $loginWrap.style.display = "none";
        $form[0].value = '';
        $form[1].value = '';
      }
      else {
        $errorMsg.style.visibility = 'visible';
        $form[0].value = '';
        $form[1].value = '';
      }
    })
    .catch(err => console.log(err));
  }
});



// 회원 확인용ㅇ 코드
document.querySelector('#check').addEventListener('click', () => {
  request.post('/check', {}).then(res => res.json()).then(list => console.log(list));
})