import throttle from 'lodash.throttle';
import {
  getTotalPage,
  pagination,
  moviePagination,
} from './js/pagination/pagination';
import { scrollTo, scrollToTopButton } from './js/pagination/scroll-to-top-btn';
import { onSearchMovieByKeyword, onInputSearch } from './js/search-movies';
import { onCloseBtnModalAuth } from './js/modals/modal-auth';
import { onFormSubmit, updateForm } from './js/modals/auth-form';
import { userSignInWithGoogle } from './js/service/service-firebase';
import { onFilterButtonClick } from './js/filter';
import { openModalFilm } from './js/modals/modal-film';
import { onModalOpen, onClickBackdrop } from './js/modals/modal-close';
import {
  onAddToWatchedBtnClick,
  onAddToQueueBtnClick,
} from './js/service/user-data';
import {
  onMyLibraryButton,
  onBtnQueue,
  onBtnWatched,
  onBtnHome,
} from './js/my-library';

import {
  form,
  formSwitchBtn,
  modalAuthEl,
  formSignInWithGoogle,
  galleryList,
  addToWatchedBtn,
  addToQueueBtn,
  myLibraryBtn,
  btnHome,
  btnQueue,
  btnWatched,
  modalDevBtn,
  closeModalDevBtn,
  backdrop,
  inputSearch,
  searchForm,
  buttonWrap,
  backToTopBtn,
  galleryListQueue,
  galleryListWatch,
} from './js/refs/refs';

form.addEventListener('submit', onFormSubmit);
formSwitchBtn.addEventListener('click', updateForm);

formSignInWithGoogle.addEventListener('click', userSignInWithGoogle);
galleryList.addEventListener('click', openModalFilm);
galleryListQueue.addEventListener('click', openModalFilm);
galleryListWatch.addEventListener('click', openModalFilm);

addToWatchedBtn.addEventListener('click', onAddToWatchedBtnClick);
addToQueueBtn.addEventListener('click', onAddToQueueBtnClick);

myLibraryBtn.addEventListener('click', onMyLibraryButton);
btnHome.addEventListener('click', onBtnHome);

btnQueue.addEventListener('click', onBtnQueue);
btnWatched.addEventListener('click', onBtnWatched);

modalAuthEl.addEventListener('click', onCloseBtnModalAuth);

modalDevBtn.addEventListener('click', onModalOpen);
closeModalDevBtn.addEventListener('click', onModalOpen);
backdrop.addEventListener('click', onClickBackdrop);

inputSearch.addEventListener('input', onInputSearch);
searchForm.addEventListener('submit', throttle(onSearchMovieByKeyword, 1000));
buttonWrap.addEventListener('click', onFilterButtonClick);

document.addEventListener('DOMContentLoaded', getTotalPage);
pagination.on('afterMove', moviePagination);

window.addEventListener('scroll', scrollToTopButton);
backToTopBtn.addEventListener('click', scrollTo);
