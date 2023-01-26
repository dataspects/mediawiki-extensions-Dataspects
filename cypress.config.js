module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://localhost",
    screenshotsFolder:
      "/home/lex/mwstakeorgdevclone/extensions/Dataspects/readme_images",
    video: true,
    viewportWidth: 1400,
    viewportHeight: 850,
  },
  retries: 1,
};
