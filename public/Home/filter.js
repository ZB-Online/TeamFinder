export const FILTER_KEYWORDS = {
  SPORTS: ['배드민턴', '야구', '농구', '당구', '볼링', '축구', '런닝'],
  CITY: [
    '서울시',
    '부산시',
    '대구시',
    '광주시',
    '울산시',
    '대전시',
    '경기도',
    '강원도',
    '충청남도',
    '충청북도',
    '경상북도',
    '경상남도',
    '전라북도',
    '전라남도',
    '제주도'
  ]
};

export const FILTER_TYPE = {
  SPORTS: 'SPORTS',
  CITY: 'CITY'
};

export const currentFilter = {
  SPORTS: [...FILTER_KEYWORDS.SPORTS],
  CITY: [...FILTER_KEYWORDS.CITY]
};

function clearFilter ($ul, filterType) {
  [...$ul.children].forEach($li => {
    $li.classList.remove('active');
  });
  currentFilter[filterType] = [];
}

function renderCurrentFilter ($ul, filterType) {
  [...$ul.children].forEach($li => {
    if (currentFilter[filterType].includes($li.dataset.filter)) {
      $li.classList.add('active');
    } else {
      $li.classList.remove('active');
    }
  });
}

export function selectFilter ($filterList, filterType) {
  return e => {
    // e.target.parentNode == <li class="filter-item">..</li>
    const $li = e.target.parentNode;
    if (!$li.classList.contains('filter-item')) return;
    // 1. currentFilter full일 때, 선택하면 초기화 후 선택
    if (currentFilter[filterType].length === FILTER_KEYWORDS[filterType].length) {
      clearFilter($filterList, filterType);
    }
    // 2. 키워드의 필터 선택
    if (currentFilter[filterType].includes($li.dataset.filter)) {
      currentFilter[filterType] = currentFilter[filterType].filter(keyword => keyword !== $li.dataset.filter);
    } else {
      currentFilter[filterType].push($li.dataset.filter);
    }
    // 3. 현재 필터가 0개이면 필터 전체 활성화
    if (currentFilter[filterType].length === 0) {
      currentFilter[filterType] = [...FILTER_KEYWORDS[filterType]];
    }
    renderCurrentFilter($filterList, filterType);
  };
}
