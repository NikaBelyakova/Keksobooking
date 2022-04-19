function createAdCard(ad) {
  const cardTtemplate = document.querySelector('#card').content.querySelector('.popup');
  const cardsListFragment = document.createDocumentFragment();
  const cardElement = cardTtemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = ad.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = 'Координаты: ' + Object.values(ad.offer.address).join(', ');
  cardElement.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь`;

  switch (ad.offer.type) {
    case 'bungalow':
      cardElement.querySelector('.popup__type').textContent = 'Бунгало';
      break;
    case 'flat':
      cardElement.querySelector('.popup__type').textContent = 'Квартира';
      break;
    case 'house':
      cardElement.querySelector('.popup__type').textContent = 'Дом';
      break;
    case 'palace':
      cardElement.querySelector('.popup__type').textContent = 'Дворец';
      break;
    default:
      cardElement.querySelector('.popup__type').textContent = '';
  }

  cardElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;

  cardElement.querySelectorAll('.popup__feature').forEach(element => {
    element.classList.add('hidden');
  });
  cardElement.querySelectorAll('.popup__feature').forEach(element => {
    ad.offer.features.forEach((feature) => {
      if (element.classList.contains(`popup__feature--${feature}`)) {
        element.classList.remove('hidden');
      }
    })
  });

  cardElement.querySelector('.popup__description').textContent = ad.offer.description;

  ad.offer.photos.forEach((element) => {
    let photoTemplate = cardElement.querySelector('.popup__photos img').cloneNode(true);
    photoTemplate.src = element;
    cardElement.querySelector('.popup__photos').appendChild(photoTemplate);
  });
  cardElement.querySelector('.popup__photos').removeChild(cardElement.querySelector('.popup__photos img'));

  cardElement.querySelector('.popup__avatar').src = ad.author;

  cardsListFragment.appendChild(cardElement);
  return cardsListFragment;
}

export { createAdCard };
