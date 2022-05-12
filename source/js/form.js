import { sendData } from './api.js';
import { showAlertPost, onSubmitSuccess, onChangeOption } from './util.js';
import { TOKIO_CENTER, mainPinMarker } from './map.js';

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

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const DEFAULT_AVATAR = 'img/muffin-grey.svg';
const DEFAULT_CHECKIN_OUT = '[value="12:00"]';
const DEFAULT_ROOMS = '[value="1"]';
const DEFAULT_CAPACITY = '[value="1"]';

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
const clearFormButton = form.querySelector('.ad-form__reset');

function clearForm() {
  avatar.src = DEFAULT_AVATAR;
  inputTitle.value = '';
  inputAddress.value = Object.values(TOKIO_CENTER).join(', ');
  typeOptions.forEach((item) => item.removeAttribute('selected'));
  selectType.querySelector('[value="flat"]').selected = true;
  inputPrice.value = '';
  inputPrice.placeholder = MIN_PRICE['flat'];
  timeIn.querySelectorAll('option').forEach((item) => item.removeAttribute('selected'));
  timeIn.querySelector(DEFAULT_CHECKIN_OUT).selected = true;
  timeOut.querySelectorAll('option').forEach((item) => item.removeAttribute('selected'));
  timeOut.querySelector(DEFAULT_CHECKIN_OUT).selected = true;
  roomNumber.querySelectorAll('option').forEach((item) => item.removeAttribute('selected'));
  roomNumber.querySelector(DEFAULT_ROOMS).selected = true;
  selectCapacity.querySelectorAll('option').forEach((item) => item.removeAttribute('selected'));
  selectCapacity.querySelector(DEFAULT_CAPACITY).selected = true;
  featuresList.forEach(item => item.checked = false);
  description.value = '';
  photos.innerHTML = '';

  mainPinMarker.setLatLng(TOKIO_CENTER);
}

// Валидация Заголовка объявления
inputTitle.addEventListener('input', () => {
  const titleLength = inputTitle.value.length;
  if (titleLength < MIN_TITLE_LENGTH) {
    inputTitle.setCustomValidity('Слишком короткое описание. Ещё ' + (MIN_TITLE_LENGTH - titleLength) + 'симв.');
  } else if (titleLength > MAX_TITLE_LENGTH) {
    inputTitle.setCustomValidity('Слишком длинное описание. Удалите ' + (titleLength - MAX_TITLE_LENGTH) + 'симв.')
  } else {
    inputTitle.setCustomValidity('');
  }
  inputTitle.reportValidity();
})

// Валидация цены
inputPrice.addEventListener('input', () => {
  if (inputPrice.value > 1000000) {
    inputPrice.setCustomValidity('Это ту мач даже для Токио, не трать столько');
  } else {
    inputPrice.setCustomValidity('');
  }
  inputPrice.reportValidity();
})

// Синхронизация минимальной цены и выбора типа жилья
selectType.addEventListener('change', function () {
  inputPrice.setAttribute('min', MIN_PRICE[this.value]);
  inputPrice.setAttribute('placeholder', MIN_PRICE[this.value]);
})

// Синхронизация времени заезда-выезда
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

// Отправка формы
form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  sendData(
    () => onSubmitSuccess(clearForm),
    () => showAlertPost(),
    new FormData(evt.target),
  )
})

// Кнопка очистить форму
clearFormButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  clearForm();
})


export { form, inputPrice };
