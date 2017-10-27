module.exports = {
	options: {
		outputStyle: 'nested',
		sourceMap: true
	},
	dev: {
		files: {
			'<%= paths.dev %>/css/styles.css': '<%= paths.src %>/scss/styles.tmp.scss'
		}
	}
};
