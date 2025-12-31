import { sharedConfig } from "./wdio.shared.conf.js";
import path from 'node:path';
import fs from 'node:fs';

const iosAppPath = process.env.IOS_APP_PATH
  ? path.resolve(process.env.IOS_APP_PATH)
  : path.resolve(process.cwd(), 'apps/android/wdio.native.app.apk');


export const config = {
  ...sharedConfig,

  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'emulator-5554',

    // ESSENCIAIS
    'appium:newCommandTimeout': 300,
    'appium:adbExecTimeout': 120000,
    'appium:uiautomator2ServerInstallTimeout': 120000,
    'appium:systemPort': 8200,
    'appium:noReset': false,
    'appium:app': iosAppPath
  }],
  services: [
    ['appium', {
      args: {
        address: '127.0.0.1',
        port: 4723,
        basePath: '/'
      },
      command: 'appium'
    }]
  ],

  onPrepare: function () {
          const resultsDir = path.resolve(process.cwd(), "reports/allure-results");
          if (!fs.existsSync(resultsDir)) fs.mkdirSync(resultsDir, { recursive: true });
  
          const env = [
              `Platform=Android`,
              `Node=${process.version}`,
              `App=${process.env.IOS_APP_PATH || iosAppPath}`,
              `Device=${process.env.DEVICE_NAME || 'emulator-5554'}`,
  
          ].join("\n");
  
          fs.writeFileSync(path.join(resultsDir, "environment.properties"), env);
      },
};
