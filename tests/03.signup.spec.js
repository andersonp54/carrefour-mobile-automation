import SignupPage from "../pages/signup.js";
import { random8 } from '../helpers/utils.js';

const signup = new SignupPage();
const id = random8();

describe("Sign up", async () => {

  it("Realizar cadastro com dados válidos", async () => {
  await signup.open();

    await signup.signUp(
      `user.${id}@qa.com`,
      `${id}`,
      `${id}`
    );

    const alertText = await signup.getAlertText();
    expect(alertText).toBeTruthy();
    expect(alertText).toContain("Signed Up!");
    expect(alertText).toContain("You successfully signed up!");

    await signup.acceptAlert();
  });

  it("deve impedir cadastro quando as senhas forem diferentes", async () => {
    await signup.signUp(
      `user.${id}@qa.com`,
      `${id}`,
      `${random8()}`
    );

    await expect(signup.passwordDifferentError).toBeDisplayed();
    await expect(signup.passwordDifferentError).toHaveText("Please enter the same password");
  });
});
