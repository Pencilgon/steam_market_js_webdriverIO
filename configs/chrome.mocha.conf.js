import { downloadDir, mainConfig } from "../framework/configs/main.wdio.conf.js";


export const config = {
    ...mainConfig,
    ...{
        specs: [
            '../test/specs/**/*.js'
        ],
        capabilities: [
            {
                browserName: "chrome",
                "goog:chromeOptions": {
                    prefs: {
                        "download.default_directory": downloadDir
                    }
                },
            },
        ],
    },
};
