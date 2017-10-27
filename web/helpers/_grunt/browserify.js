var libs = [
	'whatwg-fetch/fetch',
	'es6-promise',
	// 'react',
	// 'react-dom',
	// 'redux',
	// 'react-redux'
];

var testingLibs = libs.concat([
    'jsdom',
	// 'react/addons',
	// 'react/lib/ReactContext',
	// 'react/lib/ExecutionEnvironment',
]);

module.exports = {
	options: {
		transform: [
            [
                "eslintify", {
                    passthrough: 'warnings'
                }
            ],
			[
				"babelify", {
					"presets": ["es2015", "react"]
				}
			]
		]
	},
	vendor: {
		src: ['.'],
		dest: '<%= paths.dev %>/js/vendor/libs.js',
		options: {
			debug: false,
			alias: libs,
			external:  null  // Reset this here because it's not needed
		}
	},
	dev: {
		options: {
			external: libs,
			browserifyOptions: {
				debug: true,
				extensions: ['.js', '.jsx']
			},
			watch: true
		},
		files: {
			'<%= paths.dev %>/js/main.js': '<%= paths.src %>/js/main.jsx'
		}
	},
	test: {
        src: ['<%= paths.src %>/tests/setup.js', '<%= paths.src %>/js/**/*.spec.js'],
		dest: '<%= paths.dev %>/tests/allTests.js',
		options: {
			external: testingLibs,
			transform: [
				[
					"babelify", {
						"presets": ["es2015", "react"]
					}
				]
			],
			browserifyOptions: {
				extensions: ['.js', '.jsx']
			},
		},
	},
	dist: {
		options: {
			browserifyOptions: {
				extensions: ['.js', '.jsx']
			}
		},
		files: {
			'<%= paths.dev %>/js/main.js': '<%= paths.src %>/js/main.jsx'
		}
	}
};
