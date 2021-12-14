import { FILTER_TYPE, initialFilter } from './store/filter.js';
import { fetchFiltered, selectFilter } from './Home/filter.js';
import { renderPostingAll, renderPostings } from './Home/posting.js';

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
initialFilter.cities.forEach(keyword => {
  const $li = createFilterItem(keyword);
  $li.innerHTML = `<p class="filter-city">${keyword}</p>`;
  $filterListCity.appendChild($li);
});

initialFilter.sports.forEach(keyword => {
  const $li = createFilterItem(keyword);
  $li.innerHTML = `
  <img class="filter-icon" src="./assets/img/filter/${keyword}.png" alt="${keyword} icon" />
  <p class="filter-sports-text">${keyword}</p>`;
  $filterListSports.appendChild($li);
});

$filterListCity.addEventListener('click', async e => {
  selectFilter($filterListCity, FILTER_TYPE.CITIES)(e);
  renderPostings(await fetchFiltered(), $filterRecruitInput.checked);
});

$filterListSports.addEventListener('click', async e => {
  selectFilter($filterListSports, FILTER_TYPE.SPORTS)(e);
  renderPostings(await fetchFiltered(), $filterRecruitInput.checked);
});

$contentsFilters.addEventListener('click', e => {
  toggleContentsFilter(e)($contentsFilters.children);
});

$filterRecruitInput.addEventListener('click', async () => {
  $filterRecruitInput.checked ? renderPostings(await fetchFiltered(), true) : renderPostingAll(false);
});

renderPostingAll($filterRecruitInput.checked);
