import { ADD_ALL, ADD_FILTER, REMOVE_ALL, REMOVE_FILTER, filterStore, initialFilter } from '../../../store/filter.js';

const removeActiveClass = $ul => {
  [...$ul.children].forEach($li => {
    $li.classList.remove('active');
  });
};

const renderCurrentFilter = ($ul, filterType) => {
  [...$ul.children].forEach($li => {
    if (filterStore[filterType].getState().includes($li.dataset.filter)) {
      $li.classList.add('active');
    } else {
      $li.classList.remove('active');
    }
  });
};

const togglePostsFilter = $filters => e => {
  // e.target.parentNode == <li class="posts-filter-recent(or popular)"></li>
  e.target.parentNode.classList.remove('opacity');
  [...$filters].forEach($li => {
    if ($li !== e.target.parentNode) $li.classList.add('opacity');
  });
};

const selectFilter = ($filterList, filterType) => e => {
  // e.target.parentNode == <li class="filter-item">..</li>
  const $li = e.target.parentNode;
  if (!$li.classList.contains('filter-item')) return;
  // 1. currentFilter full일 때, 선택하면 초기화 후 선택
  if (filterStore[filterType].getState().length === initialFilter[filterType].length) {
    removeActiveClass($filterList);
    filterStore[filterType].dispatch({ type: REMOVE_ALL });
  }
  // 2. 키워드의 필터 선택
  if (filterStore[filterType].getState().includes($li.dataset.filter)) {
    filterStore[filterType].dispatch({ type: REMOVE_FILTER, payload: $li.dataset.filter });
  } else {
    filterStore[filterType].dispatch({ type: ADD_FILTER, payload: $li.dataset.filter });
  }
  // 3. 현재 필터가 0개이면 필터 전체 활성화
  if (filterStore[filterType].getState().length === 0) {
    filterStore[filterType].dispatch({ type: ADD_ALL });
  }
  renderCurrentFilter($filterList, filterType);
};

export { togglePostsFilter, selectFilter };
