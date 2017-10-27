/* eslint-disable */

// simple console.log wrapper with IE compatibility, does only log in debug mode
export function log(...args) {
    if (window.debugMode === true && 'console' in window) {
        console.log.apply(console, args); // eslint-disable-line no-console
    }
}

/*
 * creates a shallow copy of an object
 */
export function shallowCopy(obj) {
    return Object.assign({}, obj);
}

/*
 * creates a deep copy of an object
 * WARNING: this method converts the object to JSON,
 * which does not support functions as object members
 */
export function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/* global window */
export function scrollToTop() {
    window.scrollTo(0, 0);
};

export function genericSortFn(_a, _b, attribute, desc) {
    const a = typeof _a[attribute] === 'string' ? _a[attribute].toLowerCase() : _a[attribute];
    const b = typeof _b[attribute] === 'string' ? _b[attribute].toLowerCase() : _b[attribute];
	if (a > b) { return desc ? -1 : 1; }
	if (a < b) { return desc ? 1 : -1; }
	return 0;
}

export function hyphenate(str) {
    return str.replace(/\s+/g, '-').toLowerCase();
};

export function getUrlParams() {
    var qs = document.location.search;
    qs = qs.split("+").join(" ");

    var params = {}, tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }
    return params;
}

export function formatDate(date) {
    const pad = num => num < 10 ? `0${num}` : num;
    const dd = pad(date.getDate());
    const mm = pad(date.getMonth() + 1);
    const yyyy = date.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
}

/* eslint-enable */
