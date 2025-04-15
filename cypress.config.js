
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
      const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');
      on('before:run', async (details) => {
              console.log('override before:run');
              console.log('Running tests');
              await beforeRunHook(details);
            });
            on('after:run', async () => {
              console.log('override after:run');
              await afterRunHook();
            });
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
