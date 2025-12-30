import BasePage from "./base.js";
import HomePage from "./home.js";

export default class WebviewPage extends BasePage {
    home = new HomePage();

    async open() {
        await this.home.goToWebview();
    }

    /**
     * Espera aparecer um contexto WEBVIEW e troca para ele
     */
    async switchToWebview(timeoutMs = 30000) {
        const start = Date.now();

        while (Date.now() - start < timeoutMs) {
            const contexts = await driver.getContexts(); // ex: ["NATIVE_APP", "WEBVIEW_1"]
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