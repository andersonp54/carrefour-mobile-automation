import LoginPage from "../pages/login.js";

const login = new LoginPage();

describe("Login", () => {

  before(async () => {
    await login.open();
  });

  it("Deve logar com sucesso", async () => {
    await login.login("bob@example.com", "10203040");

    const alertText = await login.getAlertText();
    expect(alertText).toBeTruthy();
    expect(alertText).toContain("You are logged in!");

    await login.acceptAlert();
  });

  it("Validar login com senha menor que 8 caracteres", async () => {
    await login.login("teste@qa.com", "123456"); // 6 caracteres

    await expect(login.passwordMinLengthError).toBeDisplayed();
    await expect(login.passwordMinLengthError).toHaveText("Please enter at least 8 characters");
  });
});
