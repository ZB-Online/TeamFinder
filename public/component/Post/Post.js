import addEvent from './event/app.js';

export default function Comment({ $parent, initialState }) {
  this.state = initialState;
  this.$target = document.createElement('main');
  $parent.appendChild(this.$target);

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = `
      <div class="modal-wrap hidden">
        <div class="modal">
          <div class="message">
            <p>삭제하면 작성하신 글을 되돌릴 수 없습니다.</p>
            <p>삭제하시겠습니까?</p>
          </div>
          <div class="btn-box-2">
            <button class="btn cancel">아니오</button>
            <button class="btn apply">네 삭제합니다</button>
          </div>
        </div>
      </div>
      <div class="post-container">
        <div class="rewind">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 448 512"
            color="808080"
            cursor="pointer"
            height="30"
            width="30"
            xmlns="http://www.w3.org/2000/svg"
            style="color: rgb(128, 128, 128)"
          >
            <path
              d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"
            ></path>
          </svg>
        </div>
        <article class="post-box box" data-id="1"></article>
        <article class="comment-box box"></article>
      </div>`;
  };

  this.addEvent = () => {
    addEvent();
  };

  this.render();
  this.addEvent();
}
