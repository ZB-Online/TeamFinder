import { FILTER_TYPE, filterStore, initialFilter } from '../../store/filter.js';
import { selectFilter, togglePostsFilter } from '../../utils/filter.js';

import { renderFilteredPosts } from '../../utils/post.js';

export default function PostList({$app, initialState, onClick}){
  this.state = initialState;
  this.onClick = onClick;
  this.$target = document.createElement('div');
  $app.appendChild(this.$target);

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };
  
  this.render = () => {
    this.$target.innerHTML = `
      <main>
        <article class="banner">
          <div class="banner-text">
            <h1 class="banner-title">
              <p>
                원하는 지역과 스포츠를 <br />
                함께할 팀원을 찾는 방법
              </p>
            </h1>
            <h2 class="banner-subtitle"><strong>TEAM_FINDER</strong>에서 함께 할 팀원을 찾아보세요</h2>
          </div>
          <img class="banner-image" src="https://holaworld.io/images/logo/main.png" alt="people" />
        </article>
        <article class="recruit">
          <div class="filter-wrapper-city">
            <ul class="filter-list-city"></ul>
          </div>
          <div class="filter-wrapper-sports">
            <ul class="filter-list-sports"></ul>
          </div>
          <section class="posts-container">
            <div class="posts-wrapper">
              <header class="posts-header">
                <ul class="posts-filter">
                  <li class="posts-filter-recent">
                    <box-icon class="posts-filter-icon" name="calendar-check" type="solid"></box-icon>
                    <p>최신</p>
                  </li>
                  <li class="posts-filter-popular opacity">
                    <box-icon class="posts-filter-icon" type="solid" name="star"></box-icon>
                    <p>인기</p>
                  </li>
                </ul>
                <div class="posts-checkbox">
                  <input type="checkbox" id="filterRecruitInput" class="filter-recruit-input" checked />
                  <label for="filterRecruitInput">모집 중인 글만 보기</label>
                </div>
              </header>
              <ul class="post-list"></ul>
            </div>
          </section>
        </article>
      </main>
    `;
  };

  this.addEvent = () => {
    const $filterListCity = document.querySelector('.filter-list-city');
    const $filterListSports = document.querySelector('.filter-list-sports');
    const $postsFilters = document.querySelector('.posts-filter');
    const $filterRecruitCheck = document.querySelector('.filter-recruit-input');  
    
    // 필터 키워드에 따른 초기 필터 아이콘 생성
    initialFilter.cities.forEach(keyword => {
      $filterListCity.insertAdjacentHTML('beforeend',`
      <li data-filter="${keyword}" class="filter-item active">
        <p class="filter-city">${keyword}</p>
      </li>
      `);
    });
    
    initialFilter.sports.forEach(keyword => {
      $filterListSports.insertAdjacentHTML('beforeend',`
      <li data-filter="${keyword}" class="filter-item active">
        <img class="filter-icon" src="./assets/img/filter/${keyword}.png" alt="${keyword} icon" />
        <p class="filter-sports-text">${keyword}</p>
      </li>
      `);
    });
        
    $filterListCity.addEventListener('click', selectFilter($filterListCity, FILTER_TYPE.CITIES));
    
    $filterListSports.addEventListener('click', selectFilter($filterListSports, FILTER_TYPE.SPORTS));
    
    $postsFilters.addEventListener('click', togglePostsFilter($postsFilters.children));
    
    $filterRecruitCheck.addEventListener('click', renderFilteredPosts);
    
    renderFilteredPosts();
   
    filterStore.cities.subscribe(renderFilteredPosts);
    filterStore.sports.subscribe(renderFilteredPosts);

    const $postList = document.querySelector('.post-list');
    $postList.addEventListener('click', e => {
      if(!e.target.closest('.post') || e.target.closest('.post').classList.contains('opacity')) return;
      this.onClick(e.target.closest('.post'));
    });
  };
  
  this.render();
  this.addEvent();
}