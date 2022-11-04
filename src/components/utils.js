import { closeActivePopup } from './modal.js'

// Mouse click
export function handleMouseClick(evt) {
  if (evt.target.classList.contains('popup') ||
    evt.target.classList.contains('popup__close-button')) {
    closeActivePopup();
  }
}
// Keyboard key up
export function handleKeyboardKeyUp(evt) {
  if (evt.key === 'Escape') {
    closeActivePopup();
  }
}