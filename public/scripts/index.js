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
    const divElement = document.createElement('div');
    const imgElement = document.createElement('img');
    const captionElement = document.createElement('p');
    const buttonElement = document.createElement('button');
    divElement.setAttribute('data-post-id', post.id);
    buttonElement.innerText = 'Delete';
    buttonElement.id = "delete-post-button";
    imgElement.src = url;
    captionElement.innerText = caption;
    divElement.append(imgElement, captionElement, buttonElement);
    postContainer.append(divElement);

    buttonElement.addEventListener('click', async (e) => {
      e.preventDefault();
      const id = e.target.parentElement.attributes[0].value
      const [posts, err] = await handleFetch(`/api/posts/${id}`,{ method: 'DELETE' });
      console.log(posts);
      displayPost(posts.id);
    })
  
  }

  const [secret, _err] = await handleFetch('/api/logged-in-secret');
  console.log('secret, _err:', secret, _err);
  if (secret) {
    document.querySelector('#secret-message').textContent = secret.msg;
  }

  async function getPosts() {
    const [response, err] = await handleFetch('/api/posts');
    console.log('response, err:', response, err);
    response.forEach(post => displayPost(post.id)); // for each
  }
  getPosts();

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
