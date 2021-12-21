import store from '../postUtils/fetchPost.js';
import render from '../postUtils/render.js';

export default function addCommentEvent() {
  const $modal = document.querySelector('.modal');
  const $postBox = document.querySelector('.post-box');
  const $commentBox = document.querySelector('.comment-box');

  const [id] = [...new URLSearchParams(new URL(window.location.href).search).values()];

  store.getPost(id);

  $postBox.addEventListener('click', ({ target }) => {
    if (!target.matches('.post-box button')) return;

    if (target.classList.contains('ended')) {
      store.endedPost(id);
    }

    if (target.classList.contains('edit')) {
      // goto edit page
    }

    if (target.classList.contains('delete')) {
      $modal.closest('.modal-wrap').classList.remove('hidden');
    }

    if (target.classList.contains('like')) {
      store.changeLikeCount(id, target.classList.contains('active'));
    }
  });

  $modal.addEventListener('click', ({ target }) => {
    if (!target.matches('.modal button')) return;

    if (target.classList.contains('cancel')) {
      $modal.closest('.modal-wrap').classList.add('hidden');
    }

    if (target.classList.contains('apply')) {
      store.deletePost(id);
    }
  });

  $commentBox.addEventListener('click', ({ target }) => {
    if (!target.matches('.comment-box button')) return;

    if (target.classList.contains('upload')) {
      const content = target.previousElementSibling.value.trim();
      if (!content) return;

      store.uploadComment(id, content);
    }

    if (target.classList.contains('edit')) {
      if (target.classList.contains('active')) return;

      const $commentContent = target.closest('.comment-header').nextElementSibling;
      const originContent = $commentContent.firstElementChild.innerText;

      $commentContent.innerHTML = `
        <div class="edit-box">
          <textarea class="textarea">${originContent}</textarea>
          <button class="btn cancel">취소</button>
          <button class="btn apply">적용</button>
        </div>`;

      target.classList.add('active');
    }

    if (target.classList.contains('cancel')) {
      const $editBtn = target.closest('.comment-content').previousElementSibling.querySelector('.edit');

      store.getPost(id);

      $editBtn.classList.remove('active');
    }

    if (target.classList.contains('apply')) {
      const content = target.parentNode.firstElementChild.value.trim();
      if (!content) return;

      store.editComment(id, target.closest('.comment').dataset.id, content);
    }

    if (target.classList.contains('delete')) {
      store.deleteComment(id, target.closest('.comment').dataset.id);
    }
  });

  store.subscribe(render);
}
