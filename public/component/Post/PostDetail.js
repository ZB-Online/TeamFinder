import addPostDetailEvent from './event/addPostDetailEvent.js';

export default function PostDetail({ $parent, initialState }) {
  this.state = initialState;
  this.$target = document.createElement('main');
  if ($parent.children.length > 1) $parent.removeChild($parent.lastChild);
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
        <article class="post-box box" data-id="1"></article>
        <article class="comment-box box"></article>
      </div>`;
  };

  this.addEvent = () => {
    addPostDetailEvent($parent);
  };

  this.render();
  this.addEvent();
}
