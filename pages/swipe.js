import BasePage from "./base.js";
import HomePage from "./home.js";

export default class SwipePage extends BasePage {
    home = new HomePage();

    get screen() { return $("~Swipe-screen"); } // se não existir, removemos
    get endMessage() { return $('//*[contains(@name,"You found me")]'); } // robusto iOS/Android


    /**
     * Retorna um card pelo texto exibido em seu título
     * @param {string} text - Texto (ou parte dele) do card
     */
    cardTitleByText(text) {
        return $(
            `//*[contains(@name,"${text}") or contains(@label,"${text}") or contains(@text,"${text}")]`
        );
    }

    /**
     * Retorna um texto oculto pelo conteúdo parcial informado
     * @param {string} text - Texto (ou parte dele) a ser localizado
     */
    async hiddenTextByContains(text) {
        return $(
            `//*[contains(@name,"${text}") or contains(@label,"${text}") or contains(@text,"${text}")]`
        );
    }

    /**
     * Navega até a tela de Swipe a partir da Home
     */
    async open() {
        await this.home.goToSwipe();
    }

    /**
     * Executa um gesto de swipe na direção informada
     * @param {"left"|"right"|"up"|"down"} direction 
     */
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
                startY = Math.floor(height * 0.85);
                endY = Math.floor(height * 0.20);
                break;

            case "down":
                startY = Math.floor(height * 0.25);
                endY = Math.floor(height * 0.75);
                break;

            default:
                throw new Error(`Direção de swipe inválida: ${direction}`);
        }

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
     * Realiza swipe horizontal até encontrar um card contendo o texto informado
     * @param {string} text - Texto esperado no card
     * @param {number} maxSwipes - Número máximo de tentativas
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

    /**
     * Realiza swipe vertical até encontrar um card contendo o texto informado
     * @param {string} text - Texto esperado no card
     * @param {number} maxSwipes - Número máximo de tentativas
     */
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
