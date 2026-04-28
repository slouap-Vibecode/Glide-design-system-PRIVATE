const { setTimeout } = require("node:timers/promises");

module.exports = async (page, scenario, vp) => {
  let selector = scenario.focusSelector;

  await page.waitForSelector(selector);
  await page.focus(selector);
  await setTimeout(500);
};
