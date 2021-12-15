import { todayFormat } from '../../utils/date.js';
import store from './comment.js';

// Login State
const loggedIn = true;

// User Auth
const authUser = { id: 1, nickname: '호랑이' };

// DOM Element
const $btnCommentUpload = document.querySelector('.btn-comment-upload');
const $listComment = document.querySelector('.list-comment');

// Functions
const formatContent = content => content.replace(/\n/g, '<br />');

// Init
window.addEventListener('DOMContentLoaded', () => {
  store.getPosting();
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
  store.uploadComment({
    content: contentComment,
    date: todayFormat(),
    owner: authUser,
  });

  $contentComment.value = '';
};

// Modify and Delete Comment
$listComment.onclick = (() => {
  let originContent = '';

  return ({ target }) => {
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
      const commentIdx = target.parentNode.parentNode.dataset.index;

      store.patchComment(commentIdx, contentComment);
    }

    // Delete
    if (target.classList.contains('delete')) {
      const commentIdx = target.parentNode.parentNode.parentNode.dataset.index;

      store.deleteComment(commentIdx);
    }
  };
})();
