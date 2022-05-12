import { showALertGet } from './util.js'

function getData(onSucsess) {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((responce) => responce.json())
    .then((data) => {
      onSucsess(data);
    })
    .catch(() => showALertGet('Кажется, что-то сломалось, не можем найти варианты..'));
}

function sendData(onSucsess, onFail, body) {
  fetch(' https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((responce) => {
      if (responce.ok) {
        onSucsess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail;
    });
}

export { getData, sendData };
