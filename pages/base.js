export default class BasePage {
  /**
   * Realiza o clique em um elemento após garantir que ele esteja visível
   * @param {WebdriverIO.Element} element - Elemento que será clicado
   */
  async click(element) {
    await element.waitForDisplayed({ timeout: 20000 });
    await element.click();
  }

  /**
   * Preenche um campo de texto aguardando o elemento ficar visível
   * @param {WebdriverIO.Element} element - Campo de input
   * @param {string} text - Texto a ser digitado
   */
  async type(element, text) {
    await element.waitForDisplayed({ timeout: 20000 });
    await element.setValue(text);
  }

  /**
   * Verifica se um elemento está visível na tela
   * @param {WebdriverIO.Element} element - Elemento a ser verificado
   */
  async isVisible(element) {
    return element.isDisplayed();
  }

  /**
   * Obtém o texto exibido em um alerta (iOS ou Android)
   * @param {number} timeoutMs - Tempo máximo de espera pelo alerta (ms)
   */
  async getAlertText(timeoutMs = 7000) {
    if (driver.isIOS) {
      try {
        await driver.waitUntil(
          async () => {
            try {
              const text = await driver.getAlertText();
              return !!text && text.length > 0;
            } catch {
              return false;
            }
          },
        );
        return await driver.getAlertText();
      } catch {
        return null;
      }
    }

    if (driver.isAndroid) {
      try {
        const alertText = await $(
          '//*[@resource-id="android:id/message"]'
        );

        await alertText.waitForDisplayed({ timeout: timeoutMs });
        return await alertText.getText();
      } catch {
        return null;
      }
    }

    return null;
  }

   /**
   * Aceita um alerta exibido na tela (iOS ou Android)
   * @param {number} timeoutMs - Tempo máximo de espera pelo botão de confirmação
   */
  async acceptAlert(timeoutMs = 7000) {
    if (driver.isIOS) {
      await driver.acceptAlert();
      return;
    }

    if (driver.isAndroid) {
      const okButton = await $('//*[@resource-id="android:id/button1"]');
      await okButton.waitForDisplayed({ timeout: timeoutMs });
      await okButton.click();
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

  /**
   * Realiza scroll vertical até que um texto parcial fique visível
   * Funciona tanto para Android quanto para iOS
   * @param {string} partialText - Texto (ou parte dele) a ser encontrado
   * @param {Object} options - Opções de scroll
   * @param {number} options.maxSwipes - Quantidade máxima de tentativas de scroll
   * @param {number} options.timeout - Tempo de pausa entre scrolls
   */
  async scrollTextVisible(partialText, { maxSwipes = 8, timeout = 2000 } = {}) {
    const selector = driver.isAndroid
      ? `//*[contains(@text,'${partialText}') or contains(@content-desc,'${partialText}')]`
      : `-ios predicate string:type == "XCUIElementTypeStaticText" AND (name CONTAINS "${partialText}" OR label CONTAINS "${partialText}")`;

    for (let i = 0; i < maxSwipes; i++) {
      const el = await $(selector);
      if (await el.isDisplayed().catch(() => false)) return el;

      const { width, height } = await driver.getWindowRect();
      const startX = Math.floor(width * 0.5);
      const startY = Math.floor(height * 0.75);
      const endY = Math.floor(height * 0.25);

      await driver.performActions([{
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'touch' },
        actions: [
          { type: 'pointerMove', duration: 0, x: startX, y: startY },
          { type: 'pointerDown', button: 0 },
          { type: 'pause', duration: 150 },
          { type: 'pointerMove', duration: 1000, x: startX, y: endY },
          { type: 'pointerUp', button: 0 }
        ]
      }]);

      await driver.releaseActions();
      await driver.pause(timeout);
    }

    throw new Error(`Texto contendo "${partialText}" não ficou visível após ${maxSwipes} scrolls`);
  }

  /**
   * Garante que um texto esteja visível na tela, realizando scroll se necessário
   * @param {string} partialText - Texto a ser validado
   * @returns {Promise<WebdriverIO.Element>} Elemento visível
   */
  async expectTextVisible(partialText) {
    const el = await this.scrollTextVisible(partialText);
    await expect(el).toBeDisplayed();
    return el;
  }
}
