import { WritingComponent } from '../../Writing/Writing.js';

const addHeaderEvent = $parent => {
  const $navUserWrapper = document.querySelector('.navbar-user-wrapper');
  const $navUserMenu = document.querySelector('.user-menu-list');
  const $navWritingBtn = document.querySelector('.writing-btn');

  $navUserWrapper.addEventListener('click', () => {
    $navUserMenu.classList.toggle('hidden');
  });

  $navWritingBtn.addEventListener('click', () => {
    window.history.pushState({}, '/writing', window.location.origin + '/writing');
    WritingComponent($parent);
  });
};

export default addHeaderEvent;
