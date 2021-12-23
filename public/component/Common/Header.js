import addHeaderEvent from './event/addHeaderEvent.js';
import addLoginEvent from './event/login.js';

export default function Header ({ $parent, initialState }) {
  this.state = initialState;
  this.$target = document.createElement('div');
  $parent.appendChild(this.$target);

  this.setState = nextState => {
    this.state = nextState;
    this.render();
    this.addEvent();
  };

  this.render = () => {
    this.$target.innerHTML = `
    <section class="login-wrap">
    <div class="login-box">
      <div class="login-banner">
        <span class="navbar-logo">TEAM_FINDER</span>
        <div class="close-icon">
          <box-icon name='x' class="close-icon"></box-icon>
        </div>
        
      </div>
      <div class="login-body">
        <p class="sign-state">Sign In</p>
        <form class="form" onsubmit="false">
          <label class="input-label">
            <span>ID</span>
            <input type="text" class="input-box" placeholder="8~16글자로 입력해주세요.">
            <div class="icon-error">
              <box-icon name='x-circle' type='solid' color='#e20606' ></box-icon>
            </div>
            <p class="warning-msg hidden">8~16글자로 입력해주세요.</p>
            </label>
            
            <label class="input-label">
            <span>PW</span>
            <input type="password" class="input-box" placeholder="8~16글자로 입력해주세요.">
            <div class="icon-error">
            <box-icon name='x-circle' type='solid' color='#e20606' ></box-icon>
            </div>
            <p class="warning-msg hidden">8~16글자로 입력해주세요.</p>
            </label>
            
            <label class="input-label hidden">
            <span>별명</span>
            <input type="text" class="input-box" placeholder="2~5글자로 입력해주세요.">
            <div class="icon-error">
            <box-icon name='x-circle' type='solid' color='#e20606' ></box-icon>
            </div>
            <p class="warning-msg hidden">2~5글자로 입력해주세요.</p>
          </label>
        </form>

        <p class="error-msg">로그인 정보가 올바르지 않습니다.</p>
        <div class="btns">
          <button type="submit" class="signin-btn" form="form">sign in</button>
          <button type="submit" class="signup-btn display-toggle" form="form">sign up</button>
          <a href="javascript:void(0)" class="delDeco signup">회원가입</a>
          <a href="javascript:void(0)" class="delDeco signin display-toggle">로그인</a>
        </div>
      </div>
    </div>
  </section>

    <header>
      <nav class="navbar">
        <a href="/" class="main-logo"><p class="navbar-logo">TEAM_FINDER</p></a>
        <ul class="navbar-menus">
          <li class="hidden"><a><button class="navbar-menus-item writing-btn">새 글 쓰기</button></a></li>
          <li><button class="navbar-menus-item login">로그인</button></li>
          <li class="navbar-user-wrapper hidden">
            <span class="navbar-user-name">우리집강아지</span>
            <img class="navbar-user-image" src="./assets/img/user.png" alt="유저 이미지" />
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="1.5em"
              width="1.5em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 10l5 5 5-5z"></path>
            </svg>
            <ul class="user-menu-list hidden">
              <li class="user-menu-item nav-setting-btn">내 정보 수정</li>
              <li class="user-menu-item">로그아웃</li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
    `;
  };

  this.addEvent = () => {
    addHeaderEvent($parent);
    addLoginEvent($parent);
  };

  this.render();
  this.addEvent();
}
