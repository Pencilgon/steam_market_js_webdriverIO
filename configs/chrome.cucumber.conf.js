import { downloadDir, mainConfig } from "../framework/configs/main.wdio.conf.js";


export const config = {
    ...mainConfig,
    ...{
        baseUrl: 'https://store.steampowered.com/',
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
                    args: ["--start-maximized", "--lang=en-US",
                            '--disable-gpu',
                            '--disable-dev-shm-usage',
                            '--no-sandbox',
                            '--window-size=1920,1080',
                            '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120 Safari/537.36'],
                    prefs: {
                        "download.default_directory": downloadDir
                    },
                },
            },
        ],
    },
};
