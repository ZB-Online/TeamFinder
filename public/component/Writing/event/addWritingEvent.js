import client from '../../../api/axios.js';
import { initialFilter } from '../../../store/filter.js';
import { todayFormat } from '../../../utils/date.js';
import { TOAST_TYPE, toaster, createToastAction } from '../../../utils/toaster.js';

import { ROUTE_TYPE, routes } from '../../App.js';

export default function addEventWriting($parent) {
  const $cityList = $parent.querySelector('.city-list');
  const $sportsList = $parent.querySelector('.sports-list');
  // post
  const postSend = async payload => {
    try {
      const res = await client.post('/api/posts', payload);
      if (res.status !== 200) throw new Error(res.status);
      toaster.add(createToastAction(TOAST_TYPE.SUCCESS, 'well done!', '글 작성이 완료되었습니다!'));
      window.history.pushState({}, ROUTE_TYPE.HOME, window.location.origin + ROUTE_TYPE.HOME);
      routes[ROUTE_TYPE.HOME]($parent);
    } catch (error) {
      console.log(error);
    }
  };

  // 지역, 스포츠 리스트 동적 생성
  const listCreate = (categoriesArr, categories) => {
    const $fragment = document.createDocumentFragment();
    [...categoriesArr].forEach((category, index) => {
      const $li = document.createElement('li');
      $li.dataset.index = index;
      $li.textContent = category;
      $fragment.append($li);
    });
    categories.append($fragment);
  };
  listCreate(initialFilter.cities, $cityList);
  listCreate(initialFilter.sports, $sportsList);

  const $citySportsWrap = $parent.querySelector('.city-sports-wrap');
  const $writingTitle = $parent.querySelector('.writing-title');
  const $sportsItems = $parent.querySelector('.sports-items');
  const $writingMainText = $parent.querySelector('.writing-main-text');
  const $writingSubmit = $parent.querySelector('.writing-submit');
  const $writingCancel = $parent.querySelector('.writing-cancel');

  // 중복 방지
  const duplication = (listItems, selectItem) =>
    [...listItems.querySelectorAll('span')].some(listItem => listItem.textContent === selectItem);

  const activeToggle = $target => $target.classList.toggle('active');

  const necessaryContent = ($title, $city, $sports, $mainText) => {
    if ($title.value.trim() === '' || !$city || $sports.children.length === 0 || $mainText.value.trim() === '') {
      toaster.add(createToastAction(TOAST_TYPE.ERROR, 'Check it out!', '내용을 전부 입력해 주세요'));
      return true;
    }
  };

  $writingSubmit.addEventListener('click', () => {
    const $cityItem = $parent.querySelector('.city-items span');
    if (necessaryContent($writingTitle, $cityItem, $sportsItems, $writingMainText)) return;

    const sportsArr = [...$sportsItems.querySelectorAll('span')].map(sports => +sports.getAttribute('data-index'));
    const writeVaules = {
      title: $writingTitle.value,
      city: +$cityItem.getAttribute('data-index'),
      sportsTypes: sportsArr,
      content: $writingMainText.value,
      date: todayFormat(),
      owner: { id: localStorage.getItem('teamfinderId'), nickname: localStorage.getItem('teamfinderNickname') },
    };
    postSend(writeVaules);
  });

  $writingCancel.addEventListener('click', () => {
    toaster.add(createToastAction(TOAST_TYPE.ERROR, 'Failure!', '글 작성이 취소되었습니다!'));
    window.history.pushState({}, ROUTE_TYPE.HOME, window.location.origin + ROUTE_TYPE.HOME);
    routes[ROUTE_TYPE.HOME]($parent);
  });

  // sports & city item pick
  $citySportsWrap.addEventListener('click', e => {
    if (!e.target.matches('li')) return;

    // sports일 경우 중복 선택 방지
    const sportsDivision = e.target.parentNode.matches('.sports-list');
    if (sportsDivision && duplication($sportsItems, e.target.textContent)) {
      activeToggle(e.target.closest('.writing-container'));
      return;
    }
    const itemCreate = `
  <li>
		<span data-index="${e.target.getAttribute('data-index')}">${e.target.textContent}</span>
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    class="writing-one-delete"
    >
    <path
      d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"
    ></path>
  </svg>
	</li>
	`;
    sportsDivision
      ? (e.target.closest('.writing-container').querySelector('.writing-items').innerHTML += itemCreate)
      : (e.target.closest('.writing-container').querySelector('.writing-items').innerHTML = itemCreate);
    activeToggle(e.target.closest('.writing-container'));
  });

  // city & sports 리스트 show
  $citySportsWrap.addEventListener('click', e => {
    if (!(e.target.matches('.writing-list-show') || e.target.matches('.writing-list-show path'))) return;
    activeToggle(e.target.closest('.writing-container'));
  });

  // city & sports items 전체 삭제
  $citySportsWrap.addEventListener('click', e => {
    if (!(e.target.matches('.writing-all-delete') || e.target.matches('.writing-all-delete path'))) return;
    e.target.closest('.writing-container').querySelector('.writing-items').innerHTML = '';
  });

  // city & sprots item 개별 삭제
  $citySportsWrap.addEventListener('click', e => {
    if (!(e.target.matches('.writing-one-delete') || e.target.matches('.writing-one-delete path'))) return;
    e.target.closest('li').remove();
  });
}
