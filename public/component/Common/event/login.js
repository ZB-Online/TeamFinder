import { ROUTE_TYPE, routes } from '../../App.js';

const addLoginEvent = $parent => {
  const $loginBtn = document.querySelector('.login');
  const $loginWrap = document.querySelector('.login-wrap');
  const $form = document.querySelector('.form');
  const $signinBtn = document.querySelector('.signin-btn');
  const $signupBtn = document.querySelector('.signup-btn');
  const $errorMsg = document.querySelector('.error-msg');
  const $navbarMenus = document.querySelector('.navbar-menus');
  const $userMenuItem = document.querySelector('.user-menu-item:last-Child');

  const request = {
    post (url, payload) {
      return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    },
  };

  const displayToggle = () => {
    [...document.querySelector('.btns').children].forEach(node => {
      node.classList.toggle('display-toggle');
    });
    document.querySelector('.input-label:last-child').classList.toggle = 'hidden';
  };

  const formInit = () => {
    // value 및 아이콘
    for (let i = 0; i < 3; i++) {
      $form[i].value = '';
      $form[i].nextSibling.nextSibling.style.display = 'none';
      $form[i].nextSibling.nextSibling.nextSibling.nextSibling.classList.add('hidden');
    }
  };

  const errVisible = () => {
    $errorMsg.style.visibility = 'visible';
  };

  const errHidden = () => {
    $errorMsg.style.visibility = 'hidden';
  };

  const loginHidden = () => {
    $loginWrap.style.display = 'none';
    if (!document.querySelector('.signin').classList.contains('display-toggle')) {
      displayToggle();
      document.querySelector('.sign-state').textContent = 'Sign In';
      $errorMsg.textContent = '로그인 정보가 올바르지 않습니다.';
      document.querySelector('.input-label:last-child').style.display = 'none';
    }
  };

  const navbarToggle = () => {
    [...$navbarMenus.children].forEach(li => {
      if (li.classList.toggle('hidden'));
    });
  };

  const loadNewPage = () => {
    if (localStorage.getItem('teamfinderId')) {
      document.querySelector('.navbar-user-name').textContent = localStorage.getItem('teamfinderNickname');
      navbarToggle();
    }
    setTimeout(() => {
      document.querySelector('.navbar-menus').style.visibility = 'visible';
    }, 0.1);
  };

  const envisibleWarning = inputNumber => {
    $form[inputNumber].nextSibling.nextSibling.style.display = 'none';
    $form[inputNumber].nextSibling.nextSibling.nextSibling.nextSibling.classList.add('hidden');
  };

  const visibleWarning = inputNumber => {
    $form[inputNumber].nextSibling.nextSibling.style.display = 'inline-block';
    $form[inputNumber].nextSibling.nextSibling.nextSibling.nextSibling.classList.remove('hidden');
  };

  // 로그인 창 띄우기
  $loginBtn.addEventListener('click', () => {
    $loginWrap.style.display = 'block';
  });

  // 회원가입/로그인 토글 및 아이콘 닫기
  $loginWrap.addEventListener('click', e => {
    if (e.target === document.querySelector('.signup')) {
      displayToggle();
      formInit();
      errHidden();

      document.querySelector('.sign-state').textContent = 'Sign Up';
      document.querySelector('.input-label:last-child').style.display = 'block';
      $errorMsg.textContent = '아이디가 중복되었거나 올바르지 않습니다.';
    }

    if (e.target === document.querySelector('.signin')) {
      displayToggle();
      formInit();
      errHidden();
      document.querySelector('.input-label:last-child').style.display = 'none';
      document.querySelector('.sign-state').textContent = 'Sign In';
      $errorMsg.textContent = '로그인 정보가 올바르지 않습니다.';
    }
    // 닫기 아이콘
    if (e.target === document.querySelector('box-icon')) {
      loginHidden();
    }
  });

  // 아이디 글자수 만들기
  // 키 다운 따로 걸기
  $form[0].addEventListener('input', () => {
    if (/^\S{8,16}$/.test($form[0].value)) envisibleWarning(0);
    else visibleWarning(0);
  });
  // 비밀번호 글자수 만들기
  $form[1].addEventListener('input', () => {
    if (/^\S{8,16}$/.test($form[1].value)) envisibleWarning(1);
    else visibleWarning(1);
  });

  // 별명 글자수 만들기
  $form[2].addEventListener('input', () => {
    if (/^\S{2,5}$/.test($form[2].value)) envisibleWarning(2);
    else visibleWarning(2);
  });

  // 로그인 버튼
  $signinBtn.addEventListener('click', e => {
    e.preventDefault();
    if ($form[0].value === '' || $form[1].value === '') {
      errVisible();
    } else {
      request
        .post('/signin', {
          id: $form[0].value,
          pw: $form[1].value,
        })
        .then(res => {
          if (!res.ok) throw new Error(res.statusText);
          return res.json();
        })
        .then(userData => {
          if (userData) {
            // 로그인 성공
            loginHidden();
            formInit();
            errHidden();
            navbarToggle();
            localStorage.setItem('teamfinderId', userData[0]);
            localStorage.setItem('teamfinderNickname', userData[1]);
            document.querySelector('.navbar-user-name').textContent = localStorage.teamfinderNickname;
          } else {
            // 실패
            errVisible();
            // formInit();
          }
        })
        .catch(err => console.error(err));
    }
  });

  // 회원가입 버튼
  $signupBtn.addEventListener('click', e => {
    e.preventDefault();

    if (
      $form[0].value === '' ||
      $form[1].value === '' ||
      $form[2].value === '' ||
      $form[0].value.length > 16 ||
      $form[0].value.length < 8 ||
      $form[1].value.length > 16 ||
      $form[1].value.length < 8 ||
      $form[2].value.length > 5 ||
      $form[2].value.length < 2
    )
      $errorMsg.style.visibility = 'visible';
    else {
      request
        .post('/signup', {
          id: $form[0].value,
          pw: $form[1].value,
          nickname: $form[2].value,
        })
        .then(res => {
          if (!res.ok) throw new Error(res.statusText);
          return res.json();
        })
        .then(msg => {
          if (msg === 1) {
            // 가입 실패
            $errorMsg.textContent = '별명이 중복되었습니다.';
            errVisible();
            // formInit();
          } else if (msg === 0) {
            errVisible();
            // formInit();
          } else {
            // 가입 성공
            loginHidden();
            errHidden();
            formInit();
            navbarToggle();
            localStorage.setItem('teamfinderId', msg[0]);
            localStorage.setItem('teamfinderNickname', msg[1]);
            document.querySelector('.navbar-user-name').textContent = localStorage.teamfinderNickname;
          }
        })
        .catch(err => console.error(err));
    }
  });

  // 로그아웃
  $userMenuItem.addEventListener('click', () => {
    navbarToggle();
    localStorage.removeItem('teamfinderId');
    localStorage.removeItem('teamfinderNickname');

    // 메인화면에서라면 새로고침 하지않게 -> 안티패턴
    window.history.pushState({}, ROUTE_TYPE.HOME, window.location.origin + ROUTE_TYPE.HOME);
    routes[ROUTE_TYPE.HOME]($parent);
  });

  // 초기 로드
  loadNewPage();
};

export default addLoginEvent;
