import addFilter from './event/addFilter.js';
import addPostListEvent from './event/addPostListEvent.js';

export default function Main ({ $parent, initialState }) {
  this.state = initialState;
  this.$target = document.createElement('div');
  if ($parent.children.length > 1) $parent.removeChild($parent.lastChild);
  $parent.appendChild(this.$target);

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
          <img class="banner-image" src="../../assets/img/team.png" alt="people" />
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
    addFilter(this.$target);
    addPostListEvent($parent, this.$target);
  };

  this.render();
  this.addEvent();
}
