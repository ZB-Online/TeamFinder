import addCommentEvent from './event/addCommentEvent.js';

export default function Comment ({ $parent, initialState }) {
  this.state = initialState;
  this.$target = document.createElement('div');
  this.$target.classList.add('post-container');
  $parent.appendChild(this.$target);

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = `
      <article class="box-comment">
        <section class="box-comment-input">
          <h2 class="count-comment">0개의 댓글</h2>
          <textarea class="area-comment-input" placeholder="댓글을 입력하세요."></textarea>
          <button class="btn-comment-upload">댓글 등록</button>
        </section>
        <ul class="list-comment"></ul>
      </article>
    `;
  };

  this.addEvent = () => {
    addCommentEvent();
  };

  this.render();
  this.addEvent();
}

export const CommentComponent = ($parent, initialState) => {
  $parent.removeChild($parent.lastChild);
  new Comment({ $parent, initialState });
};
