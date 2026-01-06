import BasePage from "./base.js";
import HomePage from "./home.js";

export default class SignupPage extends BasePage {
  home = new HomePage();

  get tabSignUp() {
    return driver.isIOS
      ? $("~Sign up")
      : $('android=new UiSelector().text("Sign up")');
  }

  get inputEmail() { return $("~input-email"); }
  get inputPassword() { return $("~input-password"); }
  get inputConfirmPassword() { return $("~input-repeat-password"); }
  get btnSignUp() { return $("~button-SIGN UP"); }

  /**
   * Mensagem de erro exibida quando as senhas informadas são diferentes
   * Implementação específica para iOS e Android
   */
  get passwordDifferentError() {
    return driver.isIOS
      ? $('//XCUIElementTypeStaticText[@name="Please enter the same password"]')
      : $('android=new UiSelector().text("Please enter the same password")');
  }

  /**
   * Navega até a tela de Login e acessa a aba de Sign Up
   */
  async open() {
    await this.home.goToLogin();
    await this.tabSignUp.click();
  }

  /**
   * Realiza o cadastro preenchendo os campos obrigatórios
   * @param {string} email - E-mail do usuário
   * @param {string} password - Senha do usuário
   * @param {string} confirmPassword - Confirmação da senha
   */
  async signUp(email, password, confirmPassword) {
    await this.type(this.inputEmail, email);
    await this.type(this.inputPassword, password);
    await this.type(this.inputConfirmPassword, confirmPassword);
    await this.click(this.btnSignUp);
  }
}
