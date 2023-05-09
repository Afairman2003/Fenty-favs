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
