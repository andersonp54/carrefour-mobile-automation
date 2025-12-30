import SwipePage from "../pages/swipe.js";

const swipe = new SwipePage();

describe("Swipe", () => {
  it('Deve chegar no card através do texto informado', async () => {
    await swipe.open();

    await swipe.swipeToCard("GREAT COMMUNITY", 3);
    let card = swipe.cardTitleByText("GREAT COMMUNITY");
    await expect(card).toBeDisplayed();

    await swipe.swipeToCard("EXTENDABLE", 3);
    card = swipe.cardTitleByText("EXTENDABLE");
    await expect(card).toBeDisplayed();

    await swipe.swipeToCard("FULLY OPEN SOURCE", 6);
    card = swipe.cardTitleByText("FULLY OPEN SOURCE");
    await expect(card).toBeDisplayed();
  });
});
