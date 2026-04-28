const { setTimeout } = require("node:timers/promises");

module.exports = async (page, scenario, vp) => {
  let iframeSelector = scenario.iframeSelector;
  let selector = scenario.focusSelector;

  const iframeElement = await page.$(iframeSelector);
  const frame = await iframeElement.contentFrame();
  await frame.waitForSelector(selector);
  await frame.evaluate((selector) => {
    var element = document.querySelector(selector);

    element.focus();
  }, selector);
  await setTimeout(500);
};
