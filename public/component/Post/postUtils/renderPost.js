import { ROUTE_TYPE, routes } from '../../App.js';

import { initialFilter } from '../../../store/filter.js';

const formatContent = content => content.replace(/\n/g, '<br>');

const isOwner = (userId, ownerId) => userId === ownerId;

const getBtnBox = (type, isOwner, recruit) =>
  isOwner
    ? `<section class="btn-box">
          ${type === 'post' ? `<button class="ended">${recruit ? '마감' : '마감 취소'}</button>` : ''}
          <button class="edit">수정</button>
          <button class="delete">삭제</button>
        </section>`
    : '';

const getPostHeader = ({ title, date, owner }, postBoxBtns) => `
  <section class="post-header">
    <h1 class="post-title">${title}</h1>
    <div class="post-info">
      <div class="post-owner-info">
        <img
          class="info-image"
          src="https://hola-post-image.s3.ap-northeast-2.amazonaws.com/default.PNG"
          alt="default"
        />
        <span class="writer">${owner.nickname}</span>
      </div>
      <span class="date">${date}</span>
    </div>
    ${postBoxBtns}
  </section>`;

const getPostFilters = ({ city, sportsTypes }) => {
  const postFilter = {
    cities: `<li data-index="${city}">${initialFilter.cities[city]}</li>`,
    sports: sportsTypes
      .map(sportsType => `<li data-index="${sportsType}">${initialFilter.sports[sportsType]}</li>`)
      .join(''),
  };

  return Object.keys(postFilter)
    .map(
      filter => `
        <section class="post-filter" data-filter=${filter}>
          <span>${filter === 'cities' ? '지역' : '종목'}</span>
          <ul class="filter-list">
            ${postFilter[filter]}
          </ul>
        </section>`,
    )
    .join('');
};

const getPostContent = ({ content }) => `
  <section class="post-content-box">
    <p>${formatContent(content)}</p>
  </section>`;

const getPostLikeCount = ({ likeCount }, likeActive) => `
  <section class="post-like-count">
    <button class="like ${likeActive ? 'active' : ''}">❤</button>
    <span>${likeCount}</span>
  </section>`;

const getCommentInput = commentCount => `
  <section class="comment-input">
    <h2 class="comment-count">${commentCount}개의 댓글</h2>
    <textarea class="textarea" placeholder="댓글을 입력하세요."></textarea>
    <button class="btn upload">댓글 등록</button>
  </section>`;

const getCommentList = ({ comments }, id, getBtnBox) =>
  comments
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
          <span class="info-date">${comment.date}</span>
        </div>
        ${getBtnBox('comment', isOwner(id, comment.owner.id))}
      </section>
      <section class="comment-content">
        <p>${formatContent(comment.content)}</p>
      </section>
    </li>`,
    )
    .join('');

const renderPost = (post, likeActive, authUser) => {
  const $postBox = document.querySelector('.post-box');
  const $commentBox = document.querySelector('.comment-box');

  const { title, date, city, sportsTypes, likeCount, owner, content, recruit, comments } = post;
  const { id } = authUser;

  const postBoxBtns = getBtnBox('post', isOwner(id, owner.id), recruit);

  $postBox.innerHTML = `
    ${getPostHeader({ title, date, owner }, postBoxBtns)}
    ${getPostFilters({ city, sportsTypes })}
    ${getPostContent({ content })}
    ${getPostLikeCount({ likeCount }, likeActive)}`;

  $commentBox.innerHTML = `
    ${getCommentInput(comments.length)}
    <ul class="comment-list">
      ${getCommentList({ comments }, id, getBtnBox)}
    </ul>`;
};

const render = state => {
  const { post, likeActive } = state;
  try {
    // if (!post) throw new Error('Data Not Found');
    const authUser = { id: localStorage.teamfinderId, nickname: localStorage.teamfinderNickname };
    renderPost(post, likeActive, authUser);
  } catch (e) {
    // window.history.replaceState({}, ROUTE_TYPE.HOME, window.location.origin + ROUTE_TYPE.HOME);
    // routes[ROUTE_TYPE.HOME](document.querySelector('#root'));
  }
};

export default render;
