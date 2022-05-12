const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const imagesChooser = document.querySelector('#images');
const imagesPreview = document.querySelector('.ad-form__photo');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((item) => {
    return fileName.endsWith(item);
  });
  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});


imagesChooser.addEventListener('change', () => {
  const files = imagesChooser.files;
  const filesKeysArray = Object.keys(files);

  filesKeysArray.forEach(key => {
    const file = files[key];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((item) => {
      return fileName.endsWith(item);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        const newImage = document.createElement('img');
        newImage.src = reader.result;
        newImage.width = '40';
        newImage.height = '44';
        newImage.style.marginRight = '10px';
        imagesPreview.appendChild(newImage);
      });

      reader.readAsDataURL(file);
    }
  });
  imagesPreview.style.backgroundColor = 'transparent';
});
