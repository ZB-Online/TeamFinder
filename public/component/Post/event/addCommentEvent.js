import fetchComment from '../postUtils/fetchComment.js';
import { todayFormat } from '../../../utils/date.js';

export default function addCommentEvent () {
  // Login State
  const loggedIn = true;

  // User Auth
  const authUser = { id: 1, nickname: '호랑이' };

  // DOM Element
  const $btnCommentUpload = document.querySelector('.btn-comment-upload');
  const $listComment = document.querySelector('.list-comment');

  // Functions
  const textToHtml = text => text.replace(/\n/g, '<br />');

  const HtmlToText = html => html.replace(/<br>/g, '\n');

  // Init
  fetchComment.getPost();

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
    const contentComment = textToHtml($contentComment.value);

    // Format Date
    fetchComment.uploadComment({
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
      const $btnModify = document.querySelector('.modify');

      // Modify
      if (target.classList.contains('modify')) {
        if (target.classList.contains('active')) return;
        target.classList.add('active');

        // target.parentNode.parentNode.nextElementSibling : <section class="content-comment">...</section>
        const $contentComment = target.parentNode.parentNode.nextElementSibling;
        // $contentComment.firstElementChild : <p>...</p>
        originContent = $contentComment.firstElementChild.innerHTML;

        $contentComment.innerHTML = `
              <textarea class="area-comment-input" placeholder="댓글을 입력하세요.">
                ${HtmlToText(originContent)}
              </textarea>
              <button class="cancel">취소</button>
              <button class="apply">적용</button>
            `;
      }

      // Modify Cancel
      if (target.classList.contains('cancel')) {
        $btnModify.classList.remove('active');
        // target.parentNode : <section class="content-comment">...</section>
        const $contentComment = target.parentNode;

        $contentComment.innerHTML = `<p>${textToHtml(originContent)}</p>`;
      }

      // Modify Apply
      if (target.classList.contains('apply')) {
        $btnModify.classList.remove('active');
        // target.parentNode.firstElementChild : <textarea class="area-comment-input">...</textarea>
        const contentComment = textToHtml(target.parentNode.firstElementChild.value);
        // target.parentNode.parentNode : <li class="comment" data-id="">...</li>
        const commentId = target.parentNode.parentNode.dataset.id;

        fetchComment.patchComment(commentId, contentComment);
      }

      // Delete
      if (target.classList.contains('delete')) {
        // target.parentNode.parentNode.parentNode : <li class="comment" data-id="">...</li>
        const commentId = target.parentNode.parentNode.parentNode.dataset.id;

        fetchComment.deleteComment(commentId);
      }
    };
  })();
}
