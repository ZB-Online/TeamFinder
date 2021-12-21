import { client, basePosts, usersNickname } from '../../../api/axios.js';
import { TOAST_TYPE, toaster, createToastAction } from '../../../utils/toaster.js';
import { getPostElements } from '../../../utils/renderPost.js';
import PostList from '../../Home/PostList.js';

export default function addEventSetting($target, $parent) {
  const mainMove = accessPrevention => {
    accessPrevention
      ? window.history.pushState({}, '/index', window.location.origin + '/index.html')
      : window.history.replaceState({}, '/index', window.location.origin + '/index.html');
    $parent.removeChild($parent.lastChild);
    new PostList({
      $parent,
      initialState: {},
    });
  };

  const userId = localStorage.getItem('teamfinderId');
  const $nickNameInput = $target.querySelector('.nickName-input');
  // 작성 목록 렌더
  const myBookFilter = myBooks => myBooks.filter(myBook => myBook.owner.id === userId);

  const myBooksRender = myBooksList => {
    const $contentList = $target.querySelector('.post-list');
    $contentList.innerHTML = ``;
    getPostElements(myBookFilter(myBooksList)).forEach($post => {
      $contentList.appendChild($post);
    });
  };

  const getAllPosts = async () => {
    try {
      const res = await basePosts.get('posts/');
      myBooksRender([...res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  // posts owner nickname 변경
  const patchPostOwnerNickname = async (userId, newNickname) => {
    try {
      await basePosts.patch(`/posts/setting/${userId}`, { nickname: newNickname });
    } catch (error) {
      console.log(error);
    }
  };

  const toasterAlert = (type, title, msg) => toaster.add(createToastAction(type, title, msg));

  // 회원 닉네임 수정
  const patchUserNickname = async (userId, newNickname) => {
    try {
      await usersNickname.patch(`users/${userId}`, { nickname: newNickname });
      await patchPostOwnerNickname(userId, newNickname);
      localStorage.setItem('teamfinderNickname', $nickNameInput.value);
      toasterAlert(TOAST_TYPE.SUCCESS, 'Well done!', '회원 정보가 수정되었습니다.');
      mainMove(false);
    } catch (error) {
      console.log(error);
    }
  };

  // 회원 탈퇴
  const deleteUser = async userId => {
    try {
      await client.delete(`users/${userId}`);
      toasterAlert(TOAST_TYPE.SUCCESS, 'Well done!', '회원이 탈퇴 되었습니다.');
      localStorage.clear();
      mainMove(true);
      // 메인 이동
    } catch (error) {
      console.log(error);
    }
  };

  // 닉네임 중복 검사
  const nickNameFilter = (newname, oldNames) => {
    if (oldNames.filter(oldName => oldName.nickname === newname).length)
      toasterAlert(TOAST_TYPE.WARNING, 'opps!!', '닉네임이 중복됩니다.');
    else patchUserNickname(userId, newname);
  };

  // 전체 유저 데이터 가져오기
  const getNicknames = async newName => {
    try {
      const res = await client.get('users');
      nickNameFilter(newName, [...res.data]);
    } catch (error) {
      console.log(console.error(error));
    }
  };

  const $memberOut = $target.querySelector('.member-out');
  const $popupWrap = $target.querySelector('.popup-wrap');
  const $memberPopup = $target.querySelector('.member-popup');
  const $settingSubmit = $target.querySelector('.setting-submit');

  // 닉네임 변경 클릭
  $settingSubmit.addEventListener('click', () => {
    if (localStorage.getItem('teamfinderNickname') === $nickNameInput.value || $nickNameInput.value.trim() === '') {
      console.log(localStorage.getItem('teamfinderNickname'));
      toasterAlert(TOAST_TYPE.SUCCESS, 'Well done!', '회원 정보가 수정되었습니다.');
      mainMove(false);
    } else getNicknames($nickNameInput.value);
  });

  // 회원 탈퇴 팝업창 on
  $memberOut.addEventListener('click', () => {
    $popupWrap.style.display = 'block';
  });

  // 회원 삭제 취소
  $memberPopup.addEventListener('click', e => {
    if (!e.target.matches('.popup-delete-no')) return;
    e.target.closest('.popup-wrap').style.display = 'none';
  });

  // 회원 삭제 승인
  $memberPopup.addEventListener('click', e => {
    if (!e.target.matches('.popup-delete-yes')) return;
    deleteUser(userId);
  });

  // 초기 렌더
  getAllPosts();
  $nickNameInput.value = localStorage.getItem('teamfinderNickname');
}
