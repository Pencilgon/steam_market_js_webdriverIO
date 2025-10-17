import path from 'node:path';
import fs from 'fs-extra';

export const downloadDir = path.resolve('./tmp');

export const mainConfig = {
    runner: 'local',
    exclude: [],
    maxInstances: 1,
    logLevel: 'warn',
    bail: 0,
    waitforTimeout: 15000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: [
    ['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
        useCucumberStepReporter: true
    }]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    onPrepare: function () {
        fs.ensureDir(downloadDir);
    },

    after: function (result, capabilities, specs) {
        fs.emptyDir(downloadDir);
    },

    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            await browser.takeScreenshot();
        }
    },
}
