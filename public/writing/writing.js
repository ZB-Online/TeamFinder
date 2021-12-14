const $title = document.querySelector('.title');
const $city = document.querySelector('.city');
const $sports = document.querySelector('.sports');
const $cityList = document.querySelector('.city-list');
const $cityItems = document.querySelector('.city-items');
const $sportsList = document.querySelector('.sports-list');
const $sportsItems = document.querySelector('.sports-items');
const $writeArea = document.querySelector('.writing-area');

// post
const request = {
  post(url, payload) {
    return fetch(url, {
      method: 'POST',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  },
};

const postingSend = payload => {
  request
    .post('/api/postings', payload)
    .then(resposne => resposne.json())
    .then((window.location.href = '../../index.html'))
    .catch(err => console.error(err));
};

const todayFormat = () => {
  const today = new Date();
  const format = num => (num < 10 ? `0${num}` : `${num}`);
  return `${today.getFullYear()}/${format(today.getMonth() + 1)}/${format(today.getDate())}`;
};

document.querySelector('.writing-submit').addEventListener('click', () => {
  // 임시 처리
  if ($title.value.trim() === '') {
    alert('제목을 입력해주세요');
    return;
  }
  if ($cityItems.childNodes.length === 0) {
    alert('지역을 선택해주세요');
    return;
  }
  if ($sportsItems.childNodes.length === 0) {
    alert('스포츠를 선택해주세요');
    return;
  }
  if ($writeArea.value.trim() === '') {
    alert('본문을 입력해주세요');
    return;
  }
  const cityArr = [...$cityItems.querySelectorAll('span')].map(city => city.getAttribute('data-index'));
  const sportsArr = [...$sportsItems.querySelectorAll('span')].map(sports => sports.getAttribute('data-index'));
  const writeVaules = {
    title: $title.value,
    city: cityArr,
    sportsType: sportsArr,
    content: $writeArea.value,
    date: todayFormat(),
  };
  postingSend(writeVaules);
});

// 중복 방지
const duplication = (items, e) => {
  let check = false;
  [...items.querySelectorAll('span')].forEach(item => {
    if (item.textContent === e.target.textContent) check = true;
  });
  return check;
};

// city 선택
$cityList.addEventListener('click', e => {
  if (!e.target.matches('li')) return;
  if (duplication($cityItems, e)) return;
  $cityItems.innerHTML += `
	<div class="city-item">
		<span data-index="${e.target.getAttribute('data-index')}">${e.target.textContent}</span>
		<i class="bx bx-x one-delete"></i>
	</div>
	`;
  $city.classList.toggle('active');
});

// sports 선택
$sportsList.addEventListener('click', e => {
  if (!e.target.matches('li')) return;
  if (duplication($sportsItems, e)) return;
  $sportsItems.innerHTML += `
	<div class="sports-item">
		<span data-index="${e.target.getAttribute('data-index')}">${e.target.textContent}</span>
		<i class="bx bx-x one-delete"></i>
	</div>
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
