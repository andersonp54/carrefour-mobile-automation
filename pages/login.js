import BasePage from "./base.js";
import HomePage from "./home.js";

export default class LoginPage extends BasePage {
    home = new HomePage();

    get tabLogin() { return $("~Login"); }
    get tabSignUp() { return $("~Sign up"); }

    get inputEmail() { return $("~input-email"); }
    get inputPassword() { return $("~input-password"); }
    get btnLogin() { return $("~button-LOGIN"); }

    get passwordMinLengthError() {
        return driver.isIOS
            ? $('//XCUIElementTypeStaticText[@name="Please enter at least 8 characters"]')
            : $('//*[@text="Please enter at least 8 characters"]');

    }
    
    async open() {
        await this.home.goToLogin();
        await this.click(this.tabLogin);
    }

    async goToSignUp() {
        await this.home.goToLogin();
        await this.click(this.tabSignUp);
    }

    async login(email, password) {
        await this.type(this.inputEmail, email);
        await this.type(this.inputPassword, password);
        await this.click(this.btnLogin);
    }

}
