import { filterFilmByBtn, openedFilmId } from '../modals/modal-film';
import {
  addMovieToWatched,
  addMovieToQueue,
  removeMovieFromWatched,
  removeMovieFromQueue,
  removeMovieFromQueue,
} from './db-manipulations';
import { openModalAuth } from '../modals/modal-auth';
import { showNotifyInfo } from './notifications';
import { removeW, addW, removeQ, addQ } from '../constants';

let userId = null;
let chosenMovie = null;

function getUserId(id) {
  userId = id;
}

//rotates the movie object from modal
function getMovieData(data) {
  chosenMovie = data;
}

// a function that is launched when you click on a button in a modal window for a movie (add to the list of viewed ones)
function onAddToWatchedBtnClick(evt) {
  const dataObj = createMovieData(chosenMovie, userId);
  const btnTitle = evt.currentTarget.textContent;

  if (!isUserSignIn(userId)) {
    return;
  }

  // adds or deletes from the list of movies watched in the database
  if (btnTitle.trim() === addW) {
    addMovieToWatched(dataObj);
  } else if (btnTitle.trim() === removeW) {
    removeMovieFromWatched(dataObj);
  }
  // console.log(openedFilmId);
  filterFilmByBtn(openedFilmId);
  // console.log(openedFilmId);
}

// a function that is launched when you click on a button in the movie modal window (add to the list of drawers)
function onAddToQueueBtnClick(evt) {
  const data = createMovieData(chosenMovie, userId);
  const btnTitle = evt.currentTarget.textContent;

  if (!isUserSignIn(userId)) {
    return;
  }

  // adds or deletes from the list of films in the database
  if (btnTitle.trim() === addQ) {
    addMovieToQueue(data);
  } else if (btnTitle.trim() === removeQ) {
    removeMovieFromQueue(data);
  }
  // console.log(openedFilmId);
  filterFilmByBtn(openedFilmId);
  // console.log(openedFilmId);
}

// a function that checks whether you have logged in or not, opens a modal window to the input
function isUserSignIn(userId) {
  if (!userId) {
    openModalAuth();
    showNotifyInfo('Please sign in to your account or register');

    return false;
  }
  return true;
}

// a function that creates an object for a database that supplies data to a client
function createMovieData(movieObj, userId) {
  return {
    movie: movieObj,
    id: userId,
  };
}

export {
  getUserId,
  onAddToWatchedBtnClick,
  onAddToQueueBtnClick,
  chosenMovie,
  getMovieData,
};
