import { initialFilter } from '../../store/filter.js';
// Posting Id
const POSTING_ID = 0;

// Login State
const loggedIn = false;

const detailPageRender = ({ title, writer, date, city, sportsType, content }) => {
  const $postingTitle = document.querySelector('.posting-title');
  const $writer = document.querySelector('.writer');
  const $writerMe = document.querySelector('.wirter-me');
  const $date = document.querySelector('.date');
  const $cityList = document.querySelector('.city-list');
  const $sportsList = document.querySelector('.sports-list');
  const $mainTextArea = document.querySelector('.main-text-area');

  // 제목 / 글쓴이 / 날짜 렌더
  $postingTitle.textContent = title;
  $writer.textContent = writer;
  $date.textContent = date;

  // 로그인 확인시 렌더
  if (loggedIn) {
    const $writeFragment = document.createDocumentFragment();
    const writerMe = ['마감', '삭제', '수정'];
    writerMe.forEach(btn => {
      const $btn = document.createElement('button');
      $btn.textContent = btn;
      $writeFragment.appendChild($btn);
    });
    $writerMe.appendChild($writeFragment);
  }

  // city 렌더
  const $cityItem = document.createElement('li');
  const $fragment = document.createDocumentFragment();
  $cityItem.textContent = initialFilter.cities[city];
  $cityList.append($cityItem);

  // sports 렌더
  sportsType.forEach(sports => {
    const $li = document.createElement('li');
    $li.textContent = initialFilter.sports[sports];
    $fragment.append($li);
  });
  $sportsList.append($fragment);

  // main text area 렌더
  $mainTextArea.innerHTML = content
    .split('\n')
    .map(text => `<p>${text}</p>`)
    .join('');
};

const getPostData = async id => {
  try {
    const res = await fetch(`/api/posts/${id}`);
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    detailPageRender(...data);
  } catch (error) {
    console.log(error);
  }
};
getPostData(POSTING_ID);
