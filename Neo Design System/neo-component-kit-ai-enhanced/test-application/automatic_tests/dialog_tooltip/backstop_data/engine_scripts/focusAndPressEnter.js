const { setTimeout } = require("node:timers/promises");

module.exports = async (page, scenario, vp) => {
  let selector = scenario.focusAndPressEnterSelector;
  await page.waitForSelector(selector);
  await page.evaluate((selector) => {
    var element = document.querySelector(selector);

    if (element) {
      element.focus();
    }
  }, selector);
  await page.keyboard.press('Enter');
  await setTimeout(100);
};