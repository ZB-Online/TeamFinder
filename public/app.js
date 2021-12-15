import { FILTER_TYPE, filterStore, initialFilter } from './store/filter.js';

import { renderFilteredPosts } from './page/main/post.js';
import { selectFilter } from './page/main/filter.js';

const $filterListCity = document.querySelector('.filter-list-city');
const $filterListSports = document.querySelector('.filter-list-sports');
const $postsFilters = document.querySelector('.posts-filter');
const $navUserWrapper = document.querySelector('.navbar-user-wrapper');
const $navUserMenu = document.querySelector('.user-menu-list');
const $filterRecruitCheck = document.querySelector('.filter-recruit-input');

function togglePostsFilter ($filters) {
  return e => {
    // e.target.parentNode == <li class="posts-filter-recent(or popular)"></li>
    e.target.parentNode.classList.remove('opacity');
    [...$filters].forEach($li => {
      if ($li !== e.target.parentNode) $li.classList.add('opacity');
    });
  };
}
// 필터 키워드에 따른 초기 필터 아이콘 생성
initialFilter.cities.forEach(keyword => {
  $filterListCity.insertAdjacentHTML('beforeend',`
  <li data-filter="${keyword}" class="filter-item active">
    <p class="filter-city">${keyword}</p>
  </li>
  `);
});

initialFilter.sports.forEach(keyword => {
  $filterListSports.insertAdjacentHTML('beforeend',`
  <li data-filter="${keyword}" class="filter-item active">
    <img class="filter-icon" src="./assets/img/filter/${keyword}.png" alt="${keyword} icon" />
    <p class="filter-sports-text">${keyword}</p>
  </li>
  `);
});

$navUserWrapper.addEventListener('click', () => {
  $navUserMenu.classList.toggle('hidden');
});

$filterListCity.addEventListener('click', selectFilter($filterListCity, FILTER_TYPE.CITIES));

$filterListSports.addEventListener('click', selectFilter($filterListSports, FILTER_TYPE.SPORTS));

$postsFilters.addEventListener('click', togglePostsFilter($postsFilters.children));

$filterRecruitCheck.addEventListener('click', renderFilteredPosts);

renderFilteredPosts();

filterStore.cities.subscribe(renderFilteredPosts);
filterStore.sports.subscribe(renderFilteredPosts);