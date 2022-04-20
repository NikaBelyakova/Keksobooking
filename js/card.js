const offerType = {
  'bungalow': 'Бунгало',
  'flat': 'Квартира',
  'house': 'Дом',
  'palace': 'Дворец',
}

function createAdCard(ad) {
  const cardTtemplate = document.querySelector('#card').content.querySelector('.popup');
  const cardsListFragment = document.createDocumentFragment();
  const cardElement = cardTtemplate.cloneNode(true);

  ad.offer.title ? cardElement.querySelector('.popup__title').textContent = ad.offer.title : cardElement.querySelector('.popup__title').remove();

  ad.offer.address ? cardElement.querySelector('.popup__text--address').textContent = ('Координаты: ' + Object.values(ad.offer.address).join(', ')) : cardElement.querySelector('.popup__text--address').remove();

  ad.offer.price ? cardElement.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь` : cardElement.querySelector('.popup__text--price').remove();


  ad.offer.type ? cardElement.querySelector('.popup__type').textContent = offerType[ad.offer.type] : cardElement.querySelector('.popup__type').remove();

  (ad.offer.rooms && ad.offer.guests) ? cardElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей` : cardElement.querySelector('.popup__text--capacity').remove();

  (ad.offer.checkin && ad.offer.checkout) ? cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}` : cardElement.querySelector('.popup__text--time').remove();

  if ((ad.offer.features).length) {
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
  } else {
    cardElement.querySelector('.popup__features').remove();
  }

  ad.offer.description ? cardElement.querySelector('.popup__description').textContent = ad.offer.description : cardElement.querySelector('.popup__description').remove();

  if ((ad.offer.photos).length) {
    ad.offer.photos.forEach((element) => {
      let photoTemplate = cardElement.querySelector('.popup__photos img').cloneNode(true);
      photoTemplate.src = element;
      cardElement.querySelector('.popup__photos').appendChild(photoTemplate);
    });
  }
  cardElement.querySelector('.popup__photos').removeChild(cardElement.querySelector('.popup__photos img'));

  ad.author ? cardElement.querySelector('.popup__avatar').src = ad.author : cardElement.querySelector('.popup__avatar').remove();

  cardsListFragment.appendChild(cardElement);
  return cardsListFragment;
}

export { createAdCard };
