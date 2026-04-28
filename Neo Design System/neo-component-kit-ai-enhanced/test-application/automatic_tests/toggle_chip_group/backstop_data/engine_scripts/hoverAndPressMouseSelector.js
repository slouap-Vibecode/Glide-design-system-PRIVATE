const { setTimeout } = require("node:timers/promises");

module.exports = async (page, scenario, vp) => {
  let selector = scenario.hoverAndPressMouseSelector;
  const postInteractionWait = scenario.postInteractionWait;
  await page.waitForSelector(selector);
  await page.hover(selector);
  await page.mouse.down();
  if (postInteractionWait) {
    await setTimeout(postInteractionWait);
  }
};
