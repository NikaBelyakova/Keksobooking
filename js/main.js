import './map.js';
import './form.js';
import { getData } from './api.js';
import { renderAds } from './map.js'

getData((data) => {
  renderAds(data);
});
