import DragPage from "../pages/drag.js";

const drag = new DragPage();

describe("Drag", () => {
  it("Deve montar o Puzzle e concluir com sucesso", async () => {
    await drag.open();
    await drag.solvePuzzle();

    await drag.successTitle.waitForDisplayed({ timeout: 15000 });
    await expect(drag.successTitle).toBeDisplayed();
    await expect(drag.successTitle).toHaveText("Congratulations");

    await expect(drag.successMessage).toBeDisplayed();
    await expect(drag.successMessage).toHaveText("You made it, click retry if you want to try it again.");
  });
});
