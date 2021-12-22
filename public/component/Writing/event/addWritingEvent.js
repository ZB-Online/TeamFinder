import client from '../../../api/axios.js';
import { initialFilter } from '../../../store/filter.js';
import { todayFormat } from '../../../utils/date.js';

export default function addEventWriting($target) {
  const $title = $target.querySelector('.title');
  const $city = $target.querySelector('.city');
  const $sports = $target.querySelector('.sports');
  const $cityList = $target.querySelector('.city-list');
  const $cityItems = $target.querySelector('.city-items');
  const $sportsList = $target.querySelector('.sports-list');
  const $sportsItems = $target.querySelector('.sports-items');
  const $writeArea = $target.querySelector('.writing-area');

  // post
  const postingSend = async payload => {
    try {
      const res = await client.post('/api/posts', payload);
      if (res.status !== 200) throw new Error(res.status);
    } catch (error) {
      console.log(error);
    }
  };

  // 지역, 스포츠 리스트 생성
  const listCreate = (categoriesArr, categories) => {
    const $fragment = document.createDocumentFragment();
    [...categoriesArr].forEach((category, index) => {
      const $li = document.createElement('li');
      $li.dataset.index = index;
      $li.textContent = category;
      $fragment.appendChild($li);
    });
    categories.appendChild($fragment);
  };

  listCreate(initialFilter.cities, $cityList);
  listCreate(initialFilter.sports, $sportsList);

  document.querySelector('.writing-submit').addEventListener('click', () => {
    const $cityItem = $target.querySelector('.city-item > span');
    // 임시 처리
    if ($title.value.trim() === '') {
      alert('제목을 입력해주세요');
      return;
    }
    if (!$cityItem) {
      alert('지역을 선택해주세요');
      return;
    }
    if ($sportsItems.children.length === 0) {
      alert('스포츠를 선택해주세요');
      return;
    }
    if ($writeArea.value.trim() === '') {
      alert('본문을 입력해주세요');
      return;
    }
    // const cityArr = [...$cityItems.querySelectorAll('span')].map(city => city.getAttribute('data-index'));
    const sportsArr = [...$sportsItems.querySelectorAll('span')].map(sports => sports.getAttribute('data-index'));
    const writeVaules = {
      title: $title.value,
      city: $cityItem.textContent,
      sportsType: sportsArr,
      content: $writeArea.value,
      date: todayFormat(),
    };
    postingSend(writeVaules);
  });

  // 중복 방지
  const duplication = (items, selectItem) => {
    let check = false;
    [...items.querySelectorAll('span')].forEach(item => {
      if (item.textContent === selectItem) check = true;
    });
    return check;
  };

  // city 단일 선택
  $cityList.addEventListener('click', e => {
    if (!e.target.matches('li')) return;
    // if (duplication($cityItems, e.target.textContent)) return;
    $cityItems.innerHTML = `
    <li class="city-item">
      <span data-index="${e.target.getAttribute('data-index')}">${e.target.textContent}</span>
      <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      class="one-delete"
      >
      <path
        d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"
      ></path>
    </svg>
    </li>
    `;
    $city.classList.toggle('active');
  });

  // sports 복수 선택
  $sportsList.addEventListener('click', e => {
    if (!e.target.matches('li')) return;
    if (duplication($sportsItems, e.target.textContent)) return;
    $sportsItems.innerHTML += `
    <li class="sports-item">
      <span data-index="${e.target.getAttribute('data-index')}">${e.target.textContent}</span>
      <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      class="one-delete"
      >
      <path
        d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"
      ></path>
    </svg>
    </li>
    `;
    $sports.classList.toggle('active');
  });

  // 선택창 띄우기 - city
  $target.querySelector('.city-show').addEventListener('click', () => {
    $city.classList.toggle('active');
  });
  // 선택창 띄우기 - sports
  $target.querySelector('.sports-show').addEventListener('click', () => {
    $sports.classList.toggle('active');
  });

  // 전체 삭제 - city
  $target.querySelector('.city-all-delete').addEventListener('click', () => {
    $cityItems.innerHTML = '';
  });

  // 전체 삭제 - sports
  $target.querySelector('.sports-all-delete').addEventListener('click', () => {
    $sportsItems.innerHTML = '';
  });

  // 개별 삭제
  const oneDelete = e => {
    if (!e.target.matches('.one-delete')) return false;
    e.target.parentNode.remove();
  };
  $target.querySelector('.city-container').addEventListener('click', e => oneDelete(e));
  $target.querySelector('.sports-container').addEventListener('click', e => oneDelete(e));
}
