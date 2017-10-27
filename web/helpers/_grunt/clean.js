module.exports = {
	dist: [
		'<%= paths.dist %>/**/*'
	],
	dev: [
		'<%= paths.dev %>/**/*'
	] ,
	grunticon: [
		'<%= paths.src %>/scss/icons/*.{html,js,txt}'
	]
};