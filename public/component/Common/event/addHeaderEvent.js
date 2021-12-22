import { ROUTE_TYPE, routes } from '../../App.js';

const addHeaderEvent = $parent => {
  const $navUserWrapper = $parent.querySelector('.navbar-user-wrapper');
  const $navUserMenu = $parent.querySelector('.user-menu-list');
  const $navWritingBtn = $parent.querySelector('.writing-btn');
  const $navSettingBtn = $parent.querySelector('.nav-setting-btn');
  const $mainLogo = $parent.querySelector('.main-logo');

  $mainLogo.addEventListener('click', e => {
    e.preventDefault();
    window.history.pushState({}, ROUTE_TYPE.HOME, window.location.origin + ROUTE_TYPE.HOME);
    routes[ROUTE_TYPE.HOME]($parent);
  });

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
