import addSettingEvent from './event/addSettingEvent.js';
import addPostListEvent from '../Home/event/addPostListEvent.js';

export default function Setting({ $parent, initialState }) {
  this.state = initialState;
  this.$target = document.createElement('div');
  if ($parent.children.length > 1) $parent.removeChild($parent.lastChild);
  $parent.appendChild(this.$target);

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = `
      <main class="setting-wrap">
      <h1>내 정보 수정</h1>
      <section class="setting-img-area">
        <img
          class="setting-userImg"
          src="https://hola-post-image.s3.ap-northeast-2.amazonaws.com/default.PNG"
          alt="user image"
        />
        <div class="settign-img-control">
          <label for="img-input" class="setting-btn img-add">
            이미지 선택
            <input type="file" id="img-input" />
          </label>
          <button class="setting-btn img-remove">이미지 제거</button>
        </div>
      </section>
      <section class="setting-nickName-wrap">
        <h3>닉네임</h3>
        <input type="text" class="nickName-input" />
      </section>
      <p class="nickName-divison">TeamFinder에서 사용되는 이름입니다.</p>
      <hr />
      <section>
        <div class="mybooks-text">
          <svg
            svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            style="fill: rgba(0, 0, 0, 1)"
          >
            <path
              d="M6.012 18H21V4a2 2 0 0 0-2-2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.988 5 19.805 5 19s.55-.988 1.012-1zM8 6h9v2H8V6z"
            ></path>
          </svg>
          <span>작성 목록</span>
        </div>
        <ul class="post-list"></ul>
      </section>
      <p class="nickName-divison">TeamFinder에서 내가 작성한 게시글 입니다.</p>
      <hr />
      <section>
        <button class="setting-btn setting-submit">완료</button>
        <button class="setting-btn member-out">회원탈퇴</button>
      </section>
    </main>
    <section class="popup-wrap">
      <div class="delete-popup">
        <p>TeamFinder에서 계정을 삭제하시겠어요?</p>
        <div class="member-popup">
          <button class="popup-delete popup-delete-no">아니요</button>
          <button class="popup-delete popup-delete-yes">네, 삭제할래요</button>
        </div>
      </div>
    </section>
    `;
  };

  this.addEvent = () => {
    addSettingEvent(this.$target, $parent);
    addPostListEvent($parent, this.$target);
  };

  this.render();
  this.addEvent();
}
export const SettingComponent = ($parent, initialState) => {
  $parent.removeChild($parent.lastChild);
  new Setting({ $parent, initialState });
};
