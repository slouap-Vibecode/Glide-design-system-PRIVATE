const { setTimeout } = require("node:timers/promises");

module.exports = async (page, scenario, vp) => {
  let selector = scenario.hoverSelector;
  let iframeSelector = scenario.iframeSelector;

  const iframeElement = await page.$(iframeSelector);
  const frame = await iframeElement.contentFrame();
  await frame.waitForSelector(selector);
  await frame.hover(selector);
  await setTimeout(500);
};
