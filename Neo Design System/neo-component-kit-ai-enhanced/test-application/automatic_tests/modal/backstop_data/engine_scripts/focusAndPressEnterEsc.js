const { setTimeout } = require("node:timers/promises");

module.exports = async (page, scenario, vp) => {
  let selector = scenario.focusAndPressEnterEscSelector;
  await page.evaluate((selector) => {
    var element = document.querySelector(selector);

    if (element) {
      element.focus();
    }
  }, selector);
  await setTimeout(500);
  await page.keyboard.press("Enter");
  await page.keyboard.press("Escape");
};
