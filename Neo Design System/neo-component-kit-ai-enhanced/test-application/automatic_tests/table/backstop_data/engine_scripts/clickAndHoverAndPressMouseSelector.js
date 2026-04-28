const { setTimeout } = require("node:timers/promises");

module.exports = async (page, scenario, vp) => {
  let clickSelector = scenario.clickSelector;
  const postInteractionWait = scenario.postInteractionWait;
  await page.click(clickSelector);
  let selector = scenario.hoverAndPressMouseSelector;
  await page.hover(selector);
  await page.mouse.down();
  if (postInteractionWait) {
    await setTimeout(postInteractionWait);
  }
};
