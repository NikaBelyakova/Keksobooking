import { debounce } from 'lodash';
import './map.js';
import './form.js';
import { getData } from './api.js';
import { renderAds } from './map.js';
import { onChangeFilter } from './filter.js';
import './download-photo.js'

const RERENDER_DELAY = 500;

getData((data) => {
  renderAds(data);
  onChangeFilter(_.debounce(() => renderAds(data), RERENDER_DELAY));
});