import './map.js';
import './form.js';
import { getData } from './api.js';
import { renderAds } from './map.js';
import { onChangeFilter } from './filter.js';



getData((data) => {
  renderAds(data);
  onChangeFilter(() => renderAds(data));
});
