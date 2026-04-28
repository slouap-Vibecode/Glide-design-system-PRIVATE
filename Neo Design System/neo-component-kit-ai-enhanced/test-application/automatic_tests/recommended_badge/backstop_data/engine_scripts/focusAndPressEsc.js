const { setTimeout } = require("node:timers/promises");

module.exports = async (page, scenario, vp) => {
  let selector = scenario.focusAndPressEscSelector;
  await page.waitForSelector(selector);
  await page.focus(selector);
  await setTimeout(500);
  await page.keyboard.press("Escape");
  await page.keyboard.down("Escape");
  await page.keyboard.up("Escape");
  await setTimeout(100);
};
