import addEventHeader from "./addEventHeader.js";

export default function Header({$app, initialState, onClick}){
  this.state = initialState;
  this.onClick = onClick;
  this.$target = document.createElement('div');
  $app.appendChild(this.$target);

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };
  
  this.render = () => {
    this.$target.innerHTML = `
    <header>
      <nav class="navbar">
        <a href="index.html"><p class="navbar-logo">TEAM_FINDER</p></a>
        <ul class="navbar-menus">
          <li><a><button class="navbar-menus-item writing-btn">새 글 쓰기</button></a></li>
          <li><button class="navbar-menus-item hidden">로그인</button></li>
          <li class="navbar-user-wrapper ">
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
              <li class="user-menu-item">내 작성글</li>
              <li class="user-menu-item">설정</li>
              <li class="user-menu-item">로그아웃</li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
    `;
  };

  this.addEvent = () => {
    addEventHeader(this.onClick);
  };

  this.render();
  this.addEvent();
}