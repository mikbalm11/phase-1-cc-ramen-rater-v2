// Callbacks

const RAMEN_API_URL = 'http://localhost:3000/ramens';

const handleClick = (ramen) => {
  document.querySelector('.detail-image').src = ramen.image;
  document.querySelector('.name').textContent = ramen.name;
  document.querySelector('.restaurant').textContent = ramen.restaurant;
  document.getElementById('rating-display').textContent = ramen.rating;
  document.getElementById('comment-display').textContent = ramen.comment;
};

const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const newRamen = {
      name: document.getElementById('new-name').value,
      restaurant: document.getElementById('new-restaurant').value,
      image: "./assets/ramen/naruto.jpg",
      rating: parseInt(document.getElementById('new-rating').value) || 0,
      comment: document.getElementById('new-comment').value,
    };

    const ramenMenu = document.getElementById('ramen-menu');
    const img = document.createElement('img');
    img.src = newRamen.image;
    img.alt = newRamen.name;
    img.addEventListener('click', () => handleClick(newRamen));
    ramenMenu.appendChild(img);

    handleClick(newRamen);

    form.reset();
  });
};

const addEditListener = () => {
  const form = document.getElementById('edit-ramen');
  const deleteButton = document.getElementById('delete-button');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const newRating = document.getElementById('edit-rating').value;
    const newComment = document.getElementById('edit-comment').value;

    document.getElementById('rating-display').textContent = newRating;
    document.getElementById('comment-display').textContent = newComment;

    form.reset();
  });

  deleteButton.addEventListener('click', deleteRamen);
};

const deleteRamen = () => {
  const ramenDetail = document.getElementById('ramen-detail');
  const name = ramenDetail.querySelector('.name').textContent;

  const ramenMenu = document.getElementById('ramen-menu');
  const ramenImages = ramenMenu.getElementsByTagName('img');
  for (let i = 0; i < ramenImages.length; i++) {
    if (ramenImages[i].alt === name) {
      ramenMenu.removeChild(ramenImages[i]);
      break;
    }
  }

  ramenDetail.querySelector('.detail-image').src = '';
  ramenDetail.querySelector('.name').textContent = '';
  ramenDetail.querySelector('.restaurant').textContent = '';
  //ramenDetail.querySelector('#rating-display').textContent = '';
  //ramenDetail.querySelector('#comment-display').textContent = '';
};

const displayRamens = async () => {
  const response = await fetch(RAMEN_API_URL);
  const ramens = await response.json();
  
  const ramenMenu = document.getElementById('ramen-menu');
  ramenMenu.innerHTML = '';

  ramens.forEach(ramen => {
    const img = document.createElement('img');
    img.src = ramen.image;
    img.alt = ramen.name;
    img.addEventListener('click', () => handleClick(ramen));
    ramenMenu.appendChild(img);
  });

  // Automatically display details of the first ramen
  if (ramens.length > 0) {
    handleClick(ramens[0]);
  }
};

const main = () => {
  document.addEventListener('DOMContentLoaded', () => {
    displayRamens();
    addSubmitListener();
    addEditListener();
  });
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
