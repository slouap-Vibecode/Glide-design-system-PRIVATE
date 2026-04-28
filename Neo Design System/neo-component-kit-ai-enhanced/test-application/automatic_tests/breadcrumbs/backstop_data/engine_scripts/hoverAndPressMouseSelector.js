const { setTimeout } = require("node:timers/promises");

module.exports = async (page, scenario, vp) => {
  let selector = scenario.hoverAndPressMouseSelector;
  let postInteractionWait = scenario.postInteractionWait;
  await page.waitForSelector(selector);
  await page.hover(selector);
  await page.mouse.down();
  await setTimeout(postInteractionWait);
};
