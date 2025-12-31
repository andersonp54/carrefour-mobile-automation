// wdio.shared.conf.js
import fs from "node:fs";
import path from "node:path";

const iosAppPath = process.env.IOS_APP_PATH
    ? path.resolve(process.env.IOS_APP_PATH)
    : path.resolve(process.cwd(), 'apps/ios/wdiodemoapp.app');

if (!fs.existsSync(iosAppPath)) {
    throw new Error(`iOS app not found at: ${iosAppPath}`);
}


export const sharedConfig = {
    runner: 'local',
    port: 4723,
    specs: ['./tests/**/*.spec.js'],
    maxInstances: 1,
    logLevel: "info",
    framework: "mocha",
    mochaOpts: {
        ui: "bdd",
        timeout: 120000,
    },
    waitforTimeout: 20000,

    services: [
        ["appium", { args: { basePath: "/", relaxedSecurity: true } }],
    ],

    reporters: [
        "spec",
        ["allure", {
            outputDir: "reports/allure-results",
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: true,
            addConsoleLogs: true,
        }],
    ],

    afterTest: async function (test, context, { error, passed }) {
        if (!passed && error) {

            // ✅ garante pasta para screenshots
            const dir = path.resolve(process.cwd(), "reports", "screenshots");
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

            const safeName = test.title.replace(/[^\w\d-_]+/g, "_").slice(0, 120);
            const filePath = path.join(dir, `${Date.now()}_${safeName}.png`);


            // 1) salva arquivo (evidência física p/ auditoria/CI)
            await browser.saveScreenshot(filePath);

            // 2) anexa no Allure (evidência dentro do relatório)
            const buf = fs.readFileSync(filePath);
            await browser.addAttachment(
                `Screenshot - FAIL - ${test.title}`,
                buf,
                "image/png"
            );


            // 🔴 1) STACK TRACE COMPLETO
            await browser.addAttachment(
                `Error Stack - ${test.title}`,
                error.stack || String(error),
                "text/plain"
            );

            // 🔴 2) MENSAGEM DO ERRO (mais legível)
            await browser.addAttachment(
                `Error Message - ${test.title}`,
                error.message || String(error),
                "text/plain"
            );

            // 📸 3) SCREENSHOT
            const screenshot = await browser.takeScreenshot();
            await browser.addAttachment(
                `Screenshot - FAIL - ${test.title}`,
                Buffer.from(screenshot, "base64"),
                "image/png"
            );

            // 📄 4) PAGE SOURCE (muito útil em mobile)
            try {
                const pageSource = await browser.getPageSource();
                await browser.addAttachment(
                    `Page Source - ${test.title}`,
                    pageSource,
                    "text/xml"
                );
            } catch {
                // ignore se não conseguir pegar
            }
        }
    },

};
