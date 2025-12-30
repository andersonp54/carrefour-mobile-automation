import BasePage from "./base.js";

export default class HomePage extends BasePage {
  get home() { return $("~Home"); }
  get login() { return $("~Login"); }
  get forms() { return $("~Forms"); }
  get swipe() { return $("~Swipe"); }
  get webview() { return $("~Webview"); }
  get drag() { return $("~Drag"); }

  async goToHome() { await this.click(this.home); }
  async goToLogin() { await this.click(this.login); }
  async goToForms() { await this.click(this.forms); }
  async goToSwipe() { await this.click(this.swipe); }
  async goToWebview() { await this.click(this.webview); }
  async goToDrag() { await this.click(this.drag); }
}
