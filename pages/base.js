export default class BasePage {
  async click(element) {
    await element.waitForDisplayed({ timeout: 20000 });
    await element.click();
  }

  async type(element, text) {
    await element.waitForDisplayed({ timeout: 20000 });
    await element.setValue(text);
  }

  async isVisible(element) {
    return element.isDisplayed();
  }

  async getAlertText(timeoutMs = 7000) {
    try {
      await driver.waitUntil(
        async () => (await driver.getAlertText())?.length > 0,
        { timeout: timeoutMs, timeoutMsg: "Alert não apareceu" }
      );
      return await driver.getAlertText();
    } catch {
      return null;
    }
  }

  async acceptAlert() {
    try {
      await driver.acceptAlert();
    } catch {
    }
  }

  /**
    * Aguarda um elemento ser exibido na tela
    * @param {WebdriverIO.Element} element
    * @param {number} timeout - tempo máximo de espera (ms)
    */
  async waitForDisplayed(element, timeout = 5000) {
    await element.waitForDisplayed({
      timeout,
      timeoutMsg: `Elemento não ficou visível após ${timeout}ms`
    });
  }

  async scrollTextVisible(partialText, { maxSwipes = 8, timeout = 2000 } = {}) {
  const selector = `-ios predicate string:type == "XCUIElementTypeStaticText" AND (name CONTAINS "${partialText}" OR label CONTAINS "${partialText}")`;

  for (let i = 0; i < maxSwipes; i++) {
    const el = await $(selector);
    if (await el.isDisplayed().catch(() => false)) return el;

    // swipe para cima (scroll down)
    const { width, height } = await driver.getWindowRect();
    const startX = Math.floor(width * 0.5);
    const startY = Math.floor(height * 0.75);
    const endY   = Math.floor(height * 0.25);

    await driver.performActions([{
      type: 'pointer',
      id: 'finger1',
      parameters: { pointerType: 'touch' },
      actions: [
        { type: 'pointerMove', duration: 0, x: startX, y: startY },
        { type: 'pointerDown', button: 0 },
        { type: 'pause', duration: 150 },
        { type: 'pointerMove', duration: 500, x: startX, y: endY },
        { type: 'pointerUp', button: 0 }
      ]
    }]);

    await driver.releaseActions();
    await driver.pause(timeout);
  }

  throw new Error(`Texto contendo "${partialText}" não ficou visível após ${maxSwipes} scrolls`);
}

  async expectTextVisible(partialText) {
    const el = await this.scrollTextVisible(partialText);
    await expect(el).toBeDisplayed();
    return el;
  }
}
