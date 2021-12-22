import { WritingComponent } from '../../Writing/Writing.js';
import { SettingComponent } from '../../Setting/Setting.js';

const addHeaderEvent = $parent => {
  const $navUserWrapper = document.querySelector('.navbar-user-wrapper');
  const $navUserMenu = document.querySelector('.user-menu-list');
  const $navWritingBtn = document.querySelector('.writing-btn');
  const $navSettingBtn = document.querySelector('.nav-setting-btn');

  $navUserWrapper.addEventListener('click', () => {
    $navUserMenu.classList.toggle('hidden');
  });

  $navWritingBtn.addEventListener('click', () => {
    window.history.pushState({}, '/writing', window.location.origin + '/writing');
    WritingComponent($parent);
  });
  $navSettingBtn.addEventListener('click', () => {
    window.history.pushState({}, '/setting', window.location.origin + '/setting');
    SettingComponent($parent);
  });
};

export default addHeaderEvent;
