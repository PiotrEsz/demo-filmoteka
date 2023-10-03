import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { getMovieById, getMovieTrailer } from '../service/service-fetch';
import { removeQ, removeW, addQ, addW } from '../constants';
import { openModalTrailer } from './modal-trailer';
import { createModalFilm } from '../templates/created-modal-film';
import {
  getMovieData,
  onAddToWatchedBtnClick,
  onAddToQueueBtnClick,
} from '../service/user-data';
import { userAuthId } from '../templates/render-gallery-my-library';
import {
  homePage,
  addToWatchedBtn,
  addToQueueBtn,
  btnCloseFilm,
  btnFilmTrailer,
} from '../refs/refs';
import { getDataFromFirebase, watch, queue } from '../utils/get-data-from-fb';

export let openedFilmId = null;

import { manipulationEventListener } from '../utils/event-list';
const nameBtn = [addToWatchedBtn, addToQueueBtn, btnCloseFilm]
const listEv =[onAddToWatchedBtnClick,onAddToQueueBtnClick,closeModalFilm]  

const modal = basicLightbox.create(document.querySelector('#html'), {
  // action on open modal film
  onClose: () => {
    homePage.classList.remove('modal-film-is-open');
    manipulationEventListener(nameBtn,"remove",'click',listEv)
    btnFilmTrailer.removeEventListener('click', openModalTrailer);
    window.removeEventListener('keydown', closeModalFilmKey);
  },
  // action on close modal film
  onShow: () => {
    getDataFromFirebase(userAuthId);
    manipulationEventListener(nameBtn,"add",'click',listEv)
    btnFilmTrailer.addEventListener('click', () => {
      openModalTrailer();
      window.removeEventListener('keydown', closeModalFilmKey);
    });
    window.addEventListener('keydown', closeModalFilmKey);
    homePage.classList.add('modal-film-is-open');
  },
});
// register click from gallery and take id
export function openModalFilm(ev) {
  ev.preventDefault();
  const evn = ev.target;

  if (evn.nodeName !== 'A' && evn.nodeName !== 'P') {
    return;
  }

  const id = evn.dataset.id;
  openedFilmId = Number(id);
  acceptIdInformation(openedFilmId);
}
// audit information of film and open modal film
async function acceptIdInformation(id) {
  const filteredFilmById = await getMovieById(id);
  const trailer = await getMovieTrailer(id);

  visibleBtnTrailer(trailer);

  filterFilmByBtn(id);
  const movieData = filteredFilmById;
  getMovieData(movieData);
  modal.show();
  createModalFilm(filteredFilmById);
}
// register event of key escape
export function closeModalFilmKey(event) {
  if (event.code === 'Escape') {
    closeModalFilm();
  }
}
//review btn trailer on visible
function visibleBtnTrailer(ev) {
   if (ev.data.results.length === 0) { btnFilmTrailer.classList.add("none") }
  else{btnFilmTrailer.classList.remove("none")}
} 
 //close modal film
export function closeModalFilm() {
  modal.close();
}
//accept name film
export function filterFilmByBtn(id) {
  if (userAuthId) {
    let filteredFilmBtnByWatch = null;
    let filteredFilmBtnByQueue = null;
    if (watch) {
      filteredFilmBtnByWatch = watch.some(ev => ev.movie.id === id);
    }
    if (queue) {
      filteredFilmBtnByQueue = queue.some(ev => ev.movie.id === id);
    }
    renameBtnFilm(filteredFilmBtnByWatch, filteredFilmBtnByQueue);
  }
}
//rename btn film
function renameBtnFilm(watch, queue) {
  queue
    ? (addToQueueBtn.textContent = removeQ)
    : (addToQueueBtn.textContent = addQ);
  watch
    ? (addToWatchedBtn.textContent = removeW)
    : (addToWatchedBtn.textContent = addW);
}
