const promisePolyfill = require('es6-promise').polyfill;
// polyfills contain code from third party sources, so we disable linting for them
/*eslint-disable */
const polyfills = {
    functionPrototypeBind() {
        // taken from the MDN:
        // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Polyfill

        if (!Function.prototype.bind) {
          Function.prototype.bind = function(oThis) {
            if (typeof this !== 'function') {
              // closest thing possible to the ECMAScript 5
              // internal IsCallable function
              throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
            }

            var aArgs   = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP    = function() {},
                fBound  = function() {
                  return fToBind.apply(this instanceof fNOP
                         ? this
                         : oThis,
                         aArgs.concat(Array.prototype.slice.call(arguments)));
                };

            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();

            return fBound;
          };
        }
    },

    promise: promisePolyfill,

    objectAssign() {
        // taken from the MDN:
        // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
        if (typeof Object.assign != 'function') {
          Object.assign = function(target) {
            'use strict';
            if (target == null) {
              throw new TypeError('Cannot convert undefined or null to object');
            }

            target = Object(target);
            for (var index = 1; index < arguments.length; index++) {
              var source = arguments[index];
              if (source != null) {
                for (var key in source) {
                  if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                  }
                }
              }
            }
            return target;
          };
        }
    },

    customEventConstructor() {
        (function () {
          function CustomEvent ( event, params ) {
            params = params || { bubbles: false, cancelable: false, detail: undefined };
            var evt = document.createEvent( 'CustomEvent' );
            evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
            return evt;
           }

          CustomEvent.prototype = window.Event.prototype;

          window.CustomEvent = CustomEvent;
        })();
    },

    arrayPrototypeFilter() {
        // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
        if (!Array.prototype.filter) {
          Array.prototype.filter = function(fun/*, thisArg*/) {
            'use strict';

            if (this === void 0 || this === null) {
              throw new TypeError();
            }

            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun !== 'function') {
              throw new TypeError();
            }

            var res = [];
            var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
            for (var i = 0; i < len; i++) {
              if (i in t) {
                var val = t[i];

                // NOTE: Technically this should Object.defineProperty at
                //       the next index, as push can be affected by
                //       properties on Object.prototype and Array.prototype.
                //       But that method's new, and collisions should be
                //       rare, so use the more-compatible alternative.
                if (fun.call(thisArg, val, i, t)) {
                  res.push(val);
                }
              }
            }

            return res;
          };
        }
    },

    arrayPrototypeFind() {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
        if (!Array.prototype.find) {
          Array.prototype.find = function(predicate) {
            if (this == null) {
              throw new TypeError('Array.prototype.find called on null or undefined');
            }
            if (typeof predicate !== 'function') {
              throw new TypeError('predicate must be a function');
            }
            var list = Object(this);
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            var value;

            for (var i = 0; i < length; i++) {
              value = list[i];
              if (predicate.call(thisArg, value, i, list)) {
                return value;
              }
            }
            return undefined;
          };
        }
    },

    arrayPrototypeIncludes() {
        if (!Array.prototype.includes) {
            Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
                'use strict';
                var O = Object(this);
                var len = parseInt(O.length, 10) || 0;
                if (len === 0) {
                    return false;
                }
                var n = parseInt(arguments[1], 10) || 0;
                var k;
                if (n >= 0) {
                    k = n;
                } else {
                    k = len + n;
                    if (k < 0) {
                        k = 0;
                    }
                }
                var currentElement;
                while (k < len) {
                    currentElement = O[k];
                    if (searchElement === currentElement ||
                        (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
                        return true;
                    }
                    k++;
                }
                return false;
            };
        }
    },

    arrayPrototypeReduce() {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
        // Production steps of ECMA-262, Edition 5, 15.4.4.21
        // Reference: http://es5.github.io/#x15.4.4.21
        if (!Array.prototype.reduce) {
          Array.prototype.reduce = function(callback /*, initialValue*/) {
            'use strict';
            if (this == null) {
              throw new TypeError('Array.prototype.reduce called on null or undefined');
            }
            if (typeof callback !== 'function') {
              throw new TypeError(callback + ' is not a function');
            }
            var t = Object(this), len = t.length >>> 0, k = 0, value;
            if (arguments.length == 2) {
              value = arguments[1];
            } else {
              while (k < len && !(k in t)) {
                k++;
              }
              if (k >= len) {
                throw new TypeError('Reduce of empty array with no initial value');
              }
              value = t[k++];
            }
            for (; k < len; k++) {
              if (k in t) {
                value = callback(value, t[k], k, t);
              }
            }
            return value;
          };
        }

    },

    stringPrototypeIncludes() {
        // https://github.com/paulmillr/es6-shim/blob/d8c4ec246a15e7df55da60b7f9b745af84ca9021/es6-shim.js#L186-L190
        if (!String.prototype.includes) {
            String.prototype.includes = function(searchString) {
                var position = arguments.length > 1 ? arguments[1] : undefined;
                // Somehow this trick makes method 100% compat with the spec.
                return String.prototype.indexOf.call(this, searchString, position) !== -1;
            };
        }
    },

    windowRequestAnimationFrame() {
        // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
        // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

        // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

        // MIT license
        (function() {
            var lastTime = 0;
            var vendors = ['ms', 'moz', 'webkit', 'o'];
            for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
                window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                           || window[vendors[x]+'CancelRequestAnimationFrame'];
            }

            if (!window.requestAnimationFrame)
                window.requestAnimationFrame = function(callback, element) {
                    var currTime = new Date().getTime();
                    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                    var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                      timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };

            if (!window.cancelAnimationFrame)
                window.cancelAnimationFrame = function(id) {
                    clearTimeout(id);
                };
        }());
    }
};


export default function applyPolyfills() {
    // call all methods in polyfills object
    for (const prop in polyfills) {
        if (typeof polyfills[prop] === 'function' && polyfills.hasOwnProperty(prop)) {
            polyfills[prop]();
        }
    }
}
/*eslint-enable */
