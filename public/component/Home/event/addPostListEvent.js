import { CommentComponent } from '../../Post/Comment.js';

export default function addPostListEvent ($parent, $target) {
  const $postList = $target.querySelector('.post-list');
  $postList.addEventListener('click', e => {
    const $li = e.target.closest('.post');
    if (!$li || $li.classList.contains('opacity')) return;
    const { id } = $li.dataset;
    window.history.pushState({}, `/posts?id=${id}`, window.location.origin + `/posts?id=${id}`);
    CommentComponent($parent);
  });
}
