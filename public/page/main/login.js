const $loginBtn = document.querySelector('.login');
const $loginWrap = document.querySelector('.login-wrap');
const $form = document.querySelector('#form');
const $signinBtn = document.querySelector('#signin-btn');
const $signupBtn = document.querySelector('#signup-btn');
const $errorMsg = document.querySelector('#error-msg');
const $navbarMenus = document.querySelector('.navbar-menus');
const $userMenuItem = document.querySelector('.user-menu-item:last-Child');

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
  });
  document.querySelector('.input-label:last-child').classList.toggle = 'hidden';
}

const formInit = () => {
  $form[0].value = '';
  $form[1].value = '';
  $form[2].value = '';
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
    document.querySelector('.input-label:last-child').style.display = 'none';
  }
}

const navbarToggle = () => {
  [...$navbarMenus.children].forEach(li => {
    if(li.classList.toggle('hidden'));
  });
}


// 로그인 창 띄우기
$loginBtn.addEventListener('click', () => {
  $loginWrap.style.display = "block";
});

// 회원가입/로그인 토글 및 아이콘 닫기
$loginWrap.addEventListener('click', e => {

  if(e.target === document.querySelector('#signup')) {
    displayToggle();
    formInit();
    errHidden();

    document.querySelector('.sign-state').textContent = 'Sign Up';
    document.querySelector('.input-label:last-child').style.display = 'block';
    $errorMsg.textContent = '아이디가 중복되었거나 올바르지 않습니다.';
  }

  if(e.target === document.querySelector('#signin')) {
    displayToggle();
    formInit();
    errHidden();
    document.querySelector('.input-label:last-child').style.display = 'none';
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
      id: $form[0].value,
      pw: $form[1].value
    }).then(res => {
      if(!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(userData => {
      if(userData) { // 로그인 성공
        loginHidden();
        formInit();
        errHidden();
        navbarToggle();
        // 세션 스토리지는 탭이 바뀌면 유지가 안됨 기각
        // localStorage.setItem('teamFinderUserLoginData', userData.id);
        localStorage.setItem('teamfinderId', userData[0]);
        localStorage.setItem('teamfinderNickname', userData[1]);
        document.querySelector('.navbar-user-name').textContent = localStorage.teamfinderNickname;

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
  
  if($form[0].value === '' || $form[1].value === '' ||  $form[2].value === '')
  $errorMsg.style.visibility = "visible";
  else{
    request.post('/signup', {
      id: $form[0].value,
      pw: $form[1].value,
      nickname: $form[2].value
    }).then(res => {
      if(!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(msg => {
      if(msg === 2){ // 가입 성공
        loginHidden();
        errHidden();
        formInit();
      }
      else { // 1이나 0일때
        if(msg === 1){
          $errorMsg.textContent = '별명이 중복되었습니다.';
        }
        errVisible();
        formInit();
      }
    })
    .catch(err => console.log(err));
  }
});

// 로그아웃
$userMenuItem.addEventListener('click', () => {
  navbarToggle();
  localStorage.removeItem('teamfinderId');
  localStorage.removeItem('teamfinderNickname');
});

window.addEventListener('DOMContentLoaded', ()=>{
  // document.querySelector('.navbar-menus').style.visibility = 'hidden';
  if(localStorage.getItem('teamfinderId')){
    document.querySelector('.navbar-user-name').textContent = localStorage.getItem('teamfinderNickname');
    navbarToggle();
  }
  setTimeout(() => {
    document.querySelector('.navbar-menus').style.visibility = 'visible';
  }, .1);
});

// window.addEventListener('unload', () => {
//   localStorage.removeItem('teamfinderId');
//   localStorage.removeItem('teamfinderNickname');
// });

// 유저 정보 체크용
document.querySelector('#checkaaa').addEventListener('click', e => {
  request.post('/check', {}).then(res => {
    if(!res.ok) throw new Error(res.statusText);
    return res.json();
  })
  .then(userData => {
    console.log(userData)
    })
  .catch(err => console.error(err));
});
