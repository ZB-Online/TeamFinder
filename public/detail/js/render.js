import { initialFilter } from '../../store/filter.js';

const $postBox = document.querySelector('.post-box');
const $commentBox = document.querySelector('.comment-box');

const render = (post, authUser) => {
  const { title, writer, date, owner, city, sportsTypes, content, recruit, comments } = post;
  const { id } = authUser;

  const formatContent = content => content.replace(/\n/g, '<br>');

  const postHeader = (() => {
    const btnBox =
      id === owner.id
        ? `<section class="btn-box">
          <button class="ended">${recruit ? '마감' : '마감 취소'}</button>
          <button class="modify">수정</button>
          <button class="delete">삭제</button>
        </section>`
        : '';

    return `
      <section class="post-header">
        <h1 class="post-title">${title}</h1>
        <div class="post-info">
          <div class="post-owner-info">
            <img
              class="info-image"
              src="https://hola-post-image.s3.ap-northeast-2.amazonaws.com/default.PNG"
              alt="default"
            />
            <span class="writer">${writer}</span>
          </div>
          <span class="date">${date}</span>
        </div>
        ${btnBox}
      </section>`;
  })();

  const postFilters = (() => {
    const postFilter = {
      city: `<li>${initialFilter.cities[city]}</li>`,
      sportsTypes: sportsTypes.map(sportsType => `<li>${initialFilter.sports[sportsType]}</li>`).join(''),
    };

    return Object.keys(postFilter)
      .map(
        filter => `
        <section class="post-filter">
          <span>${filter === 'city' ? '지역' : '종목'}</span>
          <ul class="filter-list">
            ${postFilter[filter]}
          </ul>
        </section>`
      )
      .join('');
  })();

  const postContent = (() => `
    <section class="post-content">
      <p>${formatContent(content)}</p>
    </section>`)();

  $postBox.innerHTML = `${postHeader}${postFilters}${postContent}`;

  const commentInput = `
    <section class="comment-input">
      <h2 class="comment-count">${comments.length}개의 댓글</h2>
      <textarea class="textarea" placeholder="댓글을 입력하세요."></textarea>
      <button class="btn upload">댓글 등록</button>
    </section>`;

  const commentList = comments
    .map(
      comment => `
    <li class="comment" data-id=${comment.id}>
      <section class="comment-header">
        <div class="comment-owner-info">
          <img
            class="info-image"
            src="https://hola-post-image.s3.ap-northeast-2.amazonaws.com/default.PNG"
            alt="default"
          />
          <span class="info-name">${comment.owner.nickname}</span>
          <span class="info-date">${date}</span>
        </div>
        ${
          id === comment.owner.id
            ? `<div class="btn-box">
                <button class="modify">수정</button>
                <button class="delete">삭제</button>
              </div>`
            : ''
        }
      </section>
      <section class="comment-content">
        <p>${formatContent(comment.content)}</p>
      </section>
    </li>`
    )
    .join('');

  $commentBox.innerHTML = `${commentInput}<ul class="comment-list">${commentList}</ul>`;
};

export default render;
