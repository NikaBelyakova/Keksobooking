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

export { getRandomInt, getRandomIntFloat, getRandomElementsOfArray };
