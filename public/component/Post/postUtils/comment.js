const getElementComment = ({ owner, date, content }, authUser, idx) => `
    <li class="comment" data-id=${idx}>
      <section class="header-comment">
        <div class="user-info">
          <img
            class="info-image"
            src="https://hola-post-image.s3.ap-northeast-2.amazonaws.com/default.PNG"
            alt="default"
          />
          <p class="info-name">${owner.nickname}</p>
          <p class="info-date">${date}</p>
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
        <p>${content}</p>
      </section>
    </li>
  `;

const renderComments = store => {
  const $countComment = document.querySelector('.count-comment');
  const $listComment = document.querySelector('.list-comment');
  const comments = [...store.comments];
  const { authUser } = store;
  $countComment.textContent = `${comments.length}개의 댓글`;
  $listComment.innerHTML = comments.map((comment, idx) => getElementComment(comment, authUser, idx)).join('');
};

export default renderComments;
