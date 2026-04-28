const { setTimeout } = require("node:timers/promises");

module.exports = async (page, scenario, vp) => {
  let selector = scenario.focusAndPressEnterTabEnterSelector;
  await page.waitForSelector(selector);
  await page.evaluate((selector) => {
    var element = document.querySelector(selector);

    if (element) {
      element.focus();
    }
  }, selector);
  await page.keyboard.press("Enter");
  await setTimeout(500); // wait for the tooltip animation to finish
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
};
