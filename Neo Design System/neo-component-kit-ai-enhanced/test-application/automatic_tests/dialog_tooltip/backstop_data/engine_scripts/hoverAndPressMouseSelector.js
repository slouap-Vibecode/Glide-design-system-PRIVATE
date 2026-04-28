module.exports = async (page, scenario, vp) => {
  let selector = scenario.hoverAndPressMouseSelector;
  await page.waitForSelector(selector);
  await page.hover(selector);
  await page.mouse.down();
};