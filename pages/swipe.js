import BasePage from "./base.js";
import HomePage from "./home.js";

export default class SwipePage extends BasePage {
    home = new HomePage();

    get screen() { return $("~Swipe-screen"); } // se não existir, removemos
    get endMessage() { return $('//*[contains(@name,"You found me")]'); } // robusto iOS/Android

    async open() {
        await this.home.goToSwipe();
    }

    cardTitleByText(text) {
        return $(
            `//*[contains(@name,"${text}") or contains(@label,"${text}") or contains(@text,"${text}")]`
        );
    }

    async hiddenTextByContains(text) {
        return $(
            `//*[contains(@name,"${text}") or contains(@label,"${text}") or contains(@text,"${text}")]`
        );
    }

    async swipe(direction = "left") {
        const { width, height } = await driver.getWindowRect();

        const centerX = Math.floor(width * 0.5);
        const centerY = Math.floor(height * 0.5);

        let startX = centerX;
        let startY = centerY;
        let endX = centerX;
        let endY = centerY;

        switch (direction) {
            case "left":
                startX = Math.floor(width * 0.85);
                endX = Math.floor(width * 0.15);
                break;

            case "right":
                startX = Math.floor(width * 0.15);
                endX = Math.floor(width * 0.85);
                break;

            case "up":
                startY = Math.floor(height * 0.85); // antes 0.75 (cai no card)
                endY = Math.floor(height * 0.20);
                break;

            case "down":
                startY = Math.floor(height * 0.25);
                endY = Math.floor(height * 0.75);
                break;

            default:
                throw new Error(`Direção de swipe inválida: ${direction}`);
        }

        // 🔹 Android precisa de swipe vertical um pouco mais longo
        const moveDuration =
            driver.isAndroid && (direction === "up" || direction === "down")
                ? 550
                : 350;

        await driver.performActions([
            {
                type: "pointer",
                id: "finger1",
                parameters: { pointerType: "touch" },
                actions: [
                    { type: "pointerMove", duration: 0, x: startX, y: startY },
                    { type: "pointerDown", button: 0 },
                    { type: "pause", duration: 120 },
                    { type: "pointerMove", duration: moveDuration, x: endX, y: endY },
                    { type: "pointerUp", button: 0 }
                ]
            }
        ]);

        await driver.releaseActions();
        await browser.pause(250);
    }

    /**
     * Faz swipe até encontrar um card que contenha o texto informado.
     * @param {string} text exemplo: "GREAT COMMUNITY"
     * @param {{maxSwipes?: number}} opts
     */
    async swipeToCard(text, maxSwipes = 10) {
        const target = this.cardTitleByText(text);

        for (let i = 0; i < maxSwipes; i++) {
            if (await target.isDisplayed()) return;
            await this.swipe("left");
            await browser.pause(500);
        }

        for (let i = 0; i < maxSwipes; i++) {
            if (await target.isDisplayed()) return;
            await this.swipe("right");
            await browser.pause(500);
        }

        throw new Error(`Card com texto "${text}" não encontrado após ${maxSwipes} swipes`);
    }

    async swipeVerticalByText(text, maxSwipes = 10) {
        const target = this.cardTitleByText(text);

        for (let i = 0; i < maxSwipes; i++) {
            if (await target.isDisplayed()) return;
            await this.swipe("up");
            await browser.pause(500);
        }

        for (let i = 0; i < maxSwipes; i++) {
            if (await target.isDisplayed()) return;
            await this.swipe("down");
            await browser.pause(500);
        }

        throw new Error(`Card com texto "${text}" não encontrado após ${maxSwipes} swipes`);
    }

}
