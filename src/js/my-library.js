import { openModalAuth } from './modals/modal-auth';
import {
  userAuthId,
  getWatchedFilms,
  getQueueFilms,
} from './templates/render-gallery-my-library';
import {
  formTextErrSearch,
  myLibraryBtn,
  btnHome,
  btnWatched,
  btnQueue,
  galleryHome,
  galleryWatchedList,
  btnContainer,
  searchContainer,
  headerEl,
} from './refs/refs';
import {
  changeMyLibraryBtnStyles,
  changeHeaderBtnStyles,
} from './service/heafer-button-swith';

// My Library click handler function
export function onMyLibraryButton() {
  formTextErrSearch.classList.add('visually-hidden');
  if (!userAuthId) {
    openModalAuth();
  } else {
    getWatchedFilms(userAuthId);
  }
  changeHeaderBtnStyles(myLibraryBtn, btnHome);
  togglePages();
  getWatchedFilms(userAuthId);
}

// Click handler function Watched
export function onBtnWatched() {
  changeMyLibraryBtnStyles(btnWatched, btnQueue);
  if (userAuthId) {
    getWatchedFilms(userAuthId);
  }
}

// Queue click handler function
export function onBtnQueue() {
  changeMyLibraryBtnStyles(btnQueue, btnWatched);
  if (userAuthId) {
    getQueueFilms(userAuthId);
  }
}

// Home click handler function
export function onBtnHome() {
  changeHeaderBtnStyles(btnHome, myLibraryBtn);
}

export function togglePages() {
  galleryHome.innerHTML = '';
  galleryWatchedList.innerHTML =
    '<p class="no-films-in-list">You haven`t added anything yet... &#128546</p>';
  btnContainer.classList.remove('visually-hidden');
  searchContainer.classList.add('visually-hidden');

  btnHome.classList.remove('current');
  myLibraryBtn.classList.add('current');
  headerEl.classList.remove('header-container');
  headerEl.classList.add('header-container-my-library');
}
