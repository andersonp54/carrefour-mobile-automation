import WebviewPage from "../pages/webview.js";

const webview = new WebviewPage();

describe("Webview", () => {
    it("Abrir Webview e validar conteúdo no contexto", async () => {
        await webview.open();
        await webview.switchToWebview(10000);

        await webview.expectTextVisible("Get Started");
        await webview.expectTextVisible("Why WebdriverIO?");
        await webview.expectTextVisible("View on GitHub");
        await webview.expectTextVisible("Watch on YouTube");
        await webview.expectTextVisible("Sponsored by");
        await webview.expectTextVisible("Test in Real Environments");
        await webview.expectTextVisible("Versatile and Feature Rich");
        await webview.expectTextVisible("Auto Wait");
        await webview.expectTextVisible("WebdriverIO allows you to test");
        await webview.expectTextVisible("Use WebdriverIO for full e2e");
        await webview.expectTextVisible("automatically waits");
    });
});
