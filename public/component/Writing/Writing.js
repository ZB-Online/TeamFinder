import addWritingEvent from './event/addWritingEvent.js';

export default function Writing ({ $parent, initialState }) {
  this.state = initialState;
  this.$target = document.createElement('div');
  $parent.appendChild(this.$target);

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
    addWritingEvent(this.$target);
  };

  this.render();
  this.addEvent();
}
