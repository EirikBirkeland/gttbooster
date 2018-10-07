import { EventEmitter } from 'events';

const bodyEmitter = new EventEmitter();
window.lowerEmitter = bodyEmitter;
export default bodyEmitter;
