import { userRegistration, userSignIn } from '../service/service-firebase';
import { formSwitchBtn, formSubmitBtn, formTitle, form } from '../refs/refs';


let formType = 'authorization';
let userId = null;

function getUserIdAfterSignIn(id) {
  userId = id;
}

function updateForm() {
  const conditionsInfo = document.querySelector('.js-conditions');

  if (formType === 'authorization') {
    formType = 'registration';
    conditionsInfo.removeAttribute('hidden', '');
  } else {
    formType = 'authorization';
    conditionsInfo.setAttribute('hidden', '');
  }

  const formTitleText =
    formType === 'authorization' ? 'Sign In' : 'Registration';
  const formSwitchBtnText =
    formType === 'authorization' ? 'Registration' : 'Sign In';
  const textSubmit = formType === 'authorization' ? 'Sign In' : 'Register now';

  formSwitchBtn.textContent = formSwitchBtnText;
  formSubmitBtn.textContent = textSubmit;
  formTitle.textContent = formTitleText;
  form.reset();
}

function onFormSubmit(evt) {
  evt.preventDefault();
  const { email, password } = evt.target.elements;

  if (formType === 'registration') {
    userRegistration(email.value, password.value);
    updateForm();
  } else if (formType === 'authorization') {
    userSignIn(email.value, password.value);

  }
}

export { onFormSubmit, updateForm, getUserIdAfterSignIn };
