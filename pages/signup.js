import BasePage from "./base.js";
import HomePage from "./home.js";

export default class SignupPage extends BasePage {
  home = new HomePage();

  get tabSignUp() { return $("~Sign up"); }

  get inputEmail() { return $("~input-email"); }
  get inputPassword() { return $("~input-password"); }
  get inputConfirmPassword() { return $("~input-repeat-password"); }

  get btnSignUp() { return $("~button-SIGN UP"); }

  async open() {
    await this.home.goToLogin();
    await this.click(this.tabSignUp);
  }

  // async signUp(email, password, confirmPassword) {
  //   await this.type(this.inputEmail, email);
  //   await this.type(this.inputPassword, password, 2000);
  //   await this.type(this.inputConfirmPassword, confirmPassword, 2000);
  //   await this.click(this.btnSignUp);
  // }

  async signUp(email, password, confirmPassword) {
    await this.type(this.inputEmail, email);
    await this.type(this.inputPassword, password);
    await this.type(this.inputConfirmPassword, confirmPassword);
    await this.click(this.btnSignUp);
  }

  get passwordDifferentError() {
    return $('(//XCUIElementTypeStaticText[@name="Please enter the same password"])');
  }
}
