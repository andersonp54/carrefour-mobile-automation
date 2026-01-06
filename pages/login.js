import BasePage from "./base.js";
import HomePage from "./home.js";

export default class LoginPage extends BasePage {
    home = new HomePage();

    get tabLogin() { return $("~Login"); }
    get tabSignUp() { return $("~Sign up"); }
    get inputEmail() { return $("~input-email"); }
    get inputPassword() { return $("~input-password"); }
    get btnLogin() { return $("~button-LOGIN"); }

    /**
     * Mensagem de erro exibida quando a senha possui menos de 8 caracteres
     * Implementação específica para iOS e Android
     */
    get passwordMinLengthError() {
        return driver.isIOS
            ? $('//XCUIElementTypeStaticText[@name="Please enter at least 8 characters"]')
            : $('//*[@text="Please enter at least 8 characters"]');

    }
    
    /**
     * Navega até a tela de Login e seleciona a aba Login
     */
    async open() {
        await this.home.goToLogin();
        await this.click(this.tabLogin);
    }

    /**
     * Navega até a tela de Login e seleciona a aba Sign up
     */
    async goToSignUp() {
        await this.home.goToLogin();
        await this.click(this.tabSignUp);
    }

    /**
     * Realiza o login preenchendo e-mail e senha
     * @param {string} email - E-mail do usuário
     * @param {string} password - Senha do usuário
     */
    async login(email, password) {
        await this.type(this.inputEmail, email);
        await this.type(this.inputPassword, password);
        await this.click(this.btnLogin);
    }

}
