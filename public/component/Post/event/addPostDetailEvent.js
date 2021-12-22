import { ROUTE_TYPE, routes } from '../../App.js';

import { initialFilter } from '../../../store/filter.js';
import postStore from '../../../store/post.js';
import render from '../postUtils/renderPost.js';

export default function addPostDetailEvent ($parent) {
  const $modal = document.querySelector('.modal');
  const $postBox = document.querySelector('.post-box');
  const $commentBox = document.querySelector('.comment-box');

  const [id] = [...new URLSearchParams(new URL(window.location.href).search).values()];

  postStore.getPost(id);

  $postBox.addEventListener('click', ({ target }) => {
    if (!target.matches('.post-box button')) return;

    if (target.classList.contains('ended')) {
      postStore.endedPost(id);
    }

    if (target.classList.contains('edit')) {
      if (target.classList.contains('active')) return;

      target.classList.add('active');

      [...$postBox.children].forEach(child => {
        if (child.classList.contains('post-header')) {
          const $postTitle = child.firstElementChild;

          const $inputPostTitle = document.createElement('input');
          $inputPostTitle.classList.add('post-title');
          $inputPostTitle.value = $postTitle.textContent;

          child.replaceChild($inputPostTitle, $postTitle);
        }

        if (child.classList.contains('post-filter')) {
          const listCreate = (categoriesArr, categories) => {
            const $fragment = document.createDocumentFragment();
            [...categoriesArr].forEach((category, index) => {
              const $li = document.createElement('li');
              $li.dataset.index = index;
              $li.textContent = category;
              $fragment.append($li);
            });
            console.log($fragment);
            // categories.append($fragment);
          };

          const $filterList = child.querySelector('.filter-list');

          // child.firstElementChild.innerText === '지역'
          // listCreate(initialFilter.cities)

          const $chooseFilter = document.createElement('div');

          $chooseFilter.innerHTML = `
            <div class="choose-container sports">
              <div class="writing-container sports-container">
                <ul class="writing-items sports-items"></ul>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    class="sports-all-delete"
                  >
                    <path
                      d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"
                    ></path>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="sports-show" width="30" height="30" viewBox="0 0 24 24">
                    <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                  </svg>
                </div>
              </div>
              <ul class="writing-list sports-list"></ul>
            </div>`;

          child.replaceChild($chooseFilter, $filterList);
        }

        if (child.classList.contains('post-content')) {
          const $postContent = child.firstElementChild;

          const $inputPostContent = document.createElement('textarea');
          $inputPostContent.classList.add('edit-content', 'textarea');
          $inputPostContent.value = $postContent.innerText;

          child.replaceChild($inputPostContent, $postContent);
        }

        if (child.classList.contains('post-like-count')) {
          const $editBtns = document.createElement('editBtns');
          $editBtns.innerHTML = `
            <button class="btn cancel">취소</button>
            <button class="btn apply">수정</button>`;

          $postBox.insertBefore($editBtns, child);
        }
      });
    }

    if (target.classList.contains('delete')) {
      $modal.closest('.modal-wrap').classList.remove('hidden');
    }

    if (target.classList.contains('like')) {
      postStore.changeLikeCount(id, target.classList.contains('active'));
    }
  });

  $modal.addEventListener('click', ({ target }) => {
    if (!target.matches('.modal button')) return;

    if (target.classList.contains('cancel')) {
      $modal.closest('.modal-wrap').classList.add('hidden');
    }

    if (target.classList.contains('apply')) {
      postStore.deletePost(id);
      window.history.replaceState({}, ROUTE_TYPE.HOME, window.location.origin + ROUTE_TYPE.HOME);
      routes[ROUTE_TYPE.HOME]($parent);
    }
  });

  $commentBox.addEventListener('click', ({ target }) => {
    if (!target.matches('.comment-box button')) return;

    if (target.classList.contains('upload')) {
      const content = target.previousElementSibling.value.trim();
      if (!content) return;

      postStore.uploadComment(id, content);
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

      postStore.getPost(id);

      $editBtn.classList.remove('active');
    }

    if (target.classList.contains('apply')) {
      const content = target.parentNode.firstElementChild.value.trim();
      if (!content) return;

      postStore.editComment(id, target.closest('.comment').dataset.id, content);
    }

    if (target.classList.contains('delete')) {
      postStore.deleteComment(id, target.closest('.comment').dataset.id);
    }
  });

  postStore.subscribe(render);
}
