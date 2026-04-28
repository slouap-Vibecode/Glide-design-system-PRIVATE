const { setTimeout } = require("node:timers/promises");

module.exports = async (page, scenario, vp) => {
  let selector = scenario.focusAndPressEnterClickSelector;
  let clickSelector = scenario.clickSelector;
  let iframeSelector = scenario.iframeSelector;
  await page.waitForSelector(iframeSelector);
  const iframeElement = await page.$(iframeSelector);
  const frame = await iframeElement.contentFrame();
  await frame.waitForSelector(selector);
  await frame.evaluate((selector) => {
    var element = document.querySelector(selector);

    if (element) {
      element.focus();
    }
  }, selector);
  await setTimeout(500);
  await page.keyboard.press("Enter");
  await setTimeout(500);
  await frame.waitForSelector(clickSelector)
  await frame.evaluate((selector) => {
    var element = document.querySelector(selector);
    element.click();
  }, clickSelector);
};
