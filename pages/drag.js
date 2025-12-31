import BasePage from "./base.js";
import HomePage from "./home.js";

export default class DragPage extends BasePage {
    home = new HomePage();

    get dragItem() { return $("~drag-l1"); }
    get dropZone() { return $("~drop-l1"); }
    get successText() {
        return $('//*[contains(@name,"You made it") or contains(@text,"You made it") or contains(@label,"You made it")]');
    }

    async open() {
        await this.home.goToDrag();
    }

    async dragAndDrop() {
        await this.dragItem.waitForDisplayed({ timeout: 10000 });
        await this.dropZone.waitForDisplayed({ timeout: 10000 });

        // gesto cross-platform usando performActions
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

    drag(key) {
        return $(`~drag-${key}`);
    }

    drop(key) {
        return $(`~drop-${key}`);
    }

    get successTitle() {
        return $('//*[contains(@name,"Congratulations") or contains(@label,"Congratulations") or contains(@text,"Congratulations")]');
    }

    get successMessage() {
        return $('//*[contains(@name,"You made it") or contains(@label,"You made it") or contains(@text,"You made it")]');
    }

    get btnRetry() {
        return $('//*[contains(@name,"Retry") or contains(@label,"Retry") or contains(@text,"Retry")]');
    }

    
    async dragTo(sourceEl, targetEl) {
        await sourceEl.waitForDisplayed({ timeout: 15000 });
        await targetEl.waitForDisplayed({ timeout: 15000 });

        const fromLoc = await sourceEl.getLocation();
        const fromSize = await sourceEl.getSize();

        const toLoc = await targetEl.getLocation();
        const toSize = await targetEl.getSize();

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
