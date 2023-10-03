import axios from 'axios';
import { async } from '@firebase/util';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'tui-pagination/dist/tui-pagination.min.css';
import { getFilteredMovies } from '../utils/fetch-utils';
import { API_KEY, BASE_URL } from '../settings/fetch-config';
import { showNotifyError } from './notifications';

export async function getGenres() {
  try {
    const response = await axios.get(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );
    return response.data.genres;
  } catch (error) {
    console.log(error.message);
    showNotifyError('Something went wrong &#128543;');
  }
}

export let copy = null;
export const MoviesService = {
  _page: 1,
  _param: 'popular',
  _query: '',
  async getMovies() {
    try {
      const response = await axios.get(
        `${BASE_URL}/movie/${this.param}?api_key=${API_KEY}&page=${this.page}`
      );
      const genres = await getGenres();
      let { results, total_pages } = response.data;

      results = getFilteredMovies(results, genres);
      copy = JSON.stringify({ results });
      return { results, total_pages };
    } catch (error) {
      showNotifyError('Something went wrong &#128543;');
    }
  },

  async getMoviesBySearch() {
    try {
      const response = await axios.get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&page=${this.page}&query=${this._query}&include_adult=false`
      );
      const genres = await getGenres();
      let { results, total_pages } = response.data;

      results = getFilteredMovies(results, genres);

      copy = JSON.stringify({ results });
      return { results, total_pages };
    } catch (error) {
      showNotifyError('Something went wrong &#128543;');
    }
  },

  get page() {
    return this._page;
  },

  set page(newPage) {
    this._page = newPage;
  },

  get param() {
    return this._param;
  },

  set param(newParam) {
    this._param = newParam;
  },

  get query() {
    return this._query;
  },

  set query(newQuery) {
    this._query = newQuery;
  },
};

export async function getMovieTrailer(idMovie) {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${idMovie}/videos?api_key=${API_KEY}&language=en-US`
    );
    return response;
  } catch (error) {
    showNotifyError('Something went wrong &#128543;');
  }
}

export async function getMovieById(idMovie) {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${idMovie}?api_key=${API_KEY}&language=en-US`
    );
    return response.data;
  } catch (error) {
    showNotifyError('Something went wrong &#128543;');
  }
}
