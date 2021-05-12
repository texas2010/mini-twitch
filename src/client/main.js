/* eslint-disable no-undef */
import './main.scss'; // Do not remove this line

const { isAlphanumeric } = require('../../utils/index');

const searchInput = document.querySelector('#search input');
const searchButton = document.querySelector('#search button');
const searchWarningMessage = document.querySelector('#search-warning');
const filterButtons = document.querySelector('#filter-buttons');
const showStream = document.querySelector('#show-stream');

searchInput.addEventListener('input', (e) => {
  const { value: inputValue } = e.target;
  if (!inputValue.length > 0) {
    searchWarningMessage.textContent = '';
    searchWarningMessage.classList.remove('p-1');
  } else if (inputValue.length >= 4 && inputValue.length <= 25) {
    searchWarningMessage.textContent = '';
    searchWarningMessage.classList.remove('p-1');
    if (isAlphanumeric(inputValue)) {
      searchButton.disabled = false;
    } else {
      searchButton.disabled = true;
      searchWarningMessage.textContent = '* Username must only contain alphanumeric characters.';
      searchWarningMessage.classList.add('p-1');
    }
  } else {
    searchButton.disabled = true;
    searchWarningMessage.textContent = '* Username must be between 4 and 25 characters.';
    searchWarningMessage.classList.add('p-1');
  }
});

filterButtons.addEventListener('click', (e) => {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  switch (e.target.name) {
    case 'all':
      if (showStream.classList.contains('online')) {
        showStream.classList.remove('online');
        filterButtons
          .querySelector(`button[name='online']`)
          .classList.replace('btn-success', 'btn-primary');
      } else if (showStream.classList.contains('offline')) {
        showStream.classList.remove('offline');
        filterButtons
          .querySelector(`button[name='offline']`)
          .classList.replace('btn-success', 'btn-primary');
      }
      break;
    case 'online':
      if (showStream.classList.contains('offline')) {
        showStream.classList.remove('offline');
        filterButtons
          .querySelector(`button[name='offline']`)
          .classList.replace('btn-success', 'btn-primary');
      }
      showStream.classList.add('online');
      e.target.classList.replace('btn-primary', 'btn-success');
      break;
    case 'offline':
      if (showStream.classList.contains('online')) {
        showStream.classList.remove('online');
        filterButtons
          .querySelector(`button[name='online']`)
          .classList.replace('btn-success', 'btn-primary');
      }
      showStream.classList.add('offline');
      e.target.classList.replace('btn-primary', 'btn-success');
      break;
    default:
      break;
  }
});
