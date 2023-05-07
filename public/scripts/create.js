/* eslint-disable import/extensions */
import {
  fetchLoggedInUser,
  signupAndLoginHandler,
  setNav,
} from './global.js';

function getSignupData() {
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  return { username, password };
}

const main = async () => {
  const user = await fetchLoggedInUser();
  if (user) return window.location.assign('/user.html');

  setNav();
  document.querySelector('#create-form')
    .addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = getSignupData();
      signupAndLoginHandler('/api/users', formData);
    });
};

main();
