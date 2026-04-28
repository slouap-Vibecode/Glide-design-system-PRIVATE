const { setTimeout } = require("node:timers/promises");

module.exports = async (page, scenario, vp) => {
  let selector = scenario.focusSelector;

  await page.waitForSelector(selector);
  await page.evaluate((selector) => {
    var element = document.querySelector(selector);

    element.focus();
  }, selector);
  await setTimeout(500);
};
