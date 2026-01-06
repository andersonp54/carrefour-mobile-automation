import BasePage from "./base.js";
import HomePage from "./home.js";

export default class DragPage extends BasePage {
    home = new HomePage();

    get dragItem() { return $("~drag-l1"); }
    get dropZone() { return $("~drop-l1"); }
    get successText() {
        return $('//*[contains(@name,"You made it") or contains(@text,"You made it") or contains(@label,"You made it")]');
    }

    /**
     * Navega até a tela de Drag & Drop a partir da Home
     */
    async open() {
        await this.home.goToDrag();
    }

    /**
     * Executa o gesto de drag and drop padrão
     */
    async dragAndDrop() {
        await this.dragItem.waitForDisplayed({ timeout: 10000 });
        await this.dropZone.waitForDisplayed({ timeout: 10000 });

        const from = await this.dragItem.getRect();
        const to = await this.dropZone.getRect();

        const startX = Math.floor(from.x + from.width / 2);
        const startY = Math.floor(from.y + from.height / 2);
        const endX = Math.floor(to.x + to.width / 2);
        const endY = Math.floor(to.y + to.height / 2);

        await driver.performActions([{
            type: "pointer",
            id: "finger1",
            parameters: { pointerType: "touch" },
            actions: [
                { type: "pointerMove", duration: 0, x: startX, y: startY },
                { type: "pointerDown", button: 0 },
                { type: "pause", duration: 200 },
                { type: "pointerMove", duration: 600, x: endX, y: endY },
                { type: "pointerUp", button: 0 }
            ]
        }]);
        await driver.releaseActions();
    }

    /**
     * Retorna dinamicamente um elemento de drag baseado na chave informada
     * @param {string} key
     */
    drag(key) {
        return $(`~drag-${key}`);
    }

    /**
     * Retorna dinamicamente uma zona de drop baseada na chave informada
     * @param {string} key - Identificador do alvo (ex: l1, c2, r3)
     */
    drop(key) {
        return $(`~drop-${key}`);
    }

    /**
     * Título exibido ao concluir o puzzle com sucesso
     */
    get successTitle() {
        return $('//*[contains(@name,"Congratulations") or contains(@label,"Congratulations") or contains(@text,"Congratulations")]');
    }

     /**
     * Mensagem exibida após a conclusão correta do puzzle
     */
    get successMessage() {
        return $('//*[contains(@name,"You made it") or contains(@label,"You made it") or contains(@text,"You made it")]');
    }

    /**
     * Botão exibido para tentar novamente o desafio
     */
    get btnRetry() {
        return $('//*[contains(@name,"Retry") or contains(@label,"Retry") or contains(@text,"Retry")]');
    }

    /**
     * Executa drag and drop entre dois elementos informados
     * @param {WebdriverIO.Element} sourceElement - Elemento de origem
     * @param {WebdriverIO.Element} targetElement - Elemento de destino
     */
    async dragTo(sourceElement, targetElement) {
        await sourceElement.waitForDisplayed({ timeout: 15000 });
        await targetElement.waitForDisplayed({ timeout: 15000 });

        const fromLoc = await sourceElement.getLocation();
        const fromSize = await sourceElement.getSize();

        const toLoc = await targetElement.getLocation();
        const toSize = await targetElement.getSize();

        const startX = Math.floor(fromLoc.x + fromSize.width / 2);
        const startY = Math.floor(fromLoc.y + fromSize.height / 2);

        const endX = Math.floor(toLoc.x + toSize.width / 2);
        const endY = Math.floor(toLoc.y + toSize.height / 2);

        await driver.performActions([{
            type: "pointer",
            id: "finger1",
            parameters: { pointerType: "touch" },
            actions: [
                { type: "pointerMove", duration: 0, x: startX, y: startY },
                { type: "pointerDown", button: 0 },
                { type: "pause", duration: 250 },
                { type: "pointerMove", duration: 800, x: endX, y: endY },
                { type: "pointerUp", button: 0 },
            ],
        }]);

        await driver.releaseActions();
        await browser.pause(150);
    }

    /**
     * Monta o puzzle arrastando cada peça para seu alvo equivalente.
     */
    async solvePuzzle() {
        const keys = ["l1", "l2", "l3", "c1", "c2", "c3", "r1", "r2", "r3"];

        for (const key of keys) {
            await this.dragTo(this.drag(key), this.drop(key));
        }
    }
}
