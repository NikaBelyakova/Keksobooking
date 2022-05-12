import { map, markers } from './map.js';
import { getPriceLevel } from './util.js';

const DEFAULT_FILTER = 'any';

const mapFilterForm = document.querySelector('.map__filters');
const typeFilter = mapFilterForm.querySelector('#housing-type');
const priceFilter = mapFilterForm.querySelector('#housing-price');
const roomsFilter = mapFilterForm.querySelector('#housing-rooms');
const guestsFilter = mapFilterForm.querySelector('#housing-guests');
const featuresFilter = mapFilterForm.querySelector('#housing-features');

function getFilterValues() {
  let selectedType = typeFilter[typeFilter.selectedIndex].value;
  let selectedPrice = priceFilter[priceFilter.selectedIndex].value;
  let selectedRooms = roomsFilter[roomsFilter.selectedIndex].value;
  let selectedGuests = guestsFilter[guestsFilter.selectedIndex].value;

  let featuresCollection = featuresFilter.querySelectorAll('input');
  let selectedFeatures = [];
  for (let index = 0; index < featuresCollection.length; index++) {
    if (featuresCollection[index].checked) {
      selectedFeatures.push(featuresCollection[index].value);
    }
  }

  const filterValues = {
    type: selectedType,
    price: selectedPrice,
    rooms: selectedRooms,
    guests: selectedGuests,
    features: selectedFeatures,
  };

  return filterValues;
}

function getFilterRank() {
  let rank = 0;
  let filterValues = getFilterValues();
  if (filterValues.type !== DEFAULT_FILTER) {
    rank += 1;
  }
  if (filterValues.price !== DEFAULT_FILTER) {
    rank += 1;
  }
  if (filterValues.rooms !== DEFAULT_FILTER) {
    rank += 1;
  }
  if (filterValues.guests !== DEFAULT_FILTER) {
    rank += 1;
  }
  if (filterValues.features.length !== 0) {
    rank += (filterValues.features.length);
  }

  return rank;
}

function getAdRank(ad) {
  let rank = 0;
  let filterValues = getFilterValues();
  if (ad.offer.type == filterValues.type) {
    rank += 1;
  }
  let priceLevel = getPriceLevel(ad.offer.price);
  if (priceLevel == filterValues.price) {
    rank += 1;
  }
  if (ad.offer.rooms == filterValues.rooms) {
    rank += 1;
  }
  if (ad.offer.guests == filterValues.guests) {
    rank += 1;
  }

  let adsFeatures = ad.offer.features;
  let checkedFeatures = filterValues.features;

  if (adsFeatures) {
    for (let index = 0; index < adsFeatures.length; index++) {
      const adsFeature = adsFeatures[index];
      if (checkedFeatures.indexOf(adsFeature) >= 0) {
        rank += 1;
      }
    }
  }

  return rank
}

function isNeededRank(ad) {
  const FilterRank = getFilterRank();
  const adRank = getAdRank(ad);

  return FilterRank === adRank;
}

function onChangeFilter(cb) {
  mapFilterForm.addEventListener('change', () => {
    markers.forEach((marker) => {
      marker.removeFrom(map);
    })
    cb();
  })
}

export { isNeededRank, onChangeFilter };
