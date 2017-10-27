module.exports = {
    options: {
        // ui: 'bdd',
        // reporter: 'tap',
        // globals: ['window', 'document', '$', 'should'],
        // timeout: 3000,
        // retries: 2,
        // bail: false,
        // slow: 2000,
        // ignoreLeaks: false,
        // fullTrace: true
        // grep: 'users',
    },
    all: {
        src: ['<%= paths.dev %>/tests/allTests.js']
    }
};
