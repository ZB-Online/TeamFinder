import { FILTER_TYPE, filterStore, initialFilter } from '../store/filter.js';

import client from '../api/axios.js';

const getPostElements = data =>
  data.map(postData => {
    const $post = document.createElement('li');
    $post.setAttribute('data-id', postData.id);
    $post.classList.add('post');
    if (!postData.recruit) $post.classList.add('opacity');
    $post.innerHTML = `
    <a class="post-link">
      <h3 class="post-title">${postData.title}</h3>
      <ul class="post-filter-list">
        ${postData.sportsType
          .map(
            positionId => `
          <li class="post-filter">
            <img 
              class="post-filter-icon"
              src="/assets/img/filter/${initialFilter.sports[positionId]}.png"
              alt="${initialFilter.sports[positionId]} icon"
            />
            <p class="post-filter-name">${initialFilter.sports[positionId]}</p>
          </li>
        `,
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
    </a>`;
    return $post;
  });

const getRecruitingPostData = data => data.filter(postData => postData.recruit);

const renderPostElements = data => {
  const $filterRecruitCheck = document.querySelector('.filter-recruit-input');
  const $contentList = document.querySelector('.post-list');
  $contentList.innerHTML = ``;
  getPostElements($filterRecruitCheck.checked ? getRecruitingPostData(data) : data).forEach($post => {
    $contentList.appendChild($post);
  });
};

const fetchFilteredData = async () => {
  const cities = filterStore[FILTER_TYPE.CITIES].getState();
  const sports = filterStore[FILTER_TYPE.SPORTS].getState();
  const res = await client.get(`/api/posts?` + new URLSearchParams({ cities, sports }));
  return res.data;
};

const renderFilteredPosts = async () => {
  renderPostElements(await fetchFilteredData());
};

export { renderPostElements, renderFilteredPosts, getPostElements };
