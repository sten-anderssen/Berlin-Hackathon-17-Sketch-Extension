module.exports = {
	options: {
    log: true,
    processors: [
		require('autoprefixer')({
			browsers: ['last 2 versions', 'ie >= 10']
     	})
    ]
  },
	dev: {
		options: {
			map: true
		},
		src: '<%= paths.dev %>/css/styles.css'
	},
	dist: {
		options: {
			map: false
		},
		src: '<%= paths.dev %>/css/styles.css'
	}
};