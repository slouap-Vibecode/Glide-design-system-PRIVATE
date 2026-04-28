const { setTimeout } = require("node:timers/promises");

module.exports = async (page, scenario, vp) => {
  let selector = scenario.focusSelector;
  const postInteractionWait = scenario.postInteractionWait;
  await page.evaluate((selector) => {
    var element = document.querySelector(selector);

    element.focus();
  }, selector);
  if (postInteractionWait) {
    await setTimeout(postInteractionWait);
  }
};
