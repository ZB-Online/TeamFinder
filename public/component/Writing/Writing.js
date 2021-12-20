import client from '../../api/axios.js';
import { initialFilter } from '../../store/filter.js';
import { todayFormat } from '../../utils/date.js';

export default function Writing({$app, initialState}){
  this.state = initialState;
  this.$target = document.createElement('div');
  $app.removeChild($app.lastElementChild);
  $app.appendChild(this.$target);

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };
  
  this.render = () => {
    this.$target.innerHTML = `
      <main class="write-wrap">
        <input type="text" class="title" placeholder="제목을 입력하세요" />
        <section>
          <div class="choose-container city">
            <h3>지역 :</h3>
            <div class="writing-container city-container">
              <ul class="writing-items city-items"></ul>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  class="city-all-delete"
                >
                  <path
                    d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"
                  ></path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="city-show" width="30" height="30" viewBox="0 0 24 24">
                  <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                </svg>
              </div>
            </div>
            <ul class="writing-list city-list"></ul>
          </div>
          <div class="choose-container sports">
            <h3>스포츠 :</h3>
            <div class="writing-container sports-container">
              <ul class="writing-items sports-items"></ul>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  class="sports-all-delete"
                >
                  <path
                    d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"
                  ></path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="sports-show" width="30" height="30" viewBox="0 0 24 24">
                  <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                </svg>
              </div>
            </div>
            <ul class="writing-list sports-list"></ul>
          </div>
        </section>
        <textarea
          class="writing-area"
          rows="20"
          placeholder="지역/종목 진행 방식 및 신청 방법(오픈카톡, 댓글 등)에 대해 구체적으로 작성 부탁드려요!"
        ></textarea>
        <section class="writing-btn-wrap">
          <a href="../../index.html"><button class="btn writing-cancel">취소</button></a>
          <button class="btn writing-submit">글 등록</button>
        </section>
      </main>
    `;
  };

  this.addEvent = () => {  
    const $title = document.querySelector('.title');
    const $city = document.querySelector('.city');
    const $sports = document.querySelector('.sports');
    const $cityList = document.querySelector('.city-list');
    const $cityItems = document.querySelector('.city-items');
    const $sportsList = document.querySelector('.sports-list');
    const $sportsItems = document.querySelector('.sports-items');
    const $writeArea = document.querySelector('.writing-area');
    
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
      const $cityItem = document.querySelector('.city-item > span');
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
    document.querySelector('.city-show').addEventListener('click', () => {
      $city.classList.toggle('active');
    });
    // 선택창 띄우기 - sports
    document.querySelector('.sports-show').addEventListener('click', () => {
      $sports.classList.toggle('active');
    });
    
    // 전체 삭제 - city
    document.querySelector('.city-all-delete').addEventListener('click', () => {
      $cityItems.innerHTML = '';
    });
    
    // 전체 삭제 - sports
    document.querySelector('.sports-all-delete').addEventListener('click', () => {
      $sportsItems.innerHTML = '';
    });
    
    // 개별 삭제
    const oneDelete = e => {
      if (!e.target.matches('.one-delete')) return false;
      e.target.parentNode.remove();
    };
    document.querySelector('.city-container').addEventListener('click', e => oneDelete(e));
    document.querySelector('.sports-container').addEventListener('click', e => oneDelete(e));    
  };

  this.render();
  this.addEvent();
}