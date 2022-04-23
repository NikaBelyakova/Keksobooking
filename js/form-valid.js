import { form, selectPrice } from './form-sync.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const title = form.querySelector('#title');

title.addEventListener('input', () => {
  const titleLength = title.value.length;
  if (titleLength < MIN_TITLE_LENGTH) {
    title.setCustomValidity('Слишком короткое описание. Ещё ' + (MIN_TITLE_LENGTH - titleLength) + 'симв.');
  } else if (titleLength > MAX_TITLE_LENGTH) {
    title.setCustomValidity('Слишком длинное описание. Удалите ' + (titleLength - MAX_TITLE_LENGTH) + 'симв.')
  } else {
    title.setCustomValidity('');
  }
  title.reportValidity();
})

selectPrice.addEventListener('input', () => {
  if (selectPrice.value > 1000000) {
    selectPrice.setCustomValidity('Это ту мач даже для Токио, не трать столько');
  } else {
    selectPrice.setCustomValidity('');
  }
  selectPrice.reportValidity();
})

