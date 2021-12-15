const $countComment = document.querySelector('.count-comment');
const $listComment = document.querySelector('.list-comment');

const getElementComment = ({ owner, date, content }, authUser, idx) => `
    <li class="comment" data-index=${idx}>
      <section class="header-comment">
        <div class="user-info">
          <img
            class="info-image"
            src="https://hola-post-image.s3.ap-northeast-2.amazonaws.com/default.PNG"
            alt="default"
          />
          <div class="info-name">${owner.nickname}</div>
          <div class="info-date">${date}</div>
        </div>
        ${
          authUser.id === owner.id
            ? `<div class="box-btns">
              <button class="modify">수정</button>
              <button class="delete">삭제</button>
            </div>`
            : ''
        }
      </section>
      <section class="content-comment">
        ${content}
      </section>
    </li>
  `;

const renderComments = store => {
  const comments = [...store.comments];
  const { authUser } = store;
  $countComment.textContent = `${comments.length}개의 댓글`;
  $listComment.innerHTML = comments.map((comment, idx) => getElementComment(comment, authUser, idx)).join('');
};

export default renderComments;
