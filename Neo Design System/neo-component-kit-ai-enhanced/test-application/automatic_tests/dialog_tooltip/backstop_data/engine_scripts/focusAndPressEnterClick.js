const { setTimeout } = require("node:timers/promises");

module.exports = async (page, scenario, vp) => {
  let selector = scenario.focusAndPressEnterClickSelector;
  let clickSelector = scenario.clickSelector;
  await page.waitForSelector(selector);
  await page.evaluate((selector) => {
    var element = document.querySelector(selector);

    if (element) {
      element.focus();
    }
  }, selector);
  await setTimeout(500);
  await page.keyboard.press("Enter");
  await setTimeout(500);
  await page.waitForSelector(clickSelector);
  await page.evaluate((selector) => {
    var element = document.querySelector(selector);
    element.click();
  }, clickSelector);
};
