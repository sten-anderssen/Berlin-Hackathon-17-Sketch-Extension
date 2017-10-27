module.exports = {
	ajax: {
		files: [
			// includes files within path and its sub-directories
			{
				cwd: '<%= paths.src %>/ajax',
				src: '**/*.{json,html}',
				dest: '<%= paths.dev %>/ajax'
			}
		]
	},
	assets: {
		files: [
			// includes files within path and its sub-directories
			{
				cwd: '<%= paths.src %>/assets',
				src: [
					'**/{,*/}*',
					'!img/svg/**/{,*/}*',
					'!img/svgmin/**/{,*/}*'
				],
				dest: '<%= paths.dev %>'
			}
		]
	},
	styleguide: {
		files: [
			// includes files within path and its sub-directories
			{
                cwd: 'sketch',
				src: ['**'],
				dest: '<%= paths.dev %>/sketch'
			}
		]
	}
};
