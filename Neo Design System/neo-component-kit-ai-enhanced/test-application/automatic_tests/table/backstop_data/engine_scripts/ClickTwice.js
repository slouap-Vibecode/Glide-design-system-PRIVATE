const { setTimeout } = require("node:timers/promises");

module.exports = async (page, scenario, vp) => {
  let clickSelector = scenario.clickSelector;
  const postInteractionWait = scenario.postInteractionWait;
  let clickSelector2 = scenario.clickSelector2;
  await page.waitForSelector(clickSelector);
  await page.click(clickSelector);
  await setTimeout(100);
  await page.waitForSelector(clickSelector2);
  await page.click(clickSelector2);
  if (postInteractionWait) {
    await setTimeout(postInteractionWait);
  }
};
