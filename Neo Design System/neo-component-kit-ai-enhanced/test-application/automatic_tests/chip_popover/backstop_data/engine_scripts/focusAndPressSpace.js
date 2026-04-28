const { setTimeout } = require("node:timers/promises");

module.exports = async (page, scenario, vp) => {
  let selector = scenario.focusAndPressSpaceSelector;
  await page.waitForSelector(selector);
  await page.focus(selector);
  await page.keyboard.press('Space');
  if (scenario.postInteractionWait) {
    await setTimeout(scenario.postInteractionWait);
  }
};