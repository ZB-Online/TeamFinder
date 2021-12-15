import createStore from './createStore.js';

export const ADD_FILTER = 'ADD_FILTER';
export const REMOVE_FILTER = 'REMOVE_FILTER';
export const COMPLETE_FILTER = 'COMPLETE_FILTER';
export const ADD_ALL = 'ADD_ALL';
export const REMOVE_ALL = 'REMOVE_ALL';
export const EDIT_FILTER = 'EDIT_FILTER';

export const FILTER_ACTIONS = {
  ADD_FILTER,
  REMOVE_FILTER,
  COMPLETE_FILTER,
  ADD_ALL,
  REMOVE_ALL,
  EDIT_FILTER,
};

export const FILTER_TYPE = {
  SPORTS: 'sports',
  CITIES: 'cities',
};

export const initialFilter = {
  sports: ['배드민턴', '야구', '농구', '당구', '볼링', '축구', '런닝'],
  cities: [
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
    '제주도',
  ],
};

const reducer = (filters, { payload, type }, initialFilters) => {
  switch (type) {
    case ADD_FILTER:
      return [...filters, payload];

    case REMOVE_FILTER:
      return filters.filter(filterValue => filterValue !== payload);

    case ADD_ALL:
      return [...initialFilters];

    case REMOVE_ALL:
      return [];

    default:
      return filters;
  }
};

export const filterStore = {
  sports: createStore(initialFilter.sports, reducer),
  cities: createStore(initialFilter.cities, reducer),
};
