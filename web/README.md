# Move-Web-Starterkit
A boilerplate for web projects at Aperto Move.  


**Version 1.2**  
Contributors: [Janko Hofmann](https://github.com/jankohofmann), [Tamio Honma](https://github.com/IOIO72)  
based on the great [Veams project](http://www.veams.org/).

## Requirements for Front-end Development

* NodeJS (>= 5)

## Included Tools
* **Task Runner:** [Grunt](http://gruntjs.com/)
* **Static Site Generator:** [Assemble](http://assemble.io)
* **Frontend Framework:** None (build process is already setup to work with  [React](https://facebook.github.io/react/) though)
* **ES6 / JSX Transpiler:** [Babel](http://babeljs.io/)
* **Module Bundler:** [Browserify](http://browserify.org/)
* **Linting:** [Aperto Move JavaScript Guidelines](https://github.com/apertomove/javascript) & [ESLint](http://eslint.org/)
* **SASS:**
	* Libsass
	* [Foundation 6 SCSS](http://foundation.zurb.com/)
	* [atomic design](http://bradfrost.com/blog/post/atomic-web-design/) folder structure
	* [BEM methodology](http://getbem.com/)
	* [Sass Guidelines](https://sass-guidelin.es/) & [Sass Lint](https://github.com/sasstools/sass-lint)
* **Tests:**
	* [Mocha](https://mochajs.org/) (Test Runner)
	* [Chai](http://chaijs.com/) (Assertion Library)
	* [Enzyme](http://airbnb.io/enzyme/) (React Component testing, optional)
    * [JSDOM](https://github.com/tmpvar/jsdom) (DOM Testing)
* **Documentation:** [JSDoc](http://usejsdoc.org/)

## Folder Structure

* `resources`: contains all source code and assets needed to build the page
	* `ajax/`: put static resources here to retrieve via ajax calls (mock data)
	* `assets/`:
		* `fonts/`: put your webfonts here
		* `img/`: put your images here (PNG or JPG)
			* `favicon/`: favicons and homescreen icons for your website
			* `svg/`: SVG images in this folder will be automatically minified, base64-encoded and provided as extendable class in your SCSS
		* `media/`: put media assets here that the user can view or download, such as videos, PDF files etc.
	* `js/`: contains your JavaScript code (can also contain JSX, it will be transformed). Code in this folder will be linted, converted to ES5, bundled and minified automatically for deployment. Documentation will be generated with JSDoc into the folder `jsdocs/` in your output directory.
	* `scss/`: contains your SCSS code that will be bundled, minified and inline media queries will be resolved. Contains Foundation 6 SCSS Version.
	* `templating/`: contains assemble.io templates (handlebars templates + YAML front matter) that will be converted to static HTML pages
	* `tests/`: put your unit tests here or next to the code you intend to test, name them `[yourFeature].spec.js` and run them via `grunt test` command
* `helpers/`: contains configuration for the build process (grunt tasks)
* `server/`: local server
* `styleguide/`: put your styleguide in here, it will be copied into the build output folder
* `.eslintrc`: configuration for JavaScript Linter (Aperto Move JavaScript Guidelines)
* `.gitignore`: list of files that should not be added to the git repository
* `package.json`: list of dependencies to install via npm


## Getting Started

1. Check the build status: [![Build Status](https://travis-ci.org/apertomove/move-web-starterkit.svg?branch=master)](https://travis-ci.org/apertomove/move-web-starterkit)
1. If you didn't before, install [Node.js](https://nodejs.org/)
1. Enter `git clone https://github.com/apertomove/move-web-starterkit.git yourProjectsName`
1. Enter `cd yourProjectsName`
1. Install dependencies: `npm install`

### Build tasks:

* `grunt`: Build and run on local server ([http://localhost:3001]())
* `grunt dist`: Build production version
* `grunt test`: Run unit tests

## How to add React

### Add dependencies:
* React Library: `npm install --save react react-dom`
* Enzyme (Test Library for React): `npm install --save-dev react-addons-test-utils enzyme`

If you use Redux, you can install it like this:

* `npm install --save redux react-redux`

### Add libraries to module bundler:

1. Open the file `helpers/_grunt/browserify.js`.
2. Search for the variables `libs` and `testingLibs` at the top of the file
3. Uncomment all react-related modules you want to use
4. Now you can import and use them in your JS modules, e.g. `import React from 'react';`

**That's it. Everything else is already configured:**

* Build process already supports transpiling and bundling of JSX
* you can use .JSX as file extension
* Linting for React and JSX is also already available
