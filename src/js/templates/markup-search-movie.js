import moment from 'moment';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { galleryList } from '../refs/refs';

export async function markupMoviesGalleryBySearch(arr) {
  try {
    const markup = arr
      .map(item => {
        return `<li class="card">
        <div class="img-thumb">
        <picture>
        <source
          srcset="https://image.tmdb.org/t/p/w780/${
            item.poster_path === null
              ? '/h5oGodvcoq8cyIDTy79yKn4qbey.jpg'
              : item.poster_path
          }"
          media="(min-width: 1280px)"
        />
        <source
          media="(min-width: 768px)"
          srcset="https://image.tmdb.org/t/p/w500/${
            item.poster_path === null
              ? '/h5oGodvcoq8cyIDTy79yKn4qbey.jpg'
              : item.poster_path
          }"
        />
        <source
          media="(min-width: 320px)"
          srcset="https://image.tmdb.org/t/p/w342/${
            item.poster_path === null
              ? '/h5oGodvcoq8cyIDTy79yKn4qbey.jpg'
              : item.poster_path
          }"
        />
        <img
          srcset="https://image.tmdb.org/t/p/w342/${
            item.poster_path === null
              ? '/h5oGodvcoq8cyIDTy79yKn4qbey.jpg'
              : item.poster_path
          }"
          src="https://image.tmdb.org/t/p/w342/${
            item.poster_path === null
              ? '/h5oGodvcoq8cyIDTy79yKn4qbey.jpg'
              : item.poster_path
          }"
          alt="${item.title}"
          class="card__img" loading="lazy"
        />
      </picture>
      </div>
      <a href="#" data-id="${item.id}" class="card-link">
          <h2 class="card__title">${item.title}</h2>
          </a>
          <p class="card__description" data-id="${item.id}">
            <span class="card__genre tooltip">${!item.previewGenres ? `unknown genre` : item.previewGenres} 
            <span class="tooltiptext">${!item.allGenres ? `unknown genre` : item.allGenres}</span> | ${
          !item.release_date ? 'released' : moment(item.release_date).format('YYYY')}</span>
            <span class="card__rating visually-hidden">${
              item.vote_average
            }</span>
          </p>
      </li>`;
      })
      .join('');

    galleryList.insertAdjacentHTML('beforeend', markup);
  } catch (error) {
    Notify.failure('Something went wrong &#128543;');
  }
}
