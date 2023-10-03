import 'js-loading-overlay';
import { pagination } from './pagination/pagination';
import { loadingSpinnerConfig } from './settings/spinner-config';
import { MoviesService } from './service/service-fetch';
import { markupMoviesGallery } from './templates/render-markup-gallery';
import { popular, topRated, nowPlaying, quantityPages } from './constants';
import {
  galleryList,
  buttonWrap,
  buttonPopular,
  buttonTopRated,
  buttonNowPlaying,
} from './refs/refs';

//Function for render markup after click on filter button
export async function onFilterButtonClick(e) {
  if (e.target.nodeName !== 'BUTTON') return;
  MoviesService.param = e.target.dataset.id;
  MoviesService.page = 1;

  JsLoadingOverlay.show(loadingSpinnerConfig);

  const response = await MoviesService.getMovies();
  galleryList.innerHTML = '';

  let totalPages = response.total_pages;
  if (totalPages > quantityPages) totalPages = quantityPages;

  JsLoadingOverlay.hide();

  markupMoviesGallery(response.results);
  pagination.reset(totalPages);

  removeClassAccentFromButton();
  e.target.classList.add('button-accent-filter');

  // Checking for button title
  if (MoviesService.param === popular)
    setButtonAttribute(true, false, false);
  if (MoviesService.param === topRated)
    setButtonAttribute(false, true, false);
  if (MoviesService.param === nowPlaying)
    setButtonAttribute(false, false, true);
}

// Function for removing accent class
function removeClassAccentFromButton() {
  const activeButton = buttonWrap.querySelector('.button-accent-filter');

  if (activeButton) activeButton.classList.remove('button-accent-filter');
}

// Function for add/remove button attribute
function setButtonAttribute(popularBtn, topRated, nowPlaying) {
  buttonPopular.disabled = popularBtn;
  buttonTopRated.disabled = topRated;
  buttonNowPlaying.disabled = nowPlaying;
}
