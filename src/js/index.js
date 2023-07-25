import axios from 'axios';
import Notiflix from 'notiflix';
// const API_KEY = '38440649-adbc72164fad22e06504da38e';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 40;

let page = 1;
let currentQuery = '';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

searchForm.addEventListener('submit', handleFormSubmit);
loadMoreButton.addEventListener('click', loadMoreImages);

async function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const searchQuery = formData.get('searchQuery').trim();
  if (!searchQuery) return;

  currentQuery = searchQuery;
  page = 1;
  gallery.innerHTML = '';
  loadMoreButton.style.display = 'none';
  await searchImages(currentQuery, page);
}

async function searchImages(query, page) {
  try {
    // const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PER_PAGE}&page=${page}`;
    const params = new URLSearchParams({
      key: '38440649-adbc72164fad22e06504da38e',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: `${page}`,
    });

    // const response = await axios.get(url);
    const response = await axios.get(`${BASE_URL}?${params}`);
    console.log('response: ', response);
    const data = response.data;
    console.log('data: ', data);

    if (data.hits.length === 0) {
      loadMoreButton.style.display = 'none';
      Notiflix.Report.failure(
        'Error!',
        'Sorry, there are no images matching your search query. Please try again.',
        'Ok'
      );
      return;
    }

    data.hits.forEach(image => {
      const card = createMarkup(image);
      gallery.appendChild(card);
    });

    if (data.totalHits > page * PER_PAGE) {
      loadMoreButton.style.display = 'block';
    } else {
      loadMoreButton.style.display = 'none';
      Notiflix.Report.info(
        "That's all!",
        "We're sorry, but you've reached the end of search results.",
        'Ok'
      );
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    Notiflix.Notify.failure('Something went wrong. Please try again later.');
  }
}

function loadMoreImages() {
  page += 1;
  searchImages(currentQuery, page);
}

function createMarkup(image) {
  const cardHTML = `
    <div class="photo-card">
      <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item"><b>Likes:</b> ${image.likes}</p>
        <p class="info-item"><b>Views:</b> ${image.views}</p>
        <p class="info-item"><b>Comments:</b> ${image.comments}</p>
        <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
      </div>
    </div>
  `;

  const card = document.createElement('div');
  card.innerHTML = cardHTML.trim();

  return card.firstChild;
}