import { createAdCard } from './card.js';
import { ADS } from './data.js';


const mapCanvas = document.querySelector('#map-canvas');

mapCanvas.appendChild(createAdCard(ADS[5]));
