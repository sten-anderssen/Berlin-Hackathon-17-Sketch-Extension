/*
 * Generated on 2016-07-07
 * generator-veams v7.0.6
 * http://veams.org/
 *
 * Copyright (c) 2016 Sebastian Fitzner
 * Licensed under the MIT license.
 */

'use strict';

/*
 * PERFORMANCE
 *
 * 1. For performance reasons you should only matching one level down, if possible.
 * 2. Try to keep your watch task clean. Do NOT watch everything (like icons).
 * 3. Add "spawn: false" to your watch task when you need to speed up your build.
 *
 */

var config = require('./helpers/config');

module.exports = function(grunt) {

	// load only used tasks and add fallbacks for those which cannot be find
	require('jit-grunt')(grunt, {
		'replace': 'grunt-text-replace',
		'express': 'grunt-express-server',
		'simplemocha': 'grunt-simple-mocha',
		'sasslint': 'grunt-sass-lint'
	});
	// measures the time each task takes
	require('time-grunt')(grunt);

	// Load grunt configurations automatically
	var configs = require('load-grunt-configs')(grunt, config.options);

	// Define the configuration for all the tasks
	grunt.initConfig(configs);

	/*
	 *	SIMPLE TASKS
	 */

	// SASS Task
	grunt.registerTask('watchCSS', [
		'sasslint',
		'sassGlobber:dev',
		'sass:dev'
	]);

	// Icons Task
	grunt.registerTask('icons', [
		'newer:svgmin',
		'grunticon',
		'clean:grunticon',
		'replace'
	]);

	// FE Templates Task
	grunt.registerTask('jsTemplates', [
		'handlebars',
		'replace:jsTemplates'
	]);

	// Build HTML Task
	grunt.registerTask('build-html', [
		'assemble'
	]);

	/*
	 *	ADVANCED TASKS
	 */
	grunt.registerTask('server', [
        'icons',
        'jsTemplates',
		'browserify:vendor',
		'browserify:dev',
		'newer:assemble',
		'concurrent:syncing',
		'watchCSS',
		'express:dev',
		'browserSync',
		'watch'
	]);

	grunt.registerTask('build', [
		'clean:dev',
        'icons',
		'jsTemplates',
		'browserify:vendor',
		'browserify:dist',
		'uglify',
		'concurrent:syncing',
		'sasslint',
		'sassGlobber:dist',
		'sass:dev',
		'combine_mq',
		'postcss:dist',
		'cssmin',
        'assemble',
		'concurrent:hintAndDocs'
	]);

	grunt.registerTask('default', [
		'server'
	]);

	// alias serve by grunt convention
	grunt.registerTask('serve', [
		'server'
	]);

	grunt.registerTask('dist', [
		'env:dist',
		'clean',
		'build',
		'copy:dist'
	]);

	grunt.registerTask('test', [
		'browserify:test',
		'simplemocha'
	]);
};
