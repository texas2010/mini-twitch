import './main.scss'; // this required to stay.

const searchInput = document.querySelector('#search > input');
const searchButton = document.querySelector('#search > div > button');

searchInput.addEventListener('input', (e) => {
  console.log(searchInput.value.length);
  if (searchInput.value.length >= 4 && searchInput.value.length <= 25) {
    searchButton.disabled = false;
  } else {
    console.log('failed');
  }
});
