module.exports = async (page, scenario, vp) => {
  let selector = scenario.hoverAndPressMouseSelector;
  await page.hover(selector);
  await page.mouse.down();
};