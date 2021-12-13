import { DUMMY } from '../dummy/data.js';
import { FILTER_KEYWORDS } from './filter.js';

function getPostingElements (data) {
  return data.map(postingData => {
    const $content = document.createElement('li');
    $content.setAttribute('data-id', postingData.id);
    $content.classList.add('content');
    if (!postingData.recruit) $content.classList.add('opacity');
    $content.innerHTML = `
  <h3 class="content-title">${postingData.title}</h3>
  <ul class="content-filter-list">
    ${postingData.sportsType
      .map(
        positionId => `
      <li class="content-filter">
      <img 
        class="content-filter-icon"
        src="./assets/img/filter/${FILTER_KEYWORDS.SPORTS[positionId]}.png"
        alt="${FILTER_KEYWORDS.SPORTS[positionId]} icon"
      />
      <p class="content-filter-name">${FILTER_KEYWORDS.SPORTS[positionId]}</p>
      </li>
    `
      )
      .join('')}
  </ul>
  <div class="infos">
    <span class="info-city">${postingData.city.map(city => FILTER_KEYWORDS.CITY[city]).join(' ')}</span>
    <div class="info-item">
      <box-icon class="info-icon" name="message-rounded-dots"></box-icon>
      <span class="comments">11</span>
    </div>
      <div class="info-item">
      <box-icon class="info-icon" name="street-view"></box-icon>
      <span class="views">11</span>
    </div>
    <div class="info-item">
      <box-icon class="info-icon" name="heart" type="solid"></box-icon>
      <span class="likes">11</span>
    </div>
  </div>
  ${postingData.recruit ? '' : `<p class="recruited">모집완료</p>`}
  `;
    return $content;
  });
}

function renderPostingData (parent, data) {
  getPostingElements(data).forEach(postingElement => {
    parent.appendChild(postingElement);
  });
}

export async function renderPostingAll () {
  const $contentList = document.querySelector('.content-list');
  $contentList.innerHTML = ``;
  try {
    const res = await fetch('/api/postings');
    // status에 따른 에러 처리
    if (!res.ok) throw new Error('에러 메시지');
    renderPostingData($contentList, await res.json());
  } catch (e) {
    // 에러 처리 결과
    console.log(e);
    renderPostingData($contentList, DUMMY.POSTING_DATA);
  }
}
