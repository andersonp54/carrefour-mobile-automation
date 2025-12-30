import HomePage from "../pages/home.js";

const home = new HomePage();

describe("Navigation", () => {
  it("Navegar entre Login, Forms, Swipe, Webview, Drag e Home", async () => {
    await home.goToLogin();
    await home.goToForms();
    await home.goToSwipe();
    await home.goToWebview();
    await home.goToDrag();
    await home.goToHome();
  });
});
