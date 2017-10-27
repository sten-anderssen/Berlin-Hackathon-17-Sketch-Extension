module.exports = {
	syncing: {
		tasks: [
			'sync'
		],
		options: {
			logConcurrentOutput: true
		}
	},
	hintAndDocs: {
		tasks: [
			'jsdoc'
		],
		options: {
			logConcurrentOutput: true,
			limit: 5
		}
	}
};
