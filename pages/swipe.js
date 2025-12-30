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

    async swipeLeft() {
        const { width, height } = await driver.getWindowRect();
        const y = Math.floor(height * 0.55);
        const startX = Math.floor(width * 0.85);
        const endX = Math.floor(width * 0.15);

        await driver.performActions([{
            type: "pointer",
            id: "finger1",
            parameters: { pointerType: "touch" },
            actions: [
                { type: "pointerMove", duration: 0, x: startX, y },
                { type: "pointerDown", button: 0 },
                { type: "pause", duration: 120 },
                { type: "pointerMove", duration: 350, x: endX, y },
                { type: "pointerUp", button: 0 }
            ]
        }]);
        await driver.releaseActions();
    }

    async swipe(direction = "left") {
        const { width, height } = await driver.getWindowRect();
        const y = Math.floor(height * 0.55);

        const startX =
            direction === "left"
                ? Math.floor(width * 0.85)
                : Math.floor(width * 0.15);

        const endX =
            direction === "left"
                ? Math.floor(width * 0.15)
                : Math.floor(width * 0.85);

        await driver.performActions([{
            type: "pointer",
            id: "finger1",
            parameters: { pointerType: "touch" },
            actions: [
                { type: "pointerMove", duration: 0, x: startX, y },
                { type: "pointerDown", button: 0 },
                { type: "pause", duration: 120 },
                { type: "pointerMove", duration: 350, x: endX, y },
                { type: "pointerUp", button: 0 }
            ]
        }]);

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
            if (await target.isDisplayed()) return; // achou
            await this.swipe("left");
            await browser.pause(250);
        }

        for (let i = 0; i < maxSwipes; i++) {
            if (await target.isDisplayed()) return;
            await this.swipe("right");
            await browser.pause(250);
        }

        throw new Error(`Card com texto "${text}" não encontrado após ${maxSwipes} swipes`);
    }

}
