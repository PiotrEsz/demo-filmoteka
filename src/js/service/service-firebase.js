import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { firebaseConfig } from '../settings/fb-config';
import { closeModalAuth, openModalAuth } from '../modals/modal-auth';
import { getUserId } from '../service/user-data';
import { getUserIdFromDB } from './db-manipulations';
import {
  signOutBtnShow,
  signOutBtnHide,
  showNotifyError,
  showNotifySuccess,
  showNotifyWarn,
} from './notifications';
import {
  getUserAuthId,
  getWatchedFilms,
} from '../templates/render-gallery-my-library';
import { getUserIdAfterSignIn } from '../modals/auth-form';
import { signOutBtn, signOutWrap, form, homePage } from '../refs/refs';
import { filterFilmByBtn } from '../modals/modal-film';
import { getDataFromFirebase } from '../utils/get-data-from-fb';

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

function userRegistration(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
    })
    .catch(error => {
      showNotifyError('Something went wrong. Please try again');
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

function userSignIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;

      signOutBtnShow();
      showNotifySuccess('You are successfully authorized');
      closeModalAuth();
      // if (homePage.classList.contains('modal-film-is-open') !== true) {
      //   getWatchedFilms(user.uid);
      // }

      getDataFromFirebase(user.uid);
      filterFilmByBtn(user.uid);
    })
    .catch(error => {
      const errorMessage = error.message;

      showNotifyError('Wrong email or password. Please try again or register.');
      openModalAuth();
      form.reset();
      return errorMessage;
    });
}

function userSignInWithGoogle(evt) {
  signInWithPopup(auth, provider)
    .then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      showNotifySuccess('You are successfully authorized');
      // The signed-in user info.
      const user = result.user;
      closeModalAuth();
      getDataFromFirebase(user.uid);

      // if (homePage.classList.contains('modal-film-is-open') !== true) {
      //   getWatchedFilms(user.uid);
      // }
      filterFilmByBtn(user.uid);

      // ...
    })
    .catch(error => {
      // errorSignInOrOut();
      showNotifyError('Something went wrong. Please try again');
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

onAuthStateChanged(auth, user => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    getUserId(uid);
    getUserIdFromDB(uid);
    getUserAuthId(uid);
    getUserIdAfterSignIn(uid);
    signOutBtn.addEventListener('click', userSignOut);
    signOutWrap.classList.remove('is-hidden');

    // ...
  } else {
    getUserId(null);
    getUserIdFromDB(null);
    getUserAuthId(null);
    getUserIdAfterSignIn(null);
    // User is signed out
    // ...
  }
});

function userSignOut(evt) {
  signOut(auth)
    .then(() => {
      showNotifyWarn('You have signed out');
      signOutBtnHide();
      // Sign-out successful.
    })
    .catch(error => {
      // errorSignInOrOut();
      signOutBtnHide();
      showNotifyError('Something went wrong. Please try again');
      // An error happened.
    });
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 400);
}

export { userRegistration, userSignIn, userSignInWithGoogle, userSignOut };
