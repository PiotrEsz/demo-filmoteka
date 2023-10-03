import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import 'js-loading-overlay';
import { MoviesService } from '../service/service-fetch';
import { markupMoviesGallery } from '../templates/render-markup-gallery';
import { loadingSpinnerConfig } from '../settings/spinner-config';
import { scrollTo } from './scroll-to-top-btn';
import { quantityPages } from '../constants';
import {
  buttonWrap,
  paginationWrapper,
  buttonPopular,
  galleryList,
  paginationRef,
} from '../refs/refs';

// Function for getting quantity of pages and render markup for home page('Popular')
export async function getTotalPage() {
  JsLoadingOverlay.show(loadingSpinnerConfig);
  try {
    const listOfMovies = await MoviesService.getMovies();
    const getListOfMovies = listOfMovies.results;
    let quantityOfPages = listOfMovies.total_pages;
    if (quantityOfPages > quantityPages) quantityOfPages = quantityPages;

    JsLoadingOverlay.hide();
    markupMoviesGallery(getListOfMovies);

    buttonWrap.classList.remove('visually-hidden');
    paginationWrapper.classList.remove('visually-hidden');

    pagination.reset(quantityOfPages);

    if (MoviesService.param === 'popular') buttonPopular.disabled = true;
  } catch (error) {
    console.log(error.message);
  }
}

// Create new instance for pagination
export const pagination = new Pagination(paginationRef, {
  totalItems: 0,
  visiblePages: 5,
});

// Function for pagination and render markup after move
export async function moviePagination(e) {
  try {
    MoviesService.page = e.page;
    JsLoadingOverlay.show(loadingSpinnerConfig);
    const { results } = await MoviesService.getMovies();
    galleryList.innerHTML = '';
    JsLoadingOverlay.hide();
    markupMoviesGallery(results);
    scrollTo();
  } catch (error) {
    console.log(error.message);
  }
}