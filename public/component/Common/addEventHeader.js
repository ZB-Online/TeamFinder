const addEventHeader = routeWriting => {
  const $navUserWrapper = document.querySelector('.navbar-user-wrapper');
  const $navUserMenu = document.querySelector('.user-menu-list');
  const $navWritingBtn = document.querySelector('.writing-btn');
  
  $navUserWrapper.addEventListener('click', () => {
    $navUserMenu.classList.toggle('hidden');
  });
  
  $navWritingBtn.addEventListener('click',()=>{
    routeWriting();
  });
};

export default addEventHeader;