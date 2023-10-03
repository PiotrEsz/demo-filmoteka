import { backToTopBtn } from "../refs/refs";

// Function for scroll to top(gallery) after move
export function scrollTo() {
  window.scrollTo({ top: 20, behavior: 'smooth' });
}

export function scrollToTopButton() {
  if (window.scrollY > window.outerHeight) {
    backToTopBtn.classList.remove('visually-hidden');
  } else {
    backToTopBtn.classList.add('visually-hidden');
  }
}