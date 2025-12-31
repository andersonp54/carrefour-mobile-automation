import BasePage from "./base.js";
import HomePage from "./home.js";

export default class FormsPage extends BasePage {
    home = new HomePage();

    get inputField() { return $("~text-input"); }
    get inputTextResult() { return $("~input-text-result"); }

    get switch() { return $("~switch"); }
    get switchText() { return $("~switch-text"); }

    get dropdown() { return $("~Dropdown"); }
    get dropdownChevron() { return $("~dropdown-chevron"); }
    get iosPickerWheel() { return $("XCUIElementTypePickerWheel"); }

    get btnActive() { return $("~button-Active"); }
    get btnInactive() { return $("~button-Inactive"); }
    get iosDoneButton() {
        return $('~Done');
    }


    async open() {
        await this.home.goToForms();
    }

    /**
   * Seleciona uma opção do dropdown
   * @param {string} value
   */
    async selectDropdown(value) {
        if (driver.isIOS) {
            await this.dropdownChevron.waitForDisplayed({ timeout: 5000 });
            await this.dropdownChevron.click();

            await this.iosPickerWheel.waitForDisplayed({ timeout: 5000 });
            await this.iosPickerWheel.setValue(value);

            await this.iosDoneButton.waitForDisplayed({ timeout: 5000 });
            await this.iosDoneButton.click();

        }
        else {
            await this.dropdown.waitForDisplayed({ timeout: 5000 });
            await this.dropdown.click();

            const androidOption = await $(`android=new UiSelector().text("${value}")`);
            await androidOption.waitForDisplayed({ timeout: 5000 });
            await androidOption.click();
        }


    }


    /**
     * Preenche todos os componentes do Forms
     * @param {string} text
     * @param {boolean} switchOn
     * @param {string} dropdownValue
     * @param {"Active"|"Inactive"} button
     */
    async fillForm(text, switchOn = true, dropdownValue = "webdriver.io is awesome", button = "Active") {

        await this.type(this.inputField, text);

        await this.waitForDisplayed(this.inputTextResult, 5000);
        await expect(this.inputTextResult).toHaveText(text);

        if (switchOn) {
            await this.switch.click();

            await this.waitForDisplayed(this.switchText, 5000);
            await expect(this.switchText).toHaveText("Click to turn the switch OFF");
        }

        await this.selectDropdown(dropdownValue);

        if (button.toLowerCase() === "inactive") {
            await this.click(this.btnInactive);
        } else {
            await this.click(this.btnActive);
        }
    }
}
