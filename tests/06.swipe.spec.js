import SwipePage from "../pages/swipe.js";

const swipe = new SwipePage();

describe("Swipe", () => {
  it('Deve chegar no card através do texto informado', async () => {
    await swipe.open();

    await swipe.swipeToCard("GREAT COMMUNITY", 3);
    let card = await swipe.cardTitleByText("GREAT COMMUNITY");
    await expect(card).toBeDisplayed();

    await swipe.swipeToCard("EXTENDABLE", 3);
    card = await swipe.cardTitleByText("EXTENDABLE");
    await expect(card).toBeDisplayed();

    await swipe.swipeToCard("FULLY OPEN SOURCE", 6);
    card = await swipe.cardTitleByText("FULLY OPEN SOURCE");
    await expect(card).toBeDisplayed();
  });

  it('Realizar o swipe vertical e encontrar o texto escondido', async () => {
    await swipe.swipeVerticalByText("You found me", 5);

    let card = await swipe.cardTitleByText("You found me");
    await expect(card).toBeDisplayed();
  });
});
