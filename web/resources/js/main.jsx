import applyPolyfills from './utils/polyfills';
import { log } from './utils/util';

/* global window */

(function init() {
    applyPolyfills();
    window.debugMode = true;
    log('Hello World.');
}());
