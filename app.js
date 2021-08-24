const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];


const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
  lightboxImage: document.querySelector('.lightbox__image'),
  buttonClose: document.querySelector('button[data-action="close-lightbox"]')
}

const { gallery, lightbox, lightboxOverlay, lightboxImage, buttonClose } = refs

const createGallery = (item) => {
  const galleryItem = document.createElement('li');
  galleryItem.classList.add('gallery__item');

  const galleryLink = document.createElement('a');
  galleryLink.classList.add('gallery__link');
  galleryLink.setAttribute('href', item.original);

  const galleryImage = document.createElement('img');
  galleryImage.classList.add('gallery__image');
  galleryImage.setAttribute('src', item.preview);
  galleryImage.setAttribute('data-source', item.original)
  galleryImage.setAttribute('alt', item.description);

  galleryLink.appendChild(galleryImage)
  galleryItem.appendChild(galleryLink)

  return galleryItem
}

const render = galleryItems.map((item) => createGallery(item));
gallery.append(...render)

gallery.addEventListener('click', openModal);
buttonClose.addEventListener('click', closeModal);
lightboxOverlay.addEventListener('click', clickOverlay);
gallery.addEventListener('keydown', arrowRight);
gallery.addEventListener('keydown', arrowLeft);

function openModal(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) {
    return
  }
  lightbox.classList.add('is-open');
  lightboxImage.src = event.target.getAttribute('data-source');
  lightboxImage.alt = event.target.alt;

  window.addEventListener('keydown', pressEsc)
}

function closeModal () {
  lightbox.classList.remove('is-open');
  lightboxImage.src = '';
  lightboxImage.alt = '';

window.removeEventListener('keydown', pressEsc)
}

function clickOverlay(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

function pressEsc(event) {
  if (event.code === 'Escape') {
     closeModal();
  }  
}

function arrowRight (event) {
if (event.code === 'ArrowRight') {
  rightNext();
  }
}

function arrowLeft (event) {
if (event.code === 'ArrowLeft') {
  leftNext();
  }  
}

function rightNext() {
  const activeImg = galleryItems.findIndex((img) => img.original === lightboxImage.src);
  let index = activeImg ? activeImg : 0;

  if (index < galleryItems.length - 1) {
    index += 1;
  } else {
    index = 0;
  }
  lightboxImage.src = galleryItems[index].original
  lightboxImage.alt = galleryItems[index].alt
}

function leftNext() {
const activeImg = galleryItems.findIndex((img) => img.original === lightboxImage.src);
  let index = activeImg ? activeImg : 0;

  if (index < galleryItems.length - 1) {
    index -= 1;
  } else {
    index = galleryItems.length;
  }
  lightboxImage.src = galleryItems[index].original
  lightboxImage.alt = galleryItems[index].alt
}