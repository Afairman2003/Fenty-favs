/* eslint-disable import/extensions */
import {
   handleFetch,
  fetchLoggedInUser,
  logOutHandler,
  updateUsernameHandler,
  setNav,
} from './global.js';

const isAuthError = (err) => (err.status === 401 || err.status === 403);
const redirectToLogin = () => window.location.assign('/login.html');
const renderUsername = (username) => {
  document.querySelector('#username').textContent = username;
};
const displayPost = async (post) => {
  const { url, caption } = post;
  const divElement = document.createElement('div');
  const imgElement = document.createElement('img');
  const captionElement = document.createElement('p');
  const deleteButton = document.createElement('button');
  const likesButton = document.createElement('button');
  likesButton.innerText = 'Like';

  divElement.setAttribute('data-post-id', post.id);
  deleteButton.innerText = 'Delete';
  deleteButton.id = "delete-post-button";
  imgElement.src = url;
  captionElement.innerText = caption;
  divElement.append(imgElement, captionElement, deleteButton,likesButton);
  postContainer.append(divElement);

  likesButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const id = e.target.parentElement.attributes[0].value;
    console.log(id);
    const [likes, err] = await handleFetch(`/api/posts/${id}/like`,{ method: 'POST',  credentials: 'include', 
    headers: { 'Content-Type': 'application/json' },});
    console.log(likes);
  })
  deleteButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const id = e.target.parentElement.attributes[0].value
    const [posts, err] = await handleFetch(`/api/posts/${id}`,{ method: 'DELETE' });
    console.log(posts);
    postContainer.removeChild(e.target.parentElement);
    console.log(e.target.parentElement);

  })

}

async function getPosts() {
  console.log('Amanda')
  const [posts, err] = await handleFetch('/api/posts/me');
  console.log(posts);

}

const main = async () => {
  const user = await fetchLoggedInUser();
  if (!user) return redirectToLogin();
  getPosts();

  const logoutForm = document.querySelector('#logout-form');
  const updateUsernameForm = document.querySelector('#username-form');

  logoutForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    logOutHandler();
  });

  updateUsernameForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const [response, err] = await updateUsernameHandler(event.target);

    if (err) return isAuthError(err) ? redirectToLogin() : alert('Something went wrong');
    renderUsername(response.username);

    event.target.reset();
  });

  updateUsernameForm.dataset.userId = user.id;

  setNav(!!user);
  renderUsername(user.username);
};

main();
