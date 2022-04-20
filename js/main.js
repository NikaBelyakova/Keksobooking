import { createAdCard } from './card.js';
import { ads } from './data.js';


const mapCanvas = document.querySelector('#map-canvas');

mapCanvas.appendChild(createAdCard(ads[5]));
