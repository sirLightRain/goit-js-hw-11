function createMarkup(image) {
  const cardMarkup = `
    <a class="gallery__link link" href=${image.largeImageURL}>
    <div class="gallery__item">
      <img class="gallery__image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item"><b>❤ Likes:</b> ${image.likes}</p>
        <p class="info-item"><b>Views:</b> ${image.views}</p>
        <p class="info-item"><b>Comments:</b> ${image.comments}</p>
        <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
      </div>
    </div>
  </a>
    `;

  const card = document.createElement('div');
  card.innerHTML = cardMarkup.trim();
  return card.firstChild;
}

export {createMarkup};