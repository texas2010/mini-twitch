import './main.scss'; // Do not remove this line

const { isAlphanumeric } = require('../../utils/index');

const searchInput = document.querySelector('#search input');
const searchButton = document.querySelector('#search button');
const searchWarningMessage = document.querySelector('#search-warning');

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
