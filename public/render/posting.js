import { DUMMY } from '../dummy/data.js';
import { FILTER_KEYWORDS } from '../assets/keywords.js';

function getPostingElements (data) {
  return data.map(postingData => {
    const $content = document.createElement('li');
    $content.setAttribute('data-id', postingData.id);
    $content.classList.add('content');
    if (!postingData.recruit) $content.classList.add('opacity');
    $content.innerHTML = `
  <h3 class="content-title">${postingData.title}</h3>
  <ul class="content-filter-list">
    ${postingData.position
      .map(
        positionId => `
      <li class="content-filter">
      <img 
        class="content-filter-icon"
        src="./assets/img/filter/${FILTER_KEYWORDS[positionId]}.png"
        alt="${FILTER_KEYWORDS[positionId]} icon"
      />
      <p class="content-filter-name">${FILTER_KEYWORDS[positionId]}</p>
      </li>
    `
      )
      .join('')}
  </ul>
  <div class="infos">
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
  ${!postingData.recruit && `<p class="recruited">모집완료</p>`}
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
    renderPostingData($contentList, res);
  } catch (e) {
    // 에러 처리 결과
    console.log(e);
    renderPostingData($contentList, DUMMY.POSTING_DATA);
  }
}
