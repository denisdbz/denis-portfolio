const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5000',
    specPattern: 'plays/play-04-cypress/cypress/e2e/**/*.cy.js',
  },
});
