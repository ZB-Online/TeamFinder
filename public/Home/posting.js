import { DUMMY } from '../dummy/data.js';
import { initialFilter } from '../store/filter.js';

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
        src="./assets/img/filter/${initialFilter.sports[positionId]}.png"
        alt="${initialFilter.sports[positionId]} icon"
      />
      <p class="content-filter-name">${initialFilter.sports[positionId]}</p>
      </li>
    `,
      )
      .join('')}
  </ul>
  <div class="infos">
    <span class="info-city">${initialFilter.cities[postingData.city]}</span>
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

function getRecruitingPostings (data) {
  return data.filter(posting => posting.recruit);
}

export function renderPostings (data, onlyRecruiting) {
  const $contentList = document.querySelector('.content-list');
  $contentList.innerHTML = ``;
  getPostingElements(onlyRecruiting ? getRecruitingPostings(data) : data).forEach(postingElement => {
    $contentList.appendChild(postingElement);
  });
}

export async function renderPostingAll (onlyRecruiting) {
  try {
    const res = await fetch('/api/postings');
    // status에 따른 에러 처리
    if (!res.ok) throw new Error('에러 메시지');
    renderPostings(await res.json(), onlyRecruiting);
  } catch (e) {
    // 에러 처리 결과
    console.log(e);
    renderPostings(DUMMY.POSTING_DATA, onlyRecruiting);
  }
}
