import BasePage from "./base.js";
import HomePage from "./home.js";

export default class WebviewPage extends BasePage {
    home = new HomePage();

    async open() {
        await this.home.goToWebview();
    }


    async switchToWebview(timeoutMs = 30000) {
        const start = Date.now();

        while (Date.now() - start < timeoutMs) {
            const contexts = await driver.getContexts();
            const context = contexts.find((c) => c.includes("NATIVE_APP"))

            if (context) {
                await driver.switchContext(context);
                return context;
            }

            await browser.pause(500);
        }

        throw new Error(`Context não apareceu em ${timeoutMs}ms`);
    }
}