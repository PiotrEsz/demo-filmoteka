import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { getMovieTrailer } from '../service/service-fetch';
import { openedFilmId, closeModalFilmKey } from './modal-film';
import {
  iframeAtr,
  trailerInformationLength,
  btnTrailerPrev,
  btnTrailerNext,
  trailerInformationPage,
} from '../refs/refs';
import {manipulationEventListener} from '../utils/event-list'
let links = null;
const nameBtn = [btnTrailerPrev, btnTrailerNext];
const listEv= [undoLink,nextLink]
const modal = basicLightbox.create(document.querySelector('#htmls'), {
  // action on open modal film 
  onClose: () => {
    window.addEventListener('keydown', closeModalFilmKey);
   manipulationEventListener(nameBtn,"remove",'click',listEv)
    iframeAtr.setAttribute('data-value', 0);
  },
  // action on close modal film
  onShow: () => {
    window.addEventListener('keydown', closeModalTrailerKey);
   manipulationEventListener(nameBtn,"add",'click',listEv)
  },
});
// created request for movie db
export function openModalTrailer() {
  getMovieTrailer(openedFilmId)
    .then(createModalTrailer)
    .catch(error => {
      console.error(error);
    });
}
//add function btn next
function nextLink() {
  let nows = Number(iframeAtr.getAttribute('data-value'));
  nows += 1;
  check(nows);
}
//add function btn prev
function undoLink() {
  let nows = Number(iframeAtr.getAttribute('data-value'));
  nows -= 1;
  check(nows);
}
//marking count list video
function check(ev) {
  const length = links.length - 1;
  if (ev === -1) {
    ev = length;
  } else if (length < ev) {
    ev = 0;
  }
  iframeAtr.setAttribute('data-value', ev);
  createIframeMarkup(links, ev);
}
//open trailer film
function createModalTrailer(ev) {
  links = ev.data.results;
  createIframeMarkup(links);
  modal.show();
}
//add attribute video 
function createIframeMarkup(ev, now = 0) {
  iframeAtr.setAttribute(
    'src',
    `https://www.youtube.com/embed/${ev[now].key}?controls=1&autoplay=1`
  );
  trailerInformationLength.textContent = ev.length;
  trailerInformationPage.textContent = now + 1 + ' / ';
}

// register event of key escape
function closeModalTrailerKey(event) {
  if (event.code === 'Escape') {
    modal.close();
  }
}