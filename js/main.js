import { createAdCard } from './card.js';
import { ads } from './data.js';
import './form-input.js';


const mapCanvas = document.querySelector('#map-canvas');

mapCanvas.appendChild(createAdCard(ads[5]));
