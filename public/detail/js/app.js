import store from './post.js';
import render from './render.js';

const $modal = document.querySelector('.modal');
const $postBox = document.querySelector('.post-box');
const $commentBox = document.querySelector('.comment-box');

const { id } = $postBox.dataset;

store.getPost(id);

$postBox.addEventListener('click', ({ target }) => {
  if (!target.matches('.post-box button')) return;

  if (target.classList.contains('ended')) {
    store.endedPost(id);
  }

  if (target.classList.contains('modify')) {
    // goto modify page
  }

  if (target.classList.contains('delete')) {
    $modal.closest('.modal-wrap').classList.remove('hidden');
  }
});

$modal.addEventListener('click', ({ target }) => {
  if (!target.matches('.modal button')) return;

  if (target.classList.contains('cancel')) {
    $modal.closest('.modal-wrap').classList.add('hidden');
  }

  if (target.classList.contains('apply')) {
    store.deletePost(id); // and redirect to main
  }
});

$commentBox.addEventListener('click', ({ target }) => {
  if (!target.matches('.comment-box button')) return;

  if (target.classList.contains('upload')) {
    const content = target.previousElementSibling.value.trim();
    if (!content) return;

    store.uploadComment(id, content);
  }

  if (target.classList.contains('modify')) {
    if (target.classList.contains('active')) return;

    const $commentContent = target.closest('.comment-header').nextElementSibling;

    const originContent = $commentContent.firstElementChild.innerText;

    $commentContent.innerHTML = `
      <div class="modify-box">
        <textarea class="textarea">${originContent}</textarea>
        <button class="btn cancel">취소</button>
        <button class="btn apply">적용</button>
      </div>
    `;

    target.classList.add('active');
  }

  if (target.classList.contains('cancel')) {
    const $modifyBtn = target.closest('.comment-content').previousElementSibling.querySelector('.modify');

    store.getPost(id);

    $modifyBtn.classList.remove('active');
  }

  if (target.classList.contains('apply')) {
    const content = target.parentNode.firstElementChild.value.trim();

    store.modifyComment(id, target.closest('.comment').dataset.id, content);
  }

  if (target.classList.contains('delete')) {
    store.deleteComment(id, target.closest('.comment').dataset.id);
  }
});

store.subscribe(render);
