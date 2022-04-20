import { getRandomInt, getRandomIntFloat, getRandomElementsOfArray } from './util.js';

const COUNT_OF_ADS = 10;
const TITLE = 'Ну вы поглядите, какое жильё!';
const MAX_PRICE = 60000;
const TYPES = ['palace', 'flat', 'house', 'bungalow'];
const MAX_ROOMS = 20;
const MAX_GUESTS = 100;
const CHECK_IN = ['12:00', '13:00', '14:00'];
const CHECK_OUT = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTION = 'тёплый уютный дом с блек-джеком и шлюхами';
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const LATITUDE_MIN = 35.65000;
const LATITUDE_MAX = 35.70000;
const LONGITUDE_MIN = 139.70000;
const LONGITUDE_MAX = 139.80000;
const FLOAT_COUNT = 5;

function getOffer() {
  return {
    title: TITLE,
    address: '',
    price: getRandomInt(0, MAX_PRICE),
    type: getRandomElementsOfArray(TYPES, 1),
    rooms: getRandomInt(0, MAX_ROOMS),
    guests: getRandomInt(0, MAX_GUESTS),
    checkin: getRandomElementsOfArray(CHECK_IN, 1),
    checkout: getRandomElementsOfArray(CHECK_OUT, 1),
    features: getRandomElementsOfArray(FEATURES, FEATURES.length),
    description: DESCRIPTION,
    photos: getRandomElementsOfArray(PHOTOS, PHOTOS.length),
  }
}

function getLocation() {
  return {
    x: getRandomIntFloat(LATITUDE_MIN, LATITUDE_MAX, FLOAT_COUNT),
    y: getRandomIntFloat(LONGITUDE_MIN, LONGITUDE_MAX, FLOAT_COUNT),
  }
}

function getAd() {
  return {
    author: '',
    offer: getOffer(),
    location: getLocation(),
  }
}

const ads  = [];

for (let index = 0; index < COUNT_OF_ADS; index++) {
  let ad = getAd();
  let author = 'img/avatars/user' + (new Intl.NumberFormat('ru-RU', { minimumIntegerDigits: 2}).format(index + 1)) + '.png';
  ad.author = author;
  ad.offer.address = ad.location;
  ads.push(ad);
}

export { ads };
