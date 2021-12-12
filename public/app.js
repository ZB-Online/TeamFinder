import { FILTER_KEYWORDS } from './assets/keywords.js';
import { renderPostingAll } from './render/posting.js';

const $filterList = document.querySelector('.filter-list');
const $contentsFilters = document.querySelector('.contents-filter');
const $navUserWrapper = document.querySelector('.navbar-user-wrapper');
const $navUserMenu = document.querySelector('.user-menu-list');
const $filterRecruitInput = document.getElementById('filterRecruitInput');

$navUserWrapper.addEventListener('click', () => {
  $navUserMenu.classList.toggle('hidden');
});

// 필터 키워드에 따른 필터 아이콘 생성
FILTER_KEYWORDS.forEach(keyword => {
  const $li = document.createElement('li');
  $li.classList.add('filter-item');
  $li.innerHTML = `<img class="filter-icon opacity" src="./assets/img/filter/${keyword}.png" alt="${keyword} icon" />`;
  $filterList.appendChild($li);
});

$filterList.addEventListener('click', e => {
  // e.target == <img class="filter-icon" src=".." />
  if (!e.target.classList.contains('filter-icon')) return;
  e.target.classList.toggle('opacity');
  // 필터 아이콘 클릭 시, 필터링 함수 구현
  // do something..
});

function toggleContentsFilter (e) {
  return $filters => {
    // e.target.parentNode == <li class="contents-filter-recent(or popular)"></li>
    e.target.parentNode.classList.remove('opacity');
    [...$filters].forEach($li => {
      if ($li !== e.target.parentNode) $li.classList.add('opacity');
    });
  };
}

$contentsFilters.addEventListener('click', e => {
  toggleContentsFilter(e)($contentsFilters.children);
  // e.target.parentNode의 className이 recent인지 popular인지에 따라 필터링 렌더
  // do something..
});

$filterRecruitInput.addEventListener('click', () => {
  // checked === true이면 모집 중인 글, false이면 모든 글 렌더링
  $filterRecruitInput.checked ? renderPostingAll() : renderPostingAll();
});

renderPostingAll();
