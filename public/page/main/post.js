import { FILTER_TYPE, filterStore, initialFilter } from '../../store/filter.js';

const $filterRecruitCheck = document.querySelector('.filter-recruit-input');

function getPostElements(data) {
  return data.map(postData => {
    const $post = document.createElement('li');
    $post.setAttribute('data-id', postData.id);
    $post.classList.add('post');
    if (!postData.recruit) $post.classList.add('opacity');
    $post.innerHTML = `
  <h3 class="post-title">${postData.title}</h3>
  <ul class="post-filter-list">
    ${postData.sportsTypes
      .map(
        positionId => `
      <li class="post-filter">
      <img 
        class="post-filter-icon"
        src="./assets/img/filter/${initialFilter.sports[positionId]}.png"
        alt="${initialFilter.sports[positionId]} icon"
      />
      <p class="post-filter-name">${initialFilter.sports[positionId]}</p>
      </li>
    `
      )
      .join('')}
  </ul>
  <div class="infos">
    <span class="info-city">${initialFilter.cities[postData.city]}</span>
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
  ${postData.recruit ? '' : `<p class="recruited">모집완료</p>`}
  `;
    return $post;
  });
}

function getRecruitingPostData(data) {
  return data.filter(postData => postData.recruit);
}

export function renderPostElements(data) {
  const $contentList = document.querySelector('.post-list');
  $contentList.innerHTML = ``;
  getPostElements($filterRecruitCheck.checked ? getRecruitingPostData(data) : data).forEach($post => {
    $contentList.appendChild($post);
  });
}

async function fetchFilteredData() {
  const cities = filterStore[FILTER_TYPE.CITIES].getState();
  const sports = filterStore[FILTER_TYPE.SPORTS].getState();
  const res = await fetch(`/api/posts?` + new URLSearchParams({ cities, sports }));
  const data = await res.json();
  return data;
}

export async function renderFilteredPosts() {
  renderPostElements(await fetchFilteredData());
}
