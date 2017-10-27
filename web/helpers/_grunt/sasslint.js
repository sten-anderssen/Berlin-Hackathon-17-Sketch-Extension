module.exports = {
	options: {
		configFile: '<%= paths.helpers %>/task-configs/.sass-lint.yml'
	},
	target: [
		'<%= paths.src %>/scss/**/*.scss',
		'!<%= paths.src %>/scss/vendor/**/*.scss',
		'!<%= paths.src %>/scss/utils/**/*.scss',
        '!<%= paths.src %>/scss/icons/**/*.scss',
		'!<%= paths.src %>/scss/global/_print.scss',
		'!<%= paths.src %>/scss/styles.tmp.scss'
	]
};
