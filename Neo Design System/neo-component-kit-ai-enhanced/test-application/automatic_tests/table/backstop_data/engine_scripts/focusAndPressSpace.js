const { setTimeout } = require("node:timers/promises");

module.exports = async (page, scenario, vp) => {
  let selector = scenario.focusAndPressSpaceSelector;
  const postInteractionWait = scenario.postInteractionWait;
  await page.evaluate((selector) => {
    var element = document.querySelector(selector);

    if (element) {
      element.focus();
    }
  }, selector);
  await page.keyboard.press("Space");
  if (postInteractionWait) {
    await setTimeout(postInteractionWait);
  }
};
