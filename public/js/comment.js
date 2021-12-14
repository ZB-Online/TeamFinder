// Login State
const loggedIn = true;

// User Auth
const userAuth = 2;

// Fake Data
const users = [
  { id: 0, name: '으르렁' },
  { id: 1, name: '호랑이' },
  { id: 2, name: '원숭이' },
];

let comments = [
  {
    content: '첫 번째 댓글',
    date: '2021-12-13',
    owner: users[0], // user id
  },
  {
    content: '두 번째 댓글',
    date: '2021-12-13',
    owner: users[1], // user id
  },
];

// DOM Element
const $countComment = document.querySelector('.count-comment');
const $btnCommentUpload = document.querySelector('.btn-comment-upload');
const $listComment = document.querySelector('.list-comment');

const getElementComment = ({ owner, date, content }) => `
    <li class="comment">
      <section class="header-comment">
        <div class="user-info">
          <img
            class="info-image"
            src="https://hola-post-image.s3.ap-northeast-2.amazonaws.com/default.PNG"
            alt="default"
          />
          <div class="info-name">${owner.name}</div>
          <div class="info-date">${date}</div>
        </div>
        ${
          userAuth === owner.id
            ? `<div class="box-btns">
              <button class="btn-modify">수정</button>
              <button class="btn-delete">삭제</button>
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
  $listComment.innerHTML = comments.map(comment => getElementComment(comment)).join('');
};

// Init
renderComments();

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
  const contentComment = $contentComment.value.replace(/\n/g, '<br />');

  // Format Date
  const date = (() => {
    const format = num => (num < 10 ? `0${num}` : `${num}`);

    const today = new Date();
    return `${today.getFullYear()}-${format(today.getMonth() + 1)}-${format(today.getDate())}`;
  })();

  const newComment = {
    content: contentComment,
    date,
    owner: users[userAuth],
  };

  comments = [...comments, newComment];

  renderComments();

  $contentComment.value = '';
};
