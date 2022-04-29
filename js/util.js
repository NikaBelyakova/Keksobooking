const ALERT_SHOW_TIME = 5000;

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const isEnterEvent = (evt) => {
  return evt.key === 'Enter';
};

// Случайное число
function getRandomInt(min, max) {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (max < min) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Случайное число с плавающей точкой из переданного диапазона включительно.
function getRandomIntFloat(min, max, n) {
  if (min === max) {
    return min.toFixed(n);
  }

  if (min >= 0 && max >= 0) {
    if (min > max) {
      [min, max] = [max, min]
    }
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return rand.toFixed(n);
  } else {
    return - 1;
  }
}

// Случайный набор элементов из массива, COUNT - количество необходимых элементов
function getRandomElementsOfArray(array, count) {
  if (count > 1) {
    let newArray = [];
    for (let index = 0; index < count; index++) {
      let element = array[Math.floor(Math.random() * array.length)];
      while (newArray.indexOf(element) === -1) {
        newArray.push(element);
      }
    }
    return newArray;
  }
  return array[Math.floor(Math.random() * array.length)];
}

// Изменение одного пункта в Select при изменении другого (на то же значение)
function onChangeOption(first, second) {
  return () => {
    second.value = first.options[first.selectedIndex].value;
  }
}

// Показать сообщение об ошибке загрузки данных для карты
const showALertGet = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'grey';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

// Показать сообщение об ошибке отправки формы
function showAlertPost() {
  const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessageElement = errorMessageTemplate.cloneNode(true);
  document.body.appendChild(errorMessageElement);

  errorMessageElement.addEventListener('click', () => {
    document.body.removeChild(errorMessageElement);
  });
  errorMessageElement.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      document.body.removeChild(errorMessageElement);
    }
  })
}

// Показать сообщение об успешной отправке формы
function onSubmitSuccess(clearForm) {
  const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessageElement = successMessageTemplate.cloneNode(true);
  document.body.appendChild(successMessageElement);

  successMessageElement.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      document.body.removeChild(successMessageElement);
    }
  });
  successMessageElement.addEventListener('click', () => {
    document.body.removeChild(successMessageElement);
  })

  clearForm();
}

export { onChangeOption, showAlertPost, showALertGet, onSubmitSuccess };
