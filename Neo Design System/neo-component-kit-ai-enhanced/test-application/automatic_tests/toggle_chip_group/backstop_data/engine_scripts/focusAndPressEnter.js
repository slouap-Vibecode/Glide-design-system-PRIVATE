const { setTimeout } = require("node:timers/promises");

module.exports = async (page, scenario, vp) => {
  let selector = scenario.focusAndPressEnterSelector;
  const postInteractionWait = scenario.postInteractionWait;
  await page.waitForSelector(selector);
  await page.focus(selector);
  await page.keyboard.press("Enter");
  if (postInteractionWait) {
    await setTimeout(postInteractionWait);
  }
};
