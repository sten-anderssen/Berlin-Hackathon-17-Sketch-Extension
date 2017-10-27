module.exports = {
	options: {
		assets: '<%= paths.dev %>',
		data: [
			'<%= paths.src %>/templating/data/**/*.json',
			'<%= paths.src %>/templating/partials/**/*.json'
		],
		helpers: '<%= paths.src %>/templating/helpers/**/*.js',
		layoutdir: '<%= paths.src %>/templating/layouts/',
		layout: 'lyt-default.hbs',
		partials: [
			'<%= paths.src %>/templating/partials/**/*.hbs'
		],
		collections: [
			'sitemap'
		]
	},
	pages: {
		options: {
		},
		files: [{
			cwd: '<%= paths.src %>/templating/pages/',
			dest: '<%= paths.dev %>/',
			expand: true,
			flatten: false,
			src: ['**/*.hbs']
		}]
	}
};
