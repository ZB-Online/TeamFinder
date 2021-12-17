import store from './post.js';

const $modal = document.querySelector('.modal');
const $postBox = document.querySelector('.post-box');
const $postBtns = document.querySelector('.post-btns');
const $commentUploadBtn = document.querySelector('.btn.comment-upload');
const $commentList = document.querySelector('.comment-list');

store.getPost($postBox.dataset.id);

$postBtns.addEventListener('click', ({ target }) => {
  if (!target.matches('.post-btns > button')) return;

  if (target.classList.contains('ended')) {
    store.endedPost($postBox.dataset.id, target.classList.contains('active'));

    target.classList.toggle('active');
  }

  if (target.classList.contains('modify')) {
    // goto modify page
    console.log('modify');
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
    store.deletePost($postBox.dataset.id);
    // redirect main page
  }
});

$commentUploadBtn.addEventListener('click', ({ target }) => {
  const content = target.previousElementSibling.value.trim();
  if (!content) return;

  store.uploadComment($postBox.dataset.id, content);
});

$commentList.addEventListener('click', ({ target }) => {
  if (!target.matches('.comment button')) return;

  if (target.classList.contains('modify')) {
    if (target.classList.contains('active')) return;

    target.classList.add('active');
  }

  if (target.classList.contains('cancel')) {
    const $modifyBtn = target.closest('.comment-content').previousElementSibling.querySelector('.modify');

    $modifyBtn.classList.remove('active');
  }

  if (target.classList.contains('apply')) {
    const content = target.parentNode.firstElementChild.value;

    store.modifyComment($postBox.dataset.id, target.closest('.comment').dataset.id, content);
  }

  if (target.classList.contains('delete')) {
    store.deleteComment($postBox.dataset.id, target.closest('.comment').dataset.id);
  }
});
