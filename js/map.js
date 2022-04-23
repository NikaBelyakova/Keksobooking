import { form } from './form-sync.js';
import { FLOAT_COUNT } from './data.js';
import { ads } from './data.js';
import { createAdCard } from './card.js';

const TOKIO_CENTER = {
  lat: 35.87792,
  lng: 140.21851,
};
const mapSection = document.querySelector('.map');
// const mapCanvas = mapSection.querySelector('#map-canvas');
const mapFilters = mapSection.querySelector('.map__filters');
const fieldsets = form.querySelectorAll('fieldset');
const address = form.querySelector('#address');

function disableForm() {
  form.classList.add('ad-form--disabled');
  fieldsets.forEach((fieldset) => {
    fieldset.setAttribute('disabled', true);
  });
  mapFilters.classList.add('ad-form--disabled');
  const filters = mapFilters.children;
  for (const filter of filters) {
    filter.setAttribute('disabled', true);
  }
}

function enableForm() {
  form.classList.remove('ad-form--disabled');
  fieldsets.forEach((fieldset) => {
    fieldset.removeAttribute('disabled');
  });
  mapFilters.classList.remove('ad-form--disabled');
  const filters = mapFilters.children;
  for (const filter of filters) {
    filter.removeAttribute('disabled');
  };
  address.value = Object.values(TOKIO_CENTER).join(', ');
}

disableForm();

const map = L.map('map-canvas')
  .on('load', () => {
    setTimeout(enableForm, 2000);
  })
  .setView(TOKIO_CENTER, 9);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  TOKIO_CENTER,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  address.value = Object.values(evt.target.getLatLng())
  .map((value) => value.toFixed(FLOAT_COUNT))
  .join(', ');
});

ads.forEach((ad) => {
  const {lat, lng} = ad.location;

  const icon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(
      createAdCard(ad),
      {
        keepInView: true,
      }
    );
});
