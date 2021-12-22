import { ROUTE_TYPE, routes } from '../../App.js';

const addHeaderEvent = $parent => {
  const $navUserWrapper = document.querySelector('.navbar-user-wrapper');
  const $navUserMenu = document.querySelector('.user-menu-list');
  const $navWritingBtn = document.querySelector('.writing-btn');
  const $navSettingBtn = document.querySelector('.nav-setting-btn');

  $navUserWrapper.addEventListener('click', () => {
    $navUserMenu.classList.toggle('hidden');
  });

  $navWritingBtn.addEventListener('click', () => {
    window.history.pushState({}, ROUTE_TYPE.WRITING, window.location.origin + ROUTE_TYPE.WRITING);
    routes[ROUTE_TYPE.WRITING]($parent);
  });

  $navSettingBtn.addEventListener('click', () => {
    window.history.pushState({}, ROUTE_TYPE.SETTING, window.location.origin + ROUTE_TYPE.SETTING);
    routes[ROUTE_TYPE.SETTING]($parent);
  });
};

export default addHeaderEvent;
