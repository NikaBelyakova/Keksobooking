import { onChangeOption } from './util.js';

const ROOM_GUEST_RATIO = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const MIN_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};
const form = document.querySelector('.ad-form');
const avatar = form.querySelector('.ad-form-header__preview img');
const inputTitle = form.querySelector('#title');
const inputAddress = form.querySelector('#address');
const selectType = form.querySelector('#type');
const typeOptions = selectType.querySelectorAll('option');
const inputPrice = form.querySelector('#price');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const roomNumber = form.querySelector('#room_number');
const selectCapacity = form.querySelector('#capacity');
const capacityOptions = selectCapacity.querySelectorAll('option');
const featuresList = form.querySelector('.features').querySelectorAll('input');
const description = form.querySelector('#description');
const photos = form.querySelector('.ad-form__photo');

// Смена минимальной цены при выборе типа жилья
selectType.addEventListener('change', function () {
  inputPrice.setAttribute('min', MIN_PRICE[this.value]);
  inputPrice.setAttribute('placeholder', MIN_PRICE[this.value]);
})

// Смена времени заезда-выезда
timeIn.addEventListener('change', onChangeOption(timeIn, timeOut));
timeOut.addEventListener('change', onChangeOption(timeOut, timeIn));

// Синхронизация количества комнат и количества гостей
roomNumber.addEventListener('change', function (evt) {
  selectCapacity.innerHTML = '';
  ROOM_GUEST_RATIO[evt.target.value].forEach((index) => {
    capacityOptions.forEach((option) => {
      if (option.value == index) {
        selectCapacity.appendChild(option);
      }
    });
  })
});


export { form, inputPrice };
