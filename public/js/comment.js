// Login State
const loggedIn = true;

// User Auth
const authUser = { id: 1, nickname: '호랑이' };

// Fake Data
let comments = [];

// DOM Element
const $countComment = document.querySelector('.count-comment');
const $btnCommentUpload = document.querySelector('.btn-comment-upload');
const $listComment = document.querySelector('.list-comment');

// Functions
const getElementComment = ({ owner, date, content }, idx) => `
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

const renderComments = () => {
  $countComment.textContent = `${comments.length}개의 댓글`;
  $listComment.innerHTML = comments.map((comment, idx) => getElementComment(comment, idx)).join('');
};

// Fetch Data
const fetchPosting = async postingId => {
  await fetch(`/api/postings/${postingId}`)
    .then(res => res.json())
    .then(([posting]) => {
      comments = posting.comments;
    });

  renderComments();
};

const formatContent = content => content.replace(/\n/g, '<br />');

// Init
window.addEventListener('DOMContentLoaded', () => {
  fetchPosting(1); // posting id
});

// Event Button(Upload) Click
$btnCommentUpload.onclick = ({ target }) => {
  if (!loggedIn) {
    console.log('로그인이 필요합니다.');
    return;
  }

  const $contentComment = target.previousElementSibling;
  if (!$contentComment.value) {
    console.log('댓글을 입력해주세요.');
    return;
  }

  // Format Content
  const contentComment = formatContent($contentComment.value);

  // Format Date
  const date = (() => {
    const format = num => (num < 10 ? `0${num}` : `${num}`);

    const today = new Date();
    // Todo: Time
    return `${today.getFullYear()}-${format(today.getMonth() + 1)}-${format(today.getDate())}`;
  })();

  const newComment = {
    content: contentComment,
    date,
    owner: authUser,
  };

  comments = [...comments, newComment];

  renderComments();

  $contentComment.value = '';
};

// Modify and Delete Comment
let originContent = '';

$listComment.onclick = ({ target }) => {
  if (!target.matches('button')) return;

  // Modify
  if (target.classList.contains('modify')) {
    const $contentComment = target.parentNode.parentNode.nextElementSibling;
    originContent = $contentComment.innerText;

    $contentComment.innerHTML = `
      <textarea class="area-comment-input" placeholder="댓글을 입력하세요.">${$contentComment.innerText}</textarea>
      <button class="cancel">취소</button>
      <button class="apply">적용</button>
    `;
  }

  // Modify Cancel
  if (target.classList.contains('cancel')) {
    const $contentComment = target.parentNode;
    $contentComment.innerHTML = formatContent(originContent);
  }

  // Modify Apply
  if (target.classList.contains('apply')) {
    const contentComment = formatContent(target.parentNode.firstElementChild.value);
    const commentNum = target.parentNode.parentNode.dataset.index;

    comments = comments.map((comment, idx) =>
      idx === +commentNum ? { ...comment, content: contentComment } : comment
    );

    renderComments();
  }

  // Delete
  if (target.classList.contains('delete')) {
    const commentIdx = target.parentNode.parentNode.parentNode.dataset.index;

    comments = comments.filter((_, idx) => +commentIdx !== idx);

    renderComments();
  }
};
