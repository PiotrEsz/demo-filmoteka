import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { userSignOut } from './service-firebase';
import { signOutWrap, signOutBtn, form } from '../refs/refs';

function signOutBtnShow() {
  signOutBtn.addEventListener('click', userSignOut);
  signOutWrap.classList.remove('is-hidden');
}

function signOutBtnHide() {
  signOutWrap.classList.add('is-hidden');
  signOutBtn.removeEventListener('click', userSignOut);
}

function showNotifyWarn(message) {
  Notiflix.Notify.warning(message);
}

function showNotifyError(message) {
  Notiflix.Notify.failure(message);
}

function showNotifyInfo(message) {
  Notiflix.Notify.info(message);
}

function showNotifySuccess(message) {
  Notiflix.Notify.success(message);
}

export {
  signOutBtnShow,
  signOutBtnHide,
  showNotifyInfo,
  showNotifyError,
  showNotifySuccess,
  showNotifyWarn,
};
