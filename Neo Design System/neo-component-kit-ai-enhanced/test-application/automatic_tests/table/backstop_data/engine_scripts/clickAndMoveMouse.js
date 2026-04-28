const { setTimeout } = require("node:timers/promises");

module.exports = async (page, scenario, vp) => {
  let selector = scenario.clickSelector;
  const postInteractionWait = scenario.postInteractionWait;
  await page.waitForSelector(selector);
  await page.click(selector);
  await page.mouse.move(0, 0);
  if (postInteractionWait) {
    await setTimeout(postInteractionWait);
  }
};
