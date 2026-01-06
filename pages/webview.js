import BasePage from "./base.js";
import HomePage from "./home.js";

export default class WebviewPage extends BasePage {
    home = new HomePage();

    /**
     * Navega até a tela de Webview a partir da Home
     */
    async open() {
        await this.home.goToWebview();
    }


    /**
     * Aguarda e realiza a troca de contexto para Webview
     * @param {number} timeoutMs - Tempo máximo de espera pela Webview (ms)
     */
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