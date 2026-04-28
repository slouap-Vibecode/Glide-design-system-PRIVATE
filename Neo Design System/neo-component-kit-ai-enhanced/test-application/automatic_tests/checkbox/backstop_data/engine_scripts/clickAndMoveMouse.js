module.exports = async (page, scenario, vp) => {
  let selector = scenario.clickSelector;
  await page.waitForSelector(selector);
  await page.click(selector);
  await page.mouse.move(0, 0);
};
