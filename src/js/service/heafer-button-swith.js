// Function for switching Watched and Queue button styles
export function changeMyLibraryBtnStyles(activeButton, disabledButton) {
  activeButton.classList.add('active');
  activeButton.setAttribute('disabled', 'disabled');
  disabledButton.classList.remove('active');
  disabledButton.removeAttribute('disabled', 'disabled');
}

// Function to switch Home and My Library button styles
export function changeHeaderBtnStyles(activeButton, disabledButton) {
  activeButton.classList.add('nav-link--current');
  activeButton.setAttribute('disabled', 'disabled');
  disabledButton.classList.remove('nav-link--current');
  disabledButton.removeAttribute('disabled', 'disabled');
}
