import { FILTER_TYPE, filterStore, initialFilter } from '../../../store/filter.js';
import { selectFilter, togglePostsFilter } from '../homeUtils/filter.js';

import { renderFilteredPosts } from '../../../utils/renderPost.js';

export default function addFilter ($target) {
  const $filterListCity = $target.querySelector('.filter-list-city');
  const $filterListSports = $target.querySelector('.filter-list-sports');
  const $postsFilters = $target.querySelector('.posts-filter');
  const $filterRecruitCheck = $target.querySelector('.filter-recruit-input');

  // 필터 키워드에 따른 초기 필터 아이콘 생성
  initialFilter.cities.forEach(keyword => {
    $filterListCity.insertAdjacentHTML(
      'beforeend',
      `<li data-filter="${keyword}" class="filter-item active">
        <p class="filter-city">${keyword}</p>
      </li>`,
    );
  });

  initialFilter.sports.forEach(keyword => {
    $filterListSports.insertAdjacentHTML(
      'beforeend',
      `<li data-filter="${keyword}" class="filter-item active">
        <img class="filter-icon" src="./assets/img/filter/${keyword}.png" alt="${keyword} icon" />
        <p class="filter-sports-text">${keyword}</p>
      </li>`,
    );
  });

  $filterListCity.addEventListener('click', selectFilter($filterListCity, FILTER_TYPE.CITIES));

  $filterListSports.addEventListener('click', selectFilter($filterListSports, FILTER_TYPE.SPORTS));

  $postsFilters.addEventListener('click', togglePostsFilter($postsFilters.children));
  $postsFilters.addEventListener('click', renderFilteredPosts);

  $filterRecruitCheck.addEventListener('click', renderFilteredPosts);

  renderFilteredPosts();

  filterStore.cities.subscribe(renderFilteredPosts);
  filterStore.sports.subscribe(renderFilteredPosts);
}
