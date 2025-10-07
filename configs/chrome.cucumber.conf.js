import { downloadDir, mainConfig } from "../framework/configs/main.wdio.conf.js";


export const config = {
    ...mainConfig,
    ...{
        framework: "cucumber",
        cucumberOpts: {
            require: ['./test/step-definitions/**/*.js'],
            timeout: 60000
        },
        specs: [
            '../test/features/**/*.feature'
        ],
        capabilities: [
            {
                browserName: "chrome",
                "goog:chromeOptions": {
                    args: ["--start-maximized"],
                    prefs: {
                        "download.default_directory": downloadDir
                    },
                },
            },
        ],
    },
};
