const { setTimeout } = require("node:timers/promises");

module.exports = async (page, scenario, vp) => {
  const clickSelector1 = scenario.clickSelector1;
  const clickSelector2 = scenario.clickSelector2;
  const waitInBetween = scenario.waitInBetween;

  await page.click(clickSelector1);
  await setTimeout(waitInBetween);
  await page.click(clickSelector2);
  await setTimeout(500);
};
