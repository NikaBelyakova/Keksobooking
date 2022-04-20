import { onChangeOption } from './util.js';

const form = document.querySelector('.ad-form');
const selectType = form.querySelector('#type');
const selectPrice = form.querySelector('#price');

const MIN_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

// Смена минимальной цены при выборе типа жилья
selectType.addEventListener('change', function() {
  selectPrice.setAttribute('min', MIN_PRICE[this.value]);
  selectPrice.setAttribute('placeholder', MIN_PRICE[this.value]);
})

// Смена времени заезда-выезда
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');

timeIn.addEventListener('change', onChangeOption(timeIn, timeOut));
timeOut.addEventListener('change', onChangeOption(timeOut, timeIn));
