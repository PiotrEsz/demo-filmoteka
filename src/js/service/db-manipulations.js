import { initializeApp } from 'firebase/app';
import { getDatabase, ref, update, set } from 'firebase/database';

import { firebaseConfig } from '../settings/fb-config';
import { showNotifyError } from './notifications';
const app = initializeApp(firebaseConfig);
const db = getDatabase();

let userId = null;

function getUserIdFromDB(id) {
  userId = id;
}

// a function that adds an object with data to the database
function addMovieToWatched(data) {
  try {
    set(ref(db, userId + '/watched/' + data.movie.id), data);
  } catch (error) {
    showNotifyError(error.message);
  }
}

function addMovieToQueue(data) {
  try {
    set(ref(db, userId + '/queue/' + data.movie.id), data);
  } catch (error) {
    showNotifyError(error.message);
  }
}

function removeMovieFromWatched(data) {
  const folder = 'watched';
  const movieId = data.movie.id;
  removeMovieById(folder, movieId);
}

function removeMovieFromQueue(data) {
  const folder = 'queue';
  const movieId = data.movie.id;
  removeMovieById(folder, movieId);
}

function removeMovieById(folder, movieId) {
  const removedMovieData = {};
  removedMovieData[userId + '/' + folder + '/' + movieId] = null;

  return update(ref(db), removedMovieData);
}

export {
  getUserIdFromDB,
  addMovieToWatched,
  addMovieToQueue,
  removeMovieFromWatched,
  removeMovieFromQueue,
  db,
};
