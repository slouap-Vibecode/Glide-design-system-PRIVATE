const { setTimeout } = require("node:timers/promises");

module.exports = async (page, scenario, vp) => {
  let selector = scenario.focusSelector;
  const postInteractionWait = scenario.postInteractionWait;
  await page.waitForSelector(selector);
  await page.focus(selector);

  if (postInteractionWait) {
    await setTimeout(postInteractionWait);
  }
};
