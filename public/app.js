import { FILTER_KEYWORDS, FILTER_TYPE, selectFilter } from './Home/filter.js';

import { renderPostingAll } from './Home/posting.js';

const $filterListCity = document.querySelector('.filter-list-city');
const $filterListSports = document.querySelector('.filter-list-sports');
const $contentsFilters = document.querySelector('.contents-filter');
const $navUserWrapper = document.querySelector('.navbar-user-wrapper');
const $navUserMenu = document.querySelector('.user-menu-list');
const $filterRecruitInput = document.getElementById('filterRecruitInput');

function toggleContentsFilter (e) {
  return $filters => {
    // e.target.parentNode == <li class="contents-filter-recent(or popular)"></li>
    e.target.parentNode.classList.remove('opacity');
    [...$filters].forEach($li => {
      if ($li !== e.target.parentNode) $li.classList.add('opacity');
    });
  };
}

function createFilterItem (keyword) {
  const $li = document.createElement('li');
  $li.classList.add('filter-item', 'active');
  $li.dataset.filter = keyword;
  return $li;
}

$navUserWrapper.addEventListener('click', () => {
  $navUserMenu.classList.toggle('hidden');
});

// 필터 키워드에 따른 초기 필터 아이콘 생성
FILTER_KEYWORDS.CITY.forEach(keyword => {
  const $li = createFilterItem(keyword);
  $li.innerHTML = `<p class="filter-city">${keyword}</p>`;
  $filterListCity.appendChild($li);
});

FILTER_KEYWORDS.SPORTS.forEach(keyword => {
  const $li = createFilterItem(keyword);
  $li.innerHTML = `
  <img class="filter-icon" src="./assets/img/filter/${keyword}.png" alt="${keyword} icon" />
  <p class="filter-sports-text">${keyword}</p>`;
  $filterListSports.appendChild($li);
});

$filterListCity.addEventListener('click', selectFilter($filterListCity, FILTER_TYPE.CITY));

$filterListSports.addEventListener('click', selectFilter($filterListSports, FILTER_TYPE.SPORTS));

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
