/* eslint-disable import/extensions */
import {
  fetchLoggedInUser,
  getFetchOptions,
  handleFetch,
  setNav,
} from './global.js';

const main = async () => {
  const user = await fetchLoggedInUser();
  setNav(!!user);
  
  const postForm = document.querySelector('#post-form');
  const postContainer = document.querySelector('#post-container');

  const displayPost = async (post) => {
    const { url, caption } = post;
    const imgElement = document.createElement('img');
    const captionElement = document.createElement('p');
    imgElement.src = url;
    captionElement.innerText = caption;
    postContainer.append(imgElement, captionElement);
  }

  const [secret, _err] = await handleFetch('/api/logged-in-secret');
  console.log('secret, _err:', secret, _err);
  if (secret) {
    document.querySelector('#secret-message').textContent = secret.msg;
  }

  
  postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = document.querySelector('#image').value;
    const caption = document.querySelector('#caption').value;
    const [posts, err] = await handleFetch('/api/posts', getFetchOptions({ url, caption }));
    console.log(posts);
    displayPost(posts.id);
  })

};

main();
