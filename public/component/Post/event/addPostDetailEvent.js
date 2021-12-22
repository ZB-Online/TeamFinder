import { ROUTE_TYPE, routes } from '../../App.js';

import { initialFilter } from '../../../store/filter.js';
import postStore from '../../../store/post.js';
import render from '../postUtils/renderPost.js';

export default function addPostDetailEvent($parent) {
  const $modal = document.querySelector('.modal');
  const $postBox = document.querySelector('.post-box');
  const $commentBox = document.querySelector('.comment-box');

  const [id] = [...new URLSearchParams(new URL(window.location.href).search).values()];

  postStore.getPost(id);

  $postBox.addEventListener('click', ({ target }) => {
    if (!(target.matches('.post-box button') || target.matches('.choose-filter-box li'))) return;

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
          const getOriginFilters = ($filterList, filter) =>
            [...$filterList.children]
              .map($li => `<li data-index=${$li.dataset.index}>${initialFilter[filter][$li.dataset.index]}</li>`)
              .join('');

          const $filterList = child.querySelector('.filter-list');

          const $chooseFilter = document.createElement('div');
          $chooseFilter.classList.add('choose-filter-box');

          $chooseFilter.innerHTML = `
            <ul class="filter-list"></ul>
            <div class="filter-btns">
              <button class="delete-all">&times;</button>
              <button class="spread-filters">&#43;</button>
            </div>`;

          const { filter } = child.dataset;
          $chooseFilter.firstElementChild.innerHTML = getOriginFilters($filterList, filter);

          child.replaceChild($chooseFilter, $filterList);
        }

        if (child.classList.contains('post-content-box')) {
          const $postContent = child.firstElementChild;

          const $inputPostContent = document.createElement('textarea');
          $inputPostContent.classList.add('edit-content', 'textarea');
          $inputPostContent.value = $postContent.innerText;

          child.replaceChild($inputPostContent, $postContent);
        }

        if (child.classList.contains('post-like-count')) {
          const $editBtns = document.createElement('div');
          $editBtns.classList.add('edit-btns');

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

    if (target.classList.contains('delete-all')) {
      target.parentNode.previousElementSibling.innerHTML = '';
    }

    if (target.classList.contains('spread-filters')) {
      const $filterListAll = document.createElement('ul');
      const $parent = target.closest('.choose-filter-box');

      if (target.classList.toggle('active')) {
        $filterListAll.classList.add('filter-list-all');

        const createList = filters =>
          [...filters].map((filter, index) => `<li data-index="${index}">${filter}</li>`).join('');

        const { filter } = $parent.closest('.post-filter').dataset;

        $filterListAll.innerHTML = createList(initialFilter[filter]);

        $parent.appendChild($filterListAll);
      } else {
        $parent.removeChild($parent.lastElementChild);
      }
    }

    if (target.matches('.filter-list > li')) {
      target.remove();
    }

    if (target.matches('.filter-list-all > li')) {
      const { filter } = target.closest('.post-filter').dataset;

      const $filterListAll = target.parentNode;
      $filterListAll.previousElementSibling.lastElementChild.classList.remove('active');

      const $filterList = target.closest('.choose-filter-box').firstElementChild;

      if (filter === 'cities') {
        $filterList.innerHTML = `<li data-index="${target.dataset.index}">${target.innerText}</li>`;
      } else {
        const isExist = [...$filterList.children].some($li => $li.dataset.index === target.dataset.index);
        if (!isExist) $filterList.appendChild(target);
      }

      $filterListAll.remove();
    }

    if (target.classList.contains('cancel')) {
      postStore.getPost(id);
    }

    if (target.classList.contains('apply')) {
      const $postTitle = document.querySelector('.post-title');
      const $postFilters = document.querySelectorAll('.filter-list');
      const $postContent = document.querySelector('.edit-content');

      const filters = [...$postFilters].map($filterList => [...$filterList.children].map($li => +$li.dataset.index));

      postStore.editPost(id, {
        title: $postTitle.value,
        city: filters[0],
        sportsTypes: filters[1],
        content: $postContent.value,
      });
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
