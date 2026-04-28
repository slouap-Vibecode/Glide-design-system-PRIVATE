const { setTimeout } = require("node:timers/promises");

module.exports = async (page, scenario, vp) => {
  let selector = scenario.hoverSelector;
  await page.waitForSelector(selector);
  await page.hover(selector);
  await setTimeout(500);
  await page.mouse.move(0, 0);
  await setTimeout(500);
};
