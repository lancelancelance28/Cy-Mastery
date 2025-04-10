
const fs = require('fs');
const path = require('path'); 
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "2aidwb",
  reporter:"cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Regression Testing Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on('task', {
        saveUserFixture(user) {
          const filePath = path.join('cypress', 'fixtures', 'fakeUser.json');
          fs.writeFileSync(filePath, JSON.stringify(user, null, 2));
          return null;
        }
      });
    },
  },
});
