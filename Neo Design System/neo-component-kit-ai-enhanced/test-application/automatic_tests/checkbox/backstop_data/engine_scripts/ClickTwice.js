module.exports = async (page, scenario, vp) => {
  let clickSelector = scenario.clickSelector;
  let clickSelector2 = scenario.clickSelector2;
  await page.waitForSelector(clickSelector);
  await page.click(clickSelector);
  await page.waitForTimeout(50);
  await page.click(clickSelector2);
};
